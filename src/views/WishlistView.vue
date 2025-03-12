<template>
  <div class="wishlist-view">
    <div class="container py-5">
      <h1 class="section-title mb-4">My Wishlist</h1>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="wishlistItems.length === 0" class="text-center py-5">
        <div class="empty-wishlist mb-4">
          <i class="bi bi-heart display-1 text-muted"></i>
          <h2 class="mt-3">Your wishlist is empty</h2>
          <p class="text-muted mb-4">
            Add items to your wishlist to save them for later.
          </p>
        </div>
        <router-link to="/products" class="btn btn-summer btn-lg"
          >Start Shopping</router-link
        >
      </div>

      <div v-else>
        <div class="wishlist-items">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col" width="80"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock Status</th>
                  <th scope="col" width="150">Actions</th>
                  <th scope="col" width="50"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in wishlistItems" :key="product.id">
                  <td>
                    <img
                      :src="product.images[0]"
                      :alt="product.name"
                      class="img-fluid rounded"
                      width="60"
                    />
                  </td>
                  <td>
                    <router-link
                      :to="`/product/${product.id}`"
                      class="product-title text-decoration-none"
                    >
                      {{ product.name }}
                    </router-link>
                  </td>
                  <td>
                    <div class="product-price">
                      <span
                        v-if="product.salePrice"
                        class="text-decoration-line-through text-muted me-2"
                        >${{ product.price.toFixed(2) }}</span
                      >
                      <span class="fw-bold"
                        >${{
                          (product.salePrice || product.price).toFixed(2)
                        }}</span
                      >
                    </div>
                  </td>
                  <td>
                    <span v-if="product.inStock" class="badge bg-success"
                      >In Stock</span
                    >
                    <span v-else class="badge bg-danger">Out of Stock</span>
                  </td>
                  <td>
                    <button
                      class="btn btn-summer btn-sm"
                      @click="addToCart(product.id)"
                      :disabled="!product.inStock"
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm text-danger"
                      @click="removeFromWishlist(product.id)"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="wishlist-actions d-flex justify-content-between mt-4">
          <router-link to="/products" class="btn btn-outline-dark">
            <i class="bi bi-arrow-left me-2"></i> Continue Shopping
          </router-link>
          <button
            class="btn btn-summer"
            @click="addAllToCart"
            :disabled="!hasInStockItems"
          >
            Add All to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    name: 'WishlistView',
    setup() {
      const store = useStore();
      const router = useRouter();
      const loading = ref(true);

      // Initialize store
      onMounted(() => {
        loading.value = true;
        store.dispatch('initializeStore').then(() => {
          loading.value = false;
        });
      });

      // Get wishlist items
      const wishlistItems = computed(() => {
        const wishlistIds = store.state.wishlist;
        return store.state.products.filter(product =>
          wishlistIds.includes(product.id)
        );
      });

      // Check if there are any in-stock items
      const hasInStockItems = computed(() => {
        return wishlistItems.value.some(product => product.inStock);
      });

      // Add item to cart
      const addToCart = productId => {
        store.dispatch('addToCart', { productId, quantity: 1 });

        // Show success message (could use a toast notification library in a real app)
        alert('Product added to cart!');
      };

      // Remove item from wishlist
      const removeFromWishlist = productId => {
        store.dispatch('toggleWishlist', productId);
      };

      // Add all in-stock items to cart
      const addAllToCart = () => {
        const inStockItems = wishlistItems.value.filter(
          product => product.inStock
        );

        inStockItems.forEach(product => {
          store.dispatch('addToCart', { productId: product.id, quantity: 1 });
        });

        // Navigate to cart
        router.push('/cart');
      };

      return {
        loading,
        wishlistItems,
        hasInStockItems,
        addToCart,
        removeFromWishlist,
        addAllToCart,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .product-title {
    color: #343a40;
    font-weight: 500;

    &:hover {
      color: var(--bs-primary);
    }
  }

  .empty-wishlist {
    i {
      opacity: 0.5;
    }
  }
</style>
