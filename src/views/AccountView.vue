<template>
  <div>
    <h1 class="text-3xl font-bold mb-10">Update your profile</h1>
    <UpdateUserData />
    <UpdatePassword />
  </div>
</template>

<script setup>
import UpdatePassword from "@/components/authentication/UpdatePassword.vue";
import UpdateUserData from "@/components/authentication/UpdateUserData.vue";
</script>
