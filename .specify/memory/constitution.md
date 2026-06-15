<!--
SYNC IMPACT REPORT
==================
Version change: (template/unversioned) → 1.0.0
Bump rationale: Initial ratification — first concrete constitution replacing the
unfilled template. MAJOR baseline established.

Modified principles:
- [PRINCIPLE_1_NAME] → I. iOS-Native Experience (NON-NEGOTIABLE)
- [PRINCIPLE_2_NAME] → II. Mobile-First & Touch-Optimized
- [PRINCIPLE_3_NAME] → III. Performance & Fluidity
- [PRINCIPLE_4_NAME] → IV. Accessibility & Inclusivity
- [PRINCIPLE_5_NAME] → V. Design-System Consistency

Added sections:
- Design Standards (Apple HIG)
- Development Workflow & Quality Gates

Removed sections:
- None (template placeholders replaced in place)

Templates requiring updates:
- ✅ .specify/templates/plan-template.md (Constitution Check gate references this file; no edits required)
- ✅ .specify/templates/spec-template.md (no constitution-specific mandates added; compatible)
- ✅ .specify/templates/tasks-template.md (principle-driven task categories compatible; no edits required)
- ✅ .github/prompts/speckit.constitution.prompt.md (generic; no outdated agent-specific references)

Follow-up TODOs:
- None
-->

# CalculateMe Constitution

## Core Principles

### I. iOS-Native Experience (NON-NEGOTIABLE)

The product MUST look, feel, and behave like a native iOS application even though it
is delivered as a web application. All interface and interaction decisions MUST conform
to the Apple Human Interface Guidelines
(https://developer.apple.com/design/human-interface-guidelines).

Rules:

- Use iOS-standard UI patterns: navigation bars, tab bars, sheets/modals, grouped and
  inset lists, segmented controls, and system-style buttons.
- Adopt the iOS visual language: SF Pro–equivalent typography, the iOS type scale,
  generous corner radii, translucency/blur where appropriate, and system color
  semantics (including Dark Mode).
- Honor iOS gestures and feedback: swipe-back navigation, pull-to-refresh, momentum
  scrolling, and haptic-equivalent visual/tactile feedback where supported.
- Any deviation from the HIG MUST be documented in the feature spec with an explicit
  rationale and reviewer approval.

Rationale: A consistent, platform-faithful experience is the core promise of the
product; ad-hoc UI undermines user trust and perceived quality.

### II. Mobile-First & Touch-Optimized

Every feature MUST be designed for a phone screen first; larger viewports are a
progressive enhancement, never the baseline.

Rules:

- Design and validate at common iPhone viewport widths (≈320–430pt) before any wider
  layout is considered.
- Interactive targets MUST be at least 44×44pt per Apple HIG; spacing MUST prevent
  accidental taps.
- Primary actions MUST be reachable within the thumb zone; avoid critical controls in
  hard-to-reach screen corners.
- Layouts MUST respect safe areas, the notch/Dynamic Island, the home indicator, and
  on-screen keyboards.

Rationale: The product is optimized for phones; desktop-first thinking produces
cramped, error-prone mobile experiences.

### III. Performance & Fluidity

The interface MUST feel instantaneous and animate at 60fps (or display-native refresh
rate) on target devices.

Rules:

- Scrolling and transitions MUST maintain 60fps; janky animations are defects.
- Time-to-interactive on a mid-tier phone over 4G MUST stay under 3 seconds for the
  initial view.
- Animations and gestures MUST follow iOS timing/easing conventions and never block
  user input.
- Assets MUST be optimized (responsive images, lazy loading) to minimize payload and
  main-thread work.

Rationale: Perceived performance is inseparable from the native-quality experience the
product promises.

### IV. Accessibility & Inclusivity

The product MUST be usable by everyone, meeting Apple accessibility expectations and
WCAG 2.1 AA as the minimum bar.

Rules:

- All interactive elements MUST expose accessible names, roles, and states for
  screen readers (VoiceOver-equivalent semantics).
- Text MUST support Dynamic Type scaling without breaking layout or truncating
  essential content.
- Color MUST meet AA contrast ratios and MUST NOT be the sole carrier of meaning.
- Respect user system preferences: reduced motion, dark mode, and increased contrast.

Rationale: Accessibility is a baseline requirement of the Apple ecosystem and a
non-negotiable measure of product quality.

### V. Design-System Consistency

All UI MUST be built from a single, shared, iOS-aligned design system; one-off styles
are prohibited.

Rules:

- Spacing, color, typography, and elevation MUST be expressed as reusable design tokens.
- Reusable components (buttons, lists, sheets, form controls) MUST be defined once and
  reused; duplicating component logic or styles is a defect.
- New visual patterns MUST be added to the design system before use in features.
- Component changes MUST preserve HIG conformance and be reviewed for cross-feature
  impact.

Rationale: A token-driven design system keeps the experience coherent, maintainable,
and faithful to iOS conventions as the product grows.

## Design Standards (Apple HIG)

These standards are binding constraints that complement the Core Principles:

- **Source of truth**: The Apple Human Interface Guidelines
  (https://developer.apple.com/design/human-interface-guidelines) are the authoritative
  reference for visual and interaction design decisions.
- **Typography**: Use the SF Pro type system (or a faithful equivalent) and the iOS type
  scale; respect Dynamic Type.
- **Color**: Use iOS system color semantics; provide first-class Light and Dark Mode
  appearances.
- **Layout**: Use iOS-standard navigation (nav bars, tab bars), inset grouped lists,
  sheets/modals, and safe-area-aware layouts.
- **Motion**: Use iOS-standard transitions and easing; honor Reduce Motion.
- **Iconography**: Prefer SF Symbols–style icons with consistent weight and scale.
- **Web delivery**: The application is a web app; it MUST emulate native iOS behavior
  faithfully while remaining responsive and standards-compliant.

## Development Workflow & Quality Gates

- **Constitution Check**: Every feature plan MUST include a Constitution Check that
  verifies conformance to the five Core Principles before implementation begins, and
  re-verifies after design.
- **Design review**: UI changes MUST be reviewed against the Apple HIG and the design
  system before merge; HIG deviations require documented justification and approval.
- **Accessibility review**: Features MUST pass accessibility checks (screen-reader
  semantics, Dynamic Type, contrast, reduced motion) before release.
- **Performance review**: Changes affecting rendering or interaction MUST be validated
  for 60fps scrolling/animation and the initial-load budget on target devices.
- **Device validation**: Features MUST be verified on representative iPhone viewports
  (small and large) before being considered complete.

## Governance

This constitution supersedes all other development and design practices. When guidance
conflicts, the constitution prevails.

- **Amendments**: Changes MUST be proposed via pull request with a clear rationale,
  reviewed and approved by project maintainers, and accompanied by any required updates
  to dependent templates and documentation.
- **Versioning policy**: This constitution uses semantic versioning.
  - MAJOR: Backward-incompatible governance changes or removal/redefinition of
    principles.
  - MINOR: A new principle/section is added or guidance is materially expanded.
  - PATCH: Clarifications, wording, and non-semantic refinements.
- **Compliance review**: All pull requests and design reviews MUST verify compliance
  with the Core Principles and Design Standards. Complexity or deviation MUST be
  explicitly justified and approved.
- **Runtime guidance**: Use agent and project guidance files (e.g., the repository's
  agent context and `.github/copilot-instructions.md`) for day-to-day development
  guidance; those files MUST stay consistent with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-06-14 | **Last Amended**: 2026-06-14
