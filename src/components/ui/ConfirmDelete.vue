<template>
  <div
    v-if="modalStore.state === 'deleting'"
    class="bg-gray-50 dark:bg-gray-800 dark:text-gray-100 p-10 pb-5 rounded-lg shadow-xl"
  >
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-lg">Delete {{ modalStore.resourceName }}</h1>
      <button class="text-2xl" @click.prevent="modalStore.reset">
        &times;
      </button>
    </div>
    <p>
      Are you sure you want to delete this {{ modalStore.resourceName }} ?
    </p>
    <p class="text-gray-600 text-sm mb-3 dark:text-gray-400">This action can't be reversed.</p>
    <div class="flex gap-2 justify-end items-center">
      <button
        class="px-3 py-1 border-2 rounded dark:text-gray-100 dark:border-gray-600 border-gray-800"
        @click.prevent="modalStore.reset"
      >
        Cancel
      </button>
      <button
        class="px-3 py-1 bg-red-600 rounded text-gray-50 border-2 border-red-600 hover:bg-red-700"
        @click.prevent="handler"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import useModalStore from '@/stores/modal';
const modalStore = useModalStore();
async function handler() {
  await modalStore.deleteHandler();
  modalStore.reset();
}
</script>
