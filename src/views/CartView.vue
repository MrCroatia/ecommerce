<template>
  <div class="cart-view">
    <div class="container py-5">
      <h1 class="section-title mb-4">Your Shopping Cart</h1>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="cartItems.length === 0" class="text-center py-5">
        <div class="empty-cart mb-4">
          <i class="bi bi-cart-x display-1 text-muted"></i>
          <h2 class="mt-3">Your cart is empty</h2>
          <p class="text-muted mb-4">
            Looks like you haven't added any products to your cart yet.
          </p>
        </div>
        <router-link to="/products" class="btn btn-summer btn-lg"
          >Start Shopping</router-link
        >
      </div>

      <div v-else class="row">
        <div class="col-lg-8 mb-4 mb-lg-0">
          <div class="cart-items bg-white rounded shadow-sm p-4">
            <div class="cart-header d-none d-md-flex border-bottom pb-3 mb-3">
              <div class="row w-100 align-items-center">
                <div class="col-md-6">
                  <h5 class="mb-0">Product</h5>
                </div>
                <div class="col-md-2 text-center">
                  <h5 class="mb-0">Price</h5>
                </div>
                <div class="col-md-2 text-center">
                  <h5 class="mb-0">Quantity</h5>
                </div>
                <div class="col-md-2 text-end">
                  <h5 class="mb-0">Total</h5>
                </div>
              </div>
            </div>

            <div
              v-for="item in cartItems"
              :key="item.id"
              class="cart-item py-3 border-bottom"
            >
              <div class="row align-items-center">
                <div class="col-md-6 mb-3 mb-md-0">
                  <div class="d-flex align-items-center">
                    <button
                      class="btn btn-sm btn-link text-danger me-2 p-0"
                      @click="removeFromCart(item.id)"
                      aria-label="Remove item"
                    >
                      <i class="bi bi-x-circle"></i>
                    </button>
                    <div class="cart-item-img me-3">
                      <img
                        :src="item.product.images[0]"
                        :alt="item.product.name"
                        class="img-fluid rounded"
                      />
                    </div>
                    <div class="cart-item-details">
                      <h6 class="mb-1">
                        <router-link
                          :to="`/product/${item.product.id}`"
                          class="text-decoration-none text-dark"
                        >
                          {{ item.product.name }}
                        </router-link>
                      </h6>
                      <p class="mb-0 text-muted small" v-if="item.variant">
                        Variant: {{ item.variant.name }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-2 text-md-center mb-2 mb-md-0">
                  <span class="d-inline d-md-none me-2">Price:</span>
                  <span v-if="item.product.salePrice" class="text-danger"
                    >${{ item.product.salePrice.toFixed(2) }}</span
                  >
                  <span v-else>${{ item.product.price.toFixed(2) }}</span>
                </div>

                <div class="col-6 col-md-2 text-md-center mb-2 mb-md-0">
                  <div
                    class="quantity-selector d-flex align-items-center justify-content-md-center"
                  >
                    <button
                      class="btn btn-sm btn-quantity"
                      @click="decrementQuantity(item.id)"
                      :disabled="item.quantity <= 1"
                      aria-label="Decrease quantity"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      class="form-control form-control-sm text-center mx-2 quantity-input"
                      :value="item.quantity"
                      min="1"
                      max="99"
                      @change="updateQuantity(item.id, $event.target.value)"
                    />
                    <button
                      class="btn btn-sm btn-quantity"
                      @click="incrementQuantity(item.id)"
                      :disabled="item.quantity >= 99"
                      aria-label="Increase quantity"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="col-md-2 text-md-end mt-2 mt-md-0">
                  <span class="d-inline d-md-none me-2">Total:</span>
                  <span class="fw-bold"
                    >${{ calculateItemTotal(item).toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>

            <div class="cart-actions d-flex justify-content-between mt-4">
              <router-link to="/products" class="btn btn-outline-dark">
                <i class="bi bi-arrow-left me-2"></i> Continue Shopping
              </router-link>
              <button class="btn btn-outline-danger" @click="clearCart">
                <i class="bi bi-trash me-2"></i> Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="cart-summary bg-white rounded shadow-sm p-4">
            <h4 class="mb-4">Order Summary</h4>

            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${{ cartSubtotal.toFixed(2) }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{{
                shipping > 0 ? "$" + shipping.toFixed(2) : "Free"
              }}</span>
            </div>

            <div
              v-if="discount > 0"
              class="d-flex justify-content-between mb-2 text-success"
            >
              <span>Discount</span>
              <span>-${{ discount.toFixed(2) }}</span>
            </div>

            <hr />

            <div class="d-flex justify-content-between mb-4">
              <span class="fw-bold">Total</span>
              <span class="fw-bold fs-5">${{ cartTotal.toFixed(2) }}</span>
            </div>

            <div class="promo-code mb-4">
              <label for="promoCode" class="form-label">Promo Code</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="promoCode"
                  placeholder="Enter code"
                />
                <button class="btn btn-outline-dark" type="button">
                  Apply
                </button>
              </div>
            </div>

            <router-link to="/checkout" class="btn btn-summer w-100">
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "CartView",
  setup() {
    const store = useStore();
    const loading = ref(true);
    const shipping = ref(0);
    const discount = ref(0);

    // Initialize store and load cart
    onMounted(() => {
      loading.value = true;
      store.dispatch("initializeStore").then(() => {
        loading.value = false;

        // Calculate shipping based on cart total
        calculateShipping();
      });
    });

    // Get cart items from store
    const cartItems = computed(() => {
      return store.getters.cartWithProducts;
    });

    // Calculate cart subtotal
    const cartSubtotal = computed(() => {
      return cartItems.value.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + price * item.quantity;
      }, 0);
    });

    // Calculate cart total
    const cartTotal = computed(() => {
      return cartSubtotal.value + shipping.value - discount.value;
    });

    // Calculate shipping based on cart subtotal
    const calculateShipping = () => {
      if (cartSubtotal.value >= 50) {
        shipping.value = 0; // Free shipping for orders over $50
      } else if (cartSubtotal.value > 0) {
        shipping.value = 5.99;
      } else {
        shipping.value = 0;
      }
    };

    // Calculate total for a specific item
    const calculateItemTotal = (item) => {
      const price = item.product.salePrice || item.product.price;
      return price * item.quantity;
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
      store.dispatch("removeFromCart", itemId).then(() => {
        calculateShipping();
      });
    };

    // Update item quantity
    const updateQuantity = (itemId, quantity) => {
      const qty = parseInt(quantity);
      if (qty >= 1 && qty <= 99) {
        store
          .dispatch("updateCartItemQuantity", { itemId, quantity: qty })
          .then(() => {
            calculateShipping();
          });
      }
    };

    // Increment item quantity
    const incrementQuantity = (itemId) => {
      const item = cartItems.value.find((item) => item.id === itemId);
      if (item && item.quantity < 99) {
        updateQuantity(itemId, item.quantity + 1);
      }
    };

    // Decrement item quantity
    const decrementQuantity = (itemId) => {
      const item = cartItems.value.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        updateQuantity(itemId, item.quantity - 1);
      }
    };

    // Clear cart
    const clearCart = () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        store.dispatch("clearCart").then(() => {
          calculateShipping();
        });
      }
    };

    return {
      loading,
      cartItems,
      cartSubtotal,
      cartTotal,
      shipping,
      discount,
      calculateItemTotal,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-item-img {
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.quantity-selector {
  .btn-quantity {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #212529;
    font-weight: bold;
    padding: 0;

    &:hover:not(:disabled) {
      background-color: #e9ecef;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    i {
      font-size: 1rem;
    }
  }

  .quantity-input {
    width: 50px;
    text-align: center;
    padding: 0.25rem;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.empty-cart {
  i {
    opacity: 0.3;
  }
}

@media (max-width: 768px) {
  .cart-item {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .quantity-selector {
    width: 100px;

    .btn {
      padding: 0.25rem 0.5rem;
    }

    input {
      width: 30px;
      padding: 0.25rem;
    }
  }
}
</style>
