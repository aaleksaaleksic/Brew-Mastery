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
  // Nova mutacija za ažuriranje statusa narudžbine
  SET_ORDER_STATUS(state, { orderId, status }) {
    const order = state.orders.find((order) => order.id === orderId);
    if (order) {
      order.status = status;
    }
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
  async fetchAdminOrders({ commit }) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.get("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit("setOrders", response.data);
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

  // Nova akcija za ažuriranje statusa narudžbine
  async updateStatus({ commit }, { orderId, status }) {
    const token = document.cookie.split("token=")[1];
    try {
      await axios.put(
        `http://localhost:3000/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("SET_ORDER_STATUS", { orderId, status }); // Ažuriramo status narudžbine
    } catch (error) {
      console.error("Error updating status:", error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
