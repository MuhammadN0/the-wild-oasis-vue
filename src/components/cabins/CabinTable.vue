<template>
  <TableHeader />
  <div class="rounded-lg overflow-visible border mb-3 border-gray-200 dark:border-gray-600 ">
    <!-- Table -->
    <div class="bg-gray-100 dark:bg-gray-800 dark:text-gray-100  grid grid-cols-10 uppercase py-3">
      <!-- Real Table  header -->
      <div class="col-span-1"></div>
      <div class="col-span-2">Cabin</div>
      <div class="col-span-2">Capacity</div>
      <div class="col-span-2">Price</div>
      <div class="col-span-3">Discount</div>
    </div>
    <template v-if="cabinsStore.cabins.length">
      <TableRow
        v-for="cabin in cabinsStore.formattedCabins"
        :key="cabin.id"
        :cabin="cabin"
      />
    </template>
    <div
      v-else-if="cabinsStore.isLoading"
      class="flex justify-center items-center"
    >
      <Spinner />
    </div>
    <div class="bg-gray-50 text-center text-xl py-20" v-else>
      No cabins to show... start adding cabins.
    </div>
  </div>
  <button
    @click.prevent="modalStore.startAddCabin"
    class="bg-violet-600 text-white text-sm rounded-md px-3 py-2 hover:bg-violet-800"
  >
    Add new Cabin
  </button>
</template>

<script setup>
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import useModalStore from '@/stores/modal';
import useCabinsStore from '@/stores/cabins';
import Spinner from '../ui/Spinner.vue';
const modalStore = useModalStore();
const cabinsStore = useCabinsStore();
</script>
