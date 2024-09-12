import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage.vue";
import LoginPage from "../components/LoginPage.vue";
import CategoryList from "../components/CategoryList.vue";
import OrdersList from "../components/OrdersList.vue";
import OrderDetails from "../components/OrderDetails.vue";
import CreateOrder from "../components/CreateOrder.vue";
import AdminOrders from "../components/AdminOrders.vue";
import AddOnsList from "../components/AddOnsList.vue";
import ManageAddOns from "../components/ManageAddOns.vue";
import ReviewsList from "../components/ReviewsList.vue";
import ManageReviews from "../components/ManageReviews.vue";
import PromotionsList from "../components/PromotionsList.vue";
import ManagePromotions from "../components/ManagePromotions.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/categories", component: CategoryList },
  { path: "/orders", component: OrdersList },
  { path: "/orders/:id", component: OrderDetails },
  { path: "/create-order", component: CreateOrder },
  {
    path: "/admin-orders",
    meta: { requiresAdmin: true },
    component: AdminOrders,
  },
  { path: "/addons", component: AddOnsList }, // Ruta za pregled Add-Ons
  {
    path: "/manage-addons",
    meta: { requiresAdmin: true }, // Meta informacija za admina
    component: ManageAddOns,
  },
  { path: "/reviews", component: ReviewsList }, // ruta za sve korisnike
  {
    path: "/manage-reviews",
    meta: { requiresAdmin: true },
    component: ManageReviews,
  },
  { path: "/promotions", component: PromotionsList },
  {
    path: "/manage-promotions",
    component: ManagePromotions,
    meta: { requiresAdmin: true },
  },
  {
    path: "/coffees",
    name: "Coffees",
    component: () => import("../views/CoffeeListView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
