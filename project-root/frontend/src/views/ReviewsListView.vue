<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Sve recenzije</h2>

    <div v-if="reviews.length" class="row">
      <div v-for="review in reviews" :key="review.id" class="col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ getCoffeeName(review) }}</h5>
            <p class="card-text">{{ review.comment }}</p>
            <p class="card-text">
              Ocena: <strong>{{ review.rating }}/5</strong>
            </p>
            <p class="card-text">Korisnik: {{ getUserName(review.userId) }}</p>
            <p class="card-text">
              Kreirano: {{ formatDate(review.createdAt) }}
            </p>
            <div v-if="isUser && review.userId === userId">
              <button
                @click="editReview(review.id)"
                class="btn btn-primary me-2"
              >
                Izmeni
              </button>
              <button @click="deleteReview(review.id)" class="btn btn-danger">
                Obriši
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="alert alert-warning text-center">
      Trenutno nema dostupnih recenzija.
    </p>

    <div v-if="isUser" class="mt-5">
      <h3>Dodaj novu recenziju</h3>
      <form @submit.prevent="submitReview">
        <div class="mb-3">
          <label for="coffee" class="form-label">Izaberi kafu:</label>
          <select
            v-model="newReview.coffeeId"
            id="coffee"
            class="form-select"
            required
          >
            <option
              v-for="coffee in coffees"
              :key="coffee.id"
              :value="coffee.id"
            >
              {{ coffee.name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="rating" class="form-label">Ocena:</label>
          <input
            type="number"
            v-model="newReview.rating"
            min="1"
            max="5"
            id="rating"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="comment" class="form-label">Komentar:</label>
          <textarea
            v-model="newReview.comment"
            id="comment"
            class="form-control"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary w-100">
          Pošalji recenziju
        </button>
      </form>
    </div>

    <div v-if="isGuest" class="alert alert-info mt-5 text-center">
      Morate biti prijavljeni da biste ostavili recenziju.
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
      return coffee ? coffee.name : "Nepoznata kafa";
    },

    getUserName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.username : "Nepoznat korisnik";
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
      return new Date(dateString).toLocaleDateString("sr-RS", options);
    },

    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
}

.card-title {
  color: #3e2723;
}

.alert-warning,
.alert-info {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.card-text {
  color: #5d4037;
}

.me-2 {
  margin-right: 0.5rem;
}

h2,
h3 {
  color: #3e2723;
}

.form-label {
  color: #5d4037;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}

.btn-danger {
  background-color: #d32f2f;
}

.btn-secondary {
  background-color: #d7ccc8;
  color: #3e2723;
}
</style>
