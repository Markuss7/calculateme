# Tests: F7 Polish & Accessibility

**Feature**: [F7-polish-accessibility.md](F7-polish-accessibility.md) | **Branch**: `feature/F7-polish-accessibility`

End-to-end tests with Playwright + @axe-core/playwright (`npm run test:e2e`), run on an
iPhone-sized viewport. Files: `tests/e2e/calculator.spec.ts`,
`tests/e2e/accessibility.spec.ts`.

## End-to-end flow (Quickstart Scenarios A–C)

| ID | Steps | Expectation |
|----|-------|-------------|
| F7-E01 | Launch → tap Calculate me | Dashboard visible |
| F7-E02 | Dashboard → select Rule of three | Calculator visible |
| F7-E03 | Enter 200/25 → Calculate | result shows 50 |
| F7-E04 | Change to 80/100 → Calculate | result updates to 80 |
| F7-E05 | Back control returns to Dashboard | Dashboard visible again |
| F7-E06 | Empty base → Calculate | error shown, no result |
| F7-E07 | Non-numeric base → Calculate | rejection message, no result |

## Edge cases (Quickstart Scenario D)

| ID | Steps | Expectation |
|----|-------|-------------|
| F7-G01 | 0/50 → Calculate | result 0 |
| F7-G02 | 100/0 → Calculate | result 0 |
| F7-G03 | 12.5/10 → Calculate | result 1.25 |
| F7-G04 | 200/150 → Calculate | result 300, no FP artifacts |

## Accessibility (axe-core)

| ID | Context | Expectation |
|----|---------|-------------|
| F7-A01 | Entry screen, Light | zero axe violations |
| F7-A02 | Dashboard, Light | zero axe violations |
| F7-A03 | Calculator, Light | zero axe violations |
| F7-A04 | Calculator, Dark (`prefers-color-scheme: dark`) | zero axe violations |
| F7-A05 | Calculator with error state | zero axe violations; error linked to field |

## Mobile fidelity & performance

| ID | Check | Expectation |
|----|-------|-------------|
| F7-M01 | Touch targets | interactive elements ≥ 44×44 CSS px |
| F7-M02 | Keyboard occlusion | Calculate button visible/reachable with on-screen keyboard open |
| F7-M03 | Dynamic Type | increased font scale does not truncate essential content |
| F7-M04 | Reduce Motion | with `prefers-reduced-motion: reduce`, transitions are minimized |
| F7-M05 | TTI budget | initial calculator view interactive within budget (smoke-measured) |

## Done when

All F7-E, F7-G, F7-A, F7-M checks pass under `npm run test:e2e`, and
[../quickstart.md](../quickstart.md) scenarios validate manually on small and large iPhone
viewports.
