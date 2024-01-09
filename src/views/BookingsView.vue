<template>
  <PageHeader />
  <BookingsTable v-if="!condition" />
  <div class="flex items-center justify-center" v-else>
    <Spinner />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import PageHeader from '@/components/bookings/PageHeader.vue';
import BookingsTable from '@/components/bookings/BookingsTable.vue';
import useBookingsStore from '@/stores/bookings';
import useGuestsStore from '@/stores/guests';
import useCabinsStore from '@/stores/cabins';
import Spinner from '@/components/ui/Spinner.vue';

const bookingsStore = useBookingsStore();
const guestsStore = useGuestsStore();
const cabinsStore = useCabinsStore();
const condition = computed(
  () =>
    bookingsStore.isLoading || guestsStore.isLoading || cabinsStore.isLoading
);
</script>
