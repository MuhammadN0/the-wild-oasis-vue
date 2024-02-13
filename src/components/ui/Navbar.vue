<template>
  <nav
    class="bg-gray-50 col-span-5 border-b border-b-gray-200 flex items-center justify-between md:justify-end px-4 md:px-14 gap-8"
    v-if="auth.currentUser"
    :class="{'bg-gray-700 border-b-gray-600 text-gray-50' : darkmodeStore.isDarkMode}"
  >
    <div class="flex items-center gap-2">
      <div class="w-9 rounded-full overflow-hidden">
        <img
          :src="
            auth.currentUser.photoURL !== null
              ? auth.currentUser.photoURL
              : 'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/user-img.jpg?alt=media&token=23258105-0ea0-4b8d-b229-38bfc208be6c'
          "
        />
      </div>
      <span>{{ auth.currentUser.displayName }}</span>
    </div>
    <div class="flex items-center gap-3">
      <RouterLink
        class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
        :to="{ name: 'account' }"
      >
        <i class="fa-solid fa-user fa-lg text-violet-600"></i>
      </RouterLink>
      <button @click.prevent="darkmodeStore.toggleDarkMode" class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
        <i v-if="!darkmodeStore.isDarkMode" class="fa-solid fa-moon fa-lg text-violet-600"></i>
        <i v-else class="fa-solid fa-sun fa-lg text-violet-600"></i>
      </button>
      <button @click.prevent="logout" class="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
        <i class="fa-solid fa-right-from-bracket fa-lg text-violet-600"></i>
      </button>
    </div>
  </nav>
</template>

<script setup>
import useDarkmode from '@/stores/darkmode'
import { auth } from "@/firebase/config";

async function logout() {
  await auth.signOut();
  window.location.reload();
}
const darkmodeStore = useDarkmode();
</script>
