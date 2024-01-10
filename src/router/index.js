import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import UsersView from '../views/UsersView.vue';
import CabinsView from '../views/CabinsView.vue';
import SettingsView from '../views/SettingsView.vue';
import BookingsView from '../views/BookingsView.vue';
import BookingDetailsView from '../views/BookingDetailsView.vue';
import AccountView from '../views/AccountView.vue';
import CheckinView from '../views/CheckinView.vue';

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
      name:'checkin',
      path: '/checkin/:id',
      component: CheckinView,
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView,
    },
    {
      path: '/booking/:id',
      name: 'booking',
      component: BookingDetailsView
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
