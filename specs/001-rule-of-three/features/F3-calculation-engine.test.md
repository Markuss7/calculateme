# Tests: F3 Calculation Engine

**Feature**: [F3-calculation-engine.md](F3-calculation-engine.md) | **Branch**: `feature/F3-calculation-engine`

Pure-function unit tests with Vitest (`npm test`). Files:
`tests/unit/calculate.test.ts`, `tests/unit/validation.test.ts`.

## `calculateRuleOfThree` — contract table

| ID | baseValue | percentage | Expected result |
|----|-----------|------------|-----------------|
| F3-C01 | 200 | 25 | 50 |
| F3-C02 | 80 | 100 | 80 |
| F3-C03 | 0 | 50 | 0 |
| F3-C04 | 100 | 0 | 0 |
| F3-C05 | 200 | 150 | 300 |
| F3-C06 | 12.5 | 10 | 1.25 |
| F3-C07 | 50 | -10 | -5 |
| F3-C08 | -200 | 25 | -50 |
| F3-C09 | 1000000 | 7.5 | 75000 |

Additional:

| ID | Test | Expectation |
|----|------|-------------|
| F3-C10 | Purity | calling twice with same args returns identical result; no mutation of inputs |

## `formatResult`

| ID | Input value | Expected string |
|----|-------------|-----------------|
| F3-R01 | 50 | "50" |
| F3-R02 | 1.25 | "1.25" |
| F3-R03 | 0 | "0" |
| F3-R04 | 0.1 + 0.2 (0.30000000000000004) | "0.3" |
| F3-R05 | -5 | "-5" |
| F3-R06 | 75000 | "75000" |
| F3-R07 | 1/3 (0.3333…) | rounded, no long FP tail (e.g. "0.3333333333") |

## `parseInputs`

| ID | rawBase | rawPercentage | valid | Notes |
|----|---------|---------------|-------|-------|
| F3-P01 | "200" | "25" | true | baseValue=200, percentage=25 |
| F3-P02 | " 12.5 " | "10" | true | whitespace trimmed |
| F3-P03 | "" | "25" | false | error mentions base value |
| F3-P04 | "200" | "" | false | error mentions percentage |
| F3-P05 | "abc" | "25" | false | non-numeric base rejected |
| F3-P06 | "200" | "1o0" | false | non-numeric percentage rejected |
| F3-P07 | "-5" | "10" | true | negatives accepted |
| F3-P08 | "Infinity" | "10" | false | non-finite rejected |
| F3-P09 | "" | "" | false | both errors present |
| F3-P10 | "200" | "25" | true | `errors` array is empty |

Structural:

| ID | Test | Expectation |
|----|------|-------------|
| F3-P11 | Shape | result has `valid`, `baseValue`, `percentage`, `errors` keys |
| F3-P12 | Null on invalid | invalid fields are `null`, not `NaN` |

## Done when

All F3-C, F3-R, and F3-P checks pass under `npm test`.
