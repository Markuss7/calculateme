# Feature F7: Polish & Accessibility

**Branch**: `feature/F7-polish-accessibility` | **Stories**: — (cross-cutting) | **Depends on**: F4, F5, F6
**Tests**: [F7-polish-accessibility.test.md](F7-polish-accessibility.test.md)

## Goal

Satisfy the constitution's quality gates across the whole feature: end-to-end flow,
automated accessibility, mobile device fidelity, and performance. Validate
[../quickstart.md](../quickstart.md).

## Scope

- E2E flow test (entry → dashboard → calculator → result).
- axe-core accessibility checks (Light + Dark).
- Safe-area / keyboard / thumb-zone verification on iPhone viewports.
- Dark Mode + Dynamic Type verification.
- 60fps transitions / Reduce Motion and TTI budget.

## Tasks

- [ ] T029 [P] Author E2E flow test in `tests/e2e/calculator.spec.ts`
- [ ] T030 [P] Author axe-core accessibility E2E in `tests/e2e/accessibility.spec.ts`
- [ ] T031 [P] Verify safe-area + keyboard handling and thumb-zone placement on iPhone viewports
- [ ] T032 [P] Verify Dark Mode + Dynamic Type scaling without truncation
- [ ] T033 [P] Verify 60fps transitions / Reduce Motion and < 3s TTI budget
- [ ] T034 Run [../quickstart.md](../quickstart.md) validation end-to-end

## Acceptance criteria (Constitution Principles II–V)

- All quickstart scenarios (A–D) pass.
- axe-core reports zero violations in Light and Dark Mode.
- Touch targets ≥44×44pt; Calculate button reachable; keyboard never obscures it.
- Text scales without truncating essential content.
- Transitions honor Reduce Motion; initial view interactive < 3s on mid-tier 4G.
- F7 tests pass.

## Definition of Done

See [../workflow.md](../workflow.md).
