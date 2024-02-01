<template>
  <header class="mb-12">
    <div class="justify-between text-gray-800 items-center flex">
      <h1 class="text-3xl font-bold">All bookings</h1>
      <div class="flex gap-10">
        <div class="bg-white dark:bg-gray-700 dark:text-gray-100 text-sm font-semibold flex p-1 rounded-md gap-1">
          <button
            class="px-2 py-1 rounded-md hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('all')"
            :class="{ ' bg-violet-600 text-white': filter === 'all' }"
          >
            All
          </button>
          <button
            class="px-2 py-1 rounded-md hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('checked-out')"
            :class="{ ' bg-violet-600 text-white': filter === 'checked-out' }"
          >
            Checked-out
          </button>
          <button
            class="px-2 rounded-md py-1 hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('checked-in')"
            :class="{ ' bg-violet-600 text-white': filter === 'checked-in' }"
          >
            Checked-in
          </button>
          <button
            class="px-2 rounded-md py-1 hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('unconfirmed')"
            :class="{ ' bg-violet-600 text-white': filter === 'unconfirmed' }"
          >
            Unconfirmed
          </button>
        </div>
        <select v-model="sort" class="px-5 dark:bg-gray-700 dark:text-gray-100">
          <option value="date|recent">Sort by date (recent first)</option>
          <option value="date|early">Sort by date (earlier first)</option>
          <option value="amount|highFirst">Sort by amount (high first)</option>
          <option value="amount|lowFirst">Sort by amount (low first)</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBookingsStore from '@/stores/bookings';
const bookingsStore = useBookingsStore();
const route = useRoute();
const router = useRouter();
const sort = ref(route?.query?.sort ?? 'date|recent');
bookingsStore.sort = route?.query?.sort ?? 'date|recent'
const filter = ref('all');
watch(sort, (newVal) => {
  if (sort.value === route.query.sort) return;
  router.push({ query: { ...route.query,sort: newVal } });
  bookingsStore.sort = newVal;
});
watch(filter, (newVal) => {
  if (filter.value === route.query.filter) return;
  router.push({ query: { ...route.query,filter: newVal } });
  bookingsStore.filter = newVal;
});
bookingsStore.filter = route.query.filter || 'all';
filter.value = route.query.filter || 'all';
function changeFilter(val) {
  filter.value = val;
}
</script>
