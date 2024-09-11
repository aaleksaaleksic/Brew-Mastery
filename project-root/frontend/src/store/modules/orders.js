import axios from "axios";

const state = {
  orders: [],
  order: null,
};

const getters = {
  getAllOrders: (state) => state.orders,
};

const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setOrder(state, order) {
    state.order = order;
  },
  addOrder(state, order) {
    state.orders.push(order); // Dodajemo novu narudžbinu u listu narudžbina
  },
};

const actions = {
  async fetchOrders({ commit }) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.get("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = JSON.parse(atob(token.split(".")[1])); // Parsiranje korisnikovog ID-a iz tokena
    const userOrders = response.data.filter(
      (order) => order.userId === payload.id
    ); // Filtriramo narudžbine po korisničkom ID-u

    commit("setOrders", userOrders); // Postavljamo samo narudžbine trenutnog korisnika
  },

  async fetchOrderDetails({ commit }, orderId) {
    const token = document.cookie
      .split(";")
      .find((c) => c.includes("token"))
      .split("=")[1];
    const response = await axios.get(
      `http://localhost:3000/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("setOrder", response.data);
  },

  async cancelOrder({ dispatch }, orderId) {
    const token = document.cookie
      .split(";")
      .find((c) => c.includes("token"))
      .split("=")[1];
    await axios.delete(`http://localhost:3000/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch("fetchOrders");
  },

  // Nova akcija za kreiranje narudžbine
  async createOrder({ commit }, orderData) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.post(
      "http://localhost:3000/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("addOrder", response.data); // Dodajemo novu narudžbinu u store
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
