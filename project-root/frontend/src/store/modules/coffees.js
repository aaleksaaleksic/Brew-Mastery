import axios from "axios";

const state = {
  coffees: [], // Inicijalno stanje za kafe
};

const getters = {
  allCoffees: (state) => state.coffees, // Getter za sve kafe
};

const actions = {
  // Akcija za preuzimanje kafa sa servera
  async fetchCoffees({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/coffees");
      commit("setCoffees", response.data); // Postavljamo dobijene podatke u state
    } catch (error) {
      console.error("Error fetching coffees:", error);
    }
  },
};

const mutations = {
  // Mutacija za postavljanje kafa u state
  setCoffees: (state, coffees) => (state.coffees = coffees),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
