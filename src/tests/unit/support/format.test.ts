import { describe, expect, it } from 'vitest';
import { formatPrice } from '@/support/format';

describe('format', () => {
  it('should return price with default euro currency', function () {
    const result = formatPrice(10);
    expect(result).toBe('10.00 €');
  });

  it('should return price with custom currency', function () {
    const result = formatPrice(10, '$');
    expect(result).toBe('10.00 $');
  });
});
