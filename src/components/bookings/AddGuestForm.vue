<template>
  <Form
    class="bg-gray-50 p-10 rounded-lg dark:bg-gray-800 dark:text-gray-100 shadow-xl z-50"
    @submit="onSubmit"
    :validation-schema="schema"
  >
    <div class="px-3 text-xl mb-5 flex justify-between items-center">
      <h1>Add a new guest</h1>
      <button @click.prevent="modalStore.reset" class="text-3xl">
        &times;
      </button>
    </div>

    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="fullName">Guest name</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="text"
        name="fullName"
        id="fullName"
      />
      <ErrorMessage name="fullName" class="text-red-700 pl-2" />
    </div>

    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="email">Email address</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="email"
        name="email"
        id="email"
      />
      <ErrorMessage name="email" class="text-red-700 pl-2" />
    </div>

    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="nationality">Nationality</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        as="select"
        name="nationality"
        id="nationality"
      >
        <option
          v-for="(value, key) in flagsStore.flags"
          :key="key"
          :value="key + '-' + value"
        >
          {{ value }}
        </option>
      </Field>
      <ErrorMessage name="nationality" class="text-red-700 pl-2" />
    </div>

    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="nationalID">National ID</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="text"
        name="nationalID"
        id="nationalID"
      />
      <ErrorMessage name="nationalID" class="text-red-700 pl-2" />
    </div>

    <div class="flex justify-end gap-3 mt-5">
      <button
        @click.prevent="modalStore.reset"
        class="border-2 border-gray-800 dark:border-gray-100 px-3 py-2 rounded"
      >
        Cancel
      </button>
      <button
        class="bg-violet-600 hover:bg-violet-800 text-white px-6 py-2 rounded"
      >
        <template v-if="!isLoading">Add guest</template>
        <template v-else>
          <Spinner />
        </template>
      </button>
    </div>
  </Form>
</template>

<script setup>
import useModalStore from "@/stores/modal";
import useFlagsStore from "@/stores/flags";
import useGuestsStore from '@/stores/guests'
import { Form, Field, ErrorMessage } from "vee-validate";
import {ref} from 'vue'
import Spinner from "../ui/Spinner.vue";
const flagsStore = useFlagsStore();
const modalStore = useModalStore();
const guestsStore = useGuestsStore();
const isLoading = ref(false)
async function onSubmit(values) {
  isLoading.value = true;
  const data = {
    countryFlag : `https://flagcdn.com/${values.nationality.split('-')[0]}.svg`,
    fullName: values.fullName,
    nationality: values.nationality.split('-')[1],
    nationalID:values.nationalID,
    email: values.email
  }
  await guestsStore.addGuest(data)
  await guestsStore.getGuests();
  isLoading.value = false;
  modalStore.reset();
}
</script>
