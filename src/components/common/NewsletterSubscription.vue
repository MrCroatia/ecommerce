<template>
  <div class="newsletter-subscription py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h3 class="mb-3">Subscribe to Our Newsletter</h3>
          <p class="text-muted mb-4">
            Get the latest updates on new products, seasonal collections, and
            exclusive offers straight to your inbox.
          </p>

          <form @submit.prevent="subscribe" class="newsletter-form">
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Your email address"
                v-model="email"
                required
                aria-label="Email address"
                aria-describedby="subscribe-button"
              />
              <button
                class="btn btn-summer"
                type="submit"
                id="subscribe-button"
                :disabled="subscribing"
              >
                <span v-if="subscribing">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Subscribing...
                </span>
                <span v-else>Subscribe</span>
              </button>
            </div>

            <div class="form-check text-start ms-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="privacy-policy"
                v-model="agreeToPolicy"
                required
              />
              <label class="form-check-label small" for="privacy-policy">
                I agree to the
                <a href="#" class="text-decoration-none">Privacy Policy</a> and
                consent to receive marketing emails.
              </label>
            </div>
          </form>

          <div v-if="subscribed" class="alert alert-success mt-3">
            <i class="bi bi-check-circle-fill me-2"></i> Thank you for
            subscribing to our newsletter!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

vue
<script>
  import { ref } from 'vue';
  import { showToast } from '@/utils/notifications';
  export default {
    name: 'NewsletterSubscription',
    setup() {
      const email = ref('');
      const agreeToPolicy = ref(false);
      const subscribing = ref(false);
      const subscribed = ref(false);
      const subscribe = async () => {
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          showToast('Please enter a valid email address', 'danger');
          return;
        }
        subscribing.value = true;
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          subscribing.value = false;
          subscribed.value = true;
          email.value = '';
          agreeToPolicy.value = false;
          // Hide success message after 5 seconds
          setTimeout(() => {
            subscribed.value = false;
          }, 5000);
        } catch (error) {
          subscribing.value = false;
          showToast('Failed to subscribe. Please try again.', 'danger');
        }
      };
      return {
        email,
        agreeToPolicy,
        subscribing,
        subscribed,
        subscribe,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .newsletter-subscription {
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }

  .newsletter-form {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
