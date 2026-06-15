# Feature F6: Input Validation & Error Feedback

**Branch**: `feature/F6-input-validation` | **Stories**: US3 | **Depends on**: F5
**Tests**: [F6-input-validation.test.md](F6-input-validation.test.md)

## Goal

Provide clear, accessible feedback for empty or invalid input, and guarantee a wrong result
is never shown. Implements US3 and FR-010, SC-005.

## Scope

- Surface `parseInputs` errors inline per field (base / percentage).
- Associate each message with its field via `aria-describedby` and set `aria-invalid`.
- Suppress or clear the result when input is invalid.
- Announce errors to assistive tech.

## Tasks

- [ ] T026 [P] [US3] Author component tests for validation/error UI in `tests/component/validation-ui.test.tsx`
- [ ] T027 [US3] Surface `parseInputs` errors inline per field in `RuleOfThreeScreen.tsx`
- [ ] T028 [US3] Clear/suppress result on invalid input and announce errors

## Acceptance criteria (maps to US3 / FR-010, SC-005)

- Empty base or percentage → message prompting for the value; no result computed.
- Non-numeric input → field-specific rejection message; no result.
- A previously shown result is not presented as the current result after invalid input.
- Messages are programmatically associated with their fields (screen-reader accessible).
- F6 tests pass.

## Definition of Done

See [../workflow.md](../workflow.md).
