# Feature F1: Project Setup

**Branch**: `feature/F1-project-setup` | **Stories**: — (infrastructure) | **Depends on**: none
**Tests**: [F1-project-setup.test.md](F1-project-setup.test.md)

## Goal

Initialize the client-only React + TypeScript + Vite application, the test tooling, and
the source/test directory skeleton defined in [../plan.md](../plan.md). This feature
blocks all others.

## Scope

- Vite + React 18 + TypeScript project at the repository root.
- ESLint + Prettier configuration.
- Vitest + @testing-library/react configuration.
- Playwright + @axe-core/playwright configuration.
- Source and test directory skeleton.

## Tasks

- [ ] T001 Initialize Vite + React + TypeScript project at repo root (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`)
- [ ] T002 [P] Configure ESLint + Prettier (`.eslintrc.cjs`, `.prettierrc`)
- [ ] T003 [P] Configure Vitest + Testing Library (`vitest.config.ts`, `tests/setup.ts`)
- [ ] T004 [P] Configure Playwright + axe-core (`playwright.config.ts`)
- [ ] T005 Create source/test directory skeleton (`src/`, `src/components/`, `src/features/`, `src/styles/`, `tests/unit/`, `tests/component/`, `tests/e2e/`)

## Required npm scripts

`package.json` MUST expose:

- `dev` — start Vite dev server
- `build` — production build
- `lint` — run ESLint
- `test` — run Vitest (unit + component)
- `test:e2e` — run Playwright

## Acceptance criteria

- `npm install` succeeds.
- `npm run dev` serves the app.
- `npm test` and `npm run test:e2e` run (even with zero tests) without configuration errors.
- Directory skeleton matches the Project Structure in [../plan.md](../plan.md).

## Definition of Done

See [../workflow.md](../workflow.md). All F1 tests pass; PR reviewed by the code-review
agent; statuses updated in [../tasks.md](../tasks.md).
