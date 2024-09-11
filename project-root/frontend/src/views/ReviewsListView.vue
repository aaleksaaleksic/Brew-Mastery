<template>
  <div>
    <h2>All Reviews</h2>
    <div v-if="reviews.length === 0">
      <p>No reviews available yet.</p>
    </div>
    <ul v-else>
      <li v-for="review in reviews" :key="review.id">
        <strong>{{ getCoffeeName(review) }}:</strong>
        {{ review.comment }}
        <div>Rating: {{ review.rating }}/5</div>
        <p>
          By User: {{ getUserName(review.userId) }} (Created at:
          {{ formatDate(review.createdAt) }})
        </p>
        <div v-if="isUser && review.userId === userId">
          <button @click="editReview(review.id)">Edit</button>
          <button @click="deleteReview(review.id)">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isUser">
      <h3>Add a new review</h3>
      <form @submit.prevent="submitReview">
        <div>
          <label for="coffee">Select Coffee:</label>
          <select v-model="newReview.coffeeId" id="coffee" required>
            <option
              v-for="coffee in coffees"
              :key="coffee.id"
              :value="coffee.id"
            >
              {{ coffee.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="rating">Rating:</label>
          <input
            type="number"
            v-model="newReview.rating"
            min="1"
            max="5"
            id="rating"
            required
          />
        </div>

        <div>
          <label for="comment">Comment:</label>
          <textarea
            v-model="newReview.comment"
            id="comment"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit Review</button>
      </form>
    </div>

    <div v-if="isGuest">
      <p>You need to log in to post a review.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newReview: {
        rating: null,
        comment: "",
        coffeeId: null,
      },
      userId: null,
    };
  },
  computed: {
    ...mapState({
      reviews: (state) => state.reviews.reviews,
      coffees: (state) => state.coffees.coffees,
      users: (state) => state.users.users,
    }),
    isUser() {
      return this.userId !== null;
    },
    isGuest() {
      return this.userId === null;
    },
  },
  mounted() {
    this.fetchReviews();
    this.fetchCoffees();
    this.fetchUsers();
    const token = this.getCookie("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.userId = payload.id;
    }
  },
  methods: {
    ...mapActions([
      "fetchReviews",
      "fetchCoffees",
      "fetchUsers",
      "createReview",
      "deleteReview",
    ]),

    getCoffeeName(review) {
      if (review.Coffee && review.Coffee.name) {
        return review.Coffee.name;
      }
      const coffee = this.coffees.find(
        (coffee) => coffee.id === review.coffeeId
      );
      return coffee ? coffee.name : "Unknown Coffee";
    },

    getUserName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.username : "Unknown User";
    },

    submitReview() {
      const reviewData = {
        rating: this.newReview.rating,
        comment: this.newReview.comment,
        coffeeId: this.newReview.coffeeId,
      };
      this.createReview(reviewData);
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>
