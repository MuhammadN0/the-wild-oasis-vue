<template>
  <div
    class="bg-gray-50 col-span-2 md:col-span-1 rounded-md flex items-center flex-col md:flex-row gap-1 md:gap-4 p-2 md:p-4 shadow-sm shadow-gray-200 text-center md:text-left"
    :class="{
      'bg-gray-700 shadow-gray-500 text-gray-50': darkmodeStore.isDarkMode,
    }"
  >
    <div :class="iconDivClass">
      <i :class="iconClassComputed"></i>
    </div>
    <div>
      <h3
        class="text-gray-700 text-sm dark:text-gray-300 uppercase"
        
      >
        {{ title }}
      </h3>
      <p class="font-medium text-lg md:text-2xl">{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useDarkmode from "@/stores/darkmode";
const darkmodeStore = useDarkmode();
const { colorClass, content, iconClass, title } = defineProps([
  "title",
  "iconClass",
  "colorClass",
  "content",
]);
const iconDivClass = computed(
  () =>
    `bg-${colorClass}-${
      !darkmodeStore.isDarkMode ? '100' : '800'
    } aspect-square px-2 md:px-4 rounded-full flex items-center justify-center`
);
const iconClassComputed = computed(
  () =>
    ` ${iconClass} text-${colorClass}-${
      !darkmodeStore.isDarkMode ? '700' : '100'
    } text-sm md:text-xl text-${colorClass}-700`
);
</script>
