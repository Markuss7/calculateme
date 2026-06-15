# Tests: F6 Input Validation & Error Feedback

**Feature**: [F6-input-validation.md](F6-input-validation.md) | **Branch**: `feature/F6-input-validation`

Component tests with @testing-library/react (`npm test`). File:
`tests/component/validation-ui.test.tsx`.

## Empty input

| ID | Steps | Expectation |
|----|-------|-------------|
| F6-E01 | base empty, pct=25, Calculate | error prompts for base value; no result rendered |
| F6-E02 | base=200, pct empty, Calculate | error prompts for percentage; no result rendered |
| F6-E03 | both empty, Calculate | both field errors shown; no result |

## Invalid input

| ID | Steps | Expectation |
|----|-------|-------------|
| F6-I01 | base="abc", pct=25, Calculate | base rejection message; no result |
| F6-I02 | base=200, pct="1o0", Calculate | percentage rejection message; no result |
| F6-I03 | base="Infinity", pct=10, Calculate | rejected; no result |

## No-wrong-result guarantee

| ID | Steps | Expectation |
|----|-------|-------------|
| F6-N01 | Valid 200/25 → result 50, then clear base, Calculate | result is cleared/hidden, error shown (no stale "50" as current) |
| F6-N02 | Invalid input never yields a number | result region empty whenever an error is present |

## Accessibility

| ID | Test | Expectation |
|----|------|-------------|
| F6-A01 | Error associated with field | invalid field has `aria-describedby` pointing to its message |
| F6-A02 | aria-invalid set | invalid field has `aria-invalid="true"` |
| F6-A03 | Error announced | error container is an `aria-live` region (assertive/polite) |
| F6-A04 | Recovery clears state | fixing input + Calculate removes error and `aria-invalid` |

## Done when

All F6-E, F6-I, F6-N, F6-A checks pass under `npm test`.
