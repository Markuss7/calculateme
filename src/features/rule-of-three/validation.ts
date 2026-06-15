export interface ValidationResult {
  valid: boolean;
  baseValue: number | null;
  percentage: number | null;
  errors: string[];
}

function parseNumericInput(value: string): number | null {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return null;
  }

  const parsedValue = Number(trimmedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export function parseInputs(rawBase: string, rawPercentage: string): ValidationResult {
  const errors: string[] = [];
  const baseIsBlank = rawBase.trim() === '';
  const percentageIsBlank = rawPercentage.trim() === '';
  const parsedBase = parseNumericInput(rawBase);
  const parsedPercentage = parseNumericInput(rawPercentage);

  if (baseIsBlank) {
    errors.push('Enter a base value');
  } else if (parsedBase === null) {
    errors.push('Enter a valid base value');
  }

  if (percentageIsBlank) {
    errors.push('Enter a percentage');
  } else if (parsedPercentage === null) {
    errors.push('Enter a valid percentage');
  }

  return {
    valid: errors.length === 0,
    baseValue: parsedBase,
    percentage: parsedPercentage,
    errors,
  };
}