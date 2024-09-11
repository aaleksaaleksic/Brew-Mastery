<template>
  <div>
    <h2>Available Add-Ons</h2>
    <ul v-if="addons.length">
      <li v-for="addon in addons" :key="addon.id">
        {{ addon.name }} - ${{ addon.price }}
      </li>
    </ul>
    <p v-else>No add-ons available.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      // Preuzimamo 'addons' iz Vuex store-a
      addons: (state) => state.addons.addons,
    }),
  },
  mounted() {
    // Pozivamo Vuex akciju za preuzimanje dodataka kada se komponenta mountuje
    this.fetchAddons();
  },
  methods: {
    ...mapActions(["fetchAddons"]),
  },
};
</script>
