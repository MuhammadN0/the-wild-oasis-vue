<template>
  <header class="mb-12">
    <div class="justify-between text-gray-800 dark:text-gray-100 items-center flex">
      <h1 class="text-3xl font-bold">Our Cabins</h1>
      <div class="flex gap-10">
        <div class="bg-white text-sm font-semibold flex p-1 rounded-md gap-1 dark:bg-gray-700 dark:text-gray-100">
          <button
            class="px-2 py-1 rounded-md hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('all')"
            :class="{ ' bg-violet-600 text-white': filter === 'all' }"
          >
            All
          </button>
          <button
            class="px-2 py-1 rounded-md hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('without')"
            :class="{ ' bg-violet-600 text-white': filter === 'without' }"
          >
            No discount
          </button>
          <button
            class="px-2 rounded-md py-1 hover:bg-violet-600 hover:text-white"
            @click.prevent="changeFilter('with')"
            :class="{ ' bg-violet-600 text-white': filter === 'with' }"
          >
            With disctount
          </button>
        </div>
        <select v-model="sort" class="px-5 dark:bg-gray-700 text-gray-100">
          <option value="name|atz">Sort by Name (A-Z)</option>
          <option value="name|zta">Sort by Name (Z-A)</option>
          <option value="price|lowFirst">Sort by Price (Low first)</option>
          <option value="price|highFirst">Sort by Price (High first)</option>
          <option value="capacity|lowFirst">
            Sort by Capacity (Low first)
          </option>
          <option value="capacity|highFirst">
            Sort by Capacity (High first)
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCabinsStore from '@/stores/cabins';
const cabinsStore = useCabinsStore();
const route = useRoute();
const router = useRouter();
const sort = ref(route?.query?.sort ?? 'name|atz');
cabinsStore.sort = route?.query?.sort ?? 'name|atz'
const filter = ref('all');
watch(sort, (newVal) => {
  if (sort.value === route.query.sort) return;
  router.push({ query: { ...route.query,sort: newVal } });
  cabinsStore.sort = newVal;
});
watch(filter, (newVal) => {
  if (filter.value === route.query.filter) return;
  router.push({ query: { ...route.query,filter: newVal } });
  cabinsStore.filter = newVal;
});
cabinsStore.filter = route.query.filter || 'all';
filter.value = route.query.filter || 'all';
function changeFilter(val) {
  filter.value = val;
}
</script>
