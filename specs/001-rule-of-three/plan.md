# Implementation Plan: Rule of Three Calculator

**Branch**: `001-rule-of-three` | **Date**: 2026-06-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-rule-of-three/spec.md`

## Summary

Deliver an iOS-native-feeling web app where the user initiates a **Calculate me** action,
lands on a **Dashboard**, opens the **Rule of three** calculator, enters a base value
(treated as 100%) and a percentage, taps **Calculate**, and sees the result. Technical
approach: a client-only single-page web application built with React + TypeScript + Vite,
a token-driven iOS-aligned design system (CSS custom properties), a pure calculation
function with no external state, Vitest for unit tests, and Playwright for end-to-end and
accessibility validation. No backend or persistence is required.

## Technical Context

**Language/Version**: TypeScript 5.x, targeting ES2022; React 18

**Primary Dependencies**: React 18, React Router 6 (entry → dashboard → calculator
navigation), Vite 5 (build/dev), Vitest + Testing Library (unit/component), Playwright
(E2E + a11y)

**Storage**: N/A — calculations are not persisted (per spec Assumptions)

**Testing**: Vitest + @testing-library/react for unit/component; Playwright with
@axe-core/playwright for end-to-end and accessibility checks

**Target Platform**: Mobile web browsers, iOS Safari first (iPhone viewports ≈320–430pt);
responsive enhancement for larger viewports

**Project Type**: Single-page web application (client-only frontend)

**Performance Goals**: 60fps scrolling/transitions; result rendered within 1s of Calculate
(effectively instantaneous); time-to-interactive < 3s on mid-tier phone over 4G

**Constraints**: Mobile-first, safe-area aware, 44×44pt minimum touch targets, WCAG 2.1 AA,
Dynamic Type / text scaling, Dark Mode, Reduce Motion honored

**Scale/Scope**: 3 screens (entry/Calculate-me, Dashboard, Calculator); 1 calculator in
scope; single user, no concurrency concerns

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against CalculateMe Constitution v1.0.0:

| Principle | Status | How this plan complies |
|-----------|--------|------------------------|
| I. iOS-Native Experience (NON-NEGOTIABLE) | PASS | iOS-standard navigation (nav bar, list rows), system-style buttons, SF Pro–equivalent type scale, iOS color semantics with Dark Mode, iOS easing on transitions. Any HIG deviation documented in spec. |
| II. Mobile-First & Touch-Optimized | PASS | Designed at iPhone widths first; ≥44×44pt targets; Calculate button in thumb zone; safe-area / keyboard-aware layout. |
| III. Performance & Fluidity | PASS | Pure synchronous calculation; minimal bundle (Vite, no heavy UI lib); 60fps transitions with iOS timing; non-blocking input. |
| IV. Accessibility & Inclusivity | PASS | Accessible names/roles/states; numeric inputs labeled; result announced; Dynamic Type via relative units; AA contrast; Reduce Motion honored; validated with axe-core. |
| V. Design-System Consistency | PASS | Spacing/color/typography/elevation as reusable design tokens (CSS custom properties); shared Button, ListRow, NavBar, Field components defined once. |

**Initial Constitution Check: PASS** — no violations; Complexity Tracking not required.

**Post-Design Constitution Check (after Phase 1): PASS** — design artifacts introduce no
new components or patterns that deviate from the constitution; token-driven design system
and reusable components are reflected in data-model and contracts.

## Project Structure

### Documentation (this feature)

```text
specs/001-rule-of-three/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── calculation.md   # Rule-of-three calculation contract
│   └── ui-navigation.md # Screen/navigation + UI component contracts
├── checklists/
│   └── requirements.md  # Spec quality checklist (already created)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created here)
```

### Source Code (repository root)

```text
src/
├── main.tsx                     # App entry / bootstrap
├── App.tsx                      # Router + app shell
├── styles/
│   ├── tokens.css               # iOS-aligned design tokens (color, type, spacing, radius)
│   └── global.css               # Resets, safe-area, Dynamic Type, Dark Mode, Reduce Motion
├── components/                  # Shared design-system components (defined once, reused)
│   ├── NavBar/
│   ├── Button/
│   ├── ListRow/
│   └── Field/
├── features/
│   ├── dashboard/
│   │   └── DashboardScreen.tsx  # Entry "Calculate me" + Dashboard with calculator entry
│   └── rule-of-three/
│       ├── RuleOfThreeScreen.tsx # Calculator UI (base, percentage, result, Calculate)
│       └── calculate.ts          # Pure calculation function (the contract)
└── routes.tsx                   # Route definitions (entry → dashboard → calculator)

tests/
├── unit/
│   └── calculate.test.ts        # Pure function unit tests
├── component/
│   └── RuleOfThreeScreen.test.tsx
└── e2e/
    ├── calculator.spec.ts       # Full user flow (Playwright)
    └── accessibility.spec.ts    # axe-core checks

index.html
vite.config.ts
package.json
tsconfig.json
```

**Structure Decision**: Single client-only web application. There is no backend or data
store (the calculation is a pure client-side function and nothing is persisted), so a
single `src/` tree with a shared `components/` design system and per-screen `features/`
folders is the simplest structure that satisfies the constitution's design-system and
mobile-first principles. Tests are split into unit (pure logic), component (UI behavior),
and e2e (full flow + accessibility).

## Complexity Tracking

> No constitution violations — this section intentionally left empty.
