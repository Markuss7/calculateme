# Quickstart: Rule of Three Calculator

**Feature**: 001-rule-of-three | **Date**: 2026-06-14

A validation/run guide proving the feature works end-to-end. Implementation details live in
`tasks.md` (Phase 2) and the source code; this guide focuses on how to run and verify.

## Prerequisites

- Node.js 20+ and npm
- A modern browser (iOS Safari or Chrome/Edge with device emulation)

## Setup

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Open the served URL on an iPhone-sized viewport (≈390pt wide) or use browser device
emulation (e.g. iPhone 14).

## Validation scenarios

These map directly to the spec's user stories, acceptance scenarios, and success criteria.
See [contracts/calculation.md](contracts/calculation.md) and
[contracts/ui-navigation.md](contracts/ui-navigation.md) for exact contracts, and
[data-model.md](data-model.md) for entity rules.

### Scenario A — Core calculation (User Story 1, P1)

1. From the entry screen, tap **Calculate me** → the Dashboard appears.
2. Select **Rule of three** → the calculator opens.
3. Enter base value `200`, percentage `25`, tap **Calculate**.
4. **Expected**: result field shows `50`.
5. Change base value to `80`, percentage to `100`, tap **Calculate**.
6. **Expected**: result updates to `80` (validates FR-008 recalculation).

### Scenario B — Navigation flow (User Story 2, P2)

1. Launch the app → entry screen with **Calculate me** is shown.
2. Tap **Calculate me** → Dashboard displayed (FR-001).
3. Confirm a **Rule of three** entry is present (FR-002) and opens the calculator (FR-003).
4. Use the nav-bar back control / swipe-back to return to the Dashboard.

### Scenario C — Invalid / incomplete input (User Story 3, P3)

1. On the calculator, leave the base value empty, enter percentage `25`, tap **Calculate**.
2. **Expected**: no result is produced; an accessible message prompts for a base value
   (FR-010, SC-005).
3. Enter a non-numeric base value (e.g. `abc`), tap **Calculate**.
4. **Expected**: input rejected with a clear message; no incorrect result shown.

### Scenario D — Edge cases

- Base `0`, percentage `50` → result `0`.
- Percentage `0` → result `0`.
- Decimal: base `12.5`, percentage `10` → result `1.25`.
- Over 100%: base `200`, percentage `150` → result `300`.
- Result renders cleanly without floating-point artifacts.

## Automated checks

```bash
npm run test        # Vitest unit + component tests (calculation contract, UI behavior)
npm run test:e2e    # Playwright end-to-end flow + axe-core accessibility checks
```

Expected outcomes:

- Unit tests cover every row of the calculation contract test table.
- E2E tests cover Scenarios A–C across an iPhone viewport.
- Accessibility checks (axe) report no violations in Light and Dark Mode.

## Success criteria verification

| Criterion | How to verify |
|-----------|---------------|
| SC-001 (entry→result < 30s) | Walk Scenario B then A; confirm reachable quickly. |
| SC-002 (correct results) | Unit tests + Scenario A/D pass. |
| SC-004 (result < 1s) | Result appears immediately on tapping Calculate. |
| SC-005 (no wrong result on bad input) | Scenario C shows messages, never a wrong result. |
| Accessibility (Principle IV) | `npm run test:e2e` axe checks pass; VoiceOver announces result. |
