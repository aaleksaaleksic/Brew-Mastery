<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Sve narudžbine (Admin prikaz)</h1>

    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th>ID narudžbine</th>
          <th>Status</th>
          <th>Kupac</th>
          <th>Datum</th>
          <th>Akcije</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.status }}</td>
          <td>{{ getCustomerName(order.userId) }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>
            <router-link
              :to="'/orders/' + order.id"
              class="btn btn-primary me-2"
            >
              Pregledaj
            </router-link>
            <button
              @click="updateStatusAction(order.id, 'completed')"
              class="btn btn-success me-2"
            >
              Obeleži kao završenu
            </button>
            <button @click="cancelOrder(order.id)" class="btn btn-danger">
              Izbriši
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
      return user ? user.username : "Nepoznat korisnik";
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("sr-RS", options);
    },
    updateStatusAction(orderId, status) {
      if (orderId && status) {
        this.updateStatus({ orderId, status });
      } else {
        console.error("Nevažeći ID narudžbine ili status");
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

<style scoped>
.table {
  margin-top: 20px;
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

.thead-dark {
  background-color: #3e2723;
  color: white;
}
</style>
