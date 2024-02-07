<template>
  <Teleport to="body" v-if="store.isOpen">
    <div
      class="absolute top-0 left-0 h-full w-full z-40 backdrop-filter backdrop-blur-sm bg-gray-300 bg-opacity-20 flex justify-center items-center"
      @click.self.prevent="store.reset"
    >
      <ConfirmDelete v-if="store.state === 'deleting'" />
      <AddCabinForm
        v-else-if="
          store.state === 'addingCabin' || store.state === 'editingCabin'
        "
      />
      <AddBookingForm v-if="store.state === 'addingBooking'" />
    </div>
  </Teleport>
</template>

<script setup>
import useModalStore from '@/stores/modal';
import AddCabinForm from '../cabins/AddCabinForm.vue';
import ConfirmDelete from './ConfirmDelete.vue';
import AddBookingForm from '../bookings/AddBookingForm.vue';
const store = useModalStore();
</script>
