<template>
  <div
    class="bg-gray-50 rounded-md flex items-center gap-4 px-4 py-4 shadow-sm shadow-gray-200"
  >
    <div :class="iconDivClass">
      <i :class="iconClassComputed"></i>
    </div>
    <div>
      <h3 class="text-gray-700 uppercase">{{ title }}</h3>
      <p class="font-medium text-2xl">{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const { colorClass, content, iconClass, title } = defineProps([
  "title",
  "iconClass",
  "colorClass",
  "content",
]);
const iconDivClass = computed(
  () =>
    `bg-${colorClass}-100 aspect-square px-4  rounded-full flex items-center justify-center`
);
const iconClassComputed = computed(
  () => ` ${iconClass} text-${colorClass}-700 text-xl text-${colorClass}-700`
);
</script>
