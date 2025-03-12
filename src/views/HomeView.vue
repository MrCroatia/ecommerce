<template>
  <div class="home">
    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-summer" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading products...</p>
    </div>
    <!-- Error Message -->
    <div v-else-if="error" class="alert alert-danger my-4 container">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-3" @click="retryLoading">
        Retry
      </button>
    </div>
    <!-- Main Content -->
    <div v-else>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="container">
            <div class="row align-items-center min-vh-75">
              <div class="col-lg-6 py-5">
                <h1 class="display-4 fw-bold mb-4">
                  Summer Essentials for Your Perfect Season
                </h1>
                <p class="lead mb-4">
                  Discover our collection of high-quality summer products designed
                  to make your season unforgettable.
                </p>
                <div class="hero-buttons d-flex gap-3">
                  <router-link to="/products" class="btn btn-lg btn-summer">Shop Now</router-link>
                  <router-link to="/category/sale" class="btn btn-lg btn-outline-dark">View Sale</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Categories Section -->
      <section class="py-5">
        <div class="container">
          <h2 class="section-title mb-4">Shop by Category</h2>
          <div class="row g-4">
            <div v-for="category in categories" :key="category.id" class="col-6 col-md-4">
              <router-link :to="`/category/${category.slug}`" class="text-decoration-none">
                <div class="category-card">
                  <div class="category-img-container">
                    <img :src="category.image" :alt="category.name" class="img-fluid category-img" />
                  </div>
                  <div class="category-overlay">
                    <h3 class="category-title">{{ category.name }}</h3>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- Featured Products Section -->
      <section class="py-5 bg-light">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="section-title mb-0">Featured Products</h2>
            <router-link to="/products" class="btn btn-outline-dark">View All</router-link>
          </div>
          <div class="row g-4">
            <div v-for="product in featuredProducts" :key="product.id" class="col-6 col-md-4 col-lg-3">
              <product-card :product="product" />
            </div>
          </div>
        </div>
      </section>
      <!-- New Arrivals Section -->
      <section class="py-5">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="section-title mb-0">New Arrivals</h2>
            <router-link to="/products?sort=newest" class="btn btn-outline-dark">View All</router-link>
          </div>
          <div class="row g-4">
            <div v-for="product in newArrivals" :key="product.id" class="col-6 col-md-4 col-lg-3">
              <product-card :product="product" />
            </div>
          </div>
        </div>
      </section>
      <!-- Summer Sale Banner -->
      <section class="py-5 bg-summer-gradient text-white">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 py-4">
              <h2 class="display-5 fw-bold mb-3">Summer Sale is On!</h2>
              <p class="lead mb-4">
                Up to 40% off on selected summer essentials. Limited time offer.
              </p>
              <router-link to="/category/sale" class="btn btn-light btn-lg">Shop the Sale</router-link>
            </div>
            <div class="col-lg-5 d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Summer Sale"
                class="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
      <!-- Testimonials Section -->
      <section class="py-5">
        <div class="container">
          <h2 class="section-title text-center mb-5">What Our Customers Say</h2>
          <div class="row justify-content-center">
            <div class="col-md-4 mb-4 mb-md-0">
              <div class="testimonial-card p-4 h-100">
                <div class="d-flex align-items-center mb-3">
                  <div class="testimonial-rating me-2">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                  </div>
                  <span class="fw-bold">5.0</span>
                </div>
                <p class="testimonial-text mb-4">
                  "The quality of the swimwear I purchased exceeded my
                  expectations. The fabric is durable yet comfortable, and the
                  design is even more vibrant in person!"
                </p>
                <div class="testimonial-author">
                  <h6 class="mb-0">Sarah Johnson</h6>
                  <small class="text-muted">Verified Buyer</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Instagram Feed Section -->
      <section class="py-5 bg-light">
        <div class="container">
          <h2 class="section-title text-center mb-4">Follow Us on Instagram</h2>
          <p class="text-center mb-5">
            Tag your photos with #SummerShopStyle for a chance to be featured
          </p>
          <div class="row g-2">
            <div class="col-4 col-md-2">
              <div class="instagram-item">
                <img
                  src="https://picsum.photos/id/1004/500/500"
                  alt="Instagram Post"
                  class="img-fluid"
                />
              </div>
            </div>
            <!-- Add more Instagram posts as needed -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/products/ProductCard.vue';
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const error = ref(null);

    onMounted(() => {
      loading.value = true;
      store.dispatch('initializeStore')
        .then(() => {
          loading.value = false;
        })
        .catch(err => {
          console.error('Error initializing store:', err);
          error.value = 'Failed to load data.';
          loading.value = false;
        });
    });

    const categories = computed(() => {
      return store.getters.allCategories;
    });

    const featuredProducts = computed(() => {
      return store.getters.allProducts.filter(product => product.featured);
    });

    const newArrivals = computed(() => {
      return store.getters.allProducts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
    });

    const retryLoading = () => {
      loading.value = true;
      error.value = null;
      store.dispatch('initializeStore')
        .then(() => {
          loading.value = false;
        })
        .catch(err => {
          console.error('Error initializing store:', err);
          error.value = 'Failed to load data.';
          loading.value = false;
        });
    };

    return {
      categories,
      featuredProducts,
      newArrivals,
      loading,
      error,
      retryLoading,
    };
  },
};
</script>
