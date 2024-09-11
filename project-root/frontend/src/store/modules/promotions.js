import axios from "axios";

const state = {
  promotions: [],
};

const getters = {
  allPromotions: (state) => state.promotions,
};

const actions = {
  async fetchPromotions({ commit }) {
    const response = await axios.get("http://localhost:3000/promotions");
    commit("setPromotions", response.data);
  },
  async createPromotion({ commit }, promotionData) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.post(
      "http://localhost:3000/promotions",
      promotionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("addPromotion", response.data);
  },
  async updatePromotion({ commit }, promotionData) {
    const token = document.cookie.split("token=")[1];
    const response = await axios.put(
      `http://localhost:3000/promotions/${promotionData.id}`,
      promotionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("updatePromotion", response.data);
  },
  async deletePromotion({ commit }, promotionId) {
    const token = document.cookie.split("token=")[1];
    await axios.delete(`http://localhost:3000/promotions/${promotionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("removePromotion", promotionId);
  },
};

const mutations = {
  setPromotions: (state, promotions) => (state.promotions = promotions),
  addPromotion: (state, promotion) => state.promotions.push(promotion),
  updatePromotion: (state, updatedPromotion) => {
    const index = state.promotions.findIndex(
      (promotion) => promotion.id === updatedPromotion.id
    );
    if (index !== -1) {
      state.promotions.splice(index, 1, updatedPromotion);
    }
  },
  removePromotion: (state, promotionId) => {
    state.promotions = state.promotions.filter(
      (promotion) => promotion.id !== promotionId
    );
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
