<template>
  <div class="container mt-5" v-if="order">
    <h2 class="mb-4 text-center">Detalji narudžbine #{{ order.id }}</h2>

    <div class="order-summary d-flex justify-content-between align-items-start">
      <div class="products-list">
        <h3>Proizvodi</h3>
        <ul class="list-group">
          <li
            v-for="item in order.OrderItems"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 class="text-right">{{ item.Coffee.name }}</h5>
              <p class="text-right">Količina: {{ item.quantity }}</p>
              <p class="text-right">Cena po komadu: {{ item.price }} RSD</p>

              <div v-if="item.Addons.length > 0">
                <h6 class="text-right">Dodaci:</h6>
                <ul class="list-group">
                  <li
                    v-for="addon in item.Addons"
                    :key="addon.id"
                    class="list-group-item text-right"
                  >
                    {{ addon.name }} - {{ addon.price }} RSD
                  </li>
                </ul>
              </div>
              <div v-else class="text-right">
                <p>Nema dodataka.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Prikaz ukupnog iznosa za plaćanje -->
      <div class="total-price-box p-4 ml-3">
        <h3 class="text-center">Ukupan iznos</h3>
        <p class="text-center total-price">{{ calculateTotal() }} RSD</p>
      </div>
    </div>

    <div v-if="order.status !== 'completed'" class="text-right mt-4">
      <button @click="confirmCancelOrder" class="btn btn-danger">
        Otkaži narudžbinu
      </button>
    </div>
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

    // Funkcija za izračunavanje ukupnog iznosa
    calculateTotal() {
      if (!this.order) return 0;
      return this.order.OrderItems.reduce((total, item) => {
        const itemTotal = item.quantity * item.price;
        const addonsTotal = item.Addons.reduce(
          (sum, addon) => sum + addon.price,
          0
        );
        return total + itemTotal + addonsTotal;
      }, 0);
    },

    confirmCancelOrder() {
      if (confirm("Da li ste sigurni da želite da otkažete ovu narudžbinu?")) {
        this.cancelOrder(this.$route.params.id)
          .then(() => {
            alert("Narudžbina je uspešno otkazana!");
            this.$router.replace("/orders");
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
  max-width: 1200px;
  margin: 0 auto;
}

.order-summary {
  display: flex;
  justify-content: space-between;
}

.products-list {
  flex: 0 0 70%; /* Proizvodi zauzimaju 70% prostora */
}

.list-group-item {
  background-color: #f9f6f2;
  border: 1px solid #d7ccc8;
  color: #5d4037;
  text-align: right;
}

.total-price-box {
  flex: 0 0 28%; /* Ukupna cena zauzima 28% prostora */
  background-color: #f9f6f2;
  border: 2px solid #d32f2f;
  border-radius: 8px;
}

.total-price {
  color: #d32f2f;
  font-size: 1.8rem;
  font-weight: bold;
}

h2,
h3 {
  color: #3e2723;
}

.btn-danger {
  background-color: #d32f2f;
}

p {
  margin-bottom: 5px;
}

ul {
  padding: 0;
}

.text-right {
  text-align: right;
}
</style>
