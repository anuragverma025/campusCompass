# Campus Compass — Team Collaboration & Work Allocation Guide

This document defines the team organization, responsibilities, module ownership, and Git collaboration workflows for the four student developers building **Campus Compass — The Student Life Assistant**.

---

## 1. Team Roles and Responsibilities

| Student | Assigned Role | Primary Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Project Architect & Integrator** | Foundation, Routing, Build & Release | Vite configuration, React Router setup, project scaffolding, release checks, branch integration. |
| **Member 2** | **Design Systems Lead** | Design Tokens, Styling & Reusable UI | Tailwind design system tokens, color scales, typography, core reusable components (`Button`, `Card`, `Badge`, `Modal`, `Input`, `Textarea`, `Select`, `Tabs`, `Dropdown`, `Showcase`). |
| **Member 3** | **Layout & Navigation Engineer** | Application Shell & Layout System | Collapsible sidebar, responsive top navbar, mobile drawer, layout container wrappers, view routing placeholders. |
| **Member 4** | **Documentation & QA Lead** | Docs, Setup Guide, Testing & Release Checks | Repository README, testing checklists, automated smoke tests (`scripts/qa-check.mjs`), bug reporting templates, and team handoff guide. |

---

## 2. File and Directory Ownership Matrix

To prevent merge conflicts and ensure clear grading accountability for faculty evaluation, each team member is assigned primary ownership of distinct files and directories:

```text
campusCompass/
├── package.json                   -> Member 1 (Architectural dependency updates)
├── vite.config.js                 -> Member 1
├── index.html                     -> Member 1
├── scripts/
│   └── qa-check.mjs               -> Member 4 (Automated QA smoke test suite)
├── docs/
│   ├── TEAM_WORK.md               -> Member 4 (Maintained with Member 1)
│   └── TESTING_CHECKLIST.md       -> Member 4
├── README.md                      -> Member 4
└── src/
    ├── app/
    │   ├── App.jsx                -> Member 1 / Member 3 (Shell integration)
    │   └── routes.jsx             -> Member 1 (Route management)
    ├── styles/
    │   └── index.css              -> Member 2 (Design tokens and global styles)
    ├── components/
    │   ├── ui/                    -> Member 2 (Reusable atomic UI elements)
    │   │   ├── Badge.jsx
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Dropdown.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Select.jsx
    │   │   ├── Showcase.jsx
    │   │   ├── Tabs.jsx
    │   │   ├── Textarea.jsx
    │   │   └── index.js
    │   └── layout/                -> Member 3 (Navbars, sidebars, containers)
    │       ├── AppLayout.jsx
    │       ├── Header.jsx
    │       ├── Footer.jsx
    │       └── Sidebar.jsx
    ├── pages/
    │   ├── PagePlaceholder.jsx    -> Member 3
    │   ├── WelcomePage.jsx        -> Member 1 & 2
    │   └── NotFoundPage.jsx       -> Member 1
    ├── features/                  -> Distributed per Phase 2 sprint
    │   ├── planner/               -> Feature Owner A
    │   ├── calendar/              -> Feature Owner B
    │   ├── opportunities/         -> Feature Owner C
    │   └── placement/             -> Feature Owner D
    └── utils/                     -> Shared utilities (Member 1 custodian)
        ├── constants.js
        └── storage.js
```

---

## 3. Conflict Prevention Guidelines

1. **Strict Branch Isolation**:
   - Never commit directly to the `main` branch.
   - Work exclusively on designated feature branches:
     - Member 1: `feature/project-foundation`, `feature/router-integration`
     - Member 2: `feature/design-tokens-ui`
     - Member 3: `feature/app-shell-navigation`
     - Member 4: `feature/documentation-qa`
2. **File Boundary Enforcement**:
   - Do not edit files owned by another member without prior agreement.
   - For shared integration points (such as `src/app/routes.jsx` or `package.json`), request the respective owner to review the modification.
3. **Daily Sync and Rebase**:
   - Before starting a working session, pull the latest changes from `main`:
     ```bash
     git checkout main
     git pull origin main
     git checkout <your-branch>
     git merge main  # or git rebase main
     ```
4. **Focused, Atomic Pull Requests (PRs)**:
   - Keep PRs small and scoped to a single capability or component.
   - Ensure automated tests (`npm test`) and production build (`npm run build`) pass prior to requesting review.

---

## 4. Work Delivery Status for Each Member

### Member 1 (Project Foundation & Core Routing) — DELIVERED
- [x] Set up React 18 + Vite 6 + Tailwind CSS v4 foundation.
- [x] Configure React Router DOM with initial welcome and 404 routes.
- [x] Establish scalable folder layout and utility wrappers.
- [x] Setup production build pipeline (`npm run build`).

### Member 2 (Design Tokens & UI System) — DELIVERED
- [x] Configured Tailwind design tokens, typography scales, and CSS variables in `src/styles/index.css`.
- [x] Implemented complete reusable UI component library in `src/components/ui/`:
  - `Button.jsx` (5 variants, 3 sizes, icon slots, loading spinner)
  - `Badge.jsx` (pill indicators, semantic colors, status dots)
  - `Card.jsx` (composable header/body/footer cards, hoverable states)
  - `Input.jsx` (accessible inputs with left/right icons, error/helper text)
  - `Textarea.jsx` (multiline text field with character count)
  - `Select.jsx` (custom chevron select dropdown)
  - `Modal.jsx` (accessible dialog with backdrop blur and Escape key trap)
  - `Tabs.jsx` (pill and underline sub-navigation)
  - `Dropdown.jsx` (action menu popover with outside-click detection)
  - `Showcase.jsx` (interactive living showcase component)

### Member 3 (App Shell & Navigation) — DELIVERED
- [x] Built responsive `Sidebar.jsx` in `src/components/layout/` featuring links to:
  - Dashboard (`/`)
  - Academic Tasks (`/tasks`)
  - Smart Calendar (`/calendar`)
  - Opportunity Radar (`/opportunities`)
  - Placement Tracker (`/placement`)
- [x] Implemented responsive collapsible mobile slide-over drawer with backdrop overlay.
- [x] Built sticky `Header.jsx` with breadcrumb trail and mobile menu toggle.
- [x] Integrated layout container `AppLayout.jsx` and `PagePlaceholder.jsx` across all routes.

### Member 4 (Documentation & QA Lead) — DELIVERED
- [x] Updated repository `README.md` with complete architecture, setup instructions, scripts, and status matrix.
- [x] Implemented automated QA smoke test suite (`scripts/qa-check.mjs` / `npm test`).
- [x] Created standardized manual testing checklist in `docs/TESTING_CHECKLIST.md`.
- [x] Authored team bug-reporting template and handoff guidelines.
- [x] Verified zero console errors, responsive layout fidelity, and production build generation.
