# Feature F5: Calculator Screen

**Branch**: `feature/F5-calculator-screen` | **Stories**: US1 | **Depends on**: F2, F3
(route entry from F4)
**Tests**: [F5-calculator-screen.test.md](F5-calculator-screen.test.md)

## Goal

Build the rule-of-three calculator UI and wire it to the calculation engine (F3): a base
value field (= 100%), a percentage field, a **Calculate** button, and a read-only result
field. Implements US1 and [../contracts/ui-navigation.md](../contracts/ui-navigation.md).

## Scope

- `RuleOfThreeScreen.tsx` layout using F2 `Field`, `Button`, `NavBar`.
- On Calculate: `parseInputs` → `calculateRuleOfThree` → `formatResult` → result field.
- Recalculation on subsequent taps (FR-008).
- Read-only result and live-region announcement (FR-011).

## Tasks

- [ ] T022 [P] [US1] Author component tests for calculator behavior in `tests/component/RuleOfThreeScreen.test.tsx`
- [ ] T023 [US1] Implement `RuleOfThreeScreen.tsx` layout in `src/features/rule-of-three/RuleOfThreeScreen.tsx`
- [ ] T024 [US1] Wire Calculate tap → engine → result; support recalculation
- [ ] T025 [US1] Make result field read-only and announce result via live region

> Note: error-message display for invalid input is handled in **F6**. F5 covers the happy
> path and result rendering; F6 layers on validation feedback.

## Acceptance criteria (maps to US1 / FR-004…FR-009, FR-011)

- Base value is treated as 100%.
- Enter 200 + 25 → Calculate → result shows 50.
- Changing inputs + Calculate again updates the result.
- Decimals supported; result rendered cleanly via `formatResult`.
- Result field is not user-editable.
- F5 tests pass.

## Definition of Done

See [../workflow.md](../workflow.md).
