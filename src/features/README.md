# Features Directory Guide

This directory organizes domain-specific feature modules for Campus Compass.

## Planned Feature Modules (Phase 2+)

- **`dashboard/`**: Student overview metrics, daily agenda summary, quick actions, and focus timer.
- **`planner/`**: Semester assignments, exam countdowns, lab reports, and deadline tracking.
- **`calendar/`**: Weekly class timetable, lecture alerts, and personal study events.
- **`opportunities/`**: Curated internships, hackathons, scholarships, and campus events.
- **`placement/`**: DSA problem sheet tracker (LeetCode / Striver), core CS revision, and interview experiences.

## Feature Structure Conventions

Each feature module should follow a modular internal layout:
```text
features/<feature-name>/
  components/       # Feature-specific UI components
  hooks/            # Feature-specific custom hooks (e.g., useDeadlines)
  services/         # Local storage operations or public API helpers
  types/ or utils/  # Feature constants and helpers
```

Avoid coupling features directly; share common UI components via `src/components/ui/` and common utilities via `src/utils/`.

