<template>
  <Form
    class="bg-gray-50 p-10 rounded-lg dark:bg-gray-800 dark:text-gray-100 shadow-xl z-50"
    @submit="onSubmit"
    :validation-schema="schema"
  >
    <div class="px-3 text-xl mb-5 flex justify-between items-center">
      <h1>Add a new booking</h1>
      <button @click.prevent="modalStore.reset" class="text-3xl">
        &times;
      </button>
    </div>
    <div
      v-if="showError"
      class="bg-red-300 border-2 py-2 border-red-800 text-red-800 rounded flex items-center justify-center"
    >
      {{ error }}
    </div>
    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="startDate">Start date</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="date"
        name="startDate"
        id="startDate"
        :min="format(new Date(), 'yyy-M-d')"
      />
      <ErrorMessage name="startDate" class="text-red-700 pl-2" />
    </div>
    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="endDate">End date</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="date"
        id="endDate"
        name="endDate"
      />
      <ErrorMessage name="endDate" class="text-red-700 pl-2" />
    </div>
    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="guestId">Guest name</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        :as="'select'"
        name="guestId"
        id="guestId"
      >
        <option
          v-for="guest in guestsStore.guests"
          :key="guest.id"
          :value="guest.id"
        >
          <span><img :src="guest.countryFlag" /></span> {{ guest.fullName }}
        </option>
      </Field>
      <ErrorMessage name="guestId" class="text-red-700 pl-2" />
    </div>
    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="cabinId">Select cabin</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        :as="'select'"
        name="cabinId"
        id="cabinId"
      >
        <option
          v-for="cabin in cabinsStore.cabins"
          :key="cabin.id"
          :value="cabin.id"
        >
          {{ cabin.name }}
        </option>
      </Field>
      <ErrorMessage name="cabinId" class="text-red-700 pl-2" />
    </div>
    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="numGuests">Number of guests</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="number"
        name="numGuests"
        id="numGuests"
        min="1"
        :max="settingsStore.settings.maxGuests"
      />
      <ErrorMessage name="numGuests" class="text-red-700 pl-2" />
    </div>
    <div class="grid grid-cols-3 items-center border-b p-3 border-gray-200">
      <label for="observations">Observations</label>
      <Field
        class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm"
        type="text"
        name="observations"
        id="observations"
      />
      <ErrorMessage name="observations" class="text-red-700 pl-2" />
    </div>
    <div class="grid grid-cols-1 items-center border-b p-3 border-gray-200">
      <div class="flex items-center gap-4">
        <Field
          class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm accent-violet-600"
          type="checkbox"
          name="breakfastIncluded"
          value="1"
          id="breakfastIncluded"
        />

        <label for="breakfastIncluded"
          >Do you want breakfast with your stay?</label
        >
      </div>
    </div>
    <div class="grid grid-cols-1 items-center border-b p-3 border-gray-200">
      <div class="flex items-center gap-4">
        <Field
          class="border dark:bg-gray-800 dark:border-gray-600 border-gray-200 p-1 rounded-md shadow-sm accent-violet-600"
          type="checkbox"
          value="1"
          name="reservationPaid"
          id="reservationPaid"
        />

        <label for="reservationPaid">Is this reservation paid?</label>
      </div>
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
        <template v-if="!isLoading">Add Booking</template>
        <template v-else>
          <Spinner />
        </template>
      </button>
    </div>
  </Form>
</template>

<script setup>
import useModal from "@/stores/modal";
import useSettings from "@/stores/settings";
import useBookings from "@/stores/bookings";
import useCabins from "@/stores/cabins";
import useGuests from "@/stores/guests";
import Spinner from "../ui/Spinner.vue";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { differenceInDays, format, isBefore, startOfToday } from "date-fns";
const modalStore = useModal();
const settingsStore = useSettings();
const guestsStore = useGuests();
const cabinsStore = useCabins();
const bookingsStore = useBookings();
const schema = ref({
  startDate: "required",
  endDate: "required",
  guestId: "required",
  cabinId: "required",
  numGuests: `required`,
});
const error = ref("");
const showError = ref(false);
const isLoading = ref(false);
async function onSubmit(values) {
  isLoading.value = true;
  error.value = "";
  showError.value = false;
  if (isBefore(new Date(values.startDate), startOfToday())) {
    error.value = "Reservation start date must be at least today";
    showError.value = true;
    isLoading.value = false;
    return;
  }
  if (isBefore(new Date(values.endDate), new Date(values.startDate))) {
    error.value = "The end date must be after the start date";
    showError.value = true;
    isLoading.value = false;
    return;
  }

  const numNights = differenceInDays(
    new Date(values.endDate),
    new Date(values.startDate)
  );
  if (numNights < settingsStore.settings.minNights) {
    error.value =
      "Minimum nights per reservation is " + settingsStore.settings.minNights;
    showError.value = true;
    isLoading.value = false;
    return;
  }
  const currentCabin = cabinsStore.cabins.find(
    (cabin) => cabin.id === values.cabinId
  );
  const cabinPrice =
    numNights * currentCabin.regularPrice - numNights * currentCabin.discount;
  const extrasPrice = numNights * settingsStore.settings.breakfastPrice;
  const data = {
    startDate: new Date(values.startDate).toISOString(),
    endDate: new Date(values.endDate).toISOString(),
    cabinId: values.cabinId,
    guestId: values.guestId,
    isPaid: values.reservationPaid === "1" ? true : false,
    hasBreakfast: values.breakfastIncluded === "1" ? true : false,
    numNights,
    cabinPrice,
    extrasPrice,
    observations: values.observations ? values.observations : "",
    totalPrice: extrasPrice + cabinPrice,
    status: "unconfirmed",
    created_at: new Date().toISOString(),
  };
  await bookingsStore.createBooking(data);
  await bookingsStore.getBookings();
  isLoading.value = false;
  modalStore.reset();
}
</script>
