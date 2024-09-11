<template>
  <div>
    <h2>Manage Reviews</h2>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <strong>{{ review.Coffee?.name || "Unknown Coffee" }}:</strong>
        {{ review.comment }} -
        <button @click="removeReview(review.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      reviews: (state) => state.reviews.reviews, // Preuzimamo recenzije iz Vuex store-a
    }),
  },
  mounted() {
    this.fetchReviews(); // Preuzimamo recenzije prilikom mountovanja
  },
  methods: {
    ...mapActions(["fetchReviews", "deleteReview"]), // Mapiranje Vuex akcija

    // Preimenovana funkcija da izbegnemo rekurziju
    removeReview(id) {
      this.deleteReview(id); // Pozivamo Vuex akciju za brisanje recenzije
    },
  },
};
</script>
