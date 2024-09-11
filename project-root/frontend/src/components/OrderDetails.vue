<template>
  <div v-if="order">
    <h2>Order #{{ order.id }}</h2>
    <p>Status: {{ order.status }}</p>
    <p>Created At: {{ formatDate(order.createdAt) }}</p>

    <h3>Items:</h3>
    <ul>
      <li v-for="item in order.OrderItems" :key="item.id">
        {{ item.Coffee.name }} - {{ item.quantity }} x ${{ item.price }}
        <!-- Prikazujemo Add-ons (dodatke) ako ih ima -->
        <div v-if="item.Addons.length > 0">
          <p>Add-ons:</p>
          <ul>
            <li v-for="addon in item.Addons" :key="addon.id">
              {{ addon.name }} - ${{ addon.price }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No add-ons for this item.</p>
        </div>
      </li>
    </ul>

    <!-- Dugme za otkazivanje porudžbine -->
    <button @click="confirmCancelOrder" class="btn btn-danger">
      Cancel Order
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "OrderDetails",
  computed: {
    // Preuzimamo narudžbinu iz Vuex store-a
    ...mapState({
      order: (state) => state.orders.order,
    }),
  },
  mounted() {
    // Preuzimamo orderId iz URL parametara
    const orderId = this.$route.params.id;
    this.fetchOrderDetails(orderId); // Prosleđujemo orderId Vuex akciji
  },
  methods: {
    ...mapActions(["fetchOrderDetails", "cancelOrder"]), // Mapiranje Vuex akcija

    confirmCancelOrder() {
      if (confirm("Are you sure you want to cancel this order?")) {
        this.cancelOrder(this.$route.params.id)
          .then(() => {
            alert("Order canceled successfully!");
            this.$router.push("/orders"); // Redirekcija nakon otkazivanja
          })
          .catch((error) => {
            console.error("Error canceling order:", error);
          });
      }
    },

    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
