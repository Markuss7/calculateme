# Contract: Screens, Navigation & UI Components

**Feature**: 001-rule-of-three | **Type**: UI / navigation contract | **Date**: 2026-06-14

Defines the screens, navigation transitions, and the UI contract each screen exposes to
the user. All screens conform to the CalculateMe Constitution (iOS-native, mobile-first,
accessible, design-system-driven).

## Navigation map

```text
[Entry / "Calculate me"]  --tap "Calculate me"-->  [Dashboard]
[Dashboard]               --select "Rule of three"-->  [Rule of Three Calculator]
[Rule of Three]           --back-->                [Dashboard]
[Dashboard]               --back-->                [Entry]
```

| Route | Screen | Purpose |
|-------|--------|---------|
| `/` | Entry | Presents the **Calculate me** action (FR-001). |
| `/dashboard` | Dashboard | Lists available calculators; exposes **Rule of three** (FR-002). |
| `/dashboard/rule-of-three` | Calculator | The rule-of-three calculator UI (FR-003). |

Navigation uses iOS-style push/back semantics with a nav bar back control and swipe-back
where supported (Principle I).

## Screen: Entry ("Calculate me")

- **Provides**: a primary, clearly labeled **Calculate me** action.
- **On activate**: navigates to `/dashboard`.
- **A11y**: action is a button with an accessible name "Calculate me"; ≥44×44pt.

## Screen: Dashboard

- **Provides**: an inset grouped list with a **Rule of three** row.
- **On select row**: navigates to `/dashboard/rule-of-three`.
- **A11y**: list row exposes role/name/state; supports VoiceOver navigation.
- **Extensibility**: additional calculator rows may be added later (out of scope now).

## Screen: Rule of Three Calculator

UI contract (maps to FR-003 … FR-011):

| Element | Type | Contract |
|---------|------|----------|
| Base value field | numeric input | User enters the base value (= 100%). `inputmode="decimal"`. Labeled. |
| Percentage field | numeric input | User enters the percentage. `inputmode="decimal"`. Labeled. |
| Calculate button | button | Triggers calculation on tap (FR-006). ≥44×44pt, in thumb zone. |
| Result field | read-only output | Displays the formatted result (FR-007, FR-011). Not editable. |
| Error message | inline text | Shown when input invalid (FR-010); associated with the field via `aria-describedby`. |

### Interaction contract

1. **Valid calculate**: both fields valid → tap Calculate → result field shows
   `formatResult(calculateRuleOfThree(base, percentage))`. (US1)
2. **Recalculate**: change an input → tap Calculate → result updates. (FR-008)
3. **Invalid/empty**: missing or non-numeric input → tap Calculate → no result; accessible
   error message shown; previous result not presented as current. (US3, FR-010)
4. **Result announcement**: result change is announced to assistive tech (e.g. live region)
   for VoiceOver users (Principle IV).

### Non-functional contract (all screens)

- 60fps transitions with iOS easing; motion gated by `prefers-reduced-motion` (Principle III/IV).
- Light & Dark Mode via design tokens (Principle V).
- Safe-area-aware layout; keyboard does not obscure the Calculate button (Principle II).
- AA contrast; Dynamic Type scaling without truncation of essential content (Principle IV).
