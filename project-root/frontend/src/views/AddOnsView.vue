<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Dostupni dodaci</h2>

    <div v-if="addons.length" class="row">
      <div v-for="addon in addons" :key="addon.id" class="col-md-4 mb-4">
        <div class="card h-100 text-center">
          <img
            :src="getImage(addon.name)"
            :alt="addon.name"
            class="card-img-top"
            style="height: 150px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ addon.name }}</h5>
            <p class="card-text">Cena: {{ addon.price }} RSD</p>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="alert alert-warning text-center">
      Trenutno nema dostupnih dodataka.
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      addons: (state) => state.addons.addons,
    }),
  },
  mounted() {
    this.fetchAddons();
  },
  methods: {
    ...mapActions(["fetchAddons"]),

    getImage(addonName) {
      // Formatiramo ime dodatka za odgovarajući naziv slike
      const formattedName = addonName
        .toLowerCase()
        .replace(/č/g, "c")
        .replace(/ć/g, "c")
        .replace(/š/g, "s")
        .replace(/ž/g, "z")
        .replace(/đ/g, "dj")
        .replace(/\s+/g, "-"); // Zamenjujemo razmake crticama

      try {
        return require(`@/assets/addons/${formattedName}.webp`);
      } catch (e) {
        return require("@/assets/addons/default.webp"); // Default slika ako ne postoji
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
}

.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
}

.card-title {
  color: #3e2723;
}

.card-text {
  color: #5d4037;
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
