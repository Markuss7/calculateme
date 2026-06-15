export function calculateRuleOfThree(baseValue: number, percentage: number): number {
  return (baseValue * percentage) / 100;
}

export function formatResult(value: number): string {
  const rounded = Number(value.toPrecision(10));

  if (Object.is(rounded, -0)) {
    return '0';
  }

  return rounded.toString();
}