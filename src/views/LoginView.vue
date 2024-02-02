<template>
  <img
    v-if="!darkmodeStore.isDarkMode"
    src="@/assets/logo-light.png"
    alt="the wild oasis logo"
    class="w-40 mb-4"
  />
  <img
    v-else
    src="@/assets/logo-dark.png"
    alt="the wild oasis logo"
    class="w-40 mb-4"
  />
  <h1 class="text-3xl mb-3 dark:text-gray-100">Log in to your account</h1>
  <Form
    :initial-values="{ email: 'example@email.com', password: '0123456789' }"
    @submit="onSubmit"
    class="bg-gray-50 dark:bg-gray-700 dark:text-gray-100 p-10 rounded shadow-md"
  >
    <div class="flex w-[370px]  flex-col items-stretch gap-2 mb-3">
      <label class="text-sm" for="email">Email address</label>
      <Field
        type="email"
        name="email"
        id="email"
        class="rounded border px-2 py-1 dark:bg-gray-700 dark:border-gray-500"
      />
    </div>
    <div class="flex w-[370px] flex-col items-stretch gap-2 mb-6">
      <label class="text-sm" for="password">Password</label>
      <Field
        type="password"
        name="password"
        id="password"
        class="rounded border px-2 py-1 dark:bg-gray-700 dark:border-gray-500"
      />
    </div>
    <div>
      <button
        class="w-full flex justify-center items-center bg-violet-600 hover:bg-violet-700 text-white py-2 rounded"
      >
        <template v-if="!isLoading"> Login </template>
        <Spinner v-else />
      </button>
    </div>
  </Form>
</template>

<script setup>
import { auth } from "@/firebase/config";
import { ref } from "vue";
const isLoading = ref(false);
import { Form, Field } from "vee-validate";
import Spinner from "@/components/ui/Spinner.vue";
import useDarkmode from "@/stores/darkmode";
const darkmodeStore = useDarkmode();
async function onSubmit(values) {
  if (!values.email.length || !values.password.length) return;
  isLoading.value = true;
  await auth.signInWithEmailAndPassword(values.email, values.password);
  isLoading.value = false;
  window.location.reload();
}
</script>
