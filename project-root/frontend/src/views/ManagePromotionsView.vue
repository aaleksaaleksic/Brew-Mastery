<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Upravljanje promocijama</h2>

    <h3 class="mb-3">Dodaj novu promociju</h3>
    <form @submit.prevent="submitPromotion" class="card p-4">
      <div class="mb-3">
        <label for="name" class="form-label">Naziv promocije:</label>
        <input
          v-model="newPromotion.name"
          id="name"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Opis:</label>
        <input
          v-model="newPromotion.description"
          id="description"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="discount" class="form-label">Popust (%):</label>
        <input
          type="number"
          v-model="newPromotion.discount"
          id="discount"
          min="1"
          max="100"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Početni datum:</label>
        <input
          type="date"
          v-model="newPromotion.startDate"
          id="startDate"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="endDate" class="form-label">Završni datum:</label>
        <input
          type="date"
          v-model="newPromotion.endDate"
          id="endDate"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-success w-100">
        Dodaj promociju
      </button>
    </form>

    <h3 class="mt-5 mb-3">Postojeće promocije</h3>
    <ul class="list-group" v-if="promotions.length">
      <li
        v-for="promotion in promotions"
        :key="promotion.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <h5>{{ promotion.name }}</h5>
          <p>{{ promotion.description }}</p>
          <p>Popust: {{ promotion.discount }}%</p>
          <p>
            Važi od {{ formatDate(promotion.startDate) }} do
            {{ formatDate(promotion.endDate) }}
          </p>
        </div>
        <div>
          <button
            @click="editPromotion(promotion)"
            class="btn btn-primary btn-sm me-2"
          >
            Izmeni
          </button>
          <button
            @click="deletePromotion(promotion.id)"
            class="btn btn-danger btn-sm"
          >
            Obriši
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="alert alert-warning text-center">
      Trenutno nema dostupnih promocija.
    </p>
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
      promotions: (state) => state.promotions.promotions,
    }),
  },
  mounted() {
    this.fetchPromotions();
  },
  methods: {
    ...mapActions(["fetchPromotions", "createPromotion", "deletePromotion"]),

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
      return new Date(dateString).toLocaleDateString("sr-RS", options);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h2,
h3 {
  color: #3e2723;
}

.list-group-item {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
  color: #5d4037;
}

.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
}

.btn-success {
  background-color: #388e3c;
}

.btn-primary {
  background-color: #6d4c41;
}

.btn-danger {
  background-color: #d32f2f;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}
</style>
