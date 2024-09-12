<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Sve kafe</h2>
    <ul v-if="coffees.length > 0" class="list-group">
      <li
        v-for="coffee in coffees"
        :key="coffee.id"
        class="list-group-item mb-3"
      >
        <h4>{{ coffee.name }}</h4>
        <p>{{ coffee.description }}</p>
        <p>Cena: {{ coffee.price }} RSD</p>
      </li>
    </ul>
    <p v-else class="alert alert-warning text-center">
      Trenutno nema dostupnih kafa.
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CoffeeList",
  computed: {
    ...mapState({
      coffees: (state) => state.coffees.coffees,
    }),
  },
  mounted() {
    this.fetchCoffees();
  },
  methods: {
    ...mapActions(["fetchCoffees"]),
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

h4 {
  color: #3e2723;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}
</style>
