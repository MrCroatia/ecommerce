<template>
  <div class="account-view">
    <div class="container py-5">
      <h1 class="section-title mb-4">My Account</h1>

      <div v-if="!isLoggedIn" class="row justify-content-center">
        <div class="col-md-6">
          <div class="account-tabs mb-4">
            <ul class="nav nav-tabs" id="accountTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                  role="tab"
                  aria-controls="login"
                  aria-selected="true"
                >
                  Login
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="register-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#register"
                  type="button"
                  role="tab"
                  aria-controls="register"
                  aria-selected="false"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content" id="accountTabsContent">
            <!-- Login Form -->
            <div
              class="tab-pane fade show active"
              id="login"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <div class="account-form bg-white rounded shadow-sm p-4">
                <h4 class="mb-4">Login to Your Account</h4>

                <form @submit.prevent="login">
                  <div class="mb-3">
                    <label for="loginEmail" class="form-label"
                      >Email Address *</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="loginEmail"
                      v-model="loginForm.email"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="loginPassword" class="form-label"
                      >Password *</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="loginPassword"
                      v-model="loginForm.password"
                      required
                    />
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="rememberMe"
                      v-model="loginForm.rememberMe"
                    />
                    <label class="form-check-label" for="rememberMe"
                      >Remember me</label
                    >
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <button
                      type="submit"
                      class="btn btn-summer"
                      :disabled="loggingIn"
                    >
                      <span v-if="loggingIn">
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Logging in...
                      </span>
                      <span v-else>Login</span>
                    </button>
                    <a href="#" class="text-decoration-none"
                      >Forgot Password?</a
                    >
                  </div>

                  <div v-if="loginError" class="alert alert-danger">
                    {{ loginError }}
                  </div>
                </form>
              </div>
            </div>

            <!-- Register Form -->
            <div
              class="tab-pane fade"
              id="register"
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              <div class="account-form bg-white rounded shadow-sm p-4">
                <h4 class="mb-4">Create an Account</h4>

                <form @submit.prevent="register">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName" class="form-label"
                        >First Name *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        v-model="registerForm.firstName"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName" class="form-label"
                        >Last Name *</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="registerForm.lastName"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="registerEmail" class="form-label"
                      >Email Address *</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="registerEmail"
                      v-model="registerForm.email"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="registerPassword" class="form-label"
                      >Password *</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="registerPassword"
                      v-model="registerForm.password"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="confirmPassword" class="form-label"
                      >Confirm Password *</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      v-model="registerForm.confirmPassword"
                      required
                    />
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="agreeTerms"
                      v-model="registerForm.agreeTerms"
                      required
                    />
                    <label class="form-check-label" for="agreeTerms"
                      >I agree to the
                      <a href="#" class="text-decoration-none"
                        >Terms of Service</a
                      >
                      and
                      <a href="#" class="text-decoration-none"
                        >Privacy Policy</a
                      ></label
                    >
                  </div>

                  <button
                    type="submit"
                    class="btn btn-summer"
                    :disabled="registering"
                  >
                    <span v-if="registering">
                      <span
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating Account...
                    </span>
                    <span v-else>Register</span>
                  </button>

                  <div v-if="registerError" class="alert alert-danger mt-3">
                    {{ registerError }}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="row">
        <div class="col-lg-3 mb-4 mb-lg-0">
          <div class="account-sidebar bg-white rounded shadow-sm p-4">
            <div class="account-user mb-4 text-center">
              <div class="account-avatar mb-3">
                <img
                  src="https://via.placeholder.com/80"
                  alt="User Avatar"
                  class="rounded-circle"
                />
              </div>
              <h5 class="mb-1">{{ user.firstName }} {{ user.lastName }}</h5>
              <p class="text-muted mb-0">{{ user.email }}</p>
            </div>

            <div class="account-nav">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    href="#"
                    @click.prevent="setActiveTab('dashboard')"
                  >
                    <i class="bi bi-speedometer2 me-2"></i> Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click.prevent="setActiveTab('orders')"
                  >
                    <i class="bi bi-bag me-2"></i> Orders
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click.prevent="setActiveTab('wishlist')"
                  >
                    <i class="bi bi-heart me-2"></i> Wishlist
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click.prevent="setActiveTab('addresses')"
                  >
                    <i class="bi bi-geo-alt me-2"></i> Addresses
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click.prevent="setActiveTab('account-details')"
                  >
                    <i class="bi bi-person me-2"></i> Account Details
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-danger"
                    href="#"
                    @click.prevent="logout"
                  >
                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="account-content bg-white rounded shadow-sm p-4">
            <!-- Dashboard Tab -->
            <div v-if="activeTab === 'dashboard'">
              <h4 class="mb-4">Dashboard</h4>

              <p>
                Hello, <strong>{{ user.firstName }}</strong
                >! From your account dashboard you can view your recent orders,
                manage your shipping and billing addresses, and edit your
                password and account details.
              </p>

              <div class="row g-4 mt-3">
                <div class="col-md-4">
                  <div class="dashboard-card border rounded p-3 text-center">
                    <div class="dashboard-icon mb-3">
                      <i class="bi bi-bag fs-1 text-summer"></i>
                    </div>
                    <h5>Orders</h5>
                    <p class="mb-0">You have {{ orders.length }} order(s)</p>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="dashboard-card border rounded p-3 text-center">
                    <div class="dashboard-icon mb-3">
                      <i class="bi bi-heart fs-1 text-summer"></i>
                    </div>
                    <h5>Wishlist</h5>
                    <p class="mb-0">{{ wishlistCount }} item(s) in wishlist</p>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="dashboard-card border rounded p-3 text-center">
                    <div class="dashboard-icon mb-3">
                      <i class="bi bi-geo-alt fs-1 text-summer"></i>
                    </div>
                    <h5>Addresses</h5>
                    <p class="mb-0">
                      You have {{ addresses.length }} saved address(es)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Orders Tab -->
            <div v-if="activeTab === 'orders'">
              <h4 class="mb-4">My Orders</h4>

              <div v-if="orders.length === 0" class="text-center py-4">
                <div class="empty-orders mb-3">
                  <i class="bi bi-bag-x display-1 text-muted"></i>
                  <h5 class="mt-3">No Orders Found</h5>
                  <p class="text-muted">You haven't placed any orders yet.</p>
                </div>
                <router-link to="/products" class="btn btn-summer"
                  >Start Shopping</router-link
                >
              </div>

              <div v-else class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.id">
                      <td>#{{ order.number }}</td>
                      <td>{{ formatDate(order.date) }}</td>
                      <td>
                        <span :class="getStatusClass(order.status)">{{
                          order.status
                        }}</span>
                      </td>
                      <td>${{ order.total.toFixed(2) }}</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Other tabs would be implemented similarly -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "AccountView",
  setup() {
    const store = useStore();
    const isLoggedIn = ref(false);
    const activeTab = ref("dashboard");
    const loginError = ref("");
    const registerError = ref("");
    const loggingIn = ref(false);
    const registering = ref(false);

    // Login form
    const loginForm = ref({
      email: "",
      password: "",
      rememberMe: false,
    });

    // Register form
    const registerForm = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });

    // User data (would come from API in a real app)
    const user = ref({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });

    // Mock data for orders
    const orders = ref([
      {
        id: 1,
        number: "ORD-123456",
        date: new Date("2023-05-15"),
        status: "Completed",
        total: 129.99,
      },
      {
        id: 2,
        number: "ORD-123457",
        date: new Date("2023-06-20"),
        status: "Processing",
        total: 79.5,
      },
    ]);

    // Mock data for addresses
    const addresses = ref([
      {
        id: 1,
        type: "Shipping",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        city: "Beach City",
        state: "CA",
        zipCode: "90210",
        country: "US",
      },
    ]);

    // Get wishlist count from store
    const wishlistCount = ref(store.state.wishlist.length);

    // Set active tab
    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    // Format date
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Get status class
    const getStatusClass = (status) => {
      switch (status) {
        case "Completed":
          return "badge bg-success";
        case "Processing":
          return "badge bg-primary";
        case "On Hold":
          return "badge bg-warning text-dark";
        case "Cancelled":
          return "badge bg-danger";
        default:
          return "badge bg-secondary";
      }
    };

    // Login function
    const login = () => {
      loggingIn.value = true;
      loginError.value = "";

      // Simulate API call
      setTimeout(() => {
        loggingIn.value = false;

        // For demo purposes, always log in successfully with any credentials
        isLoggedIn.value = true;
      }, 1500);
    };

    // Register function
    const register = () => {
      registering.value = true;
      registerError.value = "";

      // Check if passwords match
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        registerError.value = "Passwords do not match";
        registering.value = false;
        return;
      }

      // Simulate API call
      setTimeout(() => {
        registering.value = false;

        // For demo purposes, always register successfully
        isLoggedIn.value = true;
        user.value = {
          firstName: registerForm.value.firstName,
          lastName: registerForm.value.lastName,
          email: registerForm.value.email,
        };
      }, 1500);
    };

    // Logout function
    const logout = () => {
      isLoggedIn.value = false;

      // Reset forms
      loginForm.value = {
        email: "",
        password: "",
        rememberMe: false,
      };

      registerForm.value = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      };
    };

    return {
      isLoggedIn,
      activeTab,
      loginForm,
      registerForm,
      loginError,
      registerError,
      loggingIn,
      registering,
      user,
      orders,
      addresses,
      wishlistCount,
      setActiveTab,
      formatDate,
      getStatusClass,
      login,
      register,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.account-nav {
  .nav-link {
    color: #495057;
    padding: 0.5rem 0;

    &:hover {
      color: var(--bs-primary);
    }

    &.active {
      color: var(--bs-primary);
      font-weight: 500;
    }
  }
}

.dashboard-icon {
  i {
    opacity: 0.8;
  }
}

.empty-orders {
  i {
    opacity: 0.5;
  }
}
</style>
