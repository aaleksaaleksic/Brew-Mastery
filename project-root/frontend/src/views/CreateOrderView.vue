<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Kreiraj novu narudžbinu</h2>

    <form @submit.prevent="submitOrder">
      <div
        v-for="(orderItem, index) in orderItems"
        :key="index"
        class="card mb-4 p-3"
      >
        <h3>Proizvod {{ index + 1 }}</h3>

        <div class="mb-3">
          <label for="coffee" class="form-label">Izaberi kafu:</label>
          <select
            v-model="orderItem.selectedCoffeeId"
            id="coffee"
            class="form-select"
            required
          >
            <option
              v-for="coffee in coffees"
              :key="coffee.id"
              :value="coffee.id"
            >
              {{ coffee.name }} - {{ coffee.price }} RSD
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Količina:</label>
          <input
            type="number"
            v-model="orderItem.quantity"
            min="1"
            id="quantity"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="addons" class="form-label">Izaberi dodatke:</label>
          <div v-for="addon in addons" :key="addon.id" class="form-check">
            <input
              type="checkbox"
              :value="addon.id"
              v-model="orderItem.selectedAddons"
              class="form-check-input"
            />
            <label class="form-check-label">
              {{ addon.name }} - {{ addon.price }} RSD
            </label>
          </div>
        </div>

        <button @click.prevent="removeOrderItem(index)" class="btn btn-danger">
          Ukloni proizvod
        </button>
      </div>

      <button @click.prevent="addOrderItem" class="btn btn-secondary mb-3 me-3">
        Dodaj još jedan proizvod
      </button>
      <button type="submit" class="btn btn-primary mb-3">
        Potvrdi narudžbinu
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      orderItems: [
        {
          selectedCoffeeId: null,
          quantity: 1,
          selectedAddons: [],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      coffees: (state) => state.coffees.coffees,
      addons: (state) => state.addons.addons,
    }),
  },
  mounted() {
    this.fetchCoffees();
    this.fetchAddons();
  },
  methods: {
    ...mapActions({
      fetchCoffees: "fetchCoffees",
      fetchAddons: "fetchAddons",
      placeOrder: "createOrder",
    }),

    addOrderItem() {
      this.orderItems.push({
        selectedCoffeeId: null,
        quantity: 1,
        selectedAddons: [],
      });
    },
    removeOrderItem(index) {
      this.orderItems.splice(index, 1);
    },
    submitOrder() {
      const validOrderItems = this.orderItems.every(
        (item) => item.selectedCoffeeId && item.quantity > 0
      );
      if (!validOrderItems) {
        alert(
          "Molimo vas da izaberete kafu i unesete ispravnu količinu za svaki proizvod."
        );
        return;
      }

      const orderData = {
        status: "pending",
        coffees: this.orderItems.map((item) => ({
          coffeeId: item.selectedCoffeeId,
          quantity: item.quantity,
          price: this.coffees.find(
            (coffee) => coffee.id === item.selectedCoffeeId
          ).price,
          addons: item.selectedAddons,
        })),
      };

      this.placeOrder(orderData)
        .then(() => {
          alert("Narudžbina je uspešno poslata!");
          this.$router.push("/orders");
        })
        .catch((error) => {
          console.error("Greška prilikom slanja narudžbine:", error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
}

.btn-primary {
  background-color: #6d4c41;
  border-color: #5d4037;
}

.btn-secondary {
  background-color: #d7ccc8;
  color: #3e2723;
}

.btn-danger {
  background-color: #d32f2f;
}

.mb-3 {
  margin-bottom: 1rem !important;
}
</style>
