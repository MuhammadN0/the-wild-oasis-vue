<template>
  <div
    class="absolute w-52 right-0 text-sm z-10 bg-white rounded border-gray-200 border p-2"
  >
    <button
      @click.prevent="handleSeeDetails"
      class="flex w-full items-center gap-2 hover:bg-gray-100 px-3 py-2 border-b"
    >
      <i class="fa-solid fa-eye"></i>
      <span>See details</span>
    </button>
    <button
      @click.prevent="handleCheckIn"
      class="flex w-full items-center gap-2 hover:bg-gray-100 px-3 py-2 border-b"
    >
    <i class="fa-solid fa-arrow-down"></i>
      <span>Check in</span>
    </button>
    <button
      @click.prevent="handleDelete"
      class="flex w-full items-center gap-2 hover:bg-gray-100 px-3 py-2 "
    >
      <i class="fa-solid fa-trash text-red-600"></i>
      <span>Delete booking</span>
    </button>

  </div>
</template>

<script setup>
import useModalStore from '@/stores/modal';
import useBookingsStore from '@/stores/bookings';
const { booking } = defineProps(['booking']);
const modalStore = useModalStore();
const bookingsStore = useBookingsStore();
function handleSeeDetails(){}
function handleCheckIn(){}
function handleDelete(){
  modalStore.startDeleteBooking(booking,async function () {
    await bookingsStore.deleteBooking(booking.id);
    await bookingsStore.getBookings();
    modalStore.reset();
  });
}
</script>
