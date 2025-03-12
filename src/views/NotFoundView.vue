<template>
  <div class="not-found-view">
    <div class="container py-5 text-center">
      <div class="not-found-content">
        <div class="not-found-icon mb-4">
          <i class="bi bi-exclamation-triangle display-1 text-warning"></i>
        </div>
        <h1 class="display-4 mb-3">404</h1>
        <h2 class="mb-4">Page Not Found</h2>
        <p class="lead mb-5">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/" class="btn btn-summer btn-lg">
            <i class="bi bi-house-door me-2"></i> Go Home
          </router-link>
          <router-link to="/products" class="btn btn-outline-dark btn-lg">
            <i class="bi bi-shop me-2"></i> Shop Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFoundView',
  };
</script>

<style lang="scss" scoped>
  .not-found-view {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .not-found-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .not-found-icon {
    i {
      opacity: 0.8;
    }
  }
</style>
