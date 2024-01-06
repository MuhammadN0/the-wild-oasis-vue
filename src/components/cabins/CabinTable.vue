<template>
  <TableHeader />
  <div class="rounded-lg border mb-3 border-gray-200 overflow-hidden">
    <!-- Table -->
    <div class="bg-gray-100 grid grid-cols-10 uppercase py-3">
      <!-- Real Table  header -->
      <div class="col-span-1"></div>
      <div class="col-span-2">Cabin</div>
      <div class="col-span-2">Capacity</div>
      <div class="col-span-2">Price</div>
      <div class="col-span-3">Discount</div>
    </div>
    <TableRow v-for="cabin in cabinsStore.cabins" :key="cabin.id" :cabin="cabin" />
  </div>
  <button @click.prevent="modalStore.startAddCabin" class="bg-violet-600 text-white text-sm rounded-md px-3 py-2 hover:bg-violet-800">
    Add new Cabin
  </button>
</template>

<script setup>
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import useModalStore from '@/stores/modal'
import useCabinsStore from '@/stores/cabins'
const modalStore = useModalStore();
const cabinsStore = useCabinsStore();
</script>
