<template>
  <div v-if="settings">
    <form class="bg-gray-50 p-12 rounded">
      <div
        class="grid grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
      >
        <label for="minNights" class="text-lg">Minimum nights/booking</label>
        <input
          name="minNights"
          id="minNights"
          class="border border-gray-300 rounded p-1 focus:outline-violet-600"
          type="number"
          :value="settings.minNights"
          :disabled="settingsStore.isLoading"
          :class="{'bg-slate-600 cursor-not-allowed': settingsStore.isLoading}"
          @blur="handleBlur"
        />
      </div>
      <div
        class="grid grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
      >
        <label for="maxNights" class="text-lg">Maximum nights/booking</label>
        <input
          name="maxNights"
          id="maxNights"
          class="border border-gray-300 rounded p-1 focus:outline-violet-600"
          type="number"
          :value="settings.maxNights"
          :disabled="settingsStore.isLoading"
          :class="{'bg-slate-600 cursor-not-allowed': settingsStore.isLoading}"
          @blur="handleBlur"
        />
      </div>
      <div
        class="grid grid-cols-3 gap-3 border-b border-gray-200 py-4 items-center"
      >
        <label for="maxGuests" class="text-lg">Maximum guests/booking</label>
        <input
          name="maxGuests"
          id="maxGuests"
          type="number"
          :value="settings.maxGuests"
          class="border border-gray-300 rounded p-1 focus:outline-violet-600"
          :disabled="settingsStore.isLoading"
          :class="{'bg-slate-600 cursor-not-allowed': settingsStore.isLoading}"
          @blur="handleBlur"
        />
      </div>
      <div class="grid mb-3 grid-cols-3 gap-3 py-4 items-center">
        <label for="breakfastPrice" class="text-lg">Breakfast price</label>
        <input
          name="breakfastPrice"
          id="breakfastPrice"
          class="border border-gray-300 rounded p-1 focus:outline-violet-600"
          type="number"
          :value="settings.breakfastPrice"
          :disabled="settingsStore.isLoading"
          :class="{'bg-slate-600 cursor-not-allowed': settingsStore.isLoading}"
          @blur="handleBlur"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useSettingsStore from '@/stores/settings';

const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings);
function handleBlur(e){
  if(e.target.value < 1) return
  settingsStore.updateSettings(e.target.name,e.target.value)
}
</script>
