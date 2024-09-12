<template>
  <div class="container mt-5" v-if="order">
    <h2 class="mb-4 text-center">Detalji narudžbine #{{ order.id }}</h2>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Kreirano:</strong> {{ formatDate(order.createdAt) }}</p>

    <h3 class="mt-4">Proizvodi:</h3>
    <ul class="list-group mb-4">
      <li
        v-for="item in order.OrderItems"
        :key="item.id"
        class="list-group-item"
      >
        <h5>{{ item.Coffee.name }}</h5>
        <p>Količina: {{ item.quantity }}</p>
        <p>Cena po komadu: {{ item.price }} RSD</p>

        <div v-if="item.Addons.length > 0">
          <h6>Dodaci:</h6>
          <ul class="list-group">
            <li
              v-for="addon in item.Addons"
              :key="addon.id"
              class="list-group-item"
            >
              {{ addon.name }} - {{ addon.price }} RSD
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Nema dodataka za ovaj proizvod.</p>
        </div>
      </li>
    </ul>

    <button @click="confirmCancelOrder" class="btn btn-danger">
      Otkaži narudžbinu
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "OrderDetailsView",
  computed: {
    ...mapState({
      order: (state) => state.orders.order,
    }),
  },
  mounted() {
    const orderId = this.$route.params.id;
    this.fetchOrderDetails(orderId);
  },
  methods: {
    ...mapActions(["fetchOrderDetails", "cancelOrder"]),

    confirmCancelOrder() {
      if (confirm("Da li ste sigurni da želite da otkažete ovu narudžbinu?")) {
        this.cancelOrder(this.$route.params.id)
          .then(() => {
            alert("Narudžbina je uspešno otkazana!");
            this.$router.push("/orders");
          })
          .catch((error) => {
            console.error("Greška prilikom otkazivanja narudžbine:", error);
          });
      }
    },

    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("sr-RS", options);
    },
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

h2,
h3 {
  color: #3e2723;
}

.btn-danger {
  background-color: #d32f2f;
}

p {
  margin-bottom: 10px;
}
</style>
