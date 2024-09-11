import Vue from "vue";
import Vuex from "vuex";
import orders from "./modules/orders";
import addons from "./modules/addons";
import reviews from "./modules/reviews";
import promotions from "./modules/promotions";
import users from "./modules/users";
import categories from "./modules/categories";
import coffees from "./modules/coffees";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    orders,
    addons,
    reviews,
    promotions,
    users,
    categories,
    coffees,
  },
});
