import { calculateRuleOfThree, formatResult } from '../../src/features/rule-of-three/calculate';

describe('calculateRuleOfThree', () => {
  it.each([
    [200, 25, 50],
    [80, 100, 80],
    [0, 50, 0],
    [100, 0, 0],
    [200, 150, 300],
    [12.5, 10, 1.25],
    [50, -10, -5],
  ])('returns %d x %d%% = %d', (baseValue, percentage, expected) => {
    expect(calculateRuleOfThree(baseValue, percentage)).toBe(expected);
  });
});

describe('formatResult', () => {
  it.each([
    [50, '50'],
    [1.25, '1.25'],
    [0, '0'],
    [0.30000000000000004, '0.3'],
    [-5, '-5'],
    [75000, '75000'],
  ])('formats %p as %s', (value, expected) => {
    expect(formatResult(value)).toBe(expected);
  });

  it('rounds repeating decimals to a readable precision', () => {
    expect(formatResult(1 / 3)).toBe('0.3333333333');
  });
});