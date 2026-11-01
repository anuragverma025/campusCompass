# Campus Compass — Team Collaboration & Work Allocation Guide

This document defines the team organization, responsibilities, module ownership, and Git collaboration workflows for the four student developers building **Campus Compass — The Student Life Assistant**.

---

## 1. Team Roles and Responsibilities

| Student | Assigned Role | Primary Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Project Architect & Integrator** | Foundation, Routing, Build & Release | Vite configuration, React Router setup, project scaffolding, release checks, branch integration. |
| **Member 2** | **Design Systems Lead** | Design Tokens, Styling & Reusable UI | Tailwind design system tokens, color scales, typography, core reusable components (`Button`, `Card`, `Badge`, `Modal`, `Input`). |
| **Member 3** | **Layout & Navigation Engineer** | Application Shell & Layout System | Collapsible sidebar, responsive top navbar, mobile drawer, layout container wrappers, view routing placeholders. |
| **Member 4** | **Documentation & QA Lead** | Docs, Setup Guide, Testing & Release Checks | Repository README, testing checklists, verification logs, browser compatibility checks, student onboarding. |

---

## 2. File and Directory Ownership Matrix

To prevent merge conflicts and ensure clear grading accountability for faculty evaluation, each team member is assigned primary ownership of distinct files and directories.

```text
campusCompass/
├── package.json                   -> Member 1 (Architectural dependency updates)
├── vite.config.js                 -> Member 1
├── index.html                     -> Member 1
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
    │   │   └── ... (Input, Modal, etc.)
    │   └── layout/                -> Member 3 (Navbars, sidebars, containers)
    │       ├── Header.jsx
    │       ├── Footer.jsx
    │       └── Sidebar.jsx
    ├── pages/                     -> Assigned by feature owners in Phase 2
    │   ├── WelcomePage.jsx        -> Member 1 & 2
    │   └── NotFoundPage.jsx       -> Member 1
    ├── features/                  -> Distributed per Phase 2 sprint
    │   ├── planner/               -> Student A
    │   ├── calendar/              -> Student B
    │   ├── opportunities/         -> Student C
    │   └── placement/             -> Student D
    └── utils/                     -> Shared utilities (Member 1 custodian)
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
   - For shared integration points (such as `src/app/routes.jsx` or `package.json`), request the respective owner (Member 1) to make or review the modification.
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
   - Ensure the build passes (`npm run build`) before requesting a peer review.

---

## 4. Immediate Next Tasks for Each Member

### Member 1 (Current status: Phase 1 Foundation Delivered)
- [x] Set up React + Vite + Tailwind CSS foundation.
- [x] Configure React Router DOM with initial welcome and 404 routes.
- [x] Establish scalable folder layout and utility wrappers.
- [ ] Review PRs submitted by Members 2, 3, and 4.
- [ ] Oversee Phase 2 module boundaries.

### Member 2 (Design Tokens & UI System)
- [ ] Review `src/styles/index.css` and configure Tailwind color palette, font tokens, and shadow presets.
- [ ] Implement additional reusable UI components in `src/components/ui/`:
  - `Input.jsx` (text inputs, search bars with icons)
  - `Modal.jsx` (accessible dialog modal for adding deadlines/events)
  - `Dropdown.jsx` / `Select.jsx` (status filters and category pickers)
  - `Tabs.jsx` (sub-navigation tabs)

### Member 3 (App Shell & Navigation)
- [ ] Build a responsive `Sidebar.jsx` inside `src/components/layout/` featuring links to:
  - Dashboard (`/`)
  - Academic Planner (`/planner`)
  - Smart Calendar (`/calendar`)
  - Opportunity Radar (`/opportunities`)
  - Placement Prep (`/placement`)
- [ ] Implement collapsible sidebar toggle with mobile slide-over drawer behavior.
- [ ] Integrate the sidebar and layout wrapper into `src/app/App.jsx`.

### Member 4 (Docs & Quality Assurance)
- [ ] Verify local installation on separate student laptops following `README.md`.
- [ ] Execute each item in `docs/TESTING_CHECKLIST.md` across Chrome, Firefox, and Edge.
- [ ] Maintain the Git commit log conventions for faculty evaluation.
- [ ] Prepare testing summary report for submission milestones.

