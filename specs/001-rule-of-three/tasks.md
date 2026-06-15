# Tasks: Rule of Three Calculator

## Phase 1: Project Setup

- [x] T001 Initialize Vite + React + TypeScript project at repo root (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`)
- [x] T002 Configure ESLint + Prettier (`.eslintrc.cjs`, `.prettierrc`)
- [x] T003 Configure Vitest + Testing Library (`vitest.config.ts`, `tests/setup.ts`)
- [x] T004 Configure Playwright + axe-core (`playwright.config.ts`)
- [x] T005 Create source/test directory skeleton (`src/`, `src/components/`, `src/features/`, `src/styles/`, `tests/unit/`, `tests/component/`, `tests/e2e/`)

## Phase 2: Design System & Shared Components

- [x] T006 Create iOS design tokens in `src/styles/tokens.css`
- [x] T007 Create global styles in `src/styles/global.css`
- [x] T008 Implement `Button` component in `src/components/Button/`
- [x] T009 Implement `NavBar` component in `src/components/NavBar/`
- [x] T010 Implement `ListRow` component in `src/components/ListRow/`
- [x] T011 Implement `Field` component in `src/components/Field/`
- [x] T012 Add component tests and shared preview shell (`tests/component/design-system.test.tsx`, `src/App.tsx`)

## Phase 3: Calculation Engine

- [x] T013 Add calculation contract tests in `tests/unit/calculate.test.ts`
- [x] T014 Add input parsing tests in `tests/unit/validation.test.ts`
- [x] T015 Implement `calculateRuleOfThree` and `formatResult` in `src/features/rule-of-three/calculate.ts`
- [x] T016 Implement `parseInputs` in `src/features/rule-of-three/validation.ts`

## Phase 4: Navigation and Dashboard

- [x] T017 Add navigation component tests in `tests/component/navigation.test.tsx`
- [x] T018 Define routes in `src/routes.tsx`
- [x] T019 Implement the entry screen in `src/features/dashboard/EntryScreen.tsx`
- [x] T020 Implement the dashboard screen in `src/features/dashboard/DashboardScreen.tsx`
- [x] T021 Wire nav-bar back navigation across routes and screens

## Phase 5: Calculator Screen

- [x] T022 Add calculator screen component tests in `tests/component/RuleOfThreeScreen.test.tsx`
- [x] T023 Implement the calculator screen layout in `src/features/rule-of-three/RuleOfThreeScreen.tsx`
- [x] T024 Wire the calculate action to the F3 engine and support recalculation
- [x] T025 Add a read-only result field with live-region announcement
