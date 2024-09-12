<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Upravljanje recenzijama</h2>

    <ul class="list-group" v-if="reviews.length">
      <li
        v-for="review in reviews"
        :key="review.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <strong>{{ review.Coffee?.name || "Nepoznata kafa" }}:</strong>
        {{ review.comment }}
        <button @click="removeReview(review.id)" class="btn btn-danger btn-sm">
          Obriši
        </button>
      </li>
    </ul>
    <p v-else class="alert alert-warning text-center">
      Trenutno nema recenzija.
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      reviews: (state) => state.reviews.reviews,
    }),
  },
  mounted() {
    this.fetchReviews();
  },
  methods: {
    ...mapActions(["fetchReviews", "deleteReview"]),

    removeReview(id) {
      this.deleteReview(id);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.list-group-item {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
  color: #5d4037;
}

h2 {
  color: #3e2723;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.btn-danger {
  background-color: #d32f2f;
}
</style>
