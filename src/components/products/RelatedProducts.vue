<template>
  <div class="related-products">
    <h3 class="section-title mb-4">{{ title }}</h3>

    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-3">
      <p class="mb-0">No related products found.</p>
    </div>

    <div v-else class="row g-4">
      <div v-for="product in products" :key="product.id" class="col-6 col-md-3">
        <product-card :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  import ProductCard from '@/components/products/ProductCard.vue';

  export default {
    name: 'RelatedProducts',
    components: {
      ProductCard,
    },
    props: {
      productId: {
        type: Number,
        required: true,
      },
      categoryId: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        default: 'You May Also Like',
      },
      limit: {
        type: Number,
        default: 4,
      },
    },
    setup(props) {
      const store = useStore();
      const loading = ref(true);

      // Get related products from the same category
      const products = computed(() => {
        const allProducts = store.state.products;

        // Filter products from the same category, excluding the current product
        const categoryProducts = allProducts.filter(
          product =>
            product.categoryId === props.categoryId &&
            product.id !== props.productId
        );

        // Shuffle array to get random products
        const shuffled = [...categoryProducts].sort(() => 0.5 - Math.random());

        // Return limited number of products
        return shuffled.slice(0, props.limit);
      });

      // Load products
      onMounted(() => {
        loading.value = true;

        // Simulate API call
        setTimeout(() => {
          loading.value = false;
        }, 500);
      });

      // Watch for changes in productId
      watch(
        () => props.productId,
        () => {
          loading.value = true;

          // Simulate API call
          setTimeout(() => {
            loading.value = false;
          }, 500);
        }
      );

      return {
        loading,
        products,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .related-products {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
</style>
