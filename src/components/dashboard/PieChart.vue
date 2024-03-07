<template>
  <div
    class="col-span-4 md:col-span-2 flex items-center justify-center overflow-hidden bg-gray-50 rounded-md flex-col"
    :class="{ 'bg-gray-700 text-gray-50': darkmodeStore.isDarkMode }"
  >
    <h3 class="text-left w-full pt-4 px-4 text-lg">Stay duration summary</h3>
    <div>
      <Doughnut :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import useBookingsStore from "@/stores/bookings";
import useDarkmode from "@/stores/darkmode";
const darkmodeStore = useDarkmode();
const bookingsStore = useBookingsStore();
ChartJS.register(ArcElement, Tooltip, Legend);
const data = computed(() => [
  {
    duration: "2 Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) => (cur.numNights === 2 ? acc + 1 : acc),
      0
    ),
  },
  {
    duration: "3 Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) => (cur.numNights === 3 ? acc + 1 : acc),
      0
    ),
  },
  {
    duration: "4-5 Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) =>
        cur.numNights === 4 || cur.numNights === 5 ? acc + 1 : acc,
      0
    ),
  },
  {
    duration: "6-7 Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) =>
        cur.numNights === 6 || cur.numNights === 7 ? acc + 1 : acc,
      0
    ),
  },
  {
    duration: "8-14 Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) => (cur.numNights > 7 && cur.numNights < 15 ? acc + 1 : acc),
      0
    ),
  },
  {
    duration: "15-20 Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) => (cur.numNights > 14 && cur.numNights < 21 ? acc + 1 : acc),
      0
    ),
  },
  {
    duration: "21+ Nights",
    count: bookingsStore.dashboardBookings.reduce(
      (acc, cur) => (cur.numNights > 21 ? acc + 1 : acc),
      0
    ),
  },
]);
const chartData = computed(() => ({
  labels: data.value.map((row) => row.duration),
  datasets: [
    {
      label: "Nights per stay",
      backgroundColor: [
        "#ec407a",
        "#ab47bc",
        "#8d6e63",
        "#5c6bc0",
        "#ffa726",
        "#26a69a",
        "#66bb6a",
      ],
      data: data.value.map((row) => row.count),
    },
  ],
}));
const options = computed(() => ({
  cutout: 70,
  radius: 80,
  responsive: true,
  spacing: 10,
}));
</script>
