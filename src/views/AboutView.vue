<template>
  <div class="about-view">
    <div class="container py-5">
      <h1 class="section-title text-center mb-5">About Us</h1>

      <!-- Company Introduction -->
      <div class="row mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img
            src="https://picsum.photos/id/1059/800/600"
            alt="Our Store"
            class="img-fluid rounded shadow-sm"
          />
        </div>
        <div class="col-lg-6">
          <h2 class="mb-4">Our Story</h2>
          <p class="lead">
            Welcome to Summer Shop, your destination for premium summer
            essentials.
          </p>
          <p>
            Founded in 2020, Summer Shop was born out of a passion for creating
            high-quality summer products that enhance your seasonal experiences.
            What started as a small beach boutique has grown into a beloved
            brand known for its commitment to quality, style, and
            sustainability.
          </p>
          <p>
            Our team carefully selects each product in our collection, ensuring
            that it meets our standards for durability, design, and
            eco-friendliness. We believe that summer essentials should be both
            beautiful and functional, enhancing your enjoyment of the season
            while minimizing environmental impact.
          </p>
        </div>
      </div>

      <!-- Our Mission -->
      <div class="bg-light p-5 rounded mb-5">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="mb-4">Our Mission</h2>
            <p class="lead">
              To provide high-quality, stylish summer products that enhance your
              seasonal experiences while promoting sustainability and
              environmental responsibility.
            </p>
          </div>
        </div>
      </div>

      <!-- Our Values -->
      <div class="row mb-5">
        <div class="col-12 text-center mb-4">
          <h2>Our Values</h2>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center p-4">
              <div class="value-icon mb-3">
                <i class="bi bi-star-fill fs-1 text-warning"></i>
              </div>
              <h3 class="card-title h5">Quality</h3>
              <p class="card-text">
                We never compromise on quality. Each product is carefully
                selected and tested to ensure it meets our high standards.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center p-4">
              <div class="value-icon mb-3">
                <i class="bi bi-tree-fill fs-1 text-success"></i>
              </div>
              <h3 class="card-title h5">Sustainability</h3>
              <p class="card-text">
                We're committed to reducing our environmental footprint through
                eco-friendly materials and responsible manufacturing.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center p-4">
              <div class="value-icon mb-3">
                <i class="bi bi-heart-fill fs-1 text-danger"></i>
              </div>
              <h3 class="card-title h5">Customer Focus</h3>
              <p class="card-text">
                Your satisfaction is our priority. We strive to provide
                exceptional products and service that exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Our Team -->
      <div class="row mb-5">
        <div class="col-12 text-center mb-4">
          <h2>Meet Our Team</h2>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm">
            <img
              src="https://picsum.photos/id/1012/500/500"
              class="card-img-top"
              alt="Team Member"
            />
            <div class="card-body text-center">
              <h5 class="card-title">Sarah Johnson</h5>
              <p class="card-text text-muted">Founder & CEO</p>
              <p class="card-text">
                With over 15 years in retail and product design, Sarah brings
                her passion for summer style to every aspect of the business.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm">
            <img
              src="https://picsum.photos/id/1025/500/500"
              class="card-img-top"
              alt="Team Member"
            />
            <div class="card-body text-center">
              <h5 class="card-title">Michael Chen</h5>
              <p class="card-text text-muted">Creative Director</p>
              <p class="card-text">
                Michael's eye for design and trend forecasting helps us create
                products that are both timeless and contemporary.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm">
            <img
              src="https://picsum.photos/id/1062/500/500"
              class="card-img-top"
              alt="Team Member"
            />
            <div class="card-body text-center">
              <h5 class="card-title">Olivia Martinez</h5>
              <p class="card-text text-muted">Sustainability Manager</p>
              <p class="card-text">
                Olivia ensures our commitment to the environment is reflected in
                our product selection and business practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="bg-light p-5 rounded text-center">
        <h2 class="mb-3">Get in Touch</h2>
        <p class="lead mb-4">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <router-link to="/contact" class="btn btn-summer btn-lg"
          >Contact Us</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style lang="scss" scoped>
.about-view {
  .section-title {
    position: relative;
    display: inline-block;
    padding-bottom: 10px;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: #f8c146;
    }
  }

  .value-icon {
    height: 70px;
    width: 70px;
    line-height: 70px;
    border-radius: 50%;
    background-color: rgba(248, 193, 70, 0.1);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .btn-summer {
    background-color: #f8c146;
    border-color: #f8c146;
    color: #212529;

    &:hover {
      background-color: darken(#f8c146, 10%);
      border-color: darken(#f8c146, 10%);
    }
  }
}
</style>
