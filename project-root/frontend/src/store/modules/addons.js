import axios from "axios";

const state = {
  addons: [],
};

const getters = {
  allAddons: (state) => state.addons,
};

const actions = {
  async fetchAddons({ commit }) {
    const response = await axios.get("http://localhost:3000/addons");
    commit("setAddons", response.data);
  },
  async createAddon({ commit }, addonData) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.post(
      "http://localhost:3000/addons",
      addonData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("addAddon", response.data);
  },
  async deleteAddon({ commit }, addonId) {
    const token = document.cookie.split("token=")[1];
    await axios.delete(`http://localhost:3000/addons/${addonId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("removeAddon", addonId);
  },
  // Akcija za ažuriranje dodataka (edit)
  async updateAddon({ commit }, addonData) {
    const token = document.cookie.split("token=")[1];
    try {
      const response = await axios.put(
        `http://localhost:3000/addons/${addonData.id}`,
        {
          // Proveri da li je API format ovaj, šaljemo name i price direktno
          name: addonData.name,
          price: addonData.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("updateAddon", response.data);
    } catch (error) {
      console.error("Error updating addon:", error);
      throw error;
    }
  },
};

const mutations = {
  setAddons: (state, addons) => (state.addons = addons),
  addAddon: (state, addon) => state.addons.push(addon),
  removeAddon: (state, addonId) => {
    state.addons = state.addons.filter((addon) => addon.id !== addonId);
  },
  updateAddon: (state, updatedAddon) => {
    const index = state.addons.findIndex(
      (addon) => addon.id === updatedAddon.id
    );
    if (index !== -1) {
      state.addons.splice(index, 1, updatedAddon);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
