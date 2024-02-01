<template>
  <h2 class="text-lg mb-3">Update user data</h2>
  <Form @submit="onSubmit" class="bg-gray-50 p-10 rounded-lg mb-5">
    <div class="grid items-center grid-cols-4 border-b py-3">
      <label for="email">Email address</label>
      <Field
        type="email"
        name="email"
        disabled
        class="bg-gray-200 border rounded px-2 py-1 text-gray-400 cursor-not-allowed"
        :value="auth.currentUser.email"
      />
    </div>
    <div class="grid items-center grid-cols-4 border-b py-3">
      <label for="name">Full name</label>
      <Field
        type="text"
        class="rounded border px-2 py-1"
        id="name"
        name="name"
        :value="auth.currentUser.displayName"
        :disabled="isLoading"
        :class="{'cursor-not-allowed' : isLoading}"
      />
    </div>
    <div class="grid items-center grid-cols-4 border-b py-3 mb-4">
      <label for="email">Profile picture</label>
      <Field
        type="file"
        name="image"
        class="[&::file-selector-button]:border-none [&::file-selector-button]:bg-violet-600 [&::file-selector-button]:text-white [&::file-selector-button]:rounded [&::file-selector-button]:px-2 [&::file-selector-button]:py-1 [&::file-selector-button]:cursor-pointer"
        :disabled="isLoading"
        :class="{'cursor-not-allowed' : isLoading}"
      />
    </div>
    <div class="flex justify-end gap-3">
      <button
        type="reset"
        class="px-3 py-2 border-2 border-gray-800 bg-transparent rounded"
        :disabled="isLoading"
        :class="{'cursor-not-allowed' : isLoading}"
      >
        Cancel
      </button>
      <button
        class="px-3 py-2 border bg-violet-600 rounded hover:bg-violet-700 text-white"
        :disabled="isLoading"
        :class="{'cursor-not-allowed' : isLoading}"
      >
        <template v-if="!isLoading">Submit</template>
        <Spinner v-else/>
      </button>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { auth, storage } from "@/firebase/config";
import { Form, Field } from "vee-validate";
import Spinner from "../ui/Spinner.vue";
const isLoading = ref(false);
async function onSubmit(values) {
  isLoading.value = true;
  if (!values.image && !values.name.length) {
    isLoading.value = false;
    return;
  }
  if (!values.image) {
    await auth.currentUser.updateProfile({ displayName: values.name });
  } else {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(
      `profile-pictures/${values.image.name + Math.random()}`
    );
    const fileUpload = await imageRef.put(values.image);
    const url = await fileUpload.ref.getDownloadURL();
    await auth.currentUser.updateProfile({
      displayName: values.name ? values.name : auth.currentUser.displayName,
      photoURL: url,
    });
  }
  isLoading.value = false;
  window.location.reload();
}
</script>
