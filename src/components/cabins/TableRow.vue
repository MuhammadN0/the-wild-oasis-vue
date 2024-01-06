<template>
  <div
    class="grid grid-cols-10 bg-gray-50 border-t border-gray-200 items-center"
  >
    <div class="col-span-1 pr-3 py-1">
      <img :src="cabin.image" />
    </div>
    <div class="col-span-2">{{ cabin.name }}</div>
    <div class="col-span-2">Fits up to {{ cabin.maxCapacity }} guests</div>
    <div class="col-span-2">${{ cabin.regularPrice }}.00</div>
    <div class="col-span-2">
      {{ cabin.discount ? `$${cabin.discount}.00` : '-' }}
    </div>
    <div class="flex justify-end pr-3">
      <button
        @click.prevent.self="isOpen = !isOpen"
        ref="modal"
        class="border-gray-200 hover:bg-gray-200 px-2 rounded relative"
        :class="{ ' bg-gray-200': isOpen }"
      >
        <i class="fa-solid fa-ellipsis-vertical"></i>
        <OptionsMenu v-if="isOpen" :cabin="cabin" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import OptionsMenu from './OptionsMenu.vue';
const { cabin } = defineProps(['cabin']);
const isOpen = ref(false);
</script>
