<template>
    <div v-if="modalStore.state === 'deletingCabin'" class="bg-gray-50 p-10 pb-5 rounded-lg shadow-xl">
      <div class="flex items-center justify-between mb-3">
        <h1 class="text-lg ">Delete Cabin</h1>
        <button class="text-2xl" @click.prevent="modalStore.reset">&times;</button>
      </div>
      <p>Are you sure you want to delete cabin {{ modalStore.currentCabin.name }} ? </p>
      <p class="text-gray-600 text-sm mb-3">This action can't be reversed.</p>
      <div class="flex gap-2 justify-end items-center">
      <button class="px-3 py-1 border-2 rounded border-gray-800" @click.prevent="modalStore.reset">Cancel</button>
      <button class="px-3 py-1 bg-red-600 rounded text-gray-50 border-2 border-red-600 hover:bg-red-700" @click.prevent="handleDelete">Delete</button>
    </div>
    </div>
</template>

<script setup>
import useModalStore from '@/stores/modal'
import useCabinsStore from '@/stores/cabins'
const modalStore = useModalStore();
const cabinsStore = useCabinsStore();
async function handleDelete(){
  cabinsStore.deleteCabin(modalStore.currentCabin.id);
  await cabinsStore.getCabins();
  modalStore.reset();
}
</script>
