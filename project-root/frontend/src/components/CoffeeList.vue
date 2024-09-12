<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Sve kafe</h2>

    <div v-if="coffees.length > 0" class="row">
      <div v-for="coffee in coffees" :key="coffee.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img
            :src="getImage(coffee.name)"
            :alt="coffee.name"
            class="card-img-top"
            style="height: 150px; object-fit: cover"
          />
          <div class="card-body">
            <h4 class="card-title">{{ coffee.name }}</h4>
            <p class="card-description text-muted">{{ coffee.description }}</p>
            <p class="card-price">
              Cena: <strong>{{ coffee.price }} RSD</strong>
            </p>
          </div>
        </div>
      </div>
    </div>

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

    getImage(coffeeName) {
      const formattedName = coffeeName
        .toLowerCase()
        .replace(/č/g, "c")
        .replace(/ć/g, "c")
        .replace(/š/g, "s")
        .replace(/ž/g, "z")
        .replace(/đ/g, "dj")
        .replace(/\s+/g, "-"); // Zameni razmake crticama

      try {
        return require(`@/assets/coffees/${formattedName}.webp`);
      } catch (e) {
        return require("@/assets/coffees/default.webp"); // Default slika ako ne postoji
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-10px); /* Efekat lebdenja */
}

.card-title {
  color: #3e2723;
  font-size: 1.25rem;
}

.card-description {
  color: #6d4c41;
  font-size: 0.9rem;
}

.card-price {
  color: #d32f2f;
  font-size: 1.1rem;
  font-weight: bold;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.card-img-top {
  border-bottom: 1px solid #d7ccc8;
  object-fit: cover;
}
</style>
