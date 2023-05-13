import { describe, expect, it } from 'vitest';
import { useGeoGouvAPI } from '@/composables/geoGouvAPI';

describe('geoGouvAPI', () => {
  it('should API return towns', async function () {
    const towns = await useGeoGouvAPI().getTowns('Paris', ['nom'], 1, 'population');
    expect(towns).toEqual(['Paris']);
  });
});
