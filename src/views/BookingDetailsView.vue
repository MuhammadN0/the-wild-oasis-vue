<template>
  <template v-if="!condition">
    <PageHeader/>
    <BookingDetails />
  </template>
  <div class="flex items-center justify-center" v-else>
    <Spinner/>
  </div>
</template>

<script setup>
import PageHeader from '@/components/booking-details/PageHeader.vue'
import BookingDetails from '@/components/booking-details/BookingDetails.vue'
import useBookingsStore from '@/stores/bookings'
import useCabinsStore from '@/stores/cabins'
import useGuestsStore from '@/stores/guests'
import { computed } from 'vue';
import Spinner from '@/components/ui/Spinner.vue'
const bookingsStore = useBookingsStore()
const cabinsStore = useCabinsStore();
const guestsStore = useGuestsStore();
const condition = computed(
  () =>
    bookingsStore.isLoading || guestsStore.isLoading || cabinsStore.isLoading
);
</script>
