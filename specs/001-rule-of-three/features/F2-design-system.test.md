# Tests: F2 Design System & App Shell

**Feature**: [F2-design-system.md](F2-design-system.md) | **Branch**: `feature/F2-design-system`

Component/unit tests with @testing-library/react (run via `npm test`). File suggestion:
`tests/component/design-system.test.tsx`.

## Button

| ID | Test | Expectation |
|----|------|-------------|
| F2-B01 | Renders with accessible name | `getByRole('button', { name })` found |
| F2-B02 | Fires `onClick` on click | handler called once |
| F2-B03 | Disabled state | `disabled` set; no click handler fired |
| F2-B04 | Min touch target | computed min-height/width ≥ 44px |
| F2-B05 | Variant classes | primary vs secondary apply distinct token-based styles |

## NavBar

| ID | Test | Expectation |
|----|------|-------------|
| F2-N01 | Renders title | title text present |
| F2-N02 | Back control accessible | back button exposes accessible label, fires handler |
| F2-N03 | No back control when not provided | back button absent |

## ListRow

| ID | Test | Expectation |
|----|------|-------------|
| F2-L01 | Renders label | label text present |
| F2-L02 | Activates on click/Enter | `onSelect` fired by click and keyboard |
| F2-L03 | Has row/button semantics | exposes interactive role for assistive tech |

## Field

| ID | Test | Expectation |
|----|------|-------------|
| F2-F01 | Label associated with input | `getByLabelText(label)` returns the input |
| F2-F02 | Decimal input mode | `inputmode="decimal"` present |
| F2-F03 | Error wiring | when error passed, `aria-describedby` points to error text |
| F2-F04 | No error by default | no error node, `aria-invalid` not set |
| F2-F05 | Value + onChange | typing updates value via controlled handler |

## Tokens & theming

| ID | Test | Expectation |
|----|------|-------------|
| F2-T01 | Tokens defined | core CSS variables exist on `:root` (color, spacing, radius, type) |
| F2-T02 | Dark mode variant | dark-scheme overrides defined (media query or `[data-theme]`) |
| F2-T03 | No hard-coded colors | components reference `var(--…)` tokens, not raw hex (lint/snapshot check) |

## App shell

| ID | Test | Expectation |
|----|------|-------------|
| F2-A01 | App renders | `App` mounts without error |
| F2-A02 | Global styles applied | global stylesheet imported in bootstrap |

## Done when

All F2-B/N/L/F/T/A checks pass under `npm test`.
