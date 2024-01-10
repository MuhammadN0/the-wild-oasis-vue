<template>
  <header class="mb-12">
    <div class="justify-between text-gray-800 items-center flex">
      <h1 class="text-3xl flex gap-3 items-center font-bold">
        {{ route.path.split('/')[1] === 'booking' ? 'Booking' : 'Check in'
        }}<span class="text-sm text-gray-400">#{{ route.params.id }}</span>
      </h1>
      <button @click="goBack" class="text-violet-600 font-semibold">
        &larr; Back
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
function goBack() {
  router.go(-1);
}
</script>
