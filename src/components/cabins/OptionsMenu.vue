<template>

  <div class="absolute w-52 right-0 z-10  bg-white rounded border-gray-200  border p-2">
    <button @click.prevent="modalStore.startEditing(cabin)" class="flex w-full items-center gap-2 hover:bg-gray-100 px-3 py-2 border-b">
      <i class="fa-solid fa-pen"></i>
      <span>Edit cabin</span>
    </button>
    <button @click.prevent="modalStore.startDeleteCabin(cabin)" class="flex w-full items-center gap-2 hover:bg-gray-100 px-3 py-2 border-b">
      <i class="fa-solid fa-trash text-red-600"></i>
      <span>Delete cabin</span>
    </button>
    <button class="flex w-full items-center gap-2 hover:bg-gray-100 px-3 py-2">
      <i class="fa-solid fa-copy text-violet-600"></i>
      <span>Duplicate cabin</span>
    </button>
  </div>
</template>

<script setup>
import useModalStore from '@/stores/modal'
const {cabin} = defineProps(['cabin'])
const modalStore = useModalStore();
</script>