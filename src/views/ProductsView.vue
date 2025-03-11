<template>
  <div class="products-view">
    <div class="container py-5">
      <h1 class="section-title mb-4">All Products</h1>

      <!-- Filters and Sorting -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="filter-sidebar p-3 bg-white rounded shadow-sm">
            <h5 class="mb-3">Filter Products</h5>

            <!-- Category Filter -->
            <div class="mb-4">
              <h6 class="filter-title">Categories</h6>
              <div
                class="form-check"
                v-for="category in categories"
                :key="category.id"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :id="`category-${category.id}`"
                  name="category"
                  :value="category.id"
                  v-model="selectedCategory"
                />
                <label
                  class="form-check-label"
                  :for="`category-${category.id}`"
                >
                  {{ category.name }}
                </label>
              </div>
              <button
                class="btn btn-sm btn-link text-decoration-none ps-0 pt-2"
                @click="selectedCategory = null"
                v-if="selectedCategory"
              >
                Clear Category
              </button>
            </div>

            <!-- Price Range Filter -->
            <div class="mb-4">
              <h6 class="filter-title">Price Range</h6>
              <div class="d-flex justify-content-between mb-2">
                <span>${{ priceRange[0] }}</span>
                <span>${{ priceRange[1] }}</span>
              </div>
              <div class="price-slider mb-3">
                <input
                  type="range"
                  class="form-range"
                  min="0"
                  max="100"
                  v-model="priceRange[0]"
                />
                <input
                  type="range"
                  class="form-range"
                  min="0"
                  max="100"
                  v-model="priceRange[1]"
                />
              </div>
            </div>

            <!-- Sale Items Filter -->
            <div class="mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="saleItemsOnly"
                  v-model="saleItemsOnly"
                />
                <label class="form-check-label" for="saleItemsOnly">
                  Sale Items Only
                </label>
              </div>
            </div>

            <!-- New Arrivals Filter -->
            <div class="mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="newArrivalsOnly"
                  v-model="newArrivalsOnly"
                />
                <label class="form-check-label" for="newArrivalsOnly">
                  New Arrivals Only
                </label>
              </div>
            </div>

            <!-- Apply Filters Button -->
            <button class="btn btn-summer w-100" @click="applyFilters">
              Apply Filters
            </button>
          </div>
        </div>

        <div class="col-md-9">
          <!-- Sorting and View Options -->
          <div
            class="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm"
          >
            <div class="results-count">
              <span>{{ filteredProducts.length }} products</span>
            </div>

            <div class="d-flex align-items-center">
              <label for="sortBy" class="me-2 mb-0">Sort by:</label>
              <select
                id="sortBy"
                class="form-select form-select-sm"
                v-model="sortBy"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div
            v-else-if="filteredProducts.length === 0"
            class="text-center py-5"
          >
            <p class="mb-3">No products match your filters.</p>
            <button class="btn btn-outline-dark" @click="resetFilters">
              Reset Filters
            </button>
          </div>

          <div v-else class="row g-4">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="col-6 col-md-4 col-lg-4"
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
import { useRoute, useRouter } from "vue-router";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const loading = ref(false);
    const selectedCategory = ref(null);
    const priceRange = ref([0, 100]);
    const saleItemsOnly = ref(false);
    const newArrivalsOnly = ref(false);
    const sortBy = ref("featured");

    // Initialize store and load products
    onMounted(() => {
      loading.value = true;
      store.dispatch("initializeStore").then(() => {
        loading.value = false;

        // Check for URL params
        if (route.query.category) {
          const category = categories.value.find(
            (c) => c.slug === route.query.category
          );
          if (category) {
            selectedCategory.value = category.id;
          }
        }

        if (route.query.sort) {
          sortBy.value = route.query.sort;
        }

        if (route.query.sale === "true") {
          saleItemsOnly.value = true;
        }

        if (route.query.new === "true") {
          newArrivalsOnly.value = true;
        }
      });
    });

    // Get all categories from store
    const categories = computed(() => {
      return store.getters.allCategories;
    });

    // Get all products from store
    const products = computed(() => {
      return store.getters.allProducts;
    });

    // Filter and sort products based on selected filters
    const filteredProducts = computed(() => {
      let result = [...products.value];

      // Apply category filter
      if (selectedCategory.value) {
        result = result.filter(
          (product) => product.categoryId === selectedCategory.value
        );
      }

      // Apply price range filter
      result = result.filter((product) => {
        const price = product.salePrice || product.price;
        return price >= priceRange.value[0] && price <= priceRange.value[1];
      });

      // Apply sale items filter
      if (saleItemsOnly.value) {
        result = result.filter((product) => product.onSale);
      }

      // Apply new arrivals filter
      if (newArrivalsOnly.value) {
        result = result.filter((product) => product.isNew);
      }

      // Apply sorting
      switch (sortBy.value) {
        case "price-low-high":
          result.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            return priceA - priceB;
          });
          break;
        case "price-high-low":
          result.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            return priceB - priceA;
          });
          break;
        case "newest":
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "featured":
        default:
          // Featured products first, then sort by id
          result.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.id - b.id;
          });
      }

      return result;
    });

    // Update URL when filters change
    watch([selectedCategory, sortBy, saleItemsOnly, newArrivalsOnly], () => {
      updateUrlParams();
    });

    // Apply filters and update URL
    const applyFilters = () => {
      updateUrlParams();
    };

    // Reset all filters
    const resetFilters = () => {
      selectedCategory.value = null;
      priceRange.value = [0, 100];
      saleItemsOnly.value = false;
      newArrivalsOnly.value = false;
      sortBy.value = "featured";
      updateUrlParams();
    };

    // Update URL params based on selected filters
    const updateUrlParams = () => {
      const query = {};

      if (selectedCategory.value) {
        const category = categories.value.find(
          (c) => c.id === selectedCategory.value
        );
        if (category) {
          query.category = category.slug;
        }
      }

      if (sortBy.value !== "featured") {
        query.sort = sortBy.value;
      }

      if (saleItemsOnly.value) {
        query.sale = "true";
      }

      if (newArrivalsOnly.value) {
        query.new = "true";
      }

      router.replace({ query });
    };

    return {
      loading,
      categories,
      selectedCategory,
      priceRange,
      saleItemsOnly,
      newArrivalsOnly,
      sortBy,
      filteredProducts,
      applyFilters,
      resetFilters,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-sidebar {
  position: sticky;
  top: 20px;
}

.filter-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-check-label {
  font-size: 0.9rem;
  cursor: pointer;
}

.price-slider {
  position: relative;

  input[type="range"] {
    position: absolute;
    width: 100%;

    &:nth-child(1) {
      z-index: 2;
    }

    &:nth-child(2) {
      z-index: 1;
    }
  }
}
</style>
