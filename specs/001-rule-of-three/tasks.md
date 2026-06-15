---
description: "Master task list for the Rule of Three Calculator feature"
---

# Tasks: Rule of Three Calculator

**Input**: Design documents from `/specs/001-rule-of-three/`

**Prerequisites**: [plan.md](plan.md) (required), [spec.md](spec.md) (user stories),
[research.md](research.md), [data-model.md](data-model.md),
[contracts/](contracts/)

**Tests**: REQUESTED. Each feature has a companion `*.test.md` listing automatable unit
tests. Test-authoring tasks are included in each feature.

**Contributor workflow**: This project has multiple contributors. Before starting any
task, read [workflow.md](workflow.md). Each feature is implemented on its **own branch**,
validated against its `*.test.md`, submitted as a **pull request**, and **code-reviewed by
the code-review agent** before merge.

---

## How to use this file

1. Pick a feature/task that is **Not started** and has all dependencies **Done**.
2. Check the [Parallelizable work](#parallelizable-work-no-cross-dependencies) section to
   confirm nobody else is blocked by/blocking your choice.
3. Set the task to **In progress** and add your handle (see legend), commit that change.
4. Create the feature branch named in the feature file, implement, and make the
   `*.test.md` checks pass.
5. Open a PR, request the code-review agent, address feedback, merge.
6. Mark the task **Done**.

### Status legend

| Marker | Meaning |
|--------|---------|
| `- [ ]` | **Not started** |
| `- [ ] 🚧 (@handle)` | **In progress** — claimed by the named contributor |
| `- [x]` | **Done** — merged after passing tests + code review |

### Task format

`- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]** = parallelizable (different files, no incomplete dependencies)
- **[Story]** = user story traceability (US1 calculation, US2 navigation, US3 validation)

---

## Feature map

Each feature has a detail file and a companion test file. Implement on the named branch.

| Feature | Detail file | Tests | Branch | Stories | Status |
|---------|-------------|-------|--------|---------|--------|
| F1 Project Setup | [features/F1-project-setup.md](features/F1-project-setup.md) | [test](features/F1-project-setup.test.md) | `feature/F1-project-setup` | — | Not started |
| F2 Design System & App Shell | [features/F2-design-system.md](features/F2-design-system.md) | [test](features/F2-design-system.test.md) | `feature/F2-design-system` | — | Not started |
| F3 Calculation Engine | [features/F3-calculation-engine.md](features/F3-calculation-engine.md) | [test](features/F3-calculation-engine.test.md) | `feature/F3-calculation-engine` | US1 | Not started |
| F4 Navigation & Dashboard | [features/F4-navigation-dashboard.md](features/F4-navigation-dashboard.md) | [test](features/F4-navigation-dashboard.test.md) | `feature/F4-navigation-dashboard` | US2 | Not started |
| F5 Calculator Screen | [features/F5-calculator-screen.md](features/F5-calculator-screen.md) | [test](features/F5-calculator-screen.test.md) | `feature/F5-calculator-screen` | US1 | Not started |
| F6 Input Validation & Feedback | [features/F6-input-validation.md](features/F6-input-validation.md) | [test](features/F6-input-validation.test.md) | `feature/F6-input-validation` | US3 | Not started |
| F7 Polish & Accessibility | [features/F7-polish-accessibility.md](features/F7-polish-accessibility.md) | [test](features/F7-polish-accessibility.test.md) | `feature/F7-polish-accessibility` | — | Not started |

---

## Phase 1 — F1: Project Setup (Shared Infrastructure)

**Purpose**: Initialize the toolchain and source structure. Blocks everything.
**Detail**: [features/F1-project-setup.md](features/F1-project-setup.md)

- [ ] T001 Initialize Vite + React + TypeScript project at repo root (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`)
- [ ] T002 [P] Configure ESLint + Prettier (`.eslintrc.cjs`, `.prettierrc`)
- [ ] T003 [P] Configure Vitest + Testing Library (`vitest.config.ts`, `tests/setup.ts`)
- [ ] T004 [P] Configure Playwright + axe-core (`playwright.config.ts`)
- [ ] T005 Create source/test directory skeleton per plan (`src/`, `src/components/`, `src/features/`, `src/styles/`, `tests/`)

**Checkpoint**: `npm install`, `npm run dev`, `npm test`, and `npm run test:e2e` all start without error.

---

## Phase 2 — F2: Design System & App Shell (Foundational)

**Purpose**: iOS-aligned tokens and reusable components. Blocks all UI stories.
**Detail**: [features/F2-design-system.md](features/F2-design-system.md)
**Depends on**: F1

⚠️ **CRITICAL**: No screen work (F4, F5) can begin until this phase is complete.

- [ ] T006 [P] Create iOS design tokens in `src/styles/tokens.css` (color, type scale, spacing, radius, elevation; Light + Dark)
- [ ] T007 [P] Create global styles in `src/styles/global.css` (reset, safe-area, Dynamic Type, `prefers-reduced-motion`, `prefers-color-scheme`)
- [ ] T008 [P] Implement `Button` component in `src/components/Button/`
- [ ] T009 [P] Implement `NavBar` component in `src/components/NavBar/`
- [ ] T010 [P] Implement `ListRow` component in `src/components/ListRow/`
- [ ] T011 [P] Implement `Field` (labeled numeric input) component in `src/components/Field/`
- [ ] T012 Implement app shell + bootstrap (`src/main.tsx`, `src/App.tsx`) wiring global styles (depends on T006, T007)

**Checkpoint**: Components render in isolation; tokens drive Light/Dark; F2 tests pass.

---

## Phase 3 — F3: Calculation Engine (User Story 1 - P1) 🎯 MVP core

**Goal**: Pure, tested rule-of-three math and input parsing.
**Independent Test**: Call the functions with the contract table; outputs match exactly.
**Detail**: [features/F3-calculation-engine.md](features/F3-calculation-engine.md)
**Depends on**: F1 (can run in parallel with F2)

### Tests (write first, must fail before implementation)

- [ ] T013 [P] [US1] Author unit tests for calculation + formatting in `tests/unit/calculate.test.ts` (per F3 test.md)
- [ ] T014 [P] [US1] Author unit tests for input parsing/validation in `tests/unit/validation.test.ts` (per F3 test.md)

### Implementation

- [ ] T015 [P] [US1] Implement `calculateRuleOfThree` + `formatResult` in `src/features/rule-of-three/calculate.ts`
- [ ] T016 [P] [US1] Implement `parseInputs` + `ValidationResult` in `src/features/rule-of-three/validation.ts`

**Checkpoint**: `tests/unit/calculate.test.ts` and `tests/unit/validation.test.ts` pass green.

---

## Phase 4 — F4: Navigation & Dashboard (User Story 2 - P2)

**Goal**: Entry "Calculate me" → Dashboard → open Rule of three.
**Independent Test**: Tap Calculate me → Dashboard shows; select row → calculator route opens.
**Detail**: [features/F4-navigation-dashboard.md](features/F4-navigation-dashboard.md)
**Depends on**: F2

### Tests

- [ ] T017 [P] [US2] Author component tests for routing + screens in `tests/component/navigation.test.tsx` (per F4 test.md)

### Implementation

- [ ] T018 [US2] Define routes (`/`, `/dashboard`, `/dashboard/rule-of-three`) in `src/routes.tsx`
- [ ] T019 [P] [US2] Implement Entry screen with **Calculate me** action in `src/features/dashboard/EntryScreen.tsx`
- [ ] T020 [P] [US2] Implement Dashboard with **Rule of three** row in `src/features/dashboard/DashboardScreen.tsx`
- [ ] T021 [US2] Wire iOS push/back navigation in `NavBar` + routes (depends on T018, T019, T020)

**Checkpoint**: Full entry→dashboard→calculator navigation works; F4 tests pass.

---

## Phase 5 — F5: Calculator Screen (User Story 1 - P1) 🎯 MVP UI

**Goal**: The calculator UI wiring the engine: base field, percentage field, Calculate
button, read-only result.
**Independent Test**: Enter 200 & 25, tap Calculate → result shows 50; recalculation updates.
**Detail**: [features/F5-calculator-screen.md](features/F5-calculator-screen.md)
**Depends on**: F2, F3 (and F4 for the route entry point)

### Tests

- [ ] T022 [P] [US1] Author component tests for calculator behavior in `tests/component/RuleOfThreeScreen.test.tsx` (per F5 test.md)

### Implementation

- [ ] T023 [US1] Implement `RuleOfThreeScreen.tsx` layout (base `Field`, percentage `Field`, result output, Calculate `Button`) in `src/features/rule-of-three/RuleOfThreeScreen.tsx`
- [ ] T024 [US1] Wire Calculate tap → `parseInputs` → `calculateRuleOfThree` → `formatResult` → result field; support recalculation (FR-008)
- [ ] T025 [US1] Ensure result field is read-only and result announced via live region (FR-011)

**Checkpoint**: Calculator computes correct results on tap; F5 tests pass.

---

## Phase 6 — F6: Input Validation & Error Feedback (User Story 3 - P3)

**Goal**: Clear, accessible feedback for empty/invalid input; never show a wrong result.
**Independent Test**: Empty/non-numeric input → message shown, no result (SC-005).
**Detail**: [features/F6-input-validation.md](features/F6-input-validation.md)
**Depends on**: F5

### Tests

- [ ] T026 [P] [US3] Author component tests for validation/error UI in `tests/component/validation-ui.test.tsx` (per F6 test.md)

### Implementation

- [ ] T027 [US3] Surface `parseInputs` errors inline per field with `aria-describedby` in `RuleOfThreeScreen.tsx`
- [ ] T028 [US3] Suppress/clear result on invalid input and announce errors to assistive tech

**Checkpoint**: Invalid input shows accessible messages and never a wrong result; F6 tests pass.

---

## Phase 7 — F7: Polish & Cross-Cutting Concerns

**Purpose**: Constitution gates — accessibility, performance, device validation.
**Detail**: [features/F7-polish-accessibility.md](features/F7-polish-accessibility.md)
**Depends on**: F4, F5, F6

### Tests

- [ ] T029 [P] Author E2E flow test in `tests/e2e/calculator.spec.ts` (per F7 test.md)
- [ ] T030 [P] Author axe-core accessibility E2E in `tests/e2e/accessibility.spec.ts` (Light + Dark)

### Implementation / verification

- [ ] T031 [P] Verify safe-area + keyboard handling and thumb-zone placement on iPhone viewports
- [ ] T032 [P] Verify Dark Mode + Dynamic Type scaling without truncation
- [ ] T033 [P] Verify 60fps transitions / Reduce Motion and < 3s TTI budget
- [ ] T034 Run [quickstart.md](quickstart.md) validation end-to-end

**Checkpoint**: All quickstart scenarios pass; axe reports zero violations.

---

## Dependencies & Execution Order

### Feature dependency graph

```text
F1 Project Setup
├──▶ F2 Design System & App Shell ──┐
└──▶ F3 Calculation Engine ─────────┤
                                    ├──▶ F5 Calculator Screen ──▶ F6 Input Validation ──┐
        F2 ──▶ F4 Navigation ───────┘                                                   ├──▶ F7 Polish
        F4 ───────────────────────────────────────────────────────────────────────────┘
```

- **F1** blocks everything.
- **F2** and **F3** can proceed in parallel once F1 is done.
- **F4** needs F2. **F5** needs F2 + F3 (route from F4). **F6** needs F5. **F7** needs F4 + F5 + F6.

### Within each feature

- Author tests first (they should fail), then implement until green.
- Tokens/global styles before components; components before screens.
- Engine (F3) before screen wiring (F5); screen (F5) before validation UI (F6).

---

## Parallelizable work (no cross-dependencies)

Tasks/features that different contributors can take simultaneously:

- **After F1 merges**: F2 and F3 run fully in parallel (different files, no shared deps).
  - Within F1: T002, T003, T004 are `[P]`.
  - Within F2: T006–T011 are `[P]` (separate component/style files).
  - Within F3: T013/T014 (tests) and T015/T016 (impl) are `[P]` (separate files).
- **After F2 merges**: F4 can start while F3 is still in progress.
- **Within F4**: T019 and T020 are `[P]`.
- **Within F7**: T029–T033 are `[P]`.

### Suggested contributor assignment (3 contributors)

1. Contributor A: F1 → F2 → F4
2. Contributor B: F3 → F5 (waits for F2 from A)
3. Contributor C: F6 → F7 (waits for F5 from B); helps author E2E tests meanwhile

---

## Implementation Strategy

### MVP first

1. F1 (Setup) → F2 (Design System) + F3 (Engine) → F5 (Calculator Screen).
2. **STOP & VALIDATE**: a user can open the calculator route, enter values, get a result.
3. Add F4 (full navigation), then F6 (validation), then F7 (polish).

### Incremental delivery

- F1 → F2 + F3 → F4 → F5 (**MVP demo**) → F6 → F7. Each feature merges independently
  behind its own PR + code review.

---

## Notes

- Every feature is built on its **own branch**, tested against its `*.test.md`, and merged
  only after a **code-review-agent** approval (see [workflow.md](workflow.md)).
- `[P]` = different files, no incomplete dependencies.
- Keep this file's statuses current — it is the single source of truth for who is doing what.
- Commit the status change (claim) before starting work to avoid two contributors picking
  the same task.
