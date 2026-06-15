# Feature F4: Navigation & Dashboard

**Branch**: `feature/F4-navigation-dashboard` | **Stories**: US2 | **Depends on**: F2
**Tests**: [F4-navigation-dashboard.test.md](F4-navigation-dashboard.test.md)

## Goal

Implement the user flow: entry **Calculate me** action → **Dashboard** → open the **Rule
of three** calculator. iOS-style push/back navigation. Implements US2 and
[../contracts/ui-navigation.md](../contracts/ui-navigation.md).

## Scope

- Routes: `/` (entry), `/dashboard`, `/dashboard/rule-of-three`.
- Entry screen with a primary **Calculate me** action.
- Dashboard screen with a **Rule of three** `ListRow`.
- Nav-bar back control / iOS push-back semantics.

## Tasks

- [ ] T017 [P] [US2] Author component tests for routing + screens in `tests/component/navigation.test.tsx`
- [ ] T018 [US2] Define routes in `src/routes.tsx`
- [ ] T019 [P] [US2] Implement Entry screen (`Calculate me`) in `src/features/dashboard/EntryScreen.tsx`
- [ ] T020 [P] [US2] Implement Dashboard (`Rule of three` row) in `src/features/dashboard/DashboardScreen.tsx`
- [ ] T021 [US2] Wire push/back navigation via `NavBar` + routes (depends on T018, T019, T020)

## Acceptance criteria (maps to US2 / FR-001, FR-002, FR-003)

- Activating **Calculate me** navigates to `/dashboard`.
- Dashboard shows a **Rule of three** entry that opens `/dashboard/rule-of-three`.
- Back control returns to the previous screen.
- Uses F2 design-system components (`NavBar`, `Button`, `ListRow`).
- F4 tests pass.

## Definition of Done

See [../workflow.md](../workflow.md).
