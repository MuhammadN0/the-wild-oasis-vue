<template>
  <Teleport to="body" v-if="store.isOpen">
    <div
      class="absolute top-0 left-0 h-full w-full z-40 backdrop-filter backdrop-blur-sm bg-gray-300 bg-opacity-20 flex justify-center items-center"
      @click.self.prevent="store.reset"
    >
      <ConfirmDelete v-if="store.state === 'deletingCabin'" />
      <AddCabinForm
        v-else-if="
          store.state === 'addingCabin' || store.state === 'editingCabin'
        "
      />
    </div>
  </Teleport>
</template>

<script setup>
import useModalStore from '@/stores/modal';
import AddCabinForm from '../cabins/AddCabinForm.vue';
import ConfirmDelete from '../cabins/ConfirmDelete.vue';
const store = useModalStore();
</script>
