<template>
  <Sidebar v-if="auth.currentUser" />
  <Navbar v-if="auth.currentUser" />
  <main
    class="bg-gray-100 row-span-11 col-span-5 p-12 overflow-y-scroll"
    :class="{ 'row-span-12 col-span-6 flex justify-center items-center flex-col': !auth.currentUser }"
  >
    <RouterView />
  </main>
  <Modal />
</template>

<script setup>
import Sidebar from "@/components/ui/Sidebar.vue";
import Navbar from "@/components/ui/Navbar.vue";
import useCabinsStore from "@/stores/cabins";
import useSettingsStore from "@/stores/settings";
import useBookingsStore from "@/stores/bookings";
import useGuestsStore from "@/stores/guests";
import Modal from "./components/ui/Modal.vue";
import { auth } from "./firebase/config";
const cabinsStore = useCabinsStore();
cabinsStore.getCabins();
const settingsStore = useSettingsStore();
settingsStore.getSettings();
const bookingsStore = useBookingsStore();
bookingsStore.getBookings();
const guestsStore = useGuestsStore();
guestsStore.getGuests();
</script>
