import axios from "axios";

const state = {
  users: [],
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    const token = document.cookie
      .split(";")
      .find((c) => c.includes("token"))
      ?.split("=")[1];

    if (!token) {
      console.error("No authentication token found.");
    }

    try {
      const response = await axios.get("http://localhost:8001/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("setUsers", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
