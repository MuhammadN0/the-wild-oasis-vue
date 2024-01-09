<template>
  <Sidebar />
  <Navbar />
  <main class="bg-gray-100 row-span-11 col-span-5 p-12 overflow-y-scroll">
    <RouterView />
  </main>
  <Modal />
</template>

<script setup>
import Sidebar from '@/components/ui/Sidebar.vue';
import Navbar from '@/components/ui/Navbar.vue';
import useCabinsStore from '@/stores/cabins';
import useSettingsStore from '@/stores/settings';
import useBookingsStore from '@/stores/bookings'
import useGuestsStore from '@/stores/guests'
import Modal from './components/ui/Modal.vue';
const cabinsStore = useCabinsStore();
cabinsStore.getCabins();
const settingsStore = useSettingsStore();
settingsStore.getSettings();
const bookingsStore = useBookingsStore();
bookingsStore.getBookings();
const guestsStore = useGuestsStore();
guestsStore.getGuests()
</script>
