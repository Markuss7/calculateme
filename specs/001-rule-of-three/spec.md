# Feature Specification: Rule of Three Calculator

**Feature Branch**: `001-rule-of-three`

**Created**: 2026-06-14

**Status**: Draft

**Input**: User description: "Calculate me action leads to a Dashboard. On the Dashboard the user can access the rule of three calculator. The calculator has an input field (base value = 100%), a result field (a specified percentage of the input value), and a calculate button."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate a percentage of a base value (Priority: P1)

A user wants to find out what a specific percentage of a given number is. They open the
rule of three calculator, enter their base value (treated as 100%), enter the percentage
they are interested in, tap **Calculate**, and immediately see the result.

**Why this priority**: This is the core purpose of the feature — without the calculation
itself, nothing else delivers value. It is the smallest slice that makes the product
useful on its own.

**Independent Test**: Can be fully tested by entering a base value and a percentage,
tapping Calculate, and confirming the displayed result equals the expected portion of the
base value. Delivers immediate standalone value as a working calculator.

**Acceptance Scenarios**:

1. **Given** the calculator is open with an empty result, **When** the user enters `200`
   as the base value and `25` as the percentage and taps **Calculate**, **Then** the
   result field displays `50`.
2. **Given** the user has entered a base value of `80` and a percentage of `100`, **When**
   they tap **Calculate**, **Then** the result field displays `80`.
3. **Given** a result is already shown, **When** the user changes the base value and taps
   **Calculate** again, **Then** the result field updates to reflect the new calculation.

---

### User Story 2 - Reach the calculator from the Dashboard (Priority: P2)

A user opens the app, initiates the **Calculate me** action, lands on the Dashboard, and
selects the **Rule of three** calculator to begin a calculation.

**Why this priority**: Navigation provides the entry path users rely on, but the
calculation logic (P1) is what delivers the actual value. This makes the feature
discoverable and reachable in the intended flow.

**Independent Test**: Can be tested by initiating the Calculate me action, confirming the
Dashboard appears, selecting the rule of three calculator, and confirming the calculator
screen opens.

**Acceptance Scenarios**:

1. **Given** the user is at the entry point, **When** they initiate the **Calculate me**
   action, **Then** the Dashboard is displayed.
2. **Given** the user is on the Dashboard, **When** they select the **Rule of three**
   calculator, **Then** the calculator screen is displayed ready for input.

---

### User Story 3 - Receive clear feedback for invalid or incomplete input (Priority: P3)

A user enters non-numeric or incomplete input (or leaves a field blank) and taps
**Calculate**. The calculator guides them to correct the input rather than showing a
confusing or wrong result.

**Why this priority**: Improves trust and usability, but the calculator is still usable for
the happy path without it. It hardens the core experience rather than enabling it.

**Independent Test**: Can be tested by leaving a field empty or entering an invalid value,
tapping Calculate, and confirming a clear, non-blocking message appears and no incorrect
result is shown.

**Acceptance Scenarios**:

1. **Given** the base value field is empty, **When** the user taps **Calculate**, **Then**
   no result is calculated and the user is prompted to provide a base value.
2. **Given** the user enters a non-numeric value, **When** they tap **Calculate**, **Then**
   the input is rejected with a clear, accessible message and no result is shown.

---

### Edge Cases

- **Zero base value**: When the base value is `0`, every percentage of it is `0`; the
  result displays `0`.
- **Zero percentage**: When the percentage is `0`, the result is `0`.
- **Decimal inputs**: Base value and percentage may contain decimals (e.g., `12.5`); the
  result preserves reasonable precision.
- **Percentages above 100%**: Values greater than `100` are valid (e.g., `150%` of `200`
  is `300`).
- **Negative values**: The calculator handles negative inputs predictably or rejects them
  with a clear message (see Assumptions).
- **Very large numbers**: The result remains readable and does not overflow the result
  field.
- **Recalculation**: Changing any input and tapping Calculate again replaces the previous
  result.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a **Calculate me** action at the app entry point that
  navigates the user to the Dashboard.
- **FR-002**: The Dashboard MUST present access to the **Rule of three** calculator.
- **FR-003**: Selecting the rule of three calculator MUST open a calculator screen
  containing a base-value input field, a percentage input field, a result field, and a
  **Calculate** button.
- **FR-004**: The calculator MUST treat the value entered in the base-value input field as
  representing `100%`.
- **FR-005**: Users MUST be able to enter a numerical base value and a numerical percentage.
- **FR-006**: When the user taps **Calculate**, the system MUST compute the result as the
  specified percentage of the base value (result = base value × percentage ÷ 100).
- **FR-007**: The system MUST display the computed result in the result field.
- **FR-008**: The system MUST update the result whenever the user changes an input and taps
  **Calculate** again.
- **FR-009**: The system MUST accept decimal values for both the base value and the
  percentage.
- **FR-010**: The system MUST validate inputs and, when a required field is empty or
  contains a non-numeric value, MUST NOT produce a result and MUST present a clear,
  accessible message guiding the user to correct the input.
- **FR-011**: The result field MUST be read-only (populated only by the calculation, not
  directly editable by the user).

### Key Entities *(include if feature involves data)*

- **Calculation**: Represents a single rule-of-three evaluation. Attributes: base value
  (the `100%` reference), percentage (the portion requested), and result (the computed
  portion of the base value).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can go from the entry point to a completed calculation (result
  displayed) in under 30 seconds on their first attempt.
- **SC-002**: For valid numeric inputs, the displayed result is mathematically correct in
  100% of calculations.
- **SC-003**: At least 95% of first-time users successfully complete a calculation without
  external guidance.
- **SC-004**: The result is displayed within 1 second of tapping **Calculate**, perceived
  as instantaneous.
- **SC-005**: Invalid or incomplete input never produces an incorrect result; in 100% of
  such cases the user receives a clear corrective message instead.

## Assumptions

- The "specified percentage" is provided by the user through a dedicated percentage input
  field on the calculator screen (the description names only the base input, result field,
  and Calculate button, but a percentage must be supplied for the calculation to be
  meaningful).
- The calculation is performed on demand when the user taps **Calculate**, rather than
  live as the user types.
- Calculations are not persisted between sessions; the calculator starts empty each time
  it is opened (no calculation history in v1).
- Negative base values and percentages are accepted and calculated literally; if product
  feedback indicates otherwise, validation can later reject them.
- The Dashboard may host additional calculators in the future, but only the rule of three
  calculator is in scope for this feature.
- The experience targets iPhone-sized viewports first and follows the project's
  iOS-native, accessibility, and design-system constitution principles.
