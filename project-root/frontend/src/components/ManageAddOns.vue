<template>
  <div>
    <h2>Manage Add-Ons</h2>

    <ul v-if="addons.length">
      <li v-for="addon in addons" :key="addon.id">
        {{ addon.name }} - ${{ addon.price }}
        <button @click="prepareEdit(addon)" class="btn btn-primary">
          Edit
        </button>
        <button @click="removeAddon(addon.id)" class="btn btn-danger">
          Delete
        </button>
      </li>
    </ul>

    <form @submit.prevent="addAddon" v-if="!isEditing">
      <h3>Add New Add-On</h3>
      <div>
        <label for="name">Add-On Name:</label>
        <input type="text" v-model="newAddon.name" id="name" required />
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" v-model="newAddon.price" id="price" required />
      </div>
      <button type="submit" class="btn btn-success">Add Add-On</button>
    </form>

    <!-- Forma za izmenu postojećeg dodatka -->
    <form @submit.prevent="submitEdit" v-if="isEditing">
      <h3>Edit Add-On</h3>
      <div>
        <label for="editName">Add-On Name:</label>
        <input
          type="text"
          v-model="editableAddon.name"
          id="editName"
          required
        />
      </div>
      <div>
        <label for="editPrice">Price:</label>
        <input
          type="number"
          v-model="editableAddon.price"
          id="editPrice"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
      <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ManageAddOns",
  data() {
    return {
      newAddon: {
        name: "",
        price: 0,
      },
      isEditing: false, // Praćenje da li je u režimu izmene
      editableAddon: null, // Čuva podatke o dodatku koji se menja
    };
  },
  computed: {
    ...mapState({
      // Preuzimamo dodatke iz Vuex store-a
      addons: (state) => state.addons.addons,
    }),
  },
  mounted() {
    // Preuzimamo dodatke prilikom mountovanja komponente
    this.fetchAddons();
  },
  methods: {
    ...mapActions(["fetchAddons", "createAddon", "deleteAddon", "updateAddon"]), // Mapiramo akcije za Vuex

    addAddon() {
      // Pozivamo akciju iz Vuex store-a za dodavanje novog dodatka
      this.createAddon(this.newAddon).then(() => {
        this.newAddon = { name: "", price: 0 }; // Resetujemo formu nakon dodavanja
      });
    },

    // Priprema za uređivanje dodatka
    prepareEdit(addon) {
      this.isEditing = true;
      this.editableAddon = { ...addon }; // Kopiramo podatke o dodatku
    },

    // Otkazivanje režima uređivanja
    cancelEdit() {
      this.isEditing = false;
      this.editableAddon = null;
    },

    // Slanje izmenjenih podataka o dodatku
    submitEdit() {
      this.updateAddon(this.editableAddon).then(() => {
        this.isEditing = false; // Isključujemo režim uređivanja nakon uspešne izmene
        this.editableAddon = null; // Resetujemo podatke o dodatku
      });
    },

    removeAddon(addonId) {
      // Pozivamo Vuex akciju za brisanje dodatka
      this.deleteAddon(addonId);
    },
  },
};
</script>
