<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from 'primevue/chart';
import axiosClient from '@/support/axiosClient';
import { useUserStore } from '@/stores/user';
import { Trip } from '@/interfaces/trip.interface';
import Spinner from '@/components/atoms/Spinner.vue';

interface ChartData {
  labels: string[];
  datasets: object[];
}

const userStore = useUserStore();
const departureLocationsData = ref<ChartData>();
const trips = ref<Trip[]>();
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  await fetchTrips();
  departureLocationsData.value = setDepartureLocationsData();
  loading.value = false;
});

const fetchTrips = async () => {
  const allTrips = await axiosClient.get('api/trips', {
    params: {
      'company.id':
        userStore.user?.company?.cluster !== null ? undefined : userStore.user?.company?.id,
    },
  });

  trips.value = allTrips.data['hydra:member'];
};

const setDepartureLocationsData = (): ChartData => {
  const departureLocations =
    trips.value
      ?.reduce((acc: { name: string; occurrence: number }[], trip: Trip) => {
        const index = acc.findIndex((item) => item.name === trip.departure_location);

        if (index === -1) {
          acc.push({ name: trip.departure_location, occurrence: 1 });
        } else {
          acc[index].occurrence++;
        }

        return acc;
      }, [])
      .sort((a, b) => b.occurrence - a.occurrence)
      .slice(0, 5) || [];

  return {
    labels: departureLocations.map((item) => item.name),
    datasets: [
      {
        label: "Nombre d'occurrences",
        data: departureLocations.map((item) => item.occurrence),
        borderWidth: 1,
      },
    ],
  };
};
</script>

<template>
  <div v-if="!loading" class="flex flex-wrap gap-2">
    <div class="h-96 w-full 2xl:w-1/2">
      <h3 class="text-lg">Villes de départs</h3>
      <p class="mb-2 text-sm">Top 5 des villes de départ les plus fréquentes</p>
      <Chart type="bar" :data="departureLocationsData" class="h-full w-full" />
    </div>
  </div>
  <div v-else class="flex h-[calc(50vh)] items-center justify-center">
    <Spinner :size="8" color="content-base" />
  </div>
</template>
