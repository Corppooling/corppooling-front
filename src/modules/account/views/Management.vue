<script setup lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ManageCompany from '@/modules/account/components/organisms/ManageCompany.vue';
import ManageDepartments from '@/modules/account/components/organisms/ManageDepartments.vue';
import ManageUsers from '@/modules/account/components/organisms/ManageUsers.vue';
import ManageTrips from '@/modules/account/components/organisms/ManageTrips.vue';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Company } from '@/interfaces/company.interface';

const userStore = useUserStore();
const router = useRouter();
const company = ref<Company | undefined>(userStore.user?.company);

onMounted(() => {
  if (!userStore.isManager) {
    router.push({ name: 'error', params: { code: '403' } });
  }
});
</script>

<template>
  <div v-if="userStore.isManager && company">
    <TabView>
      <TabPanel :header="$t('account.myManagement.company')">
        <h2 class="mb-7 text-3xl">{{ $t('account.myManagement.company') }}</h2>
        <ManageCompany :company="company" />
      </TabPanel>
      <TabPanel :header="$t('account.myManagement.departments')">
        <h2 class="mb-7 text-3xl">{{ $t('account.myManagement.departments') }}</h2>
        <ManageDepartments :departments="company.departments" />
      </TabPanel>
      <TabPanel :header="$t('account.myManagement.users')">
        <h2 class="mb-7 text-3xl">{{ $t('account.myManagement.users') }}</h2>
        <ManageUsers :users="company.users" />
      </TabPanel>
      <TabPanel :header="$t('account.myManagement.trips')">
        <h2 class="mb-7 text-3xl">{{ $t('account.myManagement.trips') }}</h2>
        <ManageTrips :trips="company.trips" />
      </TabPanel>
    </TabView>
  </div>
</template>
