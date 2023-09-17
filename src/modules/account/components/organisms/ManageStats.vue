<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from 'primevue/chart';
import { Trip, TripType } from '@/interfaces/trip.interface';
import Spinner from '@/components/atoms/Spinner.vue';
import { ChartOptions } from 'chart.js';
import { i18nGlobal } from '@/support/i18n';

interface ChartData {
  labels: unknown[];
  datasets: object[];
}

const props = defineProps<{
  trips: Trip[];
}>();

const { t } = i18nGlobal;
const loading = ref<boolean>(true);
const departureLocationsData = ref<ChartData>();
const arrivalLocationsData = ref<ChartData>();
const tripsTypesData = ref<ChartData>();
const tripsMembersData = ref<ChartData>();

onMounted(async () => {
  departureLocationsData.value = await setOccurrencesData('departure_location');
  arrivalLocationsData.value = await setOccurrencesData('arrival_location');
  tripsTypesData.value = await setTripsTypesData();
  tripsMembersData.value = await setTripsMembersData();
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
        label: t('account.myManagement.statistics.tripsNumber'),
        data: occurrences.map((item) => item.occurrence),
        borderWidth: 1,
        backgroundColor: color,
      },
    ],
  };
};

const setTripsTypesData = async (): Promise<ChartData> => {
  return {
    labels: [t('trip.filter.driver'), t('trip.filter.passenger')],
    datasets: [
      {
        label: t('account.myManagement.statistics.tripsNumber'),
        data: [
          props.trips.filter((trip) => trip.type === TripType.DRIVER).length,
          props.trips.filter((trip) => trip.type === TripType.PASSENGER).length,
        ],
        borderWidth: 1,
        backgroundColor: ['rgba(246,178,107,0.7)', 'rgba(180,167,214,0.7)'],
      },
    ],
  };
};

const setTripsMembersData = async (): Promise<ChartData> => {
  const months = [
    t('account.myManagement.statistics.months.january'),
    t('account.myManagement.statistics.months.february'),
    t('account.myManagement.statistics.months.march'),
    t('account.myManagement.statistics.months.april'),
    t('account.myManagement.statistics.months.may'),
    t('account.myManagement.statistics.months.june'),
    t('account.myManagement.statistics.months.july'),
    t('account.myManagement.statistics.months.august'),
    t('account.myManagement.statistics.months.september'),
    t('account.myManagement.statistics.months.october'),
    t('account.myManagement.statistics.months.november'),
    t('account.myManagement.statistics.months.december'),
  ];
  const tripsMembersData: { month: string; members: number }[] = [];
  for (let i = 0; i < 12; i++) {
    tripsMembersData.push({ month: months[i], members: 0 });
  }
  props.trips.forEach((trip) => {
    const month = new Date(trip.departure_time).getMonth();
    tripsMembersData[month].members++;
  });
  return {
    labels: tripsMembersData.map((item) => item.month),
    datasets: [
      {
        label: t('account.myManagement.statistics.tripsNumber'),
        data: tripsMembersData.map((item) => item.members),
        fill: false,
        borderWidth: 2,
        borderColor: 'rgba(246,178,107,0.7)',
        tension: 0.4,
        backgroundColor: 'rgba(246,178,107,0.7)',
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

const lineChartOptions = ref<ChartOptions>({
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});
</script>

<template>
  <div v-if="!loading" class="flex flex-wrap justify-evenly gap-2">
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">{{ t('account.myManagement.statistics.departureTowns') }}</h3>
      <p class="mb-2 text-sm">
        {{ t('account.myManagement.statistics.departureTownsDescription') }}
      </p>
      <Chart
        type="bar"
        :data="departureLocationsData"
        class="h-72 w-full"
        :options="barChartOptions"
      />
    </div>
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">{{ t('account.myManagement.statistics.arrivalTowns') }}</h3>
      <p class="mb-2 text-sm">
        {{ t('account.myManagement.statistics.arrivalTownsDescription') }}
        <Chart
          type="bar"
          :data="arrivalLocationsData"
          class="h-72 w-full"
          :options="barChartOptions"
        />
      </p>
    </div>
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">{{ t('account.myManagement.statistics.tripTypes') }}</h3>
      <p class="mb-2 text-sm">{{ t('account.myManagement.statistics.tripTypesDescription') }}</p>
      <Chart
        type="pie"
        :data="tripsTypesData"
        class="h-72 w-full overflow-hidden"
        :options="pieChartOptions"
      />
    </div>
    <div class="w-full 2xl:w-1/3">
      <h3 class="text-lg">{{ t('account.myManagement.statistics.trips') }}</h3>
      <p class="mb-2 text-sm">{{ t('account.myManagement.statistics.tripsDescription') }}</p>
      <Chart type="line" :data="tripsMembersData" class="h-72 w-full" :options="lineChartOptions" />
    </div>
  </div>
  <div v-else class="flex h-[calc(50vh)] items-center justify-center">
    <Spinner :size="8" color="content-base" />
  </div>
</template>
