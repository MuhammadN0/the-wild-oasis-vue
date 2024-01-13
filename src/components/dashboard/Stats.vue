<template>
  <Stat
    title="Bookings"
    :content="bookingsStore.createdBookings.length"
    :color-class="'blue'"
    iconClass="fa-solid fa-suitcase"
  />
  <Stat
    title="Sales"
    :content="sales"
    :color-class="'green'"
    iconClass="fa-solid fa-money-bills"
  />
  <Stat
    title="Check ins"
    :content="checkins"
    :color-class="'violet'"
    iconClass="fa-solid fa-calendar-days"
  />
  <Stat
    title="Occupancy rate"
    :content="occupancyRate + '%'"
    :color-class="'yellow'"
    iconClass="fa-solid fa-chart-simple"
  />
</template>

<script setup>
import Stat from "./Stat.vue";
import { formatAsCurrency } from "@/utils/helpers";
import useBookingsStore from "@/stores/bookings";
import useCabinsStore from "@/stores/cabins";
import { computed } from "vue";
const bookingsStore = useBookingsStore();
const sales = computed(() =>
  formatAsCurrency(
    bookingsStore.dashboardBookings.reduce(
      (acc, curr) =>
        curr.status === "checked-in" || curr.status === "checked-out" || curr.isPaid
          ? acc + curr.totalPrice
          : acc,
      0
    )
  )
);
const checkins = computed(() =>
  bookingsStore.dashboardBookings.reduce(
    (acc, cur) =>
      cur.status === "checked-in" || cur.status === "checked-out"
        ? acc + 1
        : acc,
    0
  )
);
const cabinsStore = useCabinsStore();
const totalNumDays = computed(
  () => cabinsStore.cabins.length * bookingsStore.last
);
const occupiedDays = computed(() =>
  bookingsStore.dashboardBookings.reduce(
    (acc, cur) =>
      cur.status === "checked-in" || cur.status === "checked-out"
        ? acc + cur.numNights
        : acc,
    0
  )
);
const occupancyRate = computed(() =>
  Math.round((occupiedDays.value / totalNumDays.value) * 100)
);
</script>
