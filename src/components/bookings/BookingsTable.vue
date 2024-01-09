<template>
  <div class="rounded-lg border mb-3 border-gray-200 overflow-visible">
    <!-- Table -->
    <div class="bg-gray-100 grid grid-cols-10 uppercase py-3">
      <!-- Real Table  header -->
      <div class="col-span-1 px-4">Cabin</div>
      <div class="col-span-2">Guest</div>
      <div class="col-span-2">Dates</div>
      <div class="col-span-2">Status</div>
      <div class="col-span-3">Amount</div>
    </div>
    <template v-if="bookingsStore.bookings.length">
      <TableRow
        v-for="booking in bookingsStore.bookings"
        :key="booking.id"
        :booking="booking"
      />
    </template>
    <div
      v-else-if="bookingsStore.isLoading"
      class="flex justify-center items-center"
    >
      <Spinner />
    </div>
    <div class="bg-gray-50 text-center text-xl py-20" v-else>
      No bookings to show... start adding bookings.
    </div>
  </div>
  <button
    @click.prevent=""
    class="bg-violet-600 text-white text-sm rounded-md px-3 py-2 hover:bg-violet-800"
  >
    Add new booking
  </button>
</template>

<script setup>
import Spinner from '@/components/ui/Spinner.vue';
import TableRow from './TableRow.vue';
import useBookingsStore from '@/stores/bookings';
const bookingsStore = useBookingsStore();
</script>
