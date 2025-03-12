<template>
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container">
      <div class="row">
        <!-- Company Info -->
        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase mb-4">SummerShop</h5>
          <p class="small">
            Your one-stop destination for all summer essentials. Quality
            products for unforgettable summer experiences.
          </p>
          <div class="social-links mt-4">
            <a href="#" class="text-white me-3"
              ><i class="bi bi-facebook"></i
            ></a>
            <a href="#" class="text-white me-3"
              ><i class="bi bi-instagram"></i
            ></a>
            <a href="#" class="text-white me-3"
              ><i class="bi bi-twitter"></i
            ></a>
            <a href="#" class="text-white"><i class="bi bi-pinterest"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase mb-4">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-white text-decoration-none"
                >Home</router-link
              >
            </li>
            <li class="mb-2">
              <router-link
                to="/products"
                class="text-white text-decoration-none"
                >Shop All</router-link
              >
            </li>
            <li class="mb-2">
              <router-link
                to="/category/sale"
                class="text-white text-decoration-none"
                >Sale Items</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/about" class="text-white text-decoration-none"
                >About Us</router-link
              >
            </li>
            <li>
              <router-link to="/contact" class="text-white text-decoration-none"
                >Contact Us</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase mb-4">Categories</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link
                to="/category/swimwear"
                class="text-white text-decoration-none"
                >Swimwear</router-link
              >
            </li>
            <li class="mb-2">
              <router-link
                to="/category/sunglasses"
                class="text-white text-decoration-none"
                >Sunglasses</router-link
              >
            </li>
            <li class="mb-2">
              <router-link
                to="/category/beach-accessories"
                class="text-white text-decoration-none"
                >Beach Accessories</router-link
              >
            </li>
            <li class="mb-2">
              <router-link
                to="/category/summer-clothes"
                class="text-white text-decoration-none"
                >Summer Clothes</router-link
              >
            </li>
            <li>
              <router-link
                to="/category/sandals"
                class="text-white text-decoration-none"
                >Sandals & Footwear</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase mb-4">Stay Updated</h6>
          <p class="small">
            Subscribe to our newsletter for exclusive offers and summer
            inspiration
          </p>
          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Your email"
              aria-label="Your email"
            />
            <button class="btn btn-summer" type="button">Subscribe</button>
          </div>
          <p class="small text-muted mt-3">
            By subscribing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-top border-secondary pt-4 mt-4">
        <div class="row">
          <div class="col-md-6 text-center text-md-start">
            <p class="small mb-0">
              &copy; {{ currentYear }} SummerShop. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <a href="#" class="text-white small text-decoration-none"
                  >Terms of Use</a
                >
              </li>
              <li class="list-inline-item ms-3">
                <a href="#" class="text-white small text-decoration-none"
                  >Privacy Policy</a
                >
              </li>
              <li class="list-inline-item ms-3">
                <a href="#" class="text-white small text-decoration-none"
                  >Shipping Info</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'FooterComponent',
    computed: {
      currentYear() {
        return new Date().getFullYear();
      },
    },
  };
</script>

<style lang="scss" scoped>
  footer {
    a {
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    .social-links {
      a {
        font-size: 1.2rem;
      }
    }
  }
</style>
