<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from 'primevue/chart';
import { Trip } from '@/interfaces/trip.interface';
import Spinner from '@/components/atoms/Spinner.vue';
import { ChartOptions } from 'chart.js';

interface ChartData {
  labels: unknown[];
  datasets: object[];
}

const props = defineProps<{
  trips: Trip[];
}>();

const loading = ref<boolean>(true);
const departureLocationsData = ref<ChartData>();
const arrivalLocationsData = ref<ChartData>();
const typesData = ref<ChartData>();

onMounted(async () => {
  departureLocationsData.value = await setOccurrencesData('departure_location');
  arrivalLocationsData.value = await setOccurrencesData('arrival_location');
  typesData.value = await setTypesData();
  loading.value = false;
});

const setOccurrencesData = async (
  field: keyof Trip,
  color = 'rgba(246,178,107,0.7)'
): Promise<ChartData> => {
  const occurrences: { name: unknown; occurrence: number }[] =
    props.trips
      .reduce((acc: { name: unknown; occurrence: number }[], trip: Trip) => {
        const index = acc.findIndex((item) => item.name === trip[field]);
        if (index === -1) {
          acc.push({ name: trip[field], occurrence: 1 });
        } else {
          acc[index].occurrence++;
        }
        return acc;
      }, [])
      .sort((a, b) => b.occurrence - a.occurrence)
      .slice(0, 5) || [];

  return {
    labels: occurrences.map((item) => item.name),
    datasets: [
      {
        label: 'Nombre de trajets',
        data: occurrences.map((item) => item.occurrence),
        borderWidth: 1,
        backgroundColor: color,
      },
    ],
  };
};

const setTypesData = async (): Promise<ChartData> => {
  return {
    labels: ['Conducteur', 'Passager'],
    datasets: [
      {
        label: 'Nombre de trajets',
        data: [
          props.trips.filter((trip) => trip.type === 'driver').length,
          props.trips.filter((trip) => trip.type === 'passenger').length,
        ],
        borderWidth: 1,
        backgroundColor: ['rgba(246,178,107,0.7)', 'rgba(180,167,214,0.7)'],
      },
    ],
  };
};

const barChartOptions = ref<ChartOptions>({
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});

const pieChartOptions = ref<ChartOptions>({
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
      },
    },
  },
});
</script>

<template>
  <div v-if="!loading" class="flex flex-wrap justify-evenly gap-2">
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">Villes de départs</h3>
      <p class="mb-2 text-sm">Top 5 des villes de départ les plus fréquentes</p>
      <Chart
        type="bar"
        :data="departureLocationsData"
        class="h-72 w-full"
        :options="barChartOptions"
      />
    </div>
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">Villes d'arrivées</h3>
      <p class="mb-2 text-sm">Top 5 des villes d'arrivées les plus fréquentes</p>
      <Chart
        type="bar"
        :data="arrivalLocationsData"
        class="h-72 w-full"
        :options="barChartOptions"
      />
    </div>
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">Types de trajet</h3>
      <p class="mb-2 text-sm">Répartition des types de trajet</p>
      <Chart type="pie" :data="typesData" :options="pieChartOptions" class="md:w-30rem w-full" />
    </div>
  </div>
  <div v-else class="flex h-[calc(50vh)] items-center justify-center">
    <Spinner :size="8" color="content-base" />
  </div>
</template>
