<template>

    <Form
      v-if="modalStore.state === 'addingCabin' || modalStore.state === 'editingCabin'"
      @submit="submitForm"
      class="bg-gray-50 p-10 rounded-lg shadow-xl z-50"
      :validation-schema="schema"
      :initial-values="
        modalStore.state === 'editingCabin' && modalStore.currentCabin
      "
    >
      <div class="px-3 text-xl mb-5 flex justify-between items-center">
        <h1>{{modalStore.state === 'addingCabin' ? 'Add a cabin' : "Update Cabin"}}</h1>
        <button @click.prevent="modalStore.reset" class="text-3xl">
          &times;
        </button>
      </div>

      <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
        <label for="name">Cabin name</label>
        <Field
          id="name"
          name="name"
          type="text"
          class="border border-gray-200 p-1 rounded-md shadow-sm"
        />
        <ErrorMessage name="name" class="text-red-700 pl-2"></ErrorMessage>
      </div>
      <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
        <label for="maxC">Maximum Capacity</label>
        <Field
          id="maxC"
          name="maxCapacity"
          type="number"
          class="border border-gray-200 p-1 rounded-md shadow-sm"
        />
        <ErrorMessage
          name="maxCapacity"
          class="text-red-700 pl-2"
        ></ErrorMessage>
      </div>
      <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
        <label for="regPrice">Regular price</label>
        <Field
          id="regPrice"
          name="regularPrice"
          type="number"
          class="border border-gray-200 p-1 rounded-md shadow-sm"
        />
        <ErrorMessage
          name="regularPrice"
          class="text-red-700 pl-2"
        ></ErrorMessage>
      </div>
      <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
        <label for="disc">Discount</label>
        <Field
          id="disc"
          name="discount"
          type="number"
          class="border border-gray-200 p-1 rounded-md shadow-sm"
        />
        <ErrorMessage name="discount" class="text-red-700 pl-2"></ErrorMessage>
      </div>
      <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
        <label for="desc">Description</label>
        <Field
          id="desc"
          name="description"
          type="text"
          class="border border-gray-200 p-1 rounded-md shadow-sm"
        />
        <ErrorMessage
          name="description"
          class="text-red-700 pl-2"
        ></ErrorMessage>
      </div>
      <div
        class="grid grid-cols-3 items-center border-b p-3 border-gray-200 mb-5"
      >
        <label for="image">Capin photo</label>
        <Field
          id="image"
          type="file"
          name="image"
          class="[&::file-selector-button]:border-none [&::file-selector-button]:bg-violet-600 [&::file-selector-button]:text-white [&::file-selector-button]:rounded [&::file-selector-button]:px-2 [&::file-selector-button]:py-1"
        />
        <ErrorMessage name="image" class="text-red-700 pl-2"></ErrorMessage>
      </div>

      <div class="flex justify-end gap-3">
        <button
          @click.prevent="modalStore.reset"
          class="border-2 border-gray-600 px-3 py-2 rounded"
        >
          Cancel
        </button>
        <button
          class="bg-violet-600 hover:bg-violet-800 text-white px-6 py-2 rounded"
        >
          <template v-if="!isLoading">Add Cabin</template>
          <template v-else>
            <Spinner />
          </template>
        </button>
      </div>
    </Form>
</template>

<script setup>
import { ref } from 'vue';
import { storage, cabinsCollection } from '@/firebase/config';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Spinner from '../ui/Spinner.vue';
import useModalStore from '@/stores/modal';
const modalStore = useModalStore();
const isLoading = ref(false);
const schema = ref({
  name: 'required',
  maxCapacity: 'required|min_value:1',
  regularPrice: 'required|min_value:1',
  discount: 'required|min_value:0',
  image: modalStore.state === 'editingCabin' ? '' : 'required',
  description: 'required',
});
async function submitForm(values) {
  if (modalStore.state === 'addingCabin') {
  try {
    isLoading.value = true;
    const cabinsRef = storage.ref();
    const imageRef = cabinsRef.child(
      `cabins/${values.image.name}-${Math.random()}`
    );
    const fileUpload = await imageRef.put(values.image);
    const url = await fileUpload.ref.getDownloadURL();
    await cabinsCollection.add({ ...values, image: url });
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
    modalStore.reset();
  }
} else {
  await editCabin(values)
}
}
async function editCabin(values) {
  try {
    let url;
    isLoading.value = true;
    if (values.image.name) {
      const cabinsRef = storage.ref();
      const imageRef = cabinsRef.child(
        `cabins/${values.image.name}-${Math.random()}`
      );
      const fileUpload = await imageRef.put(values.image);
      url = await fileUpload.ref.getDownloadURL();
    }
    await cabinsCollection
      .doc(modalStore.currentCabin.id)
      .update({ ...values, image: url ? url : modalStore.currentCabin.image });
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
    modalStore.reset();
  }
}
</script>
