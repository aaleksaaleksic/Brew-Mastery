<template>
  <div>
    <h1>Categories</h1>
    <ul v-if="categories.length">
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
    <p v-else>No categories available</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions(["fetchCategories"]),
  },
};
</script>
