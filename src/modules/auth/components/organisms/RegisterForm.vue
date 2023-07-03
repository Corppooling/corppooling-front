<script lang="ts" setup>
import { reactive, ref } from 'vue';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import Button from '@/components/molecules/Button.vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import { useToast } from '@/composables/toast';

const toast = useToast();

interface formDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  description: string;
  validConditions: boolean;
}

const formData = reactive<formDTO>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  description: '',
  validConditions: false,
});

const formLoading = ref<boolean>(false);

const resetForm = (): void => {
  Object.assign(formData, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    description: '',
    validConditions: false,
  });
};

const submitForm = (): void => {
  if (
    formData.firstName.trim() === '' ||
    formData.lastName.trim() === '' ||
    formData.email.trim() === '' ||
    formData.description.trim() === ''
  ) {
    toast.warning('Veuillez remplir les champs obligatoires');
    return;
  }

  if (!formData.validConditions) {
    toast.warning('Veuillez accepter les conditions');
    return;
  }

  formLoading.value = true;

  setTimeout(() => {
    toast.success(
      'Formulaire envoyé',
      'Votre demande a bien été prise en compte, nous vous recontacterons dans les plus brefs délais'
    );
    formLoading.value = false;
    resetForm();
  }, 1000);
};
</script>

<template>
  <div class="p-8 xl:px-24">
    <h1 class="mt-10 text-center text-5xl font-bold">
      {{ $t('auth.register') }}
    </h1>
    <p class="pt-16 text-justify text-lg">
      {{ $t('auth.recontactDesc') }}
    </p>
    <div class="pb-20 pt-16">
      <div class="mb-8 flex gap-4">
        <PrimeInput id="firstName" placeholder="Prénom*" class="w-1/2">
          <InputText id="firstName" v-model="formData.firstName" class="w-full" type="text" />
        </PrimeInput>
        <PrimeInput id="lastName" placeholder="Nom*" class="w-1/2">
          <InputText id="lastName" v-model="formData.lastName" class="w-full" type="text" />
        </PrimeInput>
      </div>
      <PrimeInput id="email" placeholder="Email*" class="mb-8">
        <InputText id="email" v-model="formData.email" class="w-full" type="email" />
      </PrimeInput>
      <PrimeInput id="phone" placeholder="Téléphone" class="mb-8">
        <InputText id="phone" v-model="formData.phone" class="w-full" type="tel" />
      </PrimeInput>
      <PrimeInput id="companyName" placeholder="Nom de l'entreprise" class="mb-8">
        <InputText id="companyName" v-model="formData.companyName" class="w-full" type="text" />
      </PrimeInput>
      <PrimeInput id="description" placeholder="Description*" class="mb-8">
        <Textarea id="description" v-model="formData.description" rows="4" class="w-full" />
      </PrimeInput>
      <div class="mb-10 flex items-center">
        <Checkbox
          v-model="formData.validConditions"
          inputId="validConditions"
          name="validConditions"
          :binary="true"
        />
        <label for="validConditions" class="ml-3 select-none">
          J'accepte que ces informations soient utilisées pour me recontacter.
        </label>
      </div>
      <Button
        bgColor="content-base"
        :fn="submitForm"
        :loading="formLoading"
        :text="$t('auth.recontact')"
      />
      <RouterLink :to="{ name: 'login' }" class="mt-10 block text-center hover:underline">
        {{ $t('auth.toLogin') }}
      </RouterLink>
    </div>
  </div>
</template>
