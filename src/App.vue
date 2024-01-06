<template>
  <Sidebar />
  <Navbar />
  <main class="bg-gray-100 row-span-11 col-span-5 p-12 overflow-y-scroll">
    <RouterView />
  </main>
</template>

<script setup>
import Sidebar from '@/components/ui/Sidebar.vue';
import Navbar from '@/components/ui/Navbar.vue';
</script>
