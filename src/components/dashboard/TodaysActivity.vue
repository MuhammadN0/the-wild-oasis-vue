<template>
  <div class="col-span-2 p-4 pb-6 rounded-md bg-gray-50">
    <h3 class="font-medium text-lg mb-4">Today</h3>
    <template v-if="bookingsStore.todaysActivityBookings.length">
      <Activity v-for="booking in bookingsStore.todaysActivityBookings" :key="booking.id" :booking="booking" />
    </template>
    <p v-else>No Activities for today.</p>
  </div>
</template>


<script setup>
import Activity from './Activity.vue';
import useBookingsStore from '@/stores/bookings'
const bookingsStore = useBookingsStore();
</script>