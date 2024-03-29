import { beforeEach, describe, expect, it } from 'vitest';
import {
  dateClassicFormated,
  dateFormated,
  dateFormatedOnlyHours,
  dateFormatedShort,
} from '@/support/luxon';

describe('luxon', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return date format long in french', function () {
    localStorage.setItem('lang', 'fr');
    const result = dateFormated('2021-08-01T12:00:00.000Z');
    expect(result).toBe('01 août 2021 à 14:00');
  });

  it('should return date format long in english', function () {
    localStorage.setItem('lang', 'en');
    const result = dateFormated('2021-08-01T12:00:00.000Z');
    expect(result).toBe('August 01, 2021 at 02:00 PM');
  });

  it('should return date format short in french with not actual year', function () {
    localStorage.setItem('lang', 'fr');
    const result = dateFormatedShort('2021-08-01T12:00:00.000Z');
    expect(result).toBe('dimanche 01 août 2021');
  });

  it('should return date format short in english with not actual year', function () {
    localStorage.setItem('lang', 'en');
    const result = dateFormatedShort('2021-08-01T12:00:00.000Z');
    expect(result).toBe('Sunday 01 August 2021');
  });

  it('should return date format short in french with actual year', function () {
    localStorage.setItem('lang', 'fr');
    const result = dateFormatedShort('2023-08-01T12:00:00.000Z');
    expect(result).toBe('mardi 01 août');
  });

  it('should return date format short in english with actual year', function () {
    localStorage.setItem('lang', 'en');
    const result = dateFormatedShort('2023-08-01T12:00:00.000Z');
    expect(result).toBe('Tuesday 01 August');
  });

  it('should return only hours format in french', function () {
    localStorage.setItem('lang', 'fr');
    const result = dateFormatedOnlyHours('2021-08-01T12:00:00.000Z');
    expect(result).toBe('14:00');
  });

  it('should return only hours format in english', function () {
    localStorage.setItem('lang', 'en');
    const result = dateFormatedOnlyHours('2021-08-01T12:00:00.000Z');
    expect(result).toBe('02:00 PM');
  });

  it('should return date in classic format in french', function () {
    localStorage.setItem('lang', 'fr');
    const result = dateClassicFormated('2021-08-01T12:00:00.000Z');
    expect(result).toBe('01/08/2021');
  });

  it('should return date in classic format in english', function () {
    localStorage.setItem('lang', 'en');
    const result = dateClassicFormated('2021-08-01T12:00:00.000Z');
    expect(result).toBe('08/01/2021');
  });
});
