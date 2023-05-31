<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { Company } from '@/interfaces/company.interface';
import { ref } from 'vue';

const userStore = useUserStore();
const company = ref<Company | undefined>(userStore.user?.company);
</script>

<template>
  <div v-if="company" class="w-full xl:w-96">
    <div class="flex">
      <div class="flex w-40 items-center pr-8 mix-blend-color-burn">
        <img class="object-contain" :src="company.logo" alt="company logo" />
      </div>
      <div>
        <h3 class="mb-4 text-7xl">{{ company.name }}</h3>
        <div class="flex flex-col">
          <span>
            <b>Siren :</b>
            {{ company.siren }}
          </span>
          <span v-if="company.cluster">
            <b>Groupe d'entreprise:</b>
            <br />
            {{ company.cluster?.name }}
          </span>
        </div>
      </div>
    </div>
    <h3 class="my-8 text-2xl">Statistiques</h3>
    <div class="flex w-full flex-col text-lg md:pl-4">
      <div class="flex justify-between py-2">
        <span>Nombre d'utilisateurs actifs:</span>
        <span class="ml-4 font-bold">{{ company.users?.length }}</span>
      </div>
      <div class="flex justify-between py-2">
        <span>Nombre de trajets créés:</span>
        <span class="ml-4 font-bold">{{ company.trips?.length }}</span>
      </div>
    </div>
  </div>
</template>
