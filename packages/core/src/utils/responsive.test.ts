import { describe, it, expect } from 'vitest';
import { resolveResponsive } from './responsive.js';

describe('resolveResponsive', () => {
  it('returns empty object for undefined', () => {
    expect(resolveResponsive('align', undefined)).toEqual({});
  });

  it('returns single data attribute for string value', () => {
    expect(resolveResponsive('align', 'center')).toEqual({
      'data-align': 'center',
    });
  });

  it('returns base attribute from object base key', () => {
    expect(resolveResponsive('align', { base: 'start' })).toEqual({
      'data-align': 'start',
    });
  });

  it('returns breakpoint-suffixed attributes', () => {
    expect(resolveResponsive('align', { base: 'start', md: 'center', xl: 'end' })).toEqual({
      'data-align': 'start',
      'data-align-md': 'center',
      'data-align-xl': 'end',
    });
  });

  it('handles all breakpoints', () => {
    const result = resolveResponsive('justify', {
      base: 'start',
      sm: 'center',
      md: 'end',
      lg: 'between',
      xl: 'start',
    });
    expect(result).toEqual({
      'data-justify': 'start',
      'data-justify-sm': 'center',
      'data-justify-md': 'end',
      'data-justify-lg': 'between',
      'data-justify-xl': 'start',
    });
  });

  it('omits keys with no value', () => {
    const result = resolveResponsive('align', { md: 'center' });
    expect(result).toEqual({ 'data-align-md': 'center' });
    expect(result).not.toHaveProperty('data-align');
  });

  it('returns single data attribute for numeric value', () => {
    expect(resolveResponsive('columns', 3)).toEqual({
      'data-columns': '3',
    });
  });

  it('handles numeric responsive object', () => {
    expect(resolveResponsive('columns', { base: 1, md: 2, lg: 3 })).toEqual({
      'data-columns': '1',
      'data-columns-md': '2',
      'data-columns-lg': '3',
    });
  });

  it('handles 0 as a valid base value', () => {
    expect(resolveResponsive('gap', { base: 0, md: 4 })).toEqual({
      'data-gap': '0',
      'data-gap-md': '4',
    });
  });

  it('handles 0 as a valid breakpoint value', () => {
    expect(resolveResponsive('gap', { base: 4, lg: 0 })).toEqual({
      'data-gap': '4',
      'data-gap-lg': '0',
    });
  });

  it('handles scalar 0', () => {
    expect(resolveResponsive('gap', 0)).toEqual({
      'data-gap': '0',
    });
  });
});
