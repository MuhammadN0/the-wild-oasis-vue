<template>
  <div
    class="grid items-center first-of-type:border-t border-b py-2 grid-cols-6 gap-3 text-sm"
  >
    <span
      class="text-[10px] font-semibold uppercase flex justify-center rounded-full"
      :class="{
        '  text-blue-700 bg-blue-100': booking.status === 'checked-in',
        ' text-green-700 bg-green-100': booking.status === 'unconfirmed',
      }"
      >{{ booking.status === "unconfirmed" ? "Arriving" : "Departing" }}</span
    >
    <div class="col-span-3 flex items-center gap-2">
      <img class="w-5" :src="guest.countryFlag" />
      <p class="font-medium">{{ guest.fullName }}</p>
    </div>
    <span class="text-xs"
      >{{ booking.numNights }} Night{{ booking.numNights > 1 ? "s" : "" }}</span
    >
    <button
      class="bg-violet-600 text-white rounded px-2 text-xs py-1 hover:bg-violet-700"
      v-if="booking.status === 'unconfirmed'"
      @click.prevent="handleCheckin"
    >
      Check in
    </button>
    <button
      class="bg-violet-600 text-white rounded px-1 text-xs py-1 hover:bg-violet-700"
      v-else
      @click.prevent="handleCheckout"
    >
      Check out
    </button>
  </div>
</template>

<script setup>
import useGuestsStore from "@/stores/guests";
import useBookingsStore from '@/stores/bookings';
import { computed } from "vue";
import { useRouter } from "vue-router";
const { booking } = defineProps(["booking"]);
const guestsStore = useGuestsStore();
const bookingsStore = useBookingsStore()
const router = useRouter();
const guest = computed(() =>
  guestsStore.guests.find((guest) => guest.id === booking.guestId)
);
function handleCheckin() {
  router.push({name:'checkin',params:{id:booking.id}})
}
async function handleCheckout() {
  await bookingsStore.checkOut(booking.id)
}
</script>
