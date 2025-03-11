<template>
  <div class="contact-view">
    <div class="container py-5">
      <h1 class="section-title text-center mb-5">Contact Us</h1>

      <div class="row">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="contact-info bg-white rounded shadow-sm p-4 h-100">
            <h4 class="mb-4">Get In Touch</h4>

            <div class="contact-method mb-4">
              <div class="d-flex align-items-center mb-3">
                <div class="contact-icon me-3">
                  <i class="bi bi-geo-alt-fill text-summer fs-4"></i>
                </div>
                <div>
                  <h5 class="mb-0">Our Location</h5>
                </div>
              </div>
              <p class="mb-0 ms-5">
                123 Summer Street<br />Beach City, CA 90210<br />United States
              </p>
            </div>

            <div class="contact-method mb-4">
              <div class="d-flex align-items-center mb-3">
                <div class="contact-icon me-3">
                  <i class="bi bi-telephone-fill text-summer fs-4"></i>
                </div>
                <div>
                  <h5 class="mb-0">Phone Number</h5>
                </div>
              </div>
              <p class="mb-0 ms-5">+1 (800) 123-4567<br />+1 (800) 765-4321</p>
            </div>

            <div class="contact-method mb-4">
              <div class="d-flex align-items-center mb-3">
                <div class="contact-icon me-3">
                  <i class="bi bi-envelope-fill text-summer fs-4"></i>
                </div>
                <div>
                  <h5 class="mb-0">Email Address</h5>
                </div>
              </div>
              <p class="mb-0 ms-5">
                info@summershop.com<br />support@summershop.com
              </p>
            </div>

            <div class="contact-method">
              <div class="d-flex align-items-center mb-3">
                <div class="contact-icon me-3">
                  <i class="bi bi-clock-fill text-summer fs-4"></i>
                </div>
                <div>
                  <h5 class="mb-0">Working Hours</h5>
                </div>
              </div>
              <p class="mb-0 ms-5">
                Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM<br />Sunday:
                Closed
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="contact-form bg-white rounded shadow-sm p-4">
            <h4 class="mb-4">Send Us a Message</h4>

            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">Your Name *</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email Address *</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="subject" class="form-label">Subject *</label>
                <input
                  type="text"
                  class="form-control"
                  id="subject"
                  v-model="form.subject"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">Message *</label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="5"
                  v-model="form.message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-summer"
                :disabled="submitting"
              >
                <span v-if="submitting">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </span>
                <span v-else>Send Message</span>
              </button>

              <div v-if="formSubmitted" class="alert alert-success mt-3">
                Thank you for your message! We'll get back to you soon.
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="map-container mt-5 rounded overflow-hidden shadow-sm">
        <div class="ratio ratio-21x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355529052!2d-118.69192051422897!3d34.02073049448939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1647359631486!5m2!1sen!2s"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          >
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ContactView",
  setup() {
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const submitting = ref(false);
    const formSubmitted = ref(false);

    const submitForm = () => {
      submitting.value = true;

      // Simulate form submission
      setTimeout(() => {
        submitting.value = false;
        formSubmitted.value = true;

        // Reset form
        form.value = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSubmitted.value = false;
        }, 5000);
      }, 1500);
    };

    return {
      form,
      submitting,
      formSubmitted,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-container {
  border: 1px solid #dee2e6;
}
</style>
