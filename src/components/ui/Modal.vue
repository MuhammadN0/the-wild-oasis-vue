<template>
  <Teleport to="body" v-if="store.isOpen">
    <div
      class="absolute top-0 left-0 h-full w-full z-40 backdrop-filter backdrop-blur-sm bg-gray-300 bg-opacity-20 flex justify-center items-center"
      @click.self.prevent="props.closeForm"
    >
  <slot></slot>
  </div>
  </Teleport>
</template>

<script setup>
import useModalStore from '@/stores/modal'
const store = useModalStore();
</script>
