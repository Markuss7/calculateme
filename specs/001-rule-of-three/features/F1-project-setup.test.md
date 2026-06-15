# Tests: F1 Project Setup

**Feature**: [F1-project-setup.md](F1-project-setup.md) | **Branch**: `feature/F1-project-setup`

Automatable checks an agent can run to confirm the toolchain and structure are correct.
These are environment/smoke checks rather than runtime unit tests.

## How to run

```bash
npm install
npm run lint
npm test
npm run build
```

## Checks

| ID | Check | Pass condition |
|----|-------|----------------|
| F1-T01 | Dependencies install | `npm install` exits 0 |
| F1-T02 | TypeScript config valid | `npx tsc --noEmit` exits 0 |
| F1-T03 | Lint runs | `npm run lint` exits 0 |
| F1-T04 | Unit runner starts | `npm test -- --run` exits 0 (0 tests allowed) |
| F1-T05 | E2E runner configured | `npx playwright test --list` exits 0 |
| F1-T06 | Production build | `npm run build` exits 0 and emits `dist/` |
| F1-T07 | Dev server boots | `npm run dev` serves a 200 response on the dev URL |

## Structural assertions (file existence)

| ID | Path must exist |
|----|-----------------|
| F1-S01 | `package.json` with `dev`, `build`, `lint`, `test`, `test:e2e` scripts |
| F1-S02 | `tsconfig.json` |
| F1-S03 | `vite.config.ts` |
| F1-S04 | `vitest.config.ts` |
| F1-S05 | `playwright.config.ts` |
| F1-S06 | `index.html` |
| F1-S07 | `src/`, `src/components/`, `src/features/`, `src/styles/` |
| F1-S08 | `tests/unit/`, `tests/component/`, `tests/e2e/`, `tests/setup.ts` |

## Done when

All checks (F1-T01…F1-T07) and structural assertions (F1-S01…F1-S08) pass.
