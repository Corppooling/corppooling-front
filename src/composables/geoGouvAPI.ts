import { useDebounceFn } from '@vueuse/core';
import axios from 'axios';

export const useGeoGouvAPI = () => {
  const getTowns = useDebounceFn(async (town: string): Promise<string[]> => {
    const res = await axios.get<Array<Record<string, string>>>(`https://geo.api.gouv.fr/communes`, {
      params: {
        nom: town,
        fields: 'nom,code',
        limit: 4,
        boost: 'population',
      },
    });

    return res.data.map((v) => v.nom);
  }, 500);

  return {
    getTowns,
  };
};
