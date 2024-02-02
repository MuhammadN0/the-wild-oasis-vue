<template>
  <aside
    class="bg-gray-50 pt-20 col-span-1 text-gray-800 row-span-full dark:text-gray-100 border-r border-r-gray-200"
    :class="{ 'bg-gray-700 border-r-gray-600': darkmodeStore.isDarkMode }"
  >
    <div class="max-w-40 mx-auto mb-10">
      <img v-if="!darkmodeStore.isDarkMode" src="@/assets/logo-light.png" />
      <img v-else src="@/assets/logo-dark.png" />
    </div>
    <nav class="max-w-48 mx-auto">
      <ul class="w-full">
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-2"
            :to="{ name: 'dashboard' }"
          >
            <i class="fa-solid fa-house fa-lg"></i> Home
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-2"
            :to="{ name: 'bookings' }"
          >
            <i class="fa-regular fa-calendar-check fa-lg"></i> Bookings
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-2"
            :to="{ name: 'cabins' }"
          >
            <i class="fa-solid fa-hotel fa-lg"></i> Cabins
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-2"
            :to="{ name: 'users' }"
          >
            <i class="fa-solid fa-user fa-lg"></i> Users
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-2"
            :to="{ name: 'settings' }"
          >
            <i class="fa-solid fa-gear fa-lg"></i> Settings
          </RouterLink>
        </li>
      </ul>
    </nav>
    <!-- <Uploader /> -->
  </aside>
</template>

<script setup>
// import Uploader from '@/data/Uploader.vue'
import useDarkmode from "@/stores/darkmode";
const darkmodeStore = useDarkmode();
</script>
