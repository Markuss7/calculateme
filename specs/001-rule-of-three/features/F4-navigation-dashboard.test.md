# Tests: F4 Navigation & Dashboard

**Feature**: [F4-navigation-dashboard.md](F4-navigation-dashboard.md) | **Branch**: `feature/F4-navigation-dashboard`

Component tests with @testing-library/react + a router test wrapper (`npm test`). File:
`tests/component/navigation.test.tsx`.

## Entry screen

| ID | Test | Expectation |
|----|------|-------------|
| F4-E01 | Renders Calculate me action | `getByRole('button', { name: /calculate me/i })` found |
| F4-E02 | Navigates to dashboard | activating it routes to `/dashboard` |

## Dashboard

| ID | Test | Expectation |
|----|------|-------------|
| F4-D01 | Renders Rule of three row | row with accessible name /rule of three/i present |
| F4-D02 | Opens calculator | selecting the row routes to `/dashboard/rule-of-three` |
| F4-D03 | Renders nav bar title | dashboard nav bar shows its title |

## Routing

| ID | Test | Expectation |
|----|------|-------------|
| F4-R01 | Default route | `/` renders the Entry screen |
| F4-R02 | Dashboard route | `/dashboard` renders the Dashboard |
| F4-R03 | Calculator route | `/dashboard/rule-of-three` renders the calculator screen |
| F4-R04 | Back navigation | from calculator, back control returns to `/dashboard` |
| F4-R05 | Unknown route | unknown path redirects to `/` (or renders a safe fallback) |

## Accessibility

| ID | Test | Expectation |
|----|------|-------------|
| F4-A01 | Focus management | navigating to a new screen moves focus to its heading/nav title |
| F4-A02 | Back control labeled | back button exposes an accessible name |

## Done when

All F4-E, F4-D, F4-R, F4-A checks pass under `npm test`.
