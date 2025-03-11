<template>
  <div class="checkout-view">
    <div class="container py-5">
      <h1 class="section-title mb-4">Checkout</h1>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="cartItems.length === 0" class="text-center py-5">
        <div class="empty-checkout mb-4">
          <i class="bi bi-cart-x display-1 text-muted"></i>
          <h2 class="mt-3">Your cart is empty</h2>
          <p class="text-muted mb-4">
            You need to add some items to your cart before checking out.
          </p>
        </div>
        <router-link to="/products" class="btn btn-summer btn-lg"
          >Start Shopping</router-link
        >
      </div>

      <div v-else class="row">
        <div class="col-lg-8 mb-4 mb-lg-0">
          <div class="checkout-steps">
            <!-- Checkout Progress -->
            <div class="checkout-progress mb-4">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar bg-summer"
                  role="progressbar"
                  :style="`width: ${(currentStep / 3) * 100}%`"
                  aria-valuenow="33"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <div
                  class="step-item"
                  :class="{
                    active: currentStep >= 1,
                    completed: currentStep > 1,
                  }"
                >
                  <div class="step-circle">1</div>
                  <div class="step-label">Shipping</div>
                </div>
                <div
                  class="step-item"
                  :class="{
                    active: currentStep >= 2,
                    completed: currentStep > 2,
                  }"
                >
                  <div class="step-circle">2</div>
                  <div class="step-label">Payment</div>
                </div>
                <div
                  class="step-item"
                  :class="{
                    active: currentStep >= 3,
                    completed: currentStep > 3,
                  }"
                >
                  <div class="step-circle">3</div>
                  <div class="step-label">Review</div>
                </div>
              </div>
            </div>

            <!-- Step 1: Shipping Information -->
            <div
              v-if="currentStep === 1"
              class="checkout-form bg-white rounded shadow-sm p-4"
            >
              <h4 class="mb-4">Shipping Information</h4>

              <form @submit.prevent="goToStep(2)">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label"
                      >First Name *</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="shippingInfo.firstName"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="shippingInfo.lastName"
                      required
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email Address *</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="shippingInfo.email"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="shippingInfo.phone"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="address" class="form-label"
                    >Street Address *</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="shippingInfo.address"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="addressLine2" class="form-label"
                    >Apartment, Suite, etc. (optional)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="addressLine2"
                    v-model="shippingInfo.addressLine2"
                  />
                </div>

                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label for="city" class="form-label">City *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="city"
                      v-model="shippingInfo.city"
                      required
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="state" class="form-label"
                      >State/Province *</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="state"
                      v-model="shippingInfo.state"
                      required
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="zipCode" class="form-label"
                      >Zip/Postal Code *</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="zipCode"
                      v-model="shippingInfo.zipCode"
                      required
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="country" class="form-label">Country *</label>
                  <select
                    class="form-select"
                    id="country"
                    v-model="shippingInfo.country"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="saveInfo"
                    v-model="shippingInfo.saveInfo"
                  />
                  <label class="form-check-label" for="saveInfo"
                    >Save this information for next time</label
                  >
                </div>

                <div class="mb-3">
                  <h5 class="mb-3">Shipping Method</h5>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="shippingMethod"
                      id="standardShipping"
                      value="standard"
                      v-model="shippingInfo.shippingMethod"
                      checked
                    />
                    <label
                      class="form-check-label d-flex justify-content-between w-100"
                      for="standardShipping"
                    >
                      <span>Standard Shipping (3-5 business days)</span>
                      <span>{{ cartSubtotal >= 50 ? "Free" : "$5.99" }}</span>
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="shippingMethod"
                      id="expressShipping"
                      value="express"
                      v-model="shippingInfo.shippingMethod"
                    />
                    <label
                      class="form-check-label d-flex justify-content-between w-100"
                      for="expressShipping"
                    >
                      <span>Express Shipping (1-2 business days)</span>
                      <span>$12.99</span>
                    </label>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <router-link to="/cart" class="btn btn-outline-dark">
                    <i class="bi bi-arrow-left me-2"></i> Back to Cart
                  </router-link>
                  <button type="submit" class="btn btn-summer">
                    Continue to Payment <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </form>
            </div>

            <!-- Step 2: Payment Information -->
            <div
              v-if="currentStep === 2"
              class="checkout-form bg-white rounded shadow-sm p-4"
            >
              <h4 class="mb-4">Payment Information</h4>

              <form @submit.prevent="goToStep(3)">
                <div class="mb-4">
                  <h5 class="mb-3">Payment Method</h5>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="creditCard"
                      v-model="paymentInfo.method"
                      checked
                    />
                    <label class="form-check-label" for="creditCard">
                      Credit / Debit Card
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      value="paypal"
                      v-model="paymentInfo.method"
                    />
                    <label class="form-check-label" for="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                <div v-if="paymentInfo.method === 'creditCard'">
                  <div class="mb-3">
                    <label for="cardName" class="form-label"
                      >Name on Card *</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="cardName"
                      v-model="paymentInfo.cardName"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="cardNumber" class="form-label"
                      >Card Number *</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="cardNumber"
                      v-model="paymentInfo.cardNumber"
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                    />
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="expiryDate" class="form-label"
                        >Expiry Date *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="expiryDate"
                        v-model="paymentInfo.expiryDate"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="cvv" class="form-label">CVV *</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cvv"
                        v-model="paymentInfo.cvv"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div
                  v-if="paymentInfo.method === 'paypal'"
                  class="text-center py-4"
                >
                  <p class="mb-3">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <img
                    src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png"
                    alt="PayPal Checkout"
                    class="img-fluid"
                    style="max-width: 250px"
                  />
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="savePayment"
                    v-model="paymentInfo.savePayment"
                  />
                  <label class="form-check-label" for="savePayment"
                    >Save this payment method for future purchases</label
                  >
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="billingAddress"
                    v-model="paymentInfo.sameAsShipping"
                  />
                  <label class="form-check-label" for="billingAddress"
                    >Billing address same as shipping address</label
                  >
                </div>

                <div v-if="!paymentInfo.sameAsShipping">
                  <h5 class="mb-3 mt-4">Billing Address</h5>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="billingFirstName" class="form-label"
                        >First Name *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="billingFirstName"
                        v-model="paymentInfo.billingFirstName"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="billingLastName" class="form-label"
                        >Last Name *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="billingLastName"
                        v-model="paymentInfo.billingLastName"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="billingAddress" class="form-label"
                      >Street Address *</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="billingAddress"
                      v-model="paymentInfo.billingAddress"
                      required
                    />
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label for="billingCity" class="form-label">City *</label>
                      <input
                        type="text"
                        class="form-control"
                        id="billingCity"
                        v-model="paymentInfo.billingCity"
                        required
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="billingState" class="form-label"
                        >State/Province *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="billingState"
                        v-model="paymentInfo.billingState"
                        required
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="billingZipCode" class="form-label"
                        >Zip/Postal Code *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="billingZipCode"
                        v-model="paymentInfo.billingZipCode"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="billingCountry" class="form-label"
                      >Country *</label
                    >
                    <select
                      class="form-select"
                      id="billingCountry"
                      v-model="paymentInfo.billingCountry"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    class="btn btn-outline-dark"
                    @click="goToStep(1)"
                  >
                    <i class="bi bi-arrow-left me-2"></i> Back to Shipping
                  </button>
                  <button type="submit" class="btn btn-summer">
                    Review Order <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </form>
            </div>

            <!-- Step 3: Order Review -->
            <div
              v-if="currentStep === 3"
              class="checkout-form bg-white rounded shadow-sm p-4"
            >
              <h4 class="mb-4">Review Your Order</h4>

              <div class="order-summary mb-4">
                <h5 class="mb-3">Order Items</h5>
                <div class="order-items">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="order-item d-flex align-items-center py-2 border-bottom"
                  >
                    <div class="order-item-img me-3">
                      <img
                        :src="item.product.images[0]"
                        :alt="item.product.name"
                        class="img-fluid rounded"
                      />
                    </div>
                    <div class="order-item-details flex-grow-1">
                      <h6 class="mb-0">{{ item.product.name }}</h6>
                      <p class="mb-0 text-muted small">
                        <span v-if="item.variant"
                          >{{ item.variant.name }} |
                        </span>
                        Qty: {{ item.quantity }}
                      </p>
                    </div>
                    <div class="order-item-price">
                      <span>${{ calculateItemTotal(item).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-md-6 mb-3 mb-md-0">
                  <div class="shipping-summary p-3 border rounded">
                    <div class="d-flex justify-content-between mb-2">
                      <h6 class="mb-0">Shipping Address</h6>
                      <button
                        type="button"
                        class="btn btn-sm btn-link p-0"
                        @click="goToStep(1)"
                      >
                        Edit
                      </button>
                    </div>
                    <p class="mb-0">
                      {{ shippingInfo.firstName }} {{ shippingInfo.lastName
                      }}<br />
                      {{ shippingInfo.address }}<br />
                      <span v-if="shippingInfo.addressLine2"
                        >{{ shippingInfo.addressLine2 }}<br
                      /></span>
                      {{ shippingInfo.city }}, {{ shippingInfo.state }}
                      {{ shippingInfo.zipCode }}<br />
                      {{ getCountryName(shippingInfo.country) }}
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="payment-summary p-3 border rounded">
                    <div class="d-flex justify-content-between mb-2">
                      <h6 class="mb-0">Payment Method</h6>
                      <button
                        type="button"
                        class="btn btn-sm btn-link p-0"
                        @click="goToStep(2)"
                      >
                        Edit
                      </button>
                    </div>
                    <p class="mb-0" v-if="paymentInfo.method === 'creditCard'">
                      {{ paymentInfo.cardName }}<br />
                      **** **** **** {{ paymentInfo.cardNumber.slice(-4)
                      }}<br />
                      Expires: {{ paymentInfo.expiryDate }}
                    </p>
                    <p class="mb-0" v-else>PayPal</p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  @click="goToStep(2)"
                >
                  <i class="bi bi-arrow-left me-2"></i> Back to Payment
                </button>
                <button
                  type="button"
                  class="btn btn-summer"
                  @click="placeOrder"
                >
                  Place Order <i class="bi bi-check2-circle ms-2"></i>
                </button>
              </div>
            </div>

            <!-- Order Confirmation -->
            <div
              v-if="currentStep === 4"
              class="checkout-form bg-white rounded shadow-sm p-4 text-center"
            >
              <div class="order-confirmation">
                <div class="confirmation-icon mb-3">
                  <i class="bi bi-check-circle-fill text-success display-1"></i>
                </div>
                <h3 class="mb-3">Thank You for Your Order!</h3>
                <p class="mb-4">
                  Your order has been placed and will be processed soon.
                </p>
                <div class="order-number mb-4">
                  <p class="mb-1">Order Number:</p>
                  <h5>{{ orderNumber }}</h5>
                </div>
                <p class="mb-4">
                  A confirmation email has been sent to
                  <strong>{{ shippingInfo.email }}</strong>
                </p>
                <router-link to="/" class="btn btn-summer">
                  Continue Shopping
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4" v-if="currentStep < 4">
          <div class="order-summary bg-white rounded shadow-sm p-4">
            <h4 class="mb-4">Order Summary</h4>

            <div class="order-items mb-4">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="order-item d-flex py-2 border-bottom"
              >
                <div class="order-item-img me-3">
                  <img
                    :src="item.product.images[0]"
                    :alt="item.product.name"
                    class="img-fluid rounded"
                  />
                </div>
                <div class="order-item-details flex-grow-1">
                  <h6 class="mb-0">{{ item.product.name }}</h6>
                  <p class="mb-0 text-muted small">Qty: {{ item.quantity }}</p>
                </div>
                <div class="order-item-price">
                  <span>${{ calculateItemTotal(item).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${{ cartSubtotal.toFixed(2) }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{{
                shippingCost > 0 ? "$" + shippingCost.toFixed(2) : "Free"
              }}</span>
            </div>

            <div
              v-if="discount > 0"
              class="d-flex justify-content-between mb-2 text-success"
            >
              <span>Discount</span>
              <span>-${{ discount.toFixed(2) }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span>Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>

            <hr />

            <div class="d-flex justify-content-between mb-0">
              <span class="fw-bold">Total</span>
              <span class="fw-bold fs-5">${{ orderTotal.toFixed(2) }}</span>
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
import { useRouter } from "vue-router";

export default {
  name: "CheckoutView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(true);
    const currentStep = ref(1);
    const discount = ref(0);
    const tax = ref(0);
    const orderNumber = ref("");

    // Shipping information
    const shippingInfo = ref({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      saveInfo: false,
      shippingMethod: "standard",
    });

    // Payment information
    const paymentInfo = ref({
      method: "creditCard",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      savePayment: false,
      sameAsShipping: true,
      billingFirstName: "",
      billingLastName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      billingCountry: "",
    });

    // Initialize store and load cart
    onMounted(() => {
      loading.value = true;
      store.dispatch("initializeStore").then(() => {
        loading.value = false;

        // Calculate tax
        calculateTax();

        // Redirect to cart if cart is empty
        if (cartItems.value.length === 0) {
          router.push("/cart");
        }
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

    // Calculate shipping cost based on method
    const shippingCost = computed(() => {
      if (shippingInfo.value.shippingMethod === "standard") {
        return cartSubtotal.value >= 50 ? 0 : 5.99;
      } else {
        return 12.99;
      }
    });

    // Calculate order total
    const orderTotal = computed(() => {
      return (
        cartSubtotal.value + shippingCost.value + tax.value - discount.value
      );
    });

    // Calculate tax (simplified as 8.25% of subtotal)
    const calculateTax = () => {
      tax.value = cartSubtotal.value * 0.0825;
    };

    // Calculate total for a specific item
    const calculateItemTotal = (item) => {
      const price = item.product.salePrice || item.product.price;
      return price * item.quantity;
    };

    // Get country name from country code
    const getCountryName = (countryCode) => {
      const countries = {
        US: "United States",
        CA: "Canada",
        UK: "United Kingdom",
        AU: "Australia",
        DE: "Germany",
        FR: "France",
      };
      return countries[countryCode] || countryCode;
    };

    // Navigate to step
    const goToStep = (step) => {
      currentStep.value = step;
      window.scrollTo(0, 0);
    };

    // Place order
    const placeOrder = () => {
      // Generate random order number
      orderNumber.value = "ORD-" + Math.floor(100000 + Math.random() * 900000);

      // Clear cart
      store.dispatch("clearCart");

      // Show confirmation
      currentStep.value = 4;
      window.scrollTo(0, 0);
    };

    // Update tax when subtotal or shipping method changes
    watch([cartSubtotal, () => shippingInfo.value.shippingMethod], () => {
      calculateTax();
    });

    // Copy shipping info to billing info when sameAsShipping changes
    watch(
      () => paymentInfo.value.sameAsShipping,
      (newValue) => {
        if (newValue) {
          // Billing address same as shipping address
          paymentInfo.value.billingFirstName = shippingInfo.value.firstName;
          paymentInfo.value.billingLastName = shippingInfo.value.lastName;
          paymentInfo.value.billingAddress = shippingInfo.value.address;
          paymentInfo.value.billingCity = shippingInfo.value.city;
          paymentInfo.value.billingState = shippingInfo.value.state;
          paymentInfo.value.billingZipCode = shippingInfo.value.zipCode;
          paymentInfo.value.billingCountry = shippingInfo.value.country;
        }
      }
    );

    return {
      loading,
      currentStep,
      shippingInfo,
      paymentInfo,
      cartItems,
      cartSubtotal,
      shippingCost,
      discount,
      tax,
      orderTotal,
      orderNumber,
      calculateItemTotal,
      getCountryName,
      goToStep,
      placeOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkout-progress {
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33.333%;
    position: relative;

    .step-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #e9ecef;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    }

    .step-label {
      font-size: 0.875rem;
      color: #6c757d;
      transition: all 0.3s ease;
    }

    &.active {
      .step-circle {
        background-color: var(--bs-primary);
        color: white;
      }

      .step-label {
        color: #343a40;
        font-weight: 600;
      }
    }

    &.completed {
      .step-circle {
        background-color: #28a745;
        color: white;
      }
    }
  }
}

.order-item-img {
  width: 60px;
  height: 60px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.confirmation-icon {
  i {
    opacity: 0.9;
  }
}

@media (max-width: 768px) {
  .checkout-progress {
    .step-item {
      .step-circle {
        width: 25px;
        height: 25px;
        font-size: 0.875rem;
      }

      .step-label {
        font-size: 0.75rem;
      }
    }
  }
}
</style>
