<template>
  <nav class="bg-gray-50 col-span-5 border-b border-b-gray-200 flex items-center justify-end px-14 gap-8">
    <div class="flex items-center gap-2">
      <div class="w-9 rounded-full overflow-hidden">
        <img src="@/assets/user-img.jpg" />
      </div>
      <span>Muhammad Noor</span>
    </div>
    <div class="flex items-center gap-3.5">
      <RouterLink :to="{name: 'account'}">
        <i class="fa-solid fa-user fa-lg text-violet-600"></i>
      </RouterLink>
      <button>
        <i class="fa-solid fa-moon fa-lg text-violet-600"></i>
      </button>
      <button>
        <i class="fa-solid fa-right-from-bracket fa-lg  text-violet-600"></i>
      </button>
    </div>
  </nav>
</template>

<script setup></script>

<style></style>
