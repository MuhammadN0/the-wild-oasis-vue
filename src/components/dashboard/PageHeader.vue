<template>
  <header class="mb-6 md:mb-12">
    <div class="justify-between text-gray-800 items-start flex flex-col md:flex-row md:items-center" :class="{'text-white' : darkmodeStore.isDarkMode}">
      <h1 class="md:text-3xl text-xl font-bold">Dashboard</h1>
        <div class="bg-white text-xs md:text-sm font-semibold flex p-1 rounded-md gap-1 dark:bg-gray-700" :class="{'bg-gray-700' : darkmodeStore.isDarkMode}">
          <button
            class="px-2 py-1 rounded-md hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('7')"
            :class="{ ' bg-violet-600 text-white': last === '7' }"
          >
            Last 7 Days
          </button>
          <button
            class="px-2 py-1 rounded-md hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('30')"
            :class="{ ' bg-violet-600 text-white': last === '30' }"
          >
            Last 30 Days
          </button>
          <button
            class="px-2 rounded-md py-1 hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('90')"
            :class="{ ' bg-violet-600 text-white': last === '90' }"
          >
            Last 90 Days
          </button>
        </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBookingsStore from '@/stores/bookings';
import useDarkmode from '@/stores/darkmode'
const darkmodeStore = useDarkmode()
const bookingsStore = useBookingsStore();
const route = useRoute();
const router = useRouter();
const last = ref('7');
watch(last, (newVal) => {
  if (last.value === route.query.last) return;
  router.push({ query: { ...route.query,last: newVal } });
  bookingsStore.last = Number(newVal);
});
bookingsStore.last = Number(route.query.last) || 7;
last.value = route.query.last || '7';
function changeFilter(val) {
  last.value = val;
}
</script>
