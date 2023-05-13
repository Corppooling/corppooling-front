<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import Button from '@/components/molecules/Button.vue';
import { DateTime } from 'luxon';
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import { useGeoGouvAPI } from '@/composables/geoGouvAPI';
import { TripType } from '@/interfaces/trip.interface';
import axiosClient from '@/support/axiosClient';
import { useUserStore } from '@/stores/user';
import { User } from '@/interfaces/user.interface';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
import { i18nGlobal } from '@/support/i18n';

const router = useRouter();
const userStore = useUserStore();
const geoGouvAPI = useGeoGouvAPI();
const townsAutocomplete = ref<Array<string>>([]);
const step = ref<number>(1);
const stepLoading = ref<boolean>(false);
const user = ref<User>(userStore.user as User);
const toast = useToast();
const { t } = i18nGlobal;

interface formDataI {
  announcer: string;
  company: string;
  departureLocation?: string;
  arrivalLocation?: string;
  departureTime?: Date;
  type?: TripType;
  message?: string;
  availableSeats?: number;
  carModel?: string;
  carColor?: string;
  price?: number;
}

const formData = reactive<formDataI>({
  announcer: `api/users/${user.value.id}`,
  company: `api/companies/${user.value.company.id}`,
  departureLocation: undefined,
  arrivalLocation: undefined,
  departureTime: undefined,
  type: undefined,
  message: undefined,
  availableSeats: undefined,
  carModel: undefined,
  carColor: undefined,
  price: undefined,
});

watch(
  () => formData.departureLocation,
  async (value) => {
    if (value?.trim()) {
      townsAutocomplete.value = (await geoGouvAPI.getTowns(value?.trim())) as Array<string>;
    }
  }
);

watch(
  () => formData.arrivalLocation,
  async (value) => {
    if (value?.trim()) {
      townsAutocomplete.value = (await geoGouvAPI.getTowns(value?.trim())) as Array<string>;
    }
  }
);

const commonConditions: Array<() => boolean> = [
  () => !!formData.type,
  () => !!formData.departureLocation?.trim(),
  () => !!formData.arrivalLocation?.trim(),
  () => !!formData.departureTime,
  () => !!formData.message?.trim(),
];
const driverConditions: Array<() => boolean> = [
  () => typeof formData.availableSeats !== 'undefined' && formData.availableSeats >= 0,
  () => !!formData.carModel?.trim(),
  () => !!formData.carColor?.trim(),
  () => typeof formData.price !== 'undefined' && formData.price >= 0,
];
const conditions: Array<() => boolean> = [...commonConditions, ...driverConditions];

const checkStep = (): void => {
  stepLoading.value = true;

  setTimeout(() => {
    const tempStep: number = step.value;

    for (let i = 1; i <= conditions.length; i++) {
      if (conditions[i - 1]()) {
        step.value = i + 1;
      } else {
        step.value = i;
        if (tempStep === step.value) {
          toast.warning(t('trip.addTrip.fillFields'));
        }
        break;
      }
    }

    stepLoading.value = false;
  }, 400);
};

const formCanBeSend = computed<boolean>(() => {
  if (formData.type === TripType.PASSENGER) {
    return commonConditions.every((condition) => condition());
  }

  return conditions.every((condition) => condition());
});

const buttonText = computed<string>(() => {
  return formCanBeSend.value ? t('trip.addTrip.publish') : t('trip.addTrip.next');
});

const sendForm = async (): Promise<void> => {
  stepLoading.value = true;

  await axiosClient
    .post('api/trips', formData)
    .then(() => {
      router.push({ name: 'account.trips' });
      toast.success(t('trip.addTrip.success'));
    })
    .catch(() => {
      toast.error();
    });

  stepLoading.value = false;
};

const rightFunction = async (): Promise<void> => {
  return formCanBeSend.value ? sendForm() : checkStep();
};
</script>

<template>
  <div class="mx-auto w-full max-w-screen-md px-4 py-14">
    <h1 class="mb-16 text-center text-4xl font-bold">{{ $t('trip.addTrip.newTrip') }}</h1>
    <form class="flex flex-col gap-10">
      <div v-if="step >= 1">
        <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step1') }}</h3>
        <div>
          <div class="mb-4 flex items-center">
            <RadioButton
              v-model="formData.type"
              inputId="driver"
              name="driver"
              :value="TripType.DRIVER"
            />
            <label for="driver" class="ml-2 cursor-pointer">{{ $t('trip.filter.driver') }}</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="formData.type"
              inputId="passenger"
              name="passenger"
              :value="TripType.PASSENGER"
            />
            <label for="passenger" class="ml-2 cursor-pointer">
              {{ $t('trip.filter.passenger') }}
            </label>
          </div>
        </div>
      </div>
      <div v-if="step >= 2">
        <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step2') }}</h3>
        <div>
          <span class="relative flex h-full items-center border-b-2 border-black-light px-5">
            <FontAwesomeIcon
              :class="formData.departureLocation?.trim() ? 'opacity-100' : 'opacity-40'"
              class="text-content-base"
              icon="fa-flag-checkered"
            />
            <AutoComplete
              v-model="formData.departureLocation"
              :suggestions="townsAutocomplete"
              :placeholder="$t('trip.filter.departure')"
            />
          </span>
        </div>
      </div>
      <div v-if="step >= 3">
        <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step3') }}</h3>
        <div>
          <span class="relative flex h-full items-center border-b-2 border-black-light px-5">
            <FontAwesomeIcon
              :class="formData.arrivalLocation?.trim() ? 'opacity-100' : 'opacity-40'"
              class="text-content-base"
              icon="fa-map-marker-alt"
            />
            <AutoComplete
              v-model="formData.arrivalLocation"
              :suggestions="townsAutocomplete"
              :placeholder="$t('trip.filter.arrival')"
            />
          </span>
        </div>
      </div>
      <div v-if="step >= 4">
        <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step4') }}</h3>
        <div>
          <span class="relative flex h-full items-center border-b-2 border-black-light px-5">
            <FontAwesomeIcon
              :class="formData.departureTime ? 'opacity-100' : 'opacity-40'"
              class="text-content-base"
              icon="calendar"
            />
            <Calendar
              v-model="formData.departureTime"
              class="w-full"
              hourFormat="24"
              dateFormat="dd/mm/yy à"
              :placeholder="$t('trip.filter.departureTime')"
              :minDate="DateTime.now().toJSDate()"
              showTime
              showButtonBar
            />
          </span>
        </div>
      </div>
      <div v-if="step >= 5">
        <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step5') }}</h3>
        <div class="border-2 border-black-light">
          <Textarea
            v-model="formData.message"
            class="w-full"
            rows="4"
            :placeholder="$t('trip.addTrip.message')"
          />
        </div>
      </div>
      <template v-if="formData.type === TripType.DRIVER">
        <div v-if="step >= 6">
          <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step6') }}</h3>
          <div>
            <InputNumber
              v-model="formData.availableSeats"
              class="w-full"
              showButtons
              :allowEmpty="false"
              buttonLayout="horizontal"
              :step="1"
              :min="1"
              decrementButtonClass="bg-main-base"
              incrementButtonClass="bg-main-base"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
        </div>
        <div v-if="step >= 7">
          <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step7') }}</h3>
          <div class="border-b-2 border-black-light">
            <InputText
              v-model="formData.carModel"
              class="w-full"
              :placeholder="$t('trip.addTrip.carModel')"
            />
          </div>
        </div>
        <div v-if="step >= 8">
          <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step8') }}</h3>
          <div class="border-b-2 border-black-light">
            <InputText
              v-model="formData.carColor"
              class="w-full"
              :placeholder="$t('trip.addTrip.carColor')"
            />
          </div>
        </div>
        <div v-if="step >= 9">
          <h3 class="mb-6 text-2xl">{{ $t('trip.addTrip.step9') }}</h3>
          <div>
            <InputNumber
              v-model="formData.price"
              class="w-full"
              showButtons
              :allowEmpty="false"
              buttonLayout="horizontal"
              :step="1"
              :min="0"
              decrementButtonClass="bg-main-base"
              incrementButtonClass="bg-main-base"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              mode="currency"
              currency="EUR"
              :placeholder="$t('trip.addTrip.price')"
            />
          </div>
        </div>
      </template>
      <Button
        :fn="rightFunction"
        :loading="stepLoading"
        bgColor="content-light"
        class="mx-auto w-fit px-20"
        :text="buttonText"
      />
    </form>
  </div>
</template>

<style lang="scss">
.p-inputnumber-input {
  text-align: center;
  font-size: 1.1rem;
}
</style>
