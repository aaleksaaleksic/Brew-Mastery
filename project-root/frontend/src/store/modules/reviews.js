import axios from "axios";

const state = {
  reviews: [],
};

const getters = {
  allReviews: (state) => state.reviews,
};

const actions = {
  async fetchReviews({ commit }) {
    const response = await axios.get("http://localhost:3000/reviews");
    commit("setReviews", response.data);
  },
  async createReview({ commit }, reviewData) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.post(
      "http://localhost:3000/reviews",
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("addReview", response.data);
  },
  async deleteReview({ commit }, reviewId) {
    const token = document.cookie.split("token=")[1];
    if (!token) {
      throw new Error("No authentication token found.");
    }
    try {
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("removeReview", reviewId);
    } catch (error) {
      console.error("Error deleting review:", error.response || error.message);
    }
  },
};

const mutations = {
  setReviews: (state, reviews) => (state.reviews = reviews),
  addReview: (state, review) => state.reviews.push(review),
  removeReview: (state, reviewId) => {
    state.reviews = state.reviews.filter((review) => review.id !== reviewId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
