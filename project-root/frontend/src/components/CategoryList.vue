<template>
  <div>
    <h1>Categories</h1>
    <!-- Prikazujemo kategorije ako ih ima, koristeći Vuex store -->
    <ul v-if="categories.length">
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
    <!-- Ako nema kategorija, prikazuje se poruka -->
    <p v-else>No categories available</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CategoryList",
  computed: {
    ...mapState({
      // Povezujemo Vuex store sa computed property 'categories'
      categories: (state) => state.categories.categories, // Očekujemo da store ima modul 'categories'
    }),
  },
  mounted() {
    // Prilikom mountovanja komponente, pozivamo Vuex akciju za preuzimanje kategorija
    this.fetchCategories();
  },
  methods: {
    // Mapiramo Vuex akcije na metode komponente
    ...mapActions(["fetchCategories"]),
  },
};
</script>
