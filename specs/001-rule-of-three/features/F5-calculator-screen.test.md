# Tests: F5 Calculator Screen

**Feature**: [F5-calculator-screen.md](F5-calculator-screen.md) | **Branch**: `feature/F5-calculator-screen`

Component tests with @testing-library/react (`npm test`). File:
`tests/component/RuleOfThreeScreen.test.tsx`. (Invalid-input messaging is covered in F6.)

## Rendering

| ID | Test | Expectation |
|----|------|-------------|
| F5-R01 | Base field present | labeled base value input found by label |
| F5-R02 | Percentage field present | labeled percentage input found by label |
| F5-R03 | Calculate button present | `getByRole('button', { name: /calculate/i })` |
| F5-R04 | Result field present | result output element present, initially empty |
| F5-R05 | Result is read-only | result element is not an editable input (no user typing) |

## Calculation behavior

| ID | Steps | Expectation |
|----|-------|-------------|
| F5-C01 | base=200, pct=25, Calculate | result shows "50" |
| F5-C02 | base=80, pct=100, Calculate | result shows "80" |
| F5-C03 | base=12.5, pct=10, Calculate | result shows "1.25" |
| F5-C04 | base=200, pct=150, Calculate | result shows "300" |
| F5-C05 | base=0, pct=50, Calculate | result shows "0" |
| F5-C06 | Recalculate: 200/25 then change base→80, Calculate | result updates from "50" to "20" |
| F5-C07 | No premature result | before first Calculate tap, result stays empty |

## Accessibility

| ID | Test | Expectation |
|----|------|-------------|
| F5-A01 | Result announced | result lives in an `aria-live` region (polite) |
| F5-A02 | Inputs labeled | both fields resolvable via `getByLabelText` |
| F5-A03 | Decimal keyboard | both inputs expose `inputmode="decimal"` |

## Done when

All F5-R, F5-C, F5-A checks pass under `npm test`.
