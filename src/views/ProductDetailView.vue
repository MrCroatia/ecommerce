<template>
  <div class="product-detail-view">
    <div class="container py-5">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products">Products</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.name }}
          </li>
        </ol>
      </nav>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="!product.id" class="text-center py-5">
        <h2>Product Not Found</h2>
        <p class="mb-4">
          Sorry, the product you're looking for doesn't exist or has been
          removed.
        </p>
        <router-link to="/products" class="btn btn-summer"
          >Browse Products</router-link
        >
      </div>
  
      <div v-else class="row">
        <!-- Product Images -->
        <div class="col-md-6 mb-4 mb-md-0 d-flex">
          <div class="product-images">
            <div class="main-image-container mb-3">
              <img
                :src="product.images[0]"
                :alt="product.name"
                class="img-fluid main-image rounded"
              />
              <div v-if="product.onSale" class="product-badge sale-badge">
                Sale
              </div>
              <div v-if="product.isNew" class="product-badge new-badge">
                New
              </div>
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="col-md-6 d-flex">
          <div class="product-info">
            <h1 class="product-title mb-2">{{ product.name }}</h1>

            <div class="d-flex align-items-center mb-3">
              <div class="product-rating me-3">
                <i
                  v-for="i in 5"
                  :key="i"
                  class="bi"
                  :class="
                    i <= Math.floor(product.rating)
                      ? 'bi-star-fill'
                      : i - 0.5 <= product.rating
                      ? 'bi-star-half'
                      : 'bi-star'
                  "
                  style="color: #ffc107"
                ></i>
              </div>
              <span class="text-muted">{{ product.reviews }} reviews</span>
            </div>

            <div class="product-price mb-4">
              <span v-if="product.salePrice" class="sale-price me-2"
                >${{ product.salePrice.toFixed(2) }}</span
              >
              <span
                :class="{
                  'text-decoration-line-through text-muted': product.salePrice,
                }"
                >${{ product.price.toFixed(2) }}</span
              >
              <span v-if="product.salePrice" class="ms-2 badge bg-danger"
                >{{ calculateDiscount(product.price, product.salePrice) }}%
                OFF</span
              >
            </div>

            <div class="product-description mb-4">
              <p>{{ product.description }}</p>
            </div>

            <div
              class="product-variants mb-4"
              v-if="product.variants && product.variants.length"
            >
              <h6 class="mb-2">Available Options:</h6>
              <div class="d-flex flex-wrap gap-2">
                <button
                  v-for="variant in product.variants"
                  :key="variant.id"
                  class="btn btn-outline-dark variant-btn"
                  :class="{ active: selectedVariant === variant.id }"
                  @click="selectedVariant = variant.id"
                >
                  {{ variant.name }}
                </button>
              </div>
            </div>

            <div class="product-quantity mb-4">
              <h6 class="mb-2">Quantity:</h6>
              <div class="quantity-selector d-flex align-items-center">
                <button
                  class="btn btn-outline-dark"
                  @click="decrementQuantity"
                  :disabled="quantity <= 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <input
                  type="number"
                  class="form-control text-center mx-2"
                  v-model.number="quantity"
                  min="1"
                  max="99"
                />
                <button
                  class="btn btn-outline-dark"
                  @click="incrementQuantity"
                  :disabled="quantity >= 99"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>

            <div class="product-actions d-flex gap-2 mb-4">
              <button class="btn btn-summer flex-grow-1" @click="addToCart">
                Add to Cart
              </button>
              <button
                class="btn btn-outline-dark wishlist-btn"
                @click="toggleWishlist"
                :class="{ active: isInWishlist }"
              >
                <i
                  class="bi"
                  :class="isInWishlist ? 'bi-heart-fill' : 'bi-heart'"
                ></i>
              </button>
            </div>

            <div class="product-meta">
              <p class="mb-1"><strong>SKU:</strong> {{ product.sku }}</p>
              <p class="mb-1">
                <strong>Category:</strong>
                <router-link :to="`/category/${categorySlug}`">{{
                  categoryName
                }}</router-link>
              </p>
              <p class="mb-3">
                <strong>Tags:</strong>
                <span
                  v-for="(tag, index) in product.tags"
                  :key="tag"
                  class="product-tag"
                >
                  {{ tag
                  }}<span v-if="index < product.tags.length - 1">, </span>
                </span>
              </p>

              <div class="product-share d-flex align-items-center">
                <span class="me-2">Share:</span>
                <a href="#" class="social-icon me-2">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#" class="social-icon me-2">
                  <i class="bi bi-twitter-x"></i>
                </a>
                <a href="#" class="social-icon me-2">
                  <i class="bi bi-pinterest"></i>
                </a>
                <a href="#" class="social-icon me-2">
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div v-if="product.id" class="product-tabs mt-5">
        <ul class="nav nav-tabs" id="productTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="description-tab"
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
              role="tab"
              aria-controls="description"
              aria-selected="true"
            >
              Description
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="specifications-tab"
              data-bs-toggle="tab"
              data-bs-target="#specifications"
              type="button"
              role="tab"
              aria-controls="specifications"
              aria-selected="false"
            >
              Specifications
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="reviews-tab"
              data-bs-toggle="tab"
              data-bs-target="#reviews"
              type="button"
              role="tab"
              aria-controls="reviews"
              aria-selected="false"
            >
              Reviews ({{ product.reviews }})
            </button>
          </li>
        </ul>
        <div class="tab-content p-4 bg-white" id="productTabsContent">
          <div
            class="tab-pane fade show active"
            id="description"
            role="tabpanel"
            aria-labelledby="description-tab"
          >
            <div class="product-description">
              <p>{{ product.fullDescription || product.description }}</p>
              <ul class="mt-3">
                <li v-for="feature in product.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="specifications"
            role="tabpanel"
            aria-labelledby="specifications-tab"
          >
            <div class="product-specifications">
              <table class="table table-striped">
                <tbody>
                  <tr v-for="(value, key) in product.specifications" :key="key">
                    <th scope="row">{{ formatSpecKey(key) }}</th>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="reviews"
            role="tabpanel"
            aria-labelledby="reviews-tab"
          >
            <div class="product-reviews">
              <p class="text-muted mb-4">Reviews coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div
        v-if="product.id && relatedProducts.length"
        class="related-products mt-5"
      >
        <h2 class="section-title mb-4">You May Also Like</h2>
        <div class="row g-4">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="col-6 col-md-3"
          >
            <product-card :product="relatedProduct" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import ProductCard from '@/components/products/ProductCard.vue';

  export default {
    name: 'ProductDetailView',
    components: {
      ProductCard,
    },
    setup() {
      const store = useStore();
      const route = useRoute();

      const loading = ref(true);
      const quantity = ref(1);
      const selectedVariant = ref(null);
      const currentImage = ref('');

      // Get product ID from route params
      const productId = computed(() => {
        return parseInt(route.params.id);
      });

      // Get product from store
      const product = computed(() => {
        const foundProduct = store.getters.productById(productId.value);
        if (foundProduct && foundProduct.images && foundProduct.images.length > 0) {
          currentImage.value = foundProduct.images[0];
        }
        return foundProduct || {};
      });

      // Get category name and slug
      const categoryName = computed(() => {
        if (!product.value.categoryId) return '';
        const category = store.state.categories.find(
          cat => cat.id === product.value.categoryId
        );
        return category ? category.name : '';
      });

      const categorySlug = computed(() => {
        if (!product.value.categoryId) return '';
        const category = store.state.categories.find(
          cat => cat.id === product.value.categoryId
        );
        return category ? category.slug : '';
      });

      // Check if product is in wishlist
      const isInWishlist = computed(() => {
        return store.getters.isInWishlist(productId.value);
      });

      // Get related products (same category, excluding current product)
      const relatedProducts = computed(() => {
        if (!product.value.categoryId) return [];
        return store.state.products
          .filter(
            p =>
              p.categoryId === product.value.categoryId &&
              p.id !== productId.value
          )
          .slice(0, 4);
      });

      // Initialize store and load product
      onMounted(() => {
        loading.value = true;
        store.dispatch('initializeStore').then(() => {
          loading.value = false;
        });
      });

      // Calculate discount percentage
      const calculateDiscount = (originalPrice, salePrice) => {
        return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
      };

      // Format specification key
      const formatSpecKey = key => {
        return key
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

      // Increment quantity
      const incrementQuantity = () => {
        if (quantity.value < 99) {
          quantity.value++;
        }
      };

      // Decrement quantity
      const decrementQuantity = () => {
        if (quantity.value > 1) {
          quantity.value--;
        }
      };

      // Add to cart
      const addToCart = () => {
        store.dispatch('addToCart', {
          productId: productId.value,
          quantity: quantity.value,
          variantId: selectedVariant.value,
        });
      };

      // Toggle wishlist
      const toggleWishlist = () => {
        store.dispatch('toggleWishlist', productId.value);
      };

      return {
        loading,
        product,
        quantity,
        selectedVariant,
        currentImage,
        categoryName,
        categorySlug,
        isInWishlist,
        relatedProducts,
        calculateDiscount,
        formatSpecKey,
        incrementQuantity,
        decrementQuantity,
        addToCart,
        toggleWishlist,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .product-images {
    position: relative;
  }

  .main-image-container {
    position: relative;
    height: 400px;
    border-radius: 0.5rem;

    .main-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .product-badge {
    position: absolute;
    top: 15px;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    z-index: 2;

    &.sale-badge {
      left: 15px;
      background-color: #e3342f;
      color: white;
    }

    &.new-badge {
      right: 15px;
      background-color: #3490dc;
      color: white;
    }
  }


  .product-title {
    font-weight: 600;
    font-size: 1.75rem;
  }

  .sale-price {
    color: #e3342f;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 1.5rem;
  }

  .variant-btn {
    min-width: 40px;

    &.active {
      background-color: #343a40;
      color: white;
    }
  }

  .quantity-selector {
    max-width: 150px;

    input[type='number'] {
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .wishlist-btn {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      color: #e3342f;
      border-color: #e3342f;

      i {
        color: #e3342f;
      }
    }
  }

  .product-tag {
    color: #6c757d;
  }

  .social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f8f9fa;
    color: #495057;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background-color: #e9ecef;
      color: #212529;
      transform: translateY(-2px);
    }

    i {
      font-size: 1rem;
    }

    &:first-of-type:hover {
      background-color: #3b5998;
      color: white;
    }

    &:nth-of-type(2):hover {
      background-color: #000000;
      color: white;
    }

    &:nth-of-type(3):hover {
      background-color: #e60023;
      color: white;
    }

    &:nth-of-type(4):hover {
      background: linear-gradient(
        45deg,
        #405de6,
        #5851db,
        #833ab4,
        #c13584,
        #e1306c,
        #fd1d1d
      );
      color: white;
    }
  }

  .product-tabs {
    .nav-tabs {
      border-bottom: none;

      .nav-link {
        border: none;
        font-weight: 600;
        padding: 1rem 1.5rem;
        color: #6c757d;

        &.active {
          color: #343a40;
          border-bottom: 2px solid var(--bs-primary);
        }
      }
    }

    .tab-content {
      border-radius: 0 0 0.5rem 0.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
  }

  @media (max-width: 768px) {
    .product-tabs {
      .nav-link {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }
    }
  }
</style>
