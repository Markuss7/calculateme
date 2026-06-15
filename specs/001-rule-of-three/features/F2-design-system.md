# Feature F2: Design System & App Shell

**Branch**: `feature/F2-design-system` | **Stories**: — (foundational) | **Depends on**: F1
**Tests**: [F2-design-system.test.md](F2-design-system.test.md)

## Goal

Build the token-driven, iOS-aligned design system and the app shell. Implements
Constitution Principles I (iOS-Native) and V (Design-System Consistency) and provides the
reusable components every screen will use. Blocks F4 and F5.

## Scope

- Design tokens (CSS custom properties) for color, typography, spacing, radius, elevation,
  with Light and Dark Mode variants.
- Global styles: reset, safe-area insets, Dynamic Type (relative units), `prefers-reduced-motion`,
  `prefers-color-scheme`.
- Reusable components: `Button`, `NavBar`, `ListRow`, `Field` (labeled numeric input).
- App shell + bootstrap.

## Tasks

- [ ] T006 [P] Create iOS design tokens in `src/styles/tokens.css`
- [ ] T007 [P] Create global styles in `src/styles/global.css`
- [ ] T008 [P] Implement `Button` in `src/components/Button/`
- [ ] T009 [P] Implement `NavBar` in `src/components/NavBar/`
- [ ] T010 [P] Implement `ListRow` in `src/components/ListRow/`
- [ ] T011 [P] Implement `Field` in `src/components/Field/`
- [ ] T012 Implement app shell `src/App.tsx` + bootstrap `src/main.tsx` (depends on T006, T007)

## Component contracts (summary)

- **Button**: accessible name, ≥44×44pt min target, primary/secondary variants, disabled
  state, iOS press feedback honoring Reduce Motion.
- **NavBar**: title + optional back control with accessible label; safe-area aware.
- **ListRow**: tappable row with label, role, and pressed state for VoiceOver.
- **Field**: associated `<label>`, `inputmode="decimal"`, error slot wired via
  `aria-describedby`, ≥44pt height.

See [../contracts/ui-navigation.md](../contracts/ui-navigation.md).

## Acceptance criteria

- All components consume design tokens only (no hard-coded one-off colors/sizes — Principle V).
- Light and Dark Mode both render correctly via `prefers-color-scheme`.
- Touch targets ≥44×44pt; text scales with Dynamic Type without truncation.
- F2 tests pass.

## Definition of Done

See [../workflow.md](../workflow.md).
