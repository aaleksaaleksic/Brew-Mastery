<template>
  <div>
    <h2>Create New Order</h2>

    <form @submit.prevent="submitOrder">
      <div v-for="(orderItem, index) in orderItems" :key="index">
        <h3>Item {{ index + 1 }}</h3>

        <div>
          <label for="coffee">Select Coffee:</label>
          <select v-model="orderItem.selectedCoffeeId" id="coffee" required>
            <option
              v-for="coffee in coffees"
              :key="coffee.id"
              :value="coffee.id"
            >
              {{ coffee.name }} - ${{ coffee.price }}
            </option>
          </select>
        </div>

        <div>
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            v-model="orderItem.quantity"
            min="1"
            id="quantity"
            required
          />
        </div>

        <div>
          <label for="addons">Select Addons:</label>
          <div v-for="addon in addons" :key="addon.id">
            <input
              type="checkbox"
              :value="addon.id"
              v-model="orderItem.selectedAddons"
            />
            {{ addon.name }} - ${{ addon.price }}
          </div>
        </div>

        <button @click.prevent="removeOrderItem(index)" class="btn btn-danger">
          Remove Item
        </button>
      </div>

      <button @click.prevent="addOrderItem" class="btn btn-secondary">
        Add Another Item
      </button>
      <button type="submit" class="btn btn-primary">Submit Order</button>
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
          "Please select a coffee and enter a valid quantity for each item."
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
          alert("Order submitted successfully!");
          this.$router.push("/orders");
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    },
  },
};
</script>
