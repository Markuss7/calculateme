# Feature F3: Calculation Engine

**Branch**: `feature/F3-calculation-engine` | **Stories**: US1 | **Depends on**: F1
(can run in parallel with F2)
**Tests**: [F3-calculation-engine.test.md](F3-calculation-engine.test.md)

## Goal

Implement the pure, fully tested rule-of-three math, result formatting, and input parsing
/ validation. This is the P1 core logic. No UI, no I/O — deterministic functions only.

## Scope

Implements [../contracts/calculation.md](../contracts/calculation.md) and the entities in
[../data-model.md](../data-model.md):

- `calculateRuleOfThree(baseValue, percentage) => number` (= `base × percentage ÷ 100`).
- `formatResult(value) => string` (strips floating-point artifacts).
- `parseInputs(rawBase, rawPercentage) => ValidationResult`.

## Tasks

- [ ] T013 [P] [US1] Author unit tests for calculation + formatting in `tests/unit/calculate.test.ts`
- [ ] T014 [P] [US1] Author unit tests for parsing/validation in `tests/unit/validation.test.ts`
- [ ] T015 [P] [US1] Implement `calculateRuleOfThree` + `formatResult` in `src/features/rule-of-three/calculate.ts`
- [ ] T016 [P] [US1] Implement `parseInputs` + `ValidationResult` type in `src/features/rule-of-three/validation.ts`

## Behavior reference

- `result = baseValue × percentage ÷ 100`.
- `parseInputs` trims whitespace; rejects empty/non-numeric/non-finite; accepts decimals
  and negatives; returns per-field errors.
- `formatResult` rounds to ~10 significant digits and strips trailing zeros.

## Acceptance criteria

- All rows in the calculation contract test table produce exact expected results.
- Invalid inputs never produce a number; they return `valid: false` with messages.
- Functions are pure (no side effects, deterministic).
- F3 tests pass.

## Definition of Done

See [../workflow.md](../workflow.md).
