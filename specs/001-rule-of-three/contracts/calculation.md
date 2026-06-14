# Contract: Rule-of-Three Calculation

**Feature**: 001-rule-of-three | **Type**: Pure function (client-side) | **Date**: 2026-06-14

The core calculation is exposed as a pure, side-effect-free function. This is the primary
internal contract other code (UI, tests) depends on.

## `parseInputs`

Parses raw string inputs from the form into validated numbers.

```ts
interface ValidationResult {
  valid: boolean;
  baseValue: number | null;
  percentage: number | null;
  errors: string[];
}

function parseInputs(rawBase: string, rawPercentage: string): ValidationResult;
```

### Behavior

| Condition | `valid` | Result |
|-----------|---------|--------|
| Both inputs parse to finite numbers | `true` | `baseValue` & `percentage` set, `errors` empty |
| Base empty/blank | `false` | error: "Enter a base value" |
| Percentage empty/blank | `false` | error: "Enter a percentage" |
| Non-numeric input | `false` | error naming the offending field |
| Decimal input (e.g. "12.5") | `true` | parsed decimal |
| Negative input (e.g. "-5") | `true` | parsed negative number (accepted) |

- Leading/trailing whitespace is trimmed before parsing.
- Empty string, `NaN`, and non-finite values are invalid.

## `calculateRuleOfThree`

Computes the percentage portion of the base value.

```ts
function calculateRuleOfThree(baseValue: number, percentage: number): number;
```

### Behavior

- Returns `baseValue * percentage / 100`.
- Pure: no I/O, no mutation, deterministic.
- Precondition: inputs are finite numbers (callers validate via `parseInputs`).

### Contract test cases (must hold)

| baseValue | percentage | result |
|-----------|------------|--------|
| 200 | 25 | 50 |
| 80 | 100 | 80 |
| 0 | 50 | 0 |
| 100 | 0 | 0 |
| 200 | 150 | 300 |
| 12.5 | 10 | 1.25 |
| 50 | -10 | -5 |

## `formatResult`

Formats a numeric result for display, removing floating-point artifacts.

```ts
function formatResult(value: number): string;
```

### Behavior

- Rounds to a sensible precision (up to ~10 significant digits) and strips trailing zeros.
- Example: `0.1 * 3 / ... ` style artifacts render cleanly (e.g. `0.3`, not
  `0.30000000000000004`).
- Returns a human-readable string suitable for the read-only result field.

## Error / edge handling summary

- Invalid input never reaches `calculateRuleOfThree`; the UI shows `errors` from
  `parseInputs` instead (FR-010, SC-005).
- `result` is display-only and never written back to inputs (FR-011).
