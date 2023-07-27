import { defineStore } from 'pinia';
import { Department } from '@/interfaces/department.interface';
import axiosClient from '@/support/axiosClient';
import router from '@/router';
import { HttpStatusCode } from 'axios';

export const useDepartmentStore = defineStore({
  id: 'department',
  state: () => ({
    departments: [] as Array<Department>,
    isLoading: false,
  }),
  actions: {
    async fetchDepartments(): Promise<void> {
      const { useUserStore } = await import('@/stores/user');
      const userStore = useUserStore();

      this.isLoading = true;

      await axiosClient
        .get('api/departments', {
          params: {
            'company.id': userStore.user?.company.id,
          },
        })
        .then((res) => {
          this.departments = res.data['hydra:member'];
        })
        .catch(() => {
          router.push({ name: 'error', params: { code: HttpStatusCode.InternalServerError } });
        });

      this.isLoading = false;
    },
  },
});
