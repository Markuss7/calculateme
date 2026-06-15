import { parseInputs } from '../../src/features/rule-of-three/validation';

describe('parseInputs', () => {
  it('parses valid numeric input', () => {
    expect(parseInputs('200', '25')).toEqual({
      valid: true,
      baseValue: 200,
      percentage: 25,
      errors: [],
    });
  });

  it('trims whitespace for decimal values', () => {
    expect(parseInputs(' 12.5 ', '10')).toEqual({
      valid: true,
      baseValue: 12.5,
      percentage: 10,
      errors: [],
    });
  });

  it('requires a base value', () => {
    expect(parseInputs('', '25')).toEqual({
      valid: false,
      baseValue: null,
      percentage: 25,
      errors: ['Enter a base value'],
    });
  });

  it('requires a percentage value', () => {
    expect(parseInputs('200', '')).toEqual({
      valid: false,
      baseValue: 200,
      percentage: null,
      errors: ['Enter a percentage'],
    });
  });

  it('rejects non-numeric base values', () => {
    expect(parseInputs('abc', '25')).toEqual({
      valid: false,
      baseValue: null,
      percentage: 25,
      errors: ['Enter a valid base value'],
    });
  });

  it('rejects non-numeric percentage values', () => {
    expect(parseInputs('200', '1o0')).toEqual({
      valid: false,
      baseValue: 200,
      percentage: null,
      errors: ['Enter a valid percentage'],
    });
  });

  it('accepts negative values', () => {
    expect(parseInputs('-5', '10')).toEqual({
      valid: true,
      baseValue: -5,
      percentage: 10,
      errors: [],
    });
  });

  it('rejects non-finite values', () => {
    expect(parseInputs('Infinity', '10')).toEqual({
      valid: false,
      baseValue: null,
      percentage: 10,
      errors: ['Enter a valid base value'],
    });
  });

  it('reports both missing fields together', () => {
    expect(parseInputs('', '')).toEqual({
      valid: false,
      baseValue: null,
      percentage: null,
      errors: ['Enter a base value', 'Enter a percentage'],
    });
  });
});