<script setup lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ManageCompany from '@/modules/account/components/organisms/ManageCompany.vue';
import ManageDepartments from '@/modules/account/components/organisms/ManageDepartments.vue';
import ManageUsers from '@/modules/account/components/organisms/ManageUsers.vue';
import ManageTrips from '@/modules/account/components/organisms/ManageTrips.vue';
</script>

<template>
  <div>
    <TabView>
      <TabPanel :header="$t('account.myManagement.company')">
        <h2 class="text-3xl">{{ $t('account.myManagement.company') }}</h2>
        <ManageCompany />
      </TabPanel>
      <TabPanel :header="$t('account.myManagement.departments')">
        <h2 class="text-3xl">{{ $t('account.myManagement.departments') }}</h2>
        <ManageDepartments />
      </TabPanel>
      <TabPanel :header="$t('account.myManagement.users')">
        <h2 class="text-3xl">{{ $t('account.myManagement.users') }}</h2>
        <ManageUsers />
      </TabPanel>
      <TabPanel :header="$t('account.myManagement.trips')">
        <h2 class="text-3xl">{{ $t('account.myManagement.trips') }}</h2>
        <ManageTrips />
      </TabPanel>
    </TabView>
  </div>
</template>
