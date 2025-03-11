<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div class="container">
        <!-- Logo -->
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <span class="fw-bold fs-4 text-summer">SummerShop</span>
        </router-link>

        <!-- Mobile Toggle Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/" active-class="active"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products" active-class="active"
                >Products</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item" to="/category/swimwear"
                    >Swimwear</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/category/sunglasses"
                    >Sunglasses</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/category/beach-accessories"
                    >Beach Accessories</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/category/summer-clothes"
                    >Summer Clothes</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link class="dropdown-item" to="/category/sale"
                    >Sale Items</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" active-class="active"
                >About</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact" active-class="active"
                >Contact</router-link
              >
            </li>
          </ul>

          <!-- Search Form -->
          <form class="d-flex me-3">
            <div class="input-group">
              <input
                class="form-control"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
              />
              <button class="btn btn-outline-primary" type="submit">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </form>

          <!-- Cart Button -->
          <div class="d-flex align-items-center">
            <router-link to="/wishlist" class="position-relative me-3">
              <i class="bi bi-heart fs-4"></i>
              <span
                v-if="wishlistCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ wishlistCount }}
              </span>
            </router-link>
            <router-link to="/cart" class="position-relative me-3">
              <i class="bi bi-cart3 fs-4"></i>
              <span
                v-if="cartItemCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartItemCount }}
              </span>
            </router-link>
            <router-link to="/account" class="text-dark">
              <i class="bi bi-person-circle fs-4"></i>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "HeaderComponent",
  setup() {
    const store = useStore();

    const cartItemCount = computed(() => {
      return store.getters.cartItemCount || 0;
    });

    const wishlistCount = computed(() => {
      return store.state.wishlist.length || 0;
    });

    return {
      cartItemCount,
      wishlistCount,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-weight: 700;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover,
  &.active {
    color: var(--bs-primary);
  }
}

.dropdown-item {
  &:hover,
  &:focus {
    background-color: rgba(255, 126, 95, 0.1);
  }
}
</style>
