<template>
  <div>
    <h1>Your Orders</h1>
    <div v-if="orders.length">
      <ul>
        <li v-for="order in orders" :key="order.id">
          <p>Order #{{ order.id }} - Status: {{ order.status }}</p>
          <ul>
            <li v-for="item in order.OrderItems" :key="item.id">
              {{ item.Coffee.name }} - Quantity: {{ item.quantity }} - Price:
              {{ item.price }}
              <ul>
                <li v-for="addon in item.Addons" :key="addon.id">
                  Addon: {{ addon.name }} - Price: {{ addon.price }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <p v-else>No orders found.</p>
  </div>
</template>

<script>
export default {
  name: "UserOrdersView",
  data() {
    return {
      orders: [],
      user: null,
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.admin;
    },
  },
  mounted() {
    const token = this.getCookie("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.user = payload;

      const apiUrl = this.isAdmin
        ? "http://localhost:3000/orders"
        : `http://localhost:3000/orders?userId=${this.user.id}`;
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.orders = data;
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
