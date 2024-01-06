import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import UsersView from '../views/UsersView.vue';
import CabinsView from '../views/CabinsView.vue';
import SettingsView from '../views/SettingsView.vue';
import BookingsView from '../views/BookingsView.vue';
import AccountView from '../views/AccountView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: ' [&>i]:text-violet-600 bg-gray-100',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      alias: '/',
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView,
    },
    {
      path: '/cabins',
      name: 'cabins',
      component: CabinsView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
  ],
});

export default router;
