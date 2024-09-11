<template>
  <div>
    <h2>Current Promotions</h2>

    <div v-if="promotions.length === 0">
      <p>No promotions available at the moment.</p>
    </div>

    <ul v-else>
      <li v-for="promotion in promotions" :key="promotion.name">
        <h3>{{ promotion.name }}</h3>
        <p>{{ promotion.description }}</p>
        <p>Discount: {{ promotion.discount }}%</p>
        <p>
          Valid from: {{ formatDate(promotion.startDate) }} to
          {{ formatDate(promotion.endDate) }}
        </p>
      </li>
    </ul>
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
        .catch((error) => console.error("Error fetching promotions:", error));
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

h3 {
  margin-bottom: 5px;
}
</style>
