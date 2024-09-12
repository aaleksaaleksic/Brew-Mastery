<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Kategorije proizvoda</h1>

    <div v-if="categories.length" class="row">
      <div
        v-for="category in categories"
        :key="category.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <!-- Prikazujemo sliku kategorije -->
          <img
            v-if="categoryImage(category.name)"
            :src="categoryImage(category.name)"
            alt="Slika kategorije"
            class="card-img-top"
            style="height: 200px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="alert alert-warning text-center">
      Nema dostupnih kategorija.
    </p>
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

    categoryImage(categoryName) {
      const formattedName = categoryName
        .toLowerCase()
        .replace(/č/g, "c")
        .replace(/ć/g, "c")
        .replace(/š/g, "s")
        .replace(/ž/g, "z")
        .replace(/đ/g, "dj")
        .replace(/\s+/g, "-");

      try {
        return require(`@/assets/categories/${formattedName}.webp`);
      } catch (e) {
        return require(`@/assets/categories/placeholder.webp`);
      }
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

.card-img-top {
  border-bottom: 1px solid #d7ccc8;
}
</style>
