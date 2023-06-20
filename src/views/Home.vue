<script lang="ts" setup>
import Title from '@/components/atoms/Title.vue';
import LastTripsSlider from '@/modules/trips/components/molecules/LastTripsSlider.vue';
import HomeHeader from '@/components/molecules/HomeHeader.vue';
import TripTypeSwitch from '@/modules/trips/components/molecules/TripTypeSwitch.vue';
import { computed, ref } from 'vue';
import { TripType } from '@/interfaces/trip.interface';
import search_driver from '@/assets/images/tutorial/search_driver.svg';
import search_passenger from '@/assets/images/tutorial/search_passenger.svg';
import talk_driver from '@/assets/images/tutorial/talk_driver.svg';
import talk_passenger from '@/assets/images/tutorial/talk_passenger.svg';
import car_driver from '@/assets/images/tutorial/car_driver.svg';
import car_passenger from '@/assets/images/tutorial/car_passenger.svg';
import { useUserStore } from '@/stores/user';
import { i18nGlobal } from '@/support/i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const type = ref<TripType>(TripType.DRIVER);
const userStore = useUserStore();

const { t } = i18nGlobal;

const tutorialElements = computed(
  (): {
    image: string;
    text: string;
  }[] => {
    switch (type.value) {
      case TripType.PASSENGER:
        return [
          { image: search_passenger, text: t('home.tutorial.searchPassenger') },
          { image: talk_passenger, text: t('home.tutorial.talkPassenger') },
          { image: car_passenger, text: t('home.tutorial.carPassenger') },
        ];
      default:
        return [
          { image: search_driver, text: t('home.tutorial.searchDriver') },
          { image: talk_driver, text: t('home.tutorial.talkDriver') },
          { image: car_driver, text: t('home.tutorial.carDriver') },
        ];
    }
  }
);
</script>

<template>
  <div>
    <HomeHeader />
    <div class="mx-auto max-w-screen-2xl px-6 pt-6 sm:py-8 md:px-12 lg:mt-0">
      <section v-if="userStore.isAuth">
        <LastTripsSlider />
      </section>
      <section>
        <Title class="my-4 sm:my-0" logoColor="base" content="Les nouveautés" />
        <div class="mb-4 flex flex-col lg:flex-row">
          <div class="flex w-full items-center justify-center lg:w-1/2">
            <img
              class="max-w-[450px]"
              src="https://cdn.blablacar.com/kairos/assets/images/esc_bbc-aad142670044d99e2f66..svg"
              alt=""
            />
          </div>
          <div class="flex w-full flex-col justify-center p-4 lg:w-1/2">
            <h3 class="text-3xl">Recevez jusqu'à 100 € de Prime Covoiturage !</h3>
            <p class="mt-4 text-lg">
              Conducteurs, conductrices, bonne nouvelle : vos bonnes habitudes sont récompensées !
              Bénéficiez de la Prime Covoiturage en réalisant 3 covoiturages en 3 mois.
            </p>
          </div>
        </div>
        <div class="mb-4 flex flex-col lg:flex-row">
          <div class="flex w-full flex-col justify-center p-4 lg:w-1/2">
            <h3 class="text-3xl">Doublez votre Prime Covoiturage de 100 € avec Corppooling</h3>
            <p class="mt-4 text-lg">
              Vous prenez la route tous les jours ? Bonne nouvelle ! Recevez 100 € de Prime
              Covoiturage en covoiturant 10 trajets en 3 mois* avec Corppooling.
              <br />
              <small>* Valable à partir du 1er Janvier 2023 sous conditions d'éligibilité.</small>
            </p>
          </div>
          <div class="flex w-full items-center justify-center lg:w-1/2">
            <img
              class="max-w-[450px]"
              src="https://cdn.blablacar.com/kairos/assets/images/esc_daily-561b2a35c4af3060b2d5..svg"
              alt=""
            />
          </div>
        </div>
      </section>
      <section>
        <Title class="my-4 sm:my-0" logoColor="base" content="Les + Corppooling" />
        <div class="flex flex-wrap mt-3 mb-10">
          <div class="flex flex-col text-left w-full lg:w-1/3 p-3">
            <div class="flex mt-4 items-center">
              <FontAwesomeIcon icon="fa-euro-sign" class="text-2xl mr-3 text-main-base" />
              <span class="text-lg font-bold">Vos trajets préférés à petits prix</span>
            </div>
            <p class="mt-4 text-lg text-justify">
              Où que vous alliez, en bus ou en covoiturage, trouvez le trajet idéal parmi notre
              large choix de destinations à petits prix.
            </p>
          </div>
          <div class="flex flex-col text-left w-full lg:w-1/3 p-3">
            <div class="flex mt-4 items-center">
              <FontAwesomeIcon icon="fa-handshake" class="text-2xl mr-3 text-main-base" />
              <span class="text-lg font-bold">Voyagez en toute confiance</span>
            </div>
            <p class="mt-4 text-lg text-justify">
              Nous prenons le temps qu’il faut pour connaître nos membres et nos compagnies de bus
              partenaires. Nous vérifions les avis, les profils et les pièces d’identité. Vous savez
              donc avec qui vous allez voyager pour réserver en toute confiance sur notre plateforme
              sécurisée.
            </p>
          </div>
          <div class="flex flex-col text-left w-full lg:w-1/3 p-3">
            <div class="flex mt-4 items-center">
              <FontAwesomeIcon icon="fa-rocket" class="text-2xl mr-3 text-main-base" />
              <span class="text-lg font-bold">Recherchez, cliquez et réservez !</span>
            </div>
            <p class="mt-4 text-lg text-justify">
              Réserver un trajet devient encore plus simple ! Facile d'utilisation et dotée de
              technologies avancées, notre appli vous permet de réserver un trajet à proximité en un
              rien de temps.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div class="flex flex-wrap items-center justify-between">
          <Title class="my-4 sm:my-0" logoColor="base" :content="$t('home.howTo')" />
          <TripTypeSwitch :type="type" @update:type="type = $event" />
        </div>
        <p class="mt-4 text-lg md:text-xl">
          <FontAwesomeIcon
            :icon="type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
            class="mr-2"
          />
          {{ type === TripType.DRIVER ? $t('trip.searchPassengers') : $t('trip.searchDriver') }}
        </p>
        <div class="mt-14 flex w-full flex-col justify-evenly md:flex-row">
          <template v-for="(element, index) in tutorialElements" :key="index">
            <div class="flex w-full flex-col items-center justify-center md:w-80">
              <div class="my-auto h-52 max-h-52">
                <img class="h-full" :src="element.image" alt="" />
              </div>
              <div class="my-6 h-24 text-justify md:mb-0">
                <p class="text-lg">{{ element.text }}</p>
              </div>
            </div>
            <hr
              v-if="index < tutorialElements.length - 1"
              class="mx-auto mb-20 h-1 w-24 rotate-90 rounded-full border-none md:mx-4 md:my-auto md:rotate-0"
              :class="type === TripType.DRIVER ? 'bg-main-base' : 'bg-content-glight'"
            />
          </template>
        </div>
      </section>
    </div>
  </div>
</template>
