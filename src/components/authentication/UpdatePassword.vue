<template>
  <h2 class="text-lg mb-3">Update user data</h2>
  <Form :validation-schema="schema" @submit="onSubmit" class="bg-gray-50 dark:bg-gray-700 dark:text-gray-100 p-10 rounded-lg mb-5">
    <div class="grid items-center grid-cols-4 border-b py-3 gap-4">
      <label for="password">Password</label>
      <Field
        type="password"
        class="rounded border dark:bg-gray-700 dark:border-gray-500 px-2 py-1"
        id="password"
        name="password"
        :disabled="isLoading"
        :class="{'cursor-not-allowed' : isLoading}"
      />
      <ErrorMessage name="password" class="text-red-700" />
    </div>
    <div class="grid items-center grid-cols-4 border-b mb-4 py-3 gap-4">
      <label for="confirmpassword">Confirm password</label>
      <Field
      type="password"
      class="rounded border dark:bg-gray-700 dark:border-gray-500 px-2 py-1"
      id="confirmpassword"
      name="confirmpassword"
        :disabled="isLoading"
        :class="{'cursor-not-allowed' : isLoading}"
      />
      <ErrorMessage name="confirmpassword" class="text-red-700" />
    </div>
    <div class="flex justify-end gap-3">
      <button
      type="reset"
        class="px-3 py-2 border-2 dark:border-gray-100 border-gray-800 bg-transparent rounded"
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
import { auth } from "@/firebase/config";
import { Form, Field, ErrorMessage } from "vee-validate";
import Spinner from "../ui/Spinner.vue";
const isLoading = ref(false);
const schema = ref({
  password: 'required|min:8|max:21',
  confirmpassword: 'required|confirmed:@password'
})
async function onSubmit(values) {
  isLoading.value = true;
  auth.currentUser.updatePassword(values.password)
  isLoading.value = false;
  window.location.reload();
}
</script>
