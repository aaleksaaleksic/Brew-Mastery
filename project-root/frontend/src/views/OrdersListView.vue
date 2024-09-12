<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Moje narudžbine</h2>

    <div v-if="orders.length > 0" class="list-group">
      <router-link
        v-for="order in orders"
        :key="order.id"
        :to="`/orders/${order.id}`"
        class="list-group-item list-group-item-action"
      >
        <h5>Narudžbina #{{ order.id }} - Status: {{ order.status }}</h5>
        <p>Kreirano: {{ formatDate(order.createdAt) }}</p>
      </router-link>
    </div>

    <p v-else class="alert alert-warning text-center">Nemate narudžbine.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "OrdersListView",
  data() {
    return {
      socket: null, // WebSocket objekat
    };
  },
  computed: {
    ...mapState({
      orders: (state) => state.orders.orders,
    }),
  },
  mounted() {
    this.fetchOrders();

    // Povezivanje na WebSocket za praćenje ažuriranja narudžbina u realnom vremenu
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "ORDER_UPDATED") {
        this.fetchOrders();
      }
    };
  },
  methods: {
    ...mapActions(["fetchOrders"]),

    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("sr-RS", options);
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
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

h2 {
  color: #3e2723;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

p {
  margin-bottom: 5px;
}
</style>
