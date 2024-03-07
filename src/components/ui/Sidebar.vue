<template>
  <aside
    class="bg-gray-50 pt-52 md:pt-20 col-span-1 text-gray-800 row-span-full dark:text-gray-100 border-r border-r-gray-200"
    :class="{ 'bg-gray-700 border-r-gray-600': darkmodeStore.isDarkMode }"
  >
    <div class="max-w-12 mx-auto md:max-w-40 mb-10">
      <img v-if="!darkmodeStore.isDarkMode" src="@/assets/logo-light.png" />
      <img v-else src="@/assets/logo-dark.png" />
    </div>
    <nav class="max-w-48 flex justify-center mx-auto">
      <ul class="w-full flex flex-col gap-6 md:gap-0 ">
        <li class="[&>*>i]:hover:text-violet-600  w-full mb-2">
          <RouterLink
            class="flex rounded justify-center 
            md:justify-normal w-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-5 md:py-3"
            :to="{ name: 'dashboard' }"
          >
            <i class="fa-solid fa-house fa-lg"></i> <span class="hidden md:inline">Home</span>
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full justify-center md:justify-normal hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-5 md:py-3"
            :to="{ name: 'bookings' }"
          >
            <i class="fa-regular fa-calendar-check fa-lg"></i> <span class="hidden md:inline">Bookings</span>
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600  w-full mb-2">
          <RouterLink
            class="flex rounded w-full justify-center md:justify-normal hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-5 md:py-3"
            :to="{ name: 'cabins' }"
          >
            <i class="fa-solid fa-hotel fa-lg"></i> <span class="hidden md:inline">Cabins</span>
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full justify-center md:justify-normal hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-5 md:py-3"
            :to="{ name: 'users' }"
          >
            <i class="fa-solid fa-user fa-lg"></i> <span class="hidden md:inline">Users</span>
          </RouterLink>
        </li>
        <li class="[&>*>i]:hover:text-violet-600 w-full mb-2">
          <RouterLink
            class="flex rounded w-full justify-center md:justify-normal hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 items-center gap-3 font-medium px-3 py-5 md:py-3"
            :to="{ name: 'settings' }"
          >
            <i class="fa-solid fa-gear fa-lg"></i> <span class="hidden md:inline">Settings</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <Uploader />
  </aside>
</template>

<script setup>
import Uploader from '@/data/Uploader.vue'
import useDarkmode from "@/stores/darkmode";
const darkmodeStore = useDarkmode();
</script>
