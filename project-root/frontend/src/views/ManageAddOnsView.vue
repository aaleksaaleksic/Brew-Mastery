<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Upravljanje dodacima</h2>

    <ul v-if="addons.length" class="list-group mb-4">
      <li
        v-for="addon in addons"
        :key="addon.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ addon.name }} - {{ addon.price }} RSD
        <div>
          <button
            @click="prepareEdit(addon)"
            class="btn btn-primary btn-sm me-2"
          >
            Izmeni
          </button>
          <button @click="removeAddon(addon.id)" class="btn btn-danger btn-sm">
            Obriši
          </button>
        </div>
      </li>
    </ul>

    <form @submit.prevent="addAddon" v-if="!isEditing" class="card p-4">
      <h3 class="mb-3">Dodaj novi dodatak</h3>
      <div class="mb-3">
        <label for="name" class="form-label">Naziv dodatka:</label>
        <input
          type="text"
          v-model="newAddon.name"
          id="name"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Cena:</label>
        <input
          type="number"
          v-model="newAddon.price"
          id="price"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success">Dodaj dodatak</button>
    </form>

    <form @submit.prevent="submitEdit" v-if="isEditing" class="card p-4 mt-4">
      <h3 class="mb-3">Izmeni dodatak</h3>
      <div class="mb-3">
        <label for="editName" class="form-label">Naziv dodatka:</label>
        <input
          type="text"
          v-model="editableAddon.name"
          id="editName"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="editPrice" class="form-label">Cena:</label>
        <input
          type="number"
          v-model="editableAddon.price"
          id="editPrice"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary me-2">Sačuvaj izmene</button>
      <button @click="cancelEdit" class="btn btn-secondary">Otkaži</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newAddon: {
        name: "",
        price: 0,
      },
      isEditing: false,
      editableAddon: null,
    };
  },
  computed: {
    ...mapState({
      addons: (state) => state.addons.addons,
    }),
  },
  mounted() {
    this.fetchAddons();
  },
  methods: {
    ...mapActions(["fetchAddons", "createAddon", "deleteAddon", "updateAddon"]),

    addAddon() {
      this.createAddon(this.newAddon).then(() => {
        this.newAddon = { name: "", price: 0 };
      });
    },

    prepareEdit(addon) {
      this.isEditing = true;
      this.editableAddon = { ...addon };
    },

    cancelEdit() {
      this.isEditing = false;
      this.editableAddon = null;
    },

    submitEdit() {
      this.updateAddon(this.editableAddon).then(() => {
        this.isEditing = false;
        this.editableAddon = null;
      });
    },

    removeAddon(addonId) {
      this.deleteAddon(addonId);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}

.btn-success {
  background-color: #388e3c;
}

.btn-danger {
  background-color: #d32f2f;
}

.btn-secondary {
  background-color: #d7ccc8;
  color: #3e2723;
}
</style>
