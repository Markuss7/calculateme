# Contributor Workflow

**Feature**: 001-rule-of-three | Applies to all contributors

This project has multiple contributors working in parallel. To avoid conflicts and keep
quality high, every feature follows the same branch → test → pull request → code-review
lifecycle. The master task list is [tasks.md](tasks.md).

## 1. Claim a task

1. Open [tasks.md](tasks.md) and pick a feature/task that is **Not started** with all
   dependencies **Done** (see the dependency graph).
2. Change its marker to in-progress and add your handle:
   `- [ ] 🚧 (@your-handle) T0XX ...`
3. Commit just that status change to `main` (or push to the shared task board) so other
   contributors see the claim before you start coding.

## 2. Create the feature branch

Each feature is implemented on its **own branch**, named in the feature file and in the
feature map in [tasks.md](tasks.md):

```bash
git checkout main
git pull
git checkout -b feature/F3-calculation-engine   # use the branch from the feature file
```

- One feature per branch. Do not mix features in a single branch.
- Keep the branch focused on the tasks listed for that feature.

## 3. Implement and test (TDD)

1. Author the unit tests listed in the feature's companion `*.test.md` **first** and
   confirm they fail.
2. Implement until every test in the `*.test.md` passes.
3. Run the full local check before pushing:

```bash
npm run lint
npm test            # unit + component
npm run test:e2e    # for features that include E2E (F7)
```

A feature is "test complete" only when **all checks in its `*.test.md` pass** and no
existing tests regress.

## 4. Open a pull request

Once testing is complete:

```bash
git push -u origin feature/F3-calculation-engine
```

Then open a PR into `main`. The PR description MUST include:

- The feature ID and a link to its feature file and `*.test.md`.
- The task IDs from [tasks.md](tasks.md) being completed.
- Confirmation that lint, unit/component tests (and E2E where applicable) pass.
- Any constitution-relevant notes (accessibility, HIG deviations with justification).

## 5. Code review by the code-review agent

Every PR MUST be reviewed by the **code-review agent** before merge.

- Request the code-review agent on the PR.
- The agent checks: correctness against the feature `*.test.md`, conformance to the
  [constitution](../../.specify/memory/constitution.md) (iOS-native, mobile-first,
  performance, accessibility, design-system consistency), test coverage, and security.
- Address all review feedback by pushing additional commits to the same branch.
- Merge only after the code-review agent approves and CI is green.

## 6. Close out

1. Merge the PR (squash or merge per repo convention) and delete the feature branch.
2. Update [tasks.md](tasks.md): mark the completed tasks `- [x]` and set the feature's
   status to **Done** in the feature map.
3. Notify contributors whose features were blocked by yours that they are unblocked.

## Branch naming reference

| Feature | Branch |
|---------|--------|
| F1 Project Setup | `feature/F1-project-setup` |
| F2 Design System & App Shell | `feature/F2-design-system` |
| F3 Calculation Engine | `feature/F3-calculation-engine` |
| F4 Navigation & Dashboard | `feature/F4-navigation-dashboard` |
| F5 Calculator Screen | `feature/F5-calculator-screen` |
| F6 Input Validation & Feedback | `feature/F6-input-validation` |
| F7 Polish & Accessibility | `feature/F7-polish-accessibility` |

## Definition of Done (per feature)

- [ ] All feature tasks in [tasks.md](tasks.md) implemented.
- [ ] Every unit/component test in the feature's `*.test.md` passes.
- [ ] Lint passes; no regressions in other features' tests.
- [ ] PR opened with required description.
- [ ] Code-review agent approved.
- [ ] Merged to `main`; branch deleted; [tasks.md](tasks.md) statuses updated.
