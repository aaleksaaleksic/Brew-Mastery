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
            <router-link :to="'/orders/' + order.id" class="btn btn-primary"
              >View</router-link
            >
            <button
              @click="updateStatus(order.id, 'completed')"
              class="btn btn-success"
            >
              Mark as Completed
            </button>
            <button @click="deleteOrder(order.id)" class="btn btn-danger">
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
  computed: {
    ...mapState({
      orders: (state) => state.orders.orders, // Preuzimamo narudžbine iz Vuex store-a
      users: (state) => state.users.users, // Preuzimamo korisnike iz Vuex store-a
    }),
  },
  mounted() {
    // Prilikom mountovanja preuzimamo sve narudžbine i korisnike
    this.fetchOrders();
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetchOrders", "fetchUsers", "deleteOrder", "updateStatus"]), // Mapiramo Vuex akcije

    getCustomerName(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.username : "Unknown User";
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
