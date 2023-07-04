<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Company } from '@/interfaces/company.interface';
import axiosClient from '@/support/axiosClient';
import { useRoute, useRouter } from 'vue-router';
import { HttpStatusCode } from 'axios';

const route = useRoute();
const router = useRouter();
const company = ref<Company>();
const authCode = ref<string>(route.params.authCode as string);
const isLoading = ref<boolean>(false);

const fetchCompany = async () => {
  isLoading.value = true;

  await axiosClient.get('/api/companies', { params: { auth_code: authCode.value } }).then((res) => {
    if (res.data['hydra:member'].length !== 1) {
      router.push({
        name: 'error',
        params: {
          code: HttpStatusCode.NotFound,
        },
      });
    } else {
      company.value = res.data['hydra:member'][0];
    }
  });

  isLoading.value = false;
};

onMounted(async () => {
  await fetchCompany();
});
</script>

<template>
  <div v-if="!isLoading" class="mx-auto w-full max-w-screen-md px-4 py-14 md:p-14">
    <h1 class="text-4xl">Inscription</h1>
    <span>Entreprise</span>
  </div>
  <div v-else></div>
</template>
