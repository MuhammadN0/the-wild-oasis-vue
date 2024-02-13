<template v-if="cabinsStore.cabins.length">
  <div
    class="grid text-gray-800 grid-cols-10 bg-gray-50 border-t border-gray-200 items-center py-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 text-[8px]"
  >
    <div class="col-span-1 md:text-base sono font-semibold md:px-4 pl-1 py-1">
      {{ cabinName }}
    </div>
    <div class="col-span-2">
      <p class="md:text-sm font-semibold">
        {{
          guestsStore.guests.find((guest) => guest.id === booking.guestId)
            ?.fullName ?? ''
        }}
      </p>
      <p class="md:text-xs text-[6px] text-gray-500">
        {{
          guestsStore.guests.find((guest) => guest.id === booking.guestId)
            ?.email ?? ''
        }}
      </p>
    </div>
    <div class="col-span-2">
      <div class="md:text-sm mb-1">
        {{ isBookingBefore ? '' : 'In ' }}{{ startDateDistance
        }}{{ isBookingBefore ? ' Ago' : '' }} &rarr; {{ duration }} Nights
      </div>
      <div class="md:text-xs text-gray-500">{{ startDate }} - {{ endDate }}</div>
    </div>
    <div class="col-span-2">
      <span
        class="md:text-[10px] text-[6px] font-semibold px-2 uppercase py-1 rounded-full"
        :class="statusClass"
        >{{ booking.status }}</span
      >
    </div>
    <div class="col-span-2 md:text-base sono font-semibold">
      {{ booking.totalPrice ? `$${booking.totalPrice}.00` : '-' }}
    </div>
    <div class="flex justify-end pr-3">
      <button
        @click.prevent="isOpen = !isOpen"
        ref="modal"
        class="border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 px-2 rounded relative"
        :class="{ ' bg-gray-200 dark:bg-gray-800': isOpen }"
      >
        <i ref="dots" class="fa-solid md:text-base fa-ellipsis-vertical"></i>
        <OptionsMenu v-if="isOpen" :booking="booking" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue';
import {
  format,
  formatDistanceToNow,
  isBefore,
  differenceInDays,
} from 'date-fns';
import OptionsMenu from './OptionsMenu.vue';
import useCabinsStore from '@/stores/cabins';
import useGuestsStore from '@/stores/guests';
const { booking } = defineProps(['booking']);
const cabinsStore = useCabinsStore();
const guestsStore = useGuestsStore();
const isOpen = ref(false);
const cabinName = computed(
  () => cabinsStore.cabins.find((cabin) => cabin.id === booking.cabinId).name
);
const startDateDistance = computed(() =>
  formatDistanceToNow(new Date(booking.startDate)).replace('about', '')
);
const duration = computed(() =>
  differenceInDays(booking.endDate, booking.startDate)
);
const isBookingBefore = computed(() => isBefore(booking.startDate, new Date()));
const startDate = computed(() => format(booking.startDate, 'dd MMM yyyy'));
const endDate = computed(() => format(booking.endDate, 'dd MMM yyyy'));
const statusClass = computed(() => {
  switch (booking.status) {
    case 'unconfirmed':
      return 'bg-blue-100 text-blue-600';
    case 'checked-in':
      return 'bg-green-100 text-green-600';
    case 'checked-out':
      return 'bg-gray-200 text-gray-600';
    default:
      return '';
  }
});
const modal = ref(null);
function detectClick(e) {
  if(!modal.value.contains(e.target)) isOpen.value = false
}
window.addEventListener('click', detectClick);
onUnmounted(() => window.removeEventListener('click', detectClick));
</script>
