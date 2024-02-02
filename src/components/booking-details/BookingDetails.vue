<template>
  <div class="rounded-xl mb-5 overflow-hidden bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
    <header
      class="text-lg bg-violet-600 text-violet-200 px-8 py-6 bg flex items-center justify-between"
    >
      <div>
        <i class="fa-solid fa-hotel fa-lg mr-4"></i>
        <span
          >{{ duration }} Nights in Cabin
          <span class="sono font-semibold">{{ cabinName }}</span></span
        >
      </div>
      <div>
        {{ startDate }} ({{
          isBookingBefore ? distance + ' Ago' : 'In ' + distance
        }}) - {{ endDate }}
      </div>
    </header>
    <div class="p-8 pb-3">
      <p class="font-semibold flex items-center gap-3 mb-7">
        <span class="w-8"><img :src="guestFlag" /></span>
        {{ guestName }} <span>•</span>
        <span class="text-sm text-gray-500">{{ guestEmail }}</span>
        <span>•</span> <span class="text-gray-500">{{ guestNationalId }}</span>
      </p>
      <p
        v-if="booking.observations.length"
        class="flex gap-3 items-center mb-4"
      >
        <i class="fa-regular text-violet-600 fa-comment"></i>
        <span class="font-semibold">observations</span>
        <span>{{ booking.observations }}</span>
      </p>
      <p class="flex gap-3 items-center mb-7">
        <i class="text-violet-600 fa-regular fa-circle-check"></i>
        <span class="font-semibold">Breakfast Included?</span>
        <span>{{ booking.hasBreakfast ? 'Yes' : 'No' }}</span>
      </p>
      <div
        class="bg-yellow-100 text-yellow-700 flex items-center justify-between p-5 rounded font-semibold mb-7"
        :class="{ 'bg-green-300 text-green-700': booking.isPaid }"
      >
        <p>
          <i class="fa-solid fa-money-bills"></i> Total price
          <span>${{ booking.totalPrice }}.00</span>
        </p>
        <p class="uppercase">
          {{ booking.isPaid ? 'Paid' : 'Will pay at property' }}
        </p>
      </div>
      <p class="flex items-center justify-end text-xs text-gray-500">
        Booked {{ createdAt }}
      </p>
    </div>
  </div>
  <div
    class="flex items-center justify-end gap-5"
    v-if="route.path.split('/')[1] === 'booking'"
  >
    <button
      @click.prevent="router.go(-1)"
      class="rounded px-3 py-2 border dark:border-gray-600 dark:text-gray-100 border-gray-800"
    >
      Back
    </button>
    <button
      @click.prevent="handleDelete"
      class="rounded px-3 py-2 bg-red-700 text-red-50 hover:bg-red-800"
    >
      Delete Booking
    </button>
    <button
      class="rounded px-3 py-2 bg-violet-600 text-violet-50 hover:bg-violet-700"
      v-if="booking.status === 'unconfirmed'"
      @click.prevent="
        router.push({ name: 'checkin', params: { id: booking.id } })
      "
    >
      Check in
    </button>
    <button
      class="rounded px-3 py-2 bg-violet-600 text-violet-50 hover:bg-violet-700"
      v-else-if="booking.status === 'checked-in'"
      @click.prevent="handleCheckout"
    >
      Check out
    </button>
  </div>
  <template v-if="route.path.split('/')[1] === 'checkin'">
    <div
      v-if="!booking.hasBreakfast"
      class="bg-gray-50 flex items-center gap-3 px-6 py-6 mb-6"
    >
      <input
        class="accent-violet-600 scale-150"
        type="checkbox"
        v-model="hasBreakfast"
      />
      <label class="flex-1"
        >Include breakfast for ${{
          settingsStore.settings.breakfastPrice * duration
        }}.00</label
      >
    </div>
    <div class="bg-gray-50 dark:bg-gray-700 flex items-center gap-3 px-6 py-6 mb-6">
      <input
        class="accent-violet-600 scale-150"
        type="checkbox"
        v-model="isPaid"
        :disabled="isPaid"
        :class="{ 'cursor-not-allowed': isPaid }"
        id="paid"
      />
      <label class="flex-1 "
        >I confirm that {{ guestName }} Paid a full price of ${{
          booking.hasBreakfast
            ? booking.totalPrice
            : booking.totalPrice +
              (hasBreakfast
                ? +settingsStore.settings.breakfastPrice * duration
                : 0)
        }}.00</label
      >
    </div>
    <div
      class="flex items-center justify-end gap-5"
      v-if="route.path.split('/')[1] === 'checkin' && booking.status ==='unconfirmed'"
    >
      <button
        @click.prevent="router.go(-1)"
        class="rounded px-3 py-2 border border-gray-800 dark:border-gray-600 dark:text-gray-100"
      >
        Back
      </button>
      <button
        class="rounded px-3 py-2 bg-violet-600 text-violet-50 hover:bg-violet-700"
        :disabled="!isPaid"
        :class="{ 'cursor-not-allowed': !isPaid }"
        @click.prevent="handleCheckIn"
      >
        <Spinner v-if="bookingsStore.isLoading" />
        <template v-else> Check in </template>
      </button>
    </div>
  </template>
</template>

<script setup>
import useBookingsStore from '@/stores/bookings';
import useGuestsStore from '@/stores/guests';
import useCabinsStore from '@/stores/cabins';
import useModalStore from '@/stores/modal';
import useSettingsStore from '@/stores/settings';
import Spinner from '@/components/ui/Spinner.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import {
  format,
  formatDistanceToNow,
  isBefore,
  differenceInDays,
} from 'date-fns';
const route = useRoute();
const router = useRouter();
const bookingId = route.params.id;
const settingsStore = useSettingsStore();
const bookingsStore = useBookingsStore();
const cabinsStore = useCabinsStore();
const guestsStore = useGuestsStore();
const modalStore = useModalStore();
const booking = computed(() =>
  bookingsStore.bookings.find((booking) => booking.id === bookingId)
);
const isPaid = ref(booking.value.isPaid);
const hasBreakfast = ref(booking.value.hasBreakfast);
watch(hasBreakfast, () => {
  isPaid.value = false;
});
const cabinName = computed(
  () =>
    cabinsStore.cabins.find((cabin) => booking.value.cabinId === cabin.id).name
);
const guestName = computed(
  () =>
    guestsStore.guests.find((guest) => booking.value.guestId === guest.id)
      .fullName
);
const guestEmail = computed(
  () =>
    guestsStore.guests.find((guest) => booking.value.guestId === guest.id).email
);
const guestNationalId = computed(
  () =>
    guestsStore.guests.find((guest) => booking.value.guestId === guest.id)
      .nationalID
);
const guestFlag = computed(
  () =>
    guestsStore.guests.find((guest) => booking.value.guestId === guest.id)
      .countryFlag
);
const startDate = computed(() =>
  format(booking.value.startDate, 'iii, MMM dd yyyy')
);
const endDate = computed(() =>
  format(booking.value.endDate, 'iii, MMM dd yyyy')
);
const createdAt = computed(() =>
  format(booking.value.created_at, 'iii, MMM dd yyyy h:m b')
);
const distance = computed(() =>
  formatDistanceToNow(new Date(booking.value.startDate)).replace('about', '')
);
const isBookingBefore = computed(() =>
  isBefore(booking.value.startDate, new Date())
);
const duration = computed(() =>
  differenceInDays(booking.value.endDate, booking.value.startDate)
);
function handleDelete() {
  modalStore.startDeleteBooking(booking, async function () {
    await bookingsStore.deleteBooking(booking.value.id);
    await bookingsStore.getBookings();
    router.push({ name: 'bookings' });
    modalStore.reset();
  });
}
async function handleCheckIn() {
  await bookingsStore.checkIn(booking.value.id, {
    status: 'checked-in',
    isPaid: true,
    hasBreakfast: hasBreakfast.value,
    totalPrice: booking.value.hasBreakfast
      ? booking.value.totalPrice
      : booking.value.totalPrice +
        (hasBreakfast.value
          ? +settingsStore.settings.breakfastPrice * duration.value
          : 0),
  });
  router.push({name:'bookings',query:{filter:'checked-in'}})
}
async function handleCheckout() {
  await bookingsStore.checkOut(booking.value.id)
  router.push({name:'bookings',query:{filter:'checked-out'}})
}
</script>
