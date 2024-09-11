<template>
  <div>
    <h2>My Orders</h2>
    <div v-if="orders.length === 0">
      <p>You have no orders yet.</p>
    </div>
    <ul v-else>
      <li v-for="order in orders" :key="order.id">
        <router-link :to="`/orders/${order.id}`">
          Order #{{ order.id }} - {{ order.status }} ({{
            formatDate(order.createdAt)
          }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
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

    // Povezivanje na WebSocket
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "ORDER_UPDATED") {
        this.fetchOrders(); // Ažuriranje porudžbina u realnom vremenu
      }
    };
  },
  methods: {
    ...mapActions(["fetchOrders"]),

    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>
