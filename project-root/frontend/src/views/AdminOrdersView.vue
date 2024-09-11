<template>
  <div>
    <h1>All Orders (Admin View)</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.status }}</td>
          <td>{{ getCustomerName(order.userId) }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>
            <router-link :to="'/orders/' + order.id" class="btn btn-primary">
              View
            </router-link>
            <button
              @click="updateStatusAction(order.id, 'completed')"
              class="btn btn-success"
            >
              Mark as Completed
            </button>
            <button @click="cancelOrder(order.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      users: (state) => state.users.users,
    }),
  },
  mounted() {
    this.fetchAdminOrders(); // Preuzimamo sve narudžbine za admina
    this.fetchUsers();

    // Povezivanje na WebSocket
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "ORDER_UPDATED") {
        this.fetchAdminOrders(); // Ažuriranje porudžbina u realnom vremenu
      }
    };
  },
  methods: {
    ...mapActions([
      "fetchAdminOrders",
      "fetchUsers",
      "cancelOrder",
      "updateStatus",
    ]),

    getCustomerName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.username : "Unknown User";
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    updateStatusAction(orderId, status) {
      if (orderId && status) {
        this.updateStatus({ orderId, status });
      } else {
        console.error("Invalid orderId or status");
      }
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>
