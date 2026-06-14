# Phase 1 Data Model: Rule of Three Calculator

**Feature**: 001-rule-of-three | **Date**: 2026-06-14

This feature has no persistent storage. The "data model" describes the in-memory entities
and value objects that flow through the UI and the calculation function.

## Entity: Calculation

A single rule-of-three evaluation. Created in memory when the user taps **Calculate**;
discarded when inputs change or the screen is closed.

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `baseValue` | number | The reference value treated as 100%. | User input (base field) |
| `percentage` | number | The portion of the base value requested. | User input (percentage field) |
| `result` | number | Computed portion: `baseValue × percentage ÷ 100`. | Derived |

### Validation rules

- `baseValue` and `percentage` are **required** before a calculation can run (FR-010).
- Both must parse to **finite numbers** (`Number.isFinite`); `NaN`/`Infinity`/empty are
  invalid (FR-005, FR-010).
- Decimal values are accepted (FR-009).
- Negative values are accepted and calculated literally (spec Assumptions); they are not a
  validation failure.
- `result` is **derived only** — it is never user-editable (FR-011).

### Derivation

```text
result = baseValue × percentage ÷ 100
```

- When `baseValue = 0` → `result = 0` for any percentage (edge case).
- When `percentage = 0` → `result = 0` (edge case).
- When `percentage = 100` → `result = baseValue`.
- Result is formatted for display to remove floating-point artifacts (see research
  Decision 5).

### Lifecycle / state transitions

```text
[Empty]  --enter baseValue & percentage-->  [Ready]
[Ready]  --tap Calculate (valid)-->         [Calculated]   (result shown)
[Ready]  --tap Calculate (invalid)-->       [Error]        (message shown, no result)
[Calculated] --change any input-->          [Ready]        (previous result cleared/stale)
[Error]  --correct input & tap Calculate--> [Calculated]
```

## Value Object: ValidationResult

Returned by the input-parsing step to drive UI feedback.

| Field | Type | Description |
|-------|------|-------------|
| `valid` | boolean | Whether both inputs parsed successfully. |
| `baseValue` | number \| null | Parsed base value, or `null` when invalid. |
| `percentage` | number \| null | Parsed percentage, or `null` when invalid. |
| `errors` | string[] | Human-readable, accessible messages for invalid fields. |

## Supporting concept: Design Tokens

Not a runtime entity but a first-class data structure per Principle V. Tokens are defined
once (color, typography, spacing, radius, elevation) and consumed by all components. They
carry Light/Dark Mode variants and respect Dynamic Type. Detailed values are an
implementation concern for the tasks phase; this model only records that the token set is
the single source of truth for styling.

## Relationships

```text
User input ──parse──▶ ValidationResult ──(valid)──▶ Calculation ──▶ result (display)
                                  │
                                  └──(invalid)──▶ errors (display)
```

No entity is shared across sessions; there is no collection, list, or history of
Calculations in scope for this feature.
