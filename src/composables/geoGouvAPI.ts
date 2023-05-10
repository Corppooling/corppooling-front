import axios from 'axios';
import { useDebounceFn } from '@vueuse/core';

const ENDPOINT = 'https://geo.api.gouv.fr';

/**
 * Composable to use geo.api.gouv.fr
 */
export const useGeoGouvAPI = () => {
  /**
   * Get towns from API
   * @param {string} town - Town name
   * @param {string[]} fields - Fields to return
   * @param {number} limit - Number of results
   * @param {string} boost - Boost field
   * @returns {Promise<string[]>} - Array of towns
   */
  const getTowns = useDebounceFn(
    async (
      town: string,
      fields: string[] = ['nom'],
      limit = 4,
      boost = 'population'
    ): Promise<string[]> => {
      const res = await axios.get<Array<Record<string, string>>>(`${ENDPOINT}/communes`, {
        params: {
          nom: town,
          fields: fields.join(','),
          limit,
          boost,
        },
      });

      return res.data.map((ville) => ville.nom);
    },
    500
  );

  return {
    getTowns,
  };
};
