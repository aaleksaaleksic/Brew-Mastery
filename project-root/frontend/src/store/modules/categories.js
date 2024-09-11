import axios from "axios";

const state = {
  categories: [], // Inicijalno stanje, prazan niz kategorija
};

const getters = {
  allCategories: (state) => state.categories, // Getter koji vraća sve kategorije iz stanja
};

const actions = {
  // Akcija koja koristi axios za preuzimanje kategorija sa API-ja
  async fetchCategories({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      commit("setCategories", response.data); // Pozivamo mutaciju da ažuriramo stanje
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
};

const mutations = {
  // Mutacija koja postavlja preuzete kategorije u stanje Vuex store-a
  setCategories: (state, categories) => (state.categories = categories),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
