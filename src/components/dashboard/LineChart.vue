<template>
  <div
    class="bg-gray-50 text-gray-800 col-span-4 p-4 rounded-lg dark:bg-gray-700"
  >
    <h3
      class="text-left dark:text-gray-200 w-full pt-4 px-4 text-xl font-medium"
    >
      Sales
    </h3>
    <div class="w-full">
      <Line :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import useBookingsStore from "@/stores/bookings";
import {
  eachDayOfInterval,
  endOfToday,
  getYear,
  isSameDay,
  startOfToday,
  subDays,
} from "date-fns";
const bookingsStore = useBookingsStore();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = computed(() =>
  eachDayOfInterval({
    start: subDays(startOfToday(), bookingsStore.last - 1),
    end: endOfToday(),
  }).map((date) => date.toString().slice(4, 10))
);

const data = computed(() =>
  labels.value.map((label) => {
    const date = new Date(label + " " + getYear(new Date()));
    const value = bookingsStore.dashboardBookings.reduce(
      (acc, cur) =>
        isSameDay(cur.startDate, date) && cur.status !== "unconfirmed"
          ? acc + cur.totalPrice
          : acc,
      0
    );
    const extras = bookingsStore.dashboardBookings.reduce(
      (acc, cur) =>
        isSameDay(cur.startDate, date) && cur.status !== "unconfirmed"
          ? acc + cur.extrasPrice
          : acc,
      0
    );
    return { label, value, extras };
  })
);
const chartData = computed(() => ({
  labels: data.value.map((row) => row.label),
  datasets: [
    {
      label: "Main sales",
      data: data.value.map((row) => row.value),
      backgroundColor: "#8B5CF6",
      borderColor: "#8B5CF6",
      tension: 0.3,
    },
    {
      label: "Extra sales",
      data: data.value.map((row) => row.extras),
      backgroundColor: "#4ADE80",
      borderColor: "#4ADE80",
      tension: 0.3,
    },
  ],
}));
const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 0.9,
}));

</script>
