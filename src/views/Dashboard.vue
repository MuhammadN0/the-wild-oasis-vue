<template>
  <template v-if="!condition">
    <PageHeader />
    <div class="grid grid-cols-4 grid-rows-custom gap-2 md:gap-5">
      <Stats />
      <TodaysActivity />
      <PieChart />
      <LineChart />
    </div>
  </template>
  <div class="flex items-center justify-center" v-else>
    <Spinner />
  </div>
</template>

<script setup>
import PageHeader from "@/components/dashboard/PageHeader.vue";
import useBookingsStore from "@/stores/bookings";
import useGuestsStore from "@/stores/guests";
import useCabinsStore from "@/stores/cabins";
import Spinner from "@/components/ui/Spinner.vue";
import { computed } from "vue";
import Stats from "@/components/dashboard/Stats.vue";
import TodaysActivity from "@/components/dashboard/TodaysActivity.vue";
import PieChart from "@/components/dashboard/PieChart.vue";
import LineChart from "@/components/dashboard/LineChart.vue";
const bookingsStore = useBookingsStore();
const guestsStore = useGuestsStore();
const cabinsStore = useCabinsStore();
const condition = computed(
  () =>
    bookingsStore.isLoading || guestsStore.isLoading || cabinsStore.isLoading
);
</script>
