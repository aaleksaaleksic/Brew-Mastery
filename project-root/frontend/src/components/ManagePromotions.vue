<template>
  <div>
    <h2>Manage Promotions</h2>

    <h3>Add New Promotion</h3>
    <form @submit.prevent="submitPromotion">
      <div>
        <label for="name">Promotion Name:</label>
        <input v-model="newPromotion.name" id="name" required />
      </div>

      <div>
        <label for="description">Description:</label>
        <input v-model="newPromotion.description" id="description" required />
      </div>

      <div>
        <label for="discount">Discount (%):</label>
        <input
          type="number"
          v-model="newPromotion.discount"
          id="discount"
          min="1"
          max="100"
          required
        />
      </div>

      <div>
        <label for="startDate">Start Date:</label>
        <input
          type="date"
          v-model="newPromotion.startDate"
          id="startDate"
          required
        />
      </div>

      <div>
        <label for="endDate">End Date:</label>
        <input
          type="date"
          v-model="newPromotion.endDate"
          id="endDate"
          required
        />
      </div>

      <button type="submit">Add Promotion</button>
    </form>

    <h3>Existing Promotions</h3>
    <div v-if="promotions.length === 0">
      <p>No promotions available.</p>
    </div>

    <ul v-else>
      <li v-for="promotion in promotions" :key="promotion.id">
        <h4>{{ promotion.name }}</h4>
        <p>{{ promotion.description }} - {{ promotion.discount }}% off</p>
        <p>
          Valid from: {{ formatDate(promotion.startDate) }} to
          {{ formatDate(promotion.endDate) }}
        </p>
        <button @click="editPromotion(promotion)">Edit</button>
        <button @click="deletePromotion(promotion.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newPromotion: {
        name: "",
        description: "",
        discount: 0,
        startDate: "",
        endDate: "",
      },
      editingPromotion: null,
    };
  },
  computed: {
    ...mapState({
      promotions: (state) => state.promotions.promotions, // Preuzimamo promocije iz Vuex store-a
    }),
  },
  mounted() {
    this.fetchPromotions(); // Preuzimamo promocije prilikom mountovanja
  },
  methods: {
    ...mapActions(["fetchPromotions", "createPromotion", "deletePromotion"]), // Mapiramo Vuex akcije

    submitPromotion() {
      const method = this.editingPromotion
        ? "updatePromotion"
        : "createPromotion";
      this[method](this.newPromotion).then(() => {
        this.resetForm();
      });
    },
    editPromotion(promotion) {
      this.editingPromotion = promotion;
      this.newPromotion = { ...promotion };
    },
    deletePromotion(promotionId) {
      this.deletePromotion(promotionId);
    },
    resetForm() {
      this.newPromotion = {
        name: "",
        description: "",
        discount: 0,
        startDate: "",
        endDate: "",
      };
      this.editingPromotion = null;
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
