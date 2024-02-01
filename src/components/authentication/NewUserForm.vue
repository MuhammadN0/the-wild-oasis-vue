<template>
  <Form @submit="handleSubmit" :validation-schema="schema" class="bg-gray-50 dark:bg-gray-700 dark:text-gray-100 p-12 rounded">
    <div
      class="grid grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
    >
      <label for="name" class="text-lg">Full Name</label>
      <Field
        name="name"
        id="name"
        class="border dark:bg-gray-700 dark:border-gray-500  border-gray-300 rounded p-1 focus:outline-violet-600"
        type="text"
      />
      <ErrorMessage name="name" class="text-red-700"></ErrorMessage>
    </div>
    <div
      class="grid grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
    >
      <label for="email" class="text-lg">Email address</label>
      <Field
        name="email"
        id="email"
        class="border dark:bg-gray-700 dark:border-gray-500  border-gray-300 rounded p-1 focus:outline-violet-600"
        type="text"
      />
      <ErrorMessage name="email" class="text-red-700"></ErrorMessage>
    </div>
    <div
      class="grid grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
    >
      <label for="password" class="text-lg">Password</label>
      <Field
        name="password"
        type="password"
        id="password"
        class="border dark:bg-gray-700 dark:border-gray-500  border-gray-300 rounded p-1 focus:outline-violet-600"
      />
      <ErrorMessage name="password" class="text-red-700"></ErrorMessage>
    </div>
    <div
      class="grid mb-3 grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
    >
      <label for="confirmPassword" class="text-lg">Confirm your password</label>
      <Field
        name="confirmPassword"
        id="confirmPassword"
        class="border dark:bg-gray-700 dark:border-gray-500  border-gray-300 rounded p-1 focus:outline-violet-600"
        type="password"
      />
      <ErrorMessage name="confirmPassword" class="text-red-700"></ErrorMessage>
    </div>
    <div class="flex items-center justify-end gap-4">
      <button type="reset" class="px-3 py-2 border-2 border-gray-800 dark:border-gray-100 rounded">Cancel</button>
      <button
        class="bg-violet-600 px-3 py-2 text-white rounded hover:bg-violet-700 border-2 border-violet-600"
      >
        <Spinner v-if="isLoading" />
        <template v-else>
          Create new user
        </template>
      </button>
    </div>
  </Form>
</template>

<script setup>
import {auth} from '@/firebase/config'
import Spinner from '@/components/ui/Spinner.vue'
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
const schema = ref({
  name: 'required',
  email: 'required|email',
  password: 'required|min:8',
  confirmPassword: 'confirmed:@password',
});
const isLoading = ref(false)
async function handleSubmit({name,email,password}) {
  try {
    isLoading.value = true
    await auth.createUserWithEmailAndPassword(email,password)
    await auth.currentUser.updateProfile({displayName:name});
  }catch (err) {
    console.log(err.message)
  }finally{
    isLoading.value = false
    window.location.reload();
  }
}
</script>
