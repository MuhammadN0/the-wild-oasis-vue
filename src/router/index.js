import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import UsersView from "../views/UsersView.vue";
import CabinsView from "../views/CabinsView.vue";
import SettingsView from "../views/SettingsView.vue";
import BookingsView from "../views/BookingsView.vue";
import BookingDetailsView from "../views/BookingDetailsView.vue";
import AccountView from "../views/AccountView.vue";
import CheckinView from "../views/CheckinView.vue";
import LoginView from "../views/LoginView.vue";
import { auth } from "@/firebase/config";
function requireAuth(to, from, next) {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "login" });
  } else {
    next();
  }
}
function requireNoAuth(to, from, next) {
  let user = auth.currentUser;
  if (!user) {
    next();
  } else {
    next({ name: "dashboard" });
  }
}
console.log(document.documentElement.classList.contains("dark"));
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass:
    "[&>i]:text-violet-600 text-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-100",
  routes: [
    {
      path: "/dashboard",
      alias: "/",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: requireAuth,
    },
    {
      name: "checkin",
      path: "/checkin/:id",
      component: CheckinView,
      beforeEnter: requireAuth,
    },
    {
      path: "/bookings",
      name: "bookings",
      component: BookingsView,
      beforeEnter: requireAuth,
    },
    {
      path: "/booking/:id",
      name: "booking",
      component: BookingDetailsView,
      beforeEnter: requireAuth,
    },
    {
      path: "/cabins",
      name: "cabins",
      component: CabinsView,
      beforeEnter: requireAuth,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
      beforeEnter: requireAuth,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
      beforeEnter: requireAuth,
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: requireNoAuth,
    },
  ],
});

export default router;
