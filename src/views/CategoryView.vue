<template>
  <div class="category-view">
    <div class="container py-5">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <div class="category-header mb-4">
          <h1 class="section-title">{{ categoryName }}</h1>
          <p class="text-muted">{{ categoryDescription }}</p>
        </div>

        <div v-if="products.length === 0" class="text-center py-5">
          <div class="empty-category mb-4">
            <i class="bi bi-exclamation-circle display-1 text-muted"></i>
            <h2 class="mt-3">No Products Found</h2>
            <p class="text-muted mb-4">
              There are no products available in this category at the moment.
            </p>
          </div>
          <router-link to="/products" class="btn btn-summer"
            >Browse All Products</router-link
          >
        </div>

        <div v-else>
          <!-- Filter and Sort Controls -->
          <div class="filter-controls mb-4">
            <div class="row align-items-center">
              <div class="col-md-6 mb-3 mb-md-0">
                <p class="mb-0">Showing {{ products.length }} products</p>
              </div>
              <div class="col-md-6">
                <div class="d-flex justify-content-md-end">
                  <select
                    class="form-select"
                    style="width: auto"
                    v-model="sortBy"
                    @change="applySort"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="row g-4">
            <div
              v-for="product in products"
              :key="product.id"
              class="col-6 col-md-4 col-lg-3"
            >
              <product-card :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "CategoryView",
  components: {
    ProductCard,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const loading = ref(true);
    const sortBy = ref("featured");

    // Initialize store
    onMounted(() => {
      loading.value = true;
      store.dispatch("initializeStore").then(() => {
        loading.value = false;
      });
    });

    // Get category details
    const categoryData = computed(() => {
      return (
        store.state.categories.find((cat) => cat.slug === props.category) || {}
      );
    });

    const categoryName = computed(() => {
      return categoryData.value.name || "Category Not Found";
    });

    const categoryDescription = computed(() => {
      return categoryData.value.description || "";
    });

    // Get products for this category
    const products = computed(() => {
      return store.getters.productsByCategory(props.category);
    });

    // Apply sorting
    const applySort = () => {
      store.dispatch("applyFilters", { sortBy: sortBy.value });
    };

    // Watch for category changes in the URL
    watch(
      () => props.category,
      () => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 300);
      }
    );

    return {
      loading,
      categoryName,
      categoryDescription,
      products,
      sortBy,
      applySort,
    };
  },
};
</script>

<style lang="scss" scoped>
.category-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.empty-category {
  i {
    opacity: 0.5;
  }
}
</style>
