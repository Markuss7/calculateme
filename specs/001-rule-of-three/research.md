# Phase 0 Research: Rule of Three Calculator

**Feature**: 001-rule-of-three | **Date**: 2026-06-14

This document resolves all technical unknowns for the implementation plan. The feature
spec left no `[NEEDS CLARIFICATION]` markers; the items below are technology/best-practice
decisions required to translate the spec into an iOS-native-faithful web app.

## Decision 1 — Application architecture

- **Decision**: Client-only single-page application (SPA); no backend, no API, no
  persistence.
- **Rationale**: The rule-of-three calculation is a pure function of two numeric inputs.
  The spec explicitly states calculations are not persisted between sessions. Adding a
  backend would violate the "avoid over-engineering" guidance and add latency that
  conflicts with Principle III (Performance & Fluidity).
- **Alternatives considered**:
  - *Full-stack web app with API* — rejected: no server-side data or logic needed.
  - *Static HTML + vanilla JS* — viable but makes the constitution's design-system
    consistency (Principle V) and component reuse harder to enforce as the Dashboard grows
    to host more calculators.

## Decision 2 — Framework and language

- **Decision**: React 18 + TypeScript, built with Vite.
- **Rationale**: TypeScript gives type-safe inputs/outputs for the calculation contract.
  React's component model directly supports a token-driven, reusable design system
  (Principle V). Vite delivers small, fast bundles supporting the < 3s TTI and 60fps goals
  (Principle III).
- **Alternatives considered**:
  - *Svelte / SolidJS* — smaller runtime, but React has the broadest ecosystem for the
    accessibility tooling and Testing Library used below.
  - *Next.js* — adds SSR/routing weight unnecessary for a 3-screen client app.

## Decision 3 — Navigation between Calculate-me, Dashboard, and Calculator

- **Decision**: React Router 6 with three routes: entry (`/`, the Calculate me action),
  Dashboard (`/dashboard`), and Calculator (`/dashboard/rule-of-three`).
- **Rationale**: Mirrors the spec's user flow (entry → dashboard → calculator), enables
  iOS-style push/back navigation, and supports swipe-back / nav-bar back button per
  Principle I.
- **Alternatives considered**:
  - *Conditional rendering without a router* — simpler but loses URL state, back-button
    semantics, and a clear extension point for future dashboard calculators.

## Decision 4 — iOS-native look and feel on the web

- **Decision**: Hand-built iOS-aligned design system using CSS custom properties (design
  tokens) for color, typography, spacing, radius, and elevation; SF Pro with system-font
  fallback (`-apple-system`); iOS-standard components (nav bar, inset grouped list rows,
  system buttons, form fields).
- **Rationale**: Directly satisfies Principles I and V and the Design Standards section of
  the constitution, while keeping the bundle minimal. Tokens enable first-class Light/Dark
  Mode and Dynamic Type.
- **Alternatives considered**:
  - *Framework7 / Konsta UI (iOS-styled component libs)* — faster to start but add
    significant bundle weight and reduce control over HIG fidelity; can be revisited if the
    app grows substantially.
  - *Tailwind CSS* — fine for utility styling but tokens-as-CSS-variables map more directly
    to the constitution's design-token mandate without a build-time utility layer.

## Decision 5 — Calculation precision and number handling

- **Decision**: Compute `result = base × percentage ÷ 100` using JavaScript numbers; format
  the displayed result to trim floating-point artifacts (round to a sensible number of
  significant decimals, e.g. up to ~10 significant digits, stripping trailing zeros).
- **Rationale**: Inputs are general-purpose decimals (Principle: spec FR-009). Raw IEEE-754
  results like `0.30000000000000004` must be presented cleanly to keep results correct and
  trustworthy (SC-002). A lightweight rounding/formatting step avoids a big-decimal
  dependency for a simple calculator.
- **Alternatives considered**:
  - *decimal.js / big.js* — exact decimal math, but unnecessary weight for typical
    calculator inputs; revisit only if exact arbitrary-precision becomes a requirement.

## Decision 6 — Input validation strategy

- **Decision**: Validate on Calculate (not live): require both fields to be present and
  parse to finite numbers; on failure show an inline, accessible error message and do not
  produce a result. Accept decimals and (per spec Assumptions) negative values.
- **Rationale**: Matches spec FR-010 and User Story 3, and the assumption that calculation
  happens on tap, not as the user types. Inline messaging supports VoiceOver semantics
  (Principle IV).
- **Alternatives considered**:
  - *Live validation while typing* — rejected to match the on-tap calculation model and
    avoid noisy mid-typing errors.
  - *`type="number"` only (rely on browser)* — insufficient for accessible custom messages
    and consistent cross-browser behavior; use `inputmode="decimal"` plus explicit parsing.

## Decision 7 — Testing approach

- **Decision**: Vitest + @testing-library/react for the pure calculation and component
  behavior; Playwright + @axe-core/playwright for the end-to-end flow and automated
  accessibility checks across iPhone-sized viewports and Dark Mode.
- **Rationale**: Covers the three quality dimensions the constitution gates on:
  correctness (unit/component), full user flow (e2e), and accessibility (axe). Supports
  SC-002, SC-005, and Principle IV.
- **Alternatives considered**:
  - *Jest* — works, but Vitest integrates natively with Vite for faster runs.
  - *Cypress* — capable, but Playwright has stronger device-emulation and built-in axe
    integration for mobile viewports.

## Decision 8 — Performance and motion

- **Decision**: Use CSS transitions with iOS-standard easing for screen transitions and
  button feedback; gate all motion behind `prefers-reduced-motion`; keep the main thread
  free (synchronous, trivial computation).
- **Rationale**: Meets Principle III (60fps, iOS timing) and Principle IV (Reduce Motion).
- **Alternatives considered**:
  - *JS animation libraries* — unnecessary for the minimal transitions required.

## Outstanding clarifications

None. All `[NEEDS CLARIFICATION]` items are resolved; remaining product-level choices
(percentage input field, negative-value handling) were captured in the spec's Assumptions
section.
