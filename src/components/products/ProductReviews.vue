<template>
  <div class="product-reviews">
    <h4 class="mb-4">Customer Reviews</h4>

    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <!-- Review Summary -->
      <div class="review-summary mb-4">
        <div class="row align-items-center">
          <div class="col-md-4 mb-3 mb-md-0">
            <div class="review-average text-center">
              <div class="average-rating display-4 fw-bold mb-2">
                {{ averageRating.toFixed(1) }}
              </div>
              <div class="stars mb-2">
                <i
                  v-for="i in 5"
                  :key="i"
                  class="bi"
                  :class="
                    i <= Math.round(averageRating)
                      ? 'bi-star-fill text-warning'
                      : 'bi-star text-muted'
                  "
                ></i>
              </div>
              <div class="review-count text-muted">
                Based on {{ reviews.length }} reviews
              </div>
            </div>
          </div>

          <div class="col-md-8">
            <div class="rating-breakdown">
              <div
                v-for="i in 5"
                :key="i"
                class="rating-bar d-flex align-items-center mb-2"
              >
                <div class="rating-label me-2">{{ 6 - i }} stars</div>
                <div class="progress flex-grow-1 me-2" style="height: 8px">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    :style="`width: ${getRatingPercentage(6 - i)}%`"
                    :aria-valuenow="getRatingPercentage(6 - i)"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div class="rating-count small text-muted">
                  {{ getRatingCount(6 - i) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Write a Review Button -->
      <div class="text-center mb-4">
        <button
          class="btn btn-outline-dark"
          @click="showReviewForm = !showReviewForm"
        >
          {{ showReviewForm ? 'Cancel Review' : 'Write a Review' }}
        </button>
      </div>

      <!-- Review Form -->
      <div v-if="showReviewForm" class="review-form bg-light p-4 rounded mb-4">
        <h5 class="mb-3">Write Your Review</h5>

        <form @submit.prevent="submitReview">
          <div class="mb-3">
            <label class="form-label">Rating</label>
            <div class="rating-select">
              <div class="stars d-flex">
                <i
                  v-for="i in 5"
                  :key="i"
                  class="bi fs-4 me-1"
                  :class="
                    i <= newReview.rating
                      ? 'bi-star-fill text-warning'
                      : 'bi-star'
                  "
                  @click="newReview.rating = i"
                  style="cursor: pointer"
                >
                </i>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reviewTitle" class="form-label">Review Title</label>
            <input
              type="text"
              class="form-control"
              id="reviewTitle"
              v-model="newReview.title"
              required
            />
          </div>

          <div class="mb-3">
            <label for="reviewContent" class="form-label">Review</label>
            <textarea
              class="form-control"
              id="reviewContent"
              rows="4"
              v-model="newReview.content"
              required
            ></textarea>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="reviewName" class="form-label">Your Name</label>
              <input
                type="text"
                class="form-control"
                id="reviewName"
                v-model="newReview.name"
                required
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="reviewEmail" class="form-label">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="reviewEmail"
                v-model="newReview.email"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn btn-summer" :disabled="submitting">
            <span v-if="submitting">
              <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </span>
            <span v-else>Submit Review</span>
          </button>
        </form>
      </div>

      <!-- Reviews List -->
      <div v-if="reviews.length === 0" class="text-center py-4">
        <p class="mb-0">
          There are no reviews yet. Be the first to review this product!
        </p>
      </div>

      <div v-else class="reviews-list">
        <div
          v-for="(review, index) in sortedReviews"
          :key="index"
          class="review-item p-3 mb-3 border-bottom"
        >
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0">{{ review.title }}</h5>
            <div class="stars">
              <i
                v-for="i in 5"
                :key="i"
                class="bi"
                :class="
                  i <= review.rating
                    ? 'bi-star-fill text-warning'
                    : 'bi-star text-muted'
                "
              ></i>
            </div>
          </div>

          <p class="review-content mb-2">{{ review.content }}</p>

          <div class="review-meta d-flex justify-content-between">
            <div class="review-author text-muted small">
              By {{ review.name }} on {{ formatDate(review.date) }}
            </div>

            <div class="review-helpful d-flex align-items-center">
              <span class="me-2 small">Was this helpful?</span>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="markHelpful(index)"
              >
                <i class="bi bi-hand-thumbs-up"></i>
              </button>
              <span class="small text-muted">{{ review.helpful }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="reviews.length > displayCount" class="text-center mt-4">
        <button class="btn btn-outline-dark" @click="loadMoreReviews">
          Load More Reviews
        </button>
      </div>
    </div>
  </div>
</template>

vue
<script>
  import { useStore } from 'vuex';
  import { showToast } from '@/utils/notifications';
  export default {
    name: 'ProductReviews',
    props: {
      productId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const loading = ref(true);
      const reviews = ref([]);
      const showReviewForm = ref(false);
      const submitting = ref(false);
      const displayCount = ref(5);
      // New review form
      const newReview = ref({
        rating: 5,
        title: '',
        content: '',
        name: '',
        email: '',
        date: null,
        helpful: 0,
      });
      // Calculate average rating
      const averageRating = computed(() => {
        if (reviews.value.length === 0) return 0;
        const sum = reviews.value.reduce(
          (total, review) => total + review.rating,
          0
        );
        return sum / reviews.value.length;
      });
      // Get rating count for a specific star rating
      const getRatingCount = rating => {
        return reviews.value.filter(review => review.rating === rating).length;
      };
      // Get percentage for a specific star rating
      const getRatingPercentage = rating => {
        if (reviews.value.length === 0) return 0;
        return (getRatingCount(rating) / reviews.value.length) * 100;
      };
      // Format date
      const formatDate = date => {
        return new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };
      // Submit review
      const submitReview = async () => {
        submitting.value = true;
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          reviews.value.unshift({ ...newReview.value });
          newReview.value = {
            rating: 5,
            title: '',
            content: '',
            name: '',
            email: '',
            date: null,
            helpful: 0,
          };
          submitting.value = false;
          showReviewForm.value = false;
          showToast('Review submitted successfully!', 'success');
        } catch (error) {
          submitting.value = false;
          showToast('Failed to submit review. Please try again.', 'danger');
        }
      };
      // Mark review as helpful
      const markHelpful = index => {
        reviews.value[index].helpful++;
      };
      return {
        loading,
        reviews,
        showReviewForm,
        submitting,
        newReview,
        averageRating,
        getRatingCount,
        getRatingPercentage,
        formatDate,
        markHelpful,
        submitReview,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .rating-bar {
    .rating-label {
      width: 60px;
    }

    .rating-count {
      width: 30px;
      text-align: right;
    }
  }

  .review-item {
    &:last-child {
      border-bottom: none !important;
    }
  }
</style>
