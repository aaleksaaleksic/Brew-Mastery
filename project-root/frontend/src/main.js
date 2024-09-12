import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/global-styles.css";

Vue.config.productionTip = false;

const token = document.cookie.split("token=")[1];
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
