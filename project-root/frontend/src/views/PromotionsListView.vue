<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Trenutne promocije</h2>

    <div v-if="promotions.length" class="row">
      <div
        v-for="promotion in promotions"
        :key="promotion.name"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ promotion.name }}</h5>
            <p class="card-text">{{ promotion.description }}</p>
            <p class="card-text">
              Popust: <strong>{{ promotion.discount }}%</strong>
            </p>
            <p class="card-text">
              Važi od: {{ formatDate(promotion.startDate) }} do
              {{ formatDate(promotion.endDate) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="alert alert-warning text-center">
      Trenutno nema dostupnih promocija.
    </p>
  </div>
</template>

<script>
export default {
  name: "PromotionsListView",
  data() {
    return {
      promotions: [],
    };
  },
  mounted() {
    this.fetchPromotions();
  },
  methods: {
    fetchPromotions() {
      fetch("http://localhost:3000/promotions")
        .then((response) => response.json())
        .then((data) => {
          this.promotions = data;
        })
        .catch((error) =>
          console.error("Greška pri preuzimanju promocija:", error)
        );
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("sr-RS", options);
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

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.card-text {
  color: #5d4037;
}
</style>
