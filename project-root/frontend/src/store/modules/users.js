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
      .split("=")[1];
    const response = await axios.get("http://localhost:8001/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("setUsers", response.data);
  },
};

export default {
  state,
  mutations,
  actions,
};
