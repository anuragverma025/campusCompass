# Campus Compass — The Student Life Assistant

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![QA Smoke Tests](https://img.shields.io/badge/QA_Smoke_Tests-Passing-15803D)](scripts/qa-check.mjs)

**Campus Compass** is an open-source, frontend-first student productivity web application designed to help college students streamline academic commitments, daily schedules, career opportunities, and placement preparation within a single unified workspace.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Implementation Status: Implemented vs. Planned](#-implementation-status-implemented-vs-planned)
  - [Implemented Functionality](#-implemented-functionality)
  - [Placeholder & Planned Modules (Phase 2+)](#-placeholder--planned-modules-phase-2)
- [Technology Stack](#-technology-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Available Scripts](#-available-scripts)
- [Team Work Allocation & Contribution Areas](#-team-work-allocation--contribution-areas)
- [Team Testing Checklist](#-team-testing-checklist)
  - [Automated Smoke Tests](#1-automated-smoke-test-routine)
  - [Manual Cross-Device Checklist](#2-manual-verification-matrix)
- [Bug Report Template](#-bug-report-template)
- [Team Handoff Guide](#-team-handoff-guide)
  - [Quick-Start for Teammates](#quick-start-for-teammates)
  - [Validating Changes Before Submitting PRs](#validating-changes-before-submitting-prs)
  - [Known Issues & Current Limitations](#known-issues--current-limitations)
- [License](#-license)

---

## 🎯 Project Overview

College students routinely juggle assignments across disparate portals, face clashes between course schedules and club events, miss internship application deadlines, and struggle to systematically track DSA placement preparations.

Campus Compass resolves this fragmentation with a local-first, zero-backend, client-side web application that provides:
- **Zero backend or database requirement**: Uses browser `localStorage` (via a safe abstraction wrapper `src/utils/storage.js`) for private, instantaneous, and offline-capable data persistence.
- **Modern, responsive UI & Design System**: Custom Tailwind CSS design tokens and reusable atomic components tailored for student SaaS productivity.
- **Responsive App Shell**: Collapsible sidebar, mobile slide-over drawer, sticky header with dynamic breadcrumbs, and accessible skip-links.
- **Modular feature structure**: Organized for clean, conflict-free collaborative team engineering across 4 student developer ownership boundaries.

---

## 📊 Implementation Status: Implemented vs. Planned

To maintain strict project clarity, the table below delineates what is currently built and functioning versus what is structured as placeholder or planned for upcoming sprints:

### ✅ Implemented Functionality

| Layer / Feature | Location | Status | Details |
| :--- | :--- | :--- | :--- |
| **Project Foundation & Build** | `package.json`, `vite.config.js` | **Complete** | React 18 + Vite 6 + Tailwind CSS v4 pipeline with zero-config ES modules. |
| **Client-Side Routing** | `src/app/routes.jsx` | **Complete** | Multi-route tree (`/`, `/tasks`, `/calendar`, `/opportunities`, `/placement`, `/welcome`, `/*`). |
| **Design System & Tokens** | `src/styles/index.css` | **Complete** | Color palettes (indigo/teal), typography tokens, radius scales, shadow presets, and CSS variables. |
| **Reusable UI Primitives** | `src/components/ui/` | **Complete** | Fully styled, accessible components: `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Select`, `Modal`, `Tabs`, `Dropdown`, `Showcase`. |
| **Application Shell** | `src/components/layout/` | **Complete** | Responsive layout (`AppLayout.jsx`), sticky Header with breadcrumb (`Header.jsx`), collapsible/mobile drawer Sidebar (`Sidebar.jsx`), and Footer (`Footer.jsx`). |
| **Component Showcase** | `src/pages/WelcomePage.jsx` | **Complete** | Interactive demonstration page accessible via `/welcome` showcasing all UI components and states. |
| **404 Not Found Page** | `src/pages/NotFoundPage.jsx` | **Complete** | Accessible error boundary screen with navigation fallback to home. |
| **Storage Abstraction** | `src/utils/storage.js` | **Complete** | Defensive wrapper around browser `localStorage` with JSON serialization and try/catch fallbacks. |
| **Tasks & Deadline Tracker** | `src/features/tasks/` | **Complete** | Academic task tracking, lab submissions, priority badges, category filtering, search, and local persistence. |
| **Automated QA Smoke Suite** | `scripts/qa-check.mjs` | **Complete** | Headless SSR check verifying that every registered route renders and all UI components export correctly (`npm test`). |

### ⏳ Placeholder & Planned Modules (Phase 2+)

| Module | Route | Placeholder Component | Planned Capabilities |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `/` | `PagePlaceholder` ("Dashboard") | Daily summary widgets, upcoming deadline countdowns, quick action triggers, productivity streak indicators. |

| **Smart Calendar** | `/calendar` | `PagePlaceholder` ("Calendar") | Weekly timetable grid, recurring class slots, club meeting schedules, exam time blocks. |
| **Opportunity Radar** | `/opportunities` | `PagePlaceholder` ("Opportunities") | Internship tracker, competitive hackathons, scholarships, application deadline reminders. |
| **Placement Prep** | `/placement` | `PagePlaceholder` ("Placement Tracker") | DSA problem-solving log (LeetCode/Striver), topic-wise revision progress, interview notes. |

---

## 🛠 Technology Stack

- **Core UI Framework**: [React 18.3](https://react.dev/) (Component-based architecture)
- **Bundler & Dev Server**: [Vite 6.0](https://vitejs.dev/) (Instant HMR and fast production bundling)
- **Routing Engine**: [React Router DOM v6.28](https://reactrouter.com/) (Declarative SPA routing with nested layouts)
- **Styling Architecture**: [Tailwind CSS v4.0](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Data Persistence**: Browser `localStorage` (via custom safe wrapper `src/utils/storage.js`)
- **Language**: JavaScript (ES2022+ / JSX)
- **QA Verification**: Custom headless Node/Vite smoke suite (`scripts/qa-check.mjs`)

---

## 📂 Project Architecture & Directory Structure

```text
campusCompass/
├── docs/                           # Team collaboration & testing protocols
│   ├── TEAM_WORK.md                # 4-member roles, file ownership, and Git workflows
│   └── TESTING_CHECKLIST.md        # Comprehensive manual & automated QA testing log
├── public/                         # Static assets (favicons, manifest)
│   └── vite.svg
├── scripts/                        # Quality assurance and release scripts
│   └── qa-check.mjs                # Automated route & component smoke verification
├── src/
│   ├── app/                        # Application routing core & wrappers
│   │   ├── App.jsx                 # Root provider & BrowserRouter wrapper
│   │   └── routes.jsx              # Application route definitions & layout wrapping
│   ├── assets/                     # Media assets & SVG graphics
│   │   └── compass.svg
│   ├── components/                 # Shared presentation components
│   │   ├── layout/                 # Application shell (Member 3)
│   │   │   ├── AppLayout.jsx       # Layout orchestrator (Sidebar + Header + Content + Footer)
│   │   │   ├── Header.jsx          # Sticky header with breadcrumbs & mobile hamburger
│   │   │   ├── Sidebar.jsx         # Responsive sidebar navigation with mobile drawer
│   │   │   └── Footer.jsx          # Base application footer
│   │   └── ui/                     # Atomic design system components (Member 2)
│   │       ├── Badge.jsx           # Status indicators and pill tags
│   │       ├── Button.jsx          # Accessible button with 5 variants and loading states
│   │       ├── Card.jsx            # Composable card with header, body, and footer slots
│   │       ├── Dropdown.jsx        # Zero-dependency action dropdown
│   │       ├── Input.jsx           # Form input with icon slots, error, and helper states
│   │       ├── Modal.jsx           # Accessible dialog modal with backdrop blur & Esc key trap
│   │       ├── Select.jsx          # Styled select element with custom chevron
│   │       ├── Showcase.jsx        # Interactive living showcase of all UI primitives
│   │       ├── Tabs.jsx            # Pill and underline tabbed sub-navigation
│   │       ├── Textarea.jsx        # Multiline text field with character count display
│   │       └── index.js            # Barrel export for UI design system
│   ├── features/                   # Domain-specific modules (Reserved for Phase 2 sprints)
│   │   └── README.md               # Guidelines for feature modularization
│   ├── pages/                      # Page-level route views
│   │   ├── NotFoundPage.jsx        # 404 error page
│   │   ├── PagePlaceholder.jsx     # Reusable "Coming Soon" placeholder for pending modules
│   │   └── WelcomePage.jsx         # Project overview, module scope, and UI showcase view
│   ├── styles/                     # Styling tokens & global styles (Member 2)
│   │   └── index.css               # Tailwind CSS v4 theme variables and base reset
│   ├── utils/                      # Shared helper functions
│   │   ├── constants.js            # App configuration and metadata
│   │   └── storage.js              # Safe localStorage wrapper
│   └── main.jsx                    # React DOM entry point
├── index.html                      # HTML entry template
├── package.json                    # Project dependencies and npm scripts
├── vite.config.js                  # Vite & Tailwind build configuration
├── .gitignore                      # Git ignore rules
└── LICENSE                         # Apache 2.0 License
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: Version `18.0.0` or higher (verified on Node `v24.x`)
- **npm**: Version `9.0.0` or higher

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/anuragverma025/campusCompass.git
   ```

2. Navigate into the application directory:
   ```bash
   cd campusCompass
   ```
   > ⚠️ **Important**: Ensure you run commands from within the `campusCompass/` directory where `package.json` resides.

3. Install project dependencies:
   ```bash
   npm install
   ```

---

## 📜 Available Scripts

From within the `campusCompass` directory, the following scripts are available:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development Server** | `npm run dev` | Launches local Vite development server with Hot Module Replacement (HMR) at `http://localhost:3000`. |
| **Production Build** | `npm run build` | Compiles an optimized, tree-shaken production distribution in `dist/`. |
| **Production Preview** | `npm run preview` | Starts a local static web server to test the generated `dist/` production build. |
| **Automated QA Check** | `npm test` | Runs the headless QA smoke suite to verify SSR rendering across all routes, UI component exports, and storage utility integrity. |

---

## 👥 Team Work Allocation & Contribution Areas

Campus Compass follows a 4-member modular ownership architecture to prevent merge conflicts and preserve independent git commit streams:

| Member | Assigned Role | File & Directory Ownership | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Project Architect & Integrator** | `package.json`, `vite.config.js`, `index.html`, `src/app/routes.jsx` | Scaffolding, Vite configuration, React Router structure, branch merges, and release coordination. |
| **Member 2** | **Design Systems Lead** | `src/styles/index.css`, `src/components/ui/*` | Design tokens, color system, typography scale, atomic UI component library (`Button`, `Card`, `Badge`, `Modal`, `Input`, etc.), and UI Showcase. |
| **Member 3** | **Layout & Navigation Engineer** | `src/components/layout/*`, `src/pages/PagePlaceholder.jsx` | Application shell, sticky `Header`, collapsible/mobile drawer `Sidebar`, `Footer`, view container integration, and placeholder views. |
| **Member 4** | **Documentation & QA Lead** | `README.md`, `docs/*`, `scripts/qa-check.mjs` | Accurate project documentation, manual & automated testing checklists, bug reporting templates, and team handoff guide. |

For detailed branch isolation guidelines, see [`docs/TEAM_WORK.md`](docs/TEAM_WORK.md).

---

## ✅ Team Testing Checklist

Before opening a pull request or submitting code for evaluation, all team members must complete the following two verification routines:

### 1. Automated Smoke Test Routine
Run the automated test script to ensure zero runtime breaks across the route tree and component barrel:
```bash
npm test
```
- [x] All 7 registered routes (`/`, `/tasks`, `/calendar`, `/opportunities`, `/placement`, `/welcome`, catch-all `/*`) render without runtime exceptions.
- [x] All 15 UI component primitives in `src/components/ui/index.js` export valid functions.
- [x] Storage utility wrapper correctly exposes `get`, `set`, `remove`, and `clear`.

### 2. Manual Verification Matrix

| Area | Verification Test | Expected Standard | Status |
| :--- | :--- | :--- | :--- |
| **Build Integrity** | `npm run build` | Compiles cleanly with zero syntax errors, missing imports, or unresolvable assets. | **PASS** |
| **Desktop Nav** | Click sidebar links (`/`, `/tasks`, `/calendar`, `/opportunities`, `/placement`) | Active link highlights with purple pill (`#EEF2FF`), Header title updates dynamically, page content renders corresponding placeholder. | **PASS** |
| **Mobile Drawer** | Viewport < 768px: Tap hamburger menu in Header | Sidebar slides out smoothly from left; tapping backdrop, pressing `Escape`, or clicking any navigation link closes the drawer. | **PASS** |
| **Accessibility** | Press `Tab` key on page load | "Skip to page content" link appears, pressing `Enter` shifts keyboard focus directly into the main content region. | **PASS** |
| **UI Showcase** | Navigate to `/welcome` | All design system components render interactively; modal dialog opens/closes with backdrop blur and Escape key dismissal; button loading state activates on click. | **PASS** |
| **404 Handling** | Navigate to an unmapped path (e.g., `/test-error`) | Renders `NotFoundPage` with a working "Return to Campus Compass" button that redirects to `/`. | **PASS** |
| **Console Health** | Inspect DevTools Console (`F12`) | Zero unhandled errors, zero broken SVG asset requests, zero invalid HTML nesting warnings. | **PASS** |

For the full historical verification log, consult [`docs/TESTING_CHECKLIST.md`](docs/TESTING_CHECKLIST.md).

---

## 🐛 Bug Report Template

If you encounter an issue or regression while developing or testing, submit an issue using this standardized format:

```markdown
### 🐞 Bug Report

**1. Issue Summary**:
A concise, one-sentence description of what went wrong (e.g., "Mobile sidebar does not dismiss when pressing Escape on Firefox Android").

**2. Steps to Reproduce**:
1. Open the dev server (`npm run dev`) and navigate to `http://localhost:3000`.
2. Resize browser viewport to mobile width (390px).
3. Click the top-left hamburger menu icon to open the navigation drawer.
4. Press the `Escape` key (or tap the darkened backdrop).

**3. Expected Result**:
The navigation drawer should slide closed and focus should return to the menu toggle button.

**4. Actual Result**:
The drawer remains open and blocks interaction with the page content.

**5. Severity**:
- [ ] Critical (App crash, build break, data loss)
- [ ] High (Major feature non-functional, navigation blocked)
- [ ] Medium (UI rendering defect, layout overflow, missing styling)
- [ ] Low (Typo, cosmetic misalignment, non-blocking warning)

**Environment Details**:
- OS: [e.g., Windows 11, macOS Sequoia, Ubuntu 24.04]
- Browser: [e.g., Chrome 131, Firefox 133, Edge 131, Safari 18]
- Viewport Size: [e.g., 390x844 (Mobile), 1280x800 (Desktop)]
```

---

## 🤝 Team Handoff Guide

Welcome to the team handoff for **Campus Compass**! The foundation, UI design system, application shell, and quality assurance framework are fully delivered and verified. Here is everything teammates need to know to begin building Phase 2 features.

### Quick-Start for Teammates

1. **Verify Your Local Environment**:
   ```bash
   cd campusCompass
   npm install
   npm test
   npm run build
   ```
2. **Start Development**:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to interact with the application shell and placeholders.
3. **Inspect the Component Library**:
   Navigate to `http://localhost:3000/welcome` to explore interactive demos and prop examples for all Member 2 UI primitives (`Button`, `Card`, `Badge`, `Modal`, `Input`, `Select`, `Textarea`, `Tabs`, `Dropdown`).
4. **Implement Features in Modular Folders**:
   Build upcoming domain modules inside `src/features/<feature-name>/` rather than in shared folders. Reference components from `src/components/ui/` and persistence utilities from `src/utils/storage.js`.

### Validating Changes Before Submitting PRs

Prior to opening a Pull Request:
1. Run `npm test` &rarr; Ensure all routes and exports remain unbroken.
2. Run `npm run build` &rarr; Ensure Vite produces a clean production bundle without missing module errors.
3. Check responsive layouts across mobile (390px) and desktop (1280px).
4. Do not push breaking changes directly to `main`; work exclusively within your assigned feature branch.

### Known Issues & Current Limitations

To maintain accurate visibility across the engineering team, the following known states are documented:
- **Phase 2 Module Logic is Pending**: The views for Dashboard (`/`), Tasks (`/tasks`), Calendar (`/calendar`), Opportunities (`/opportunities`), and Placement Tracker (`/placement`) currently display `PagePlaceholder` cards. These are intentional placeholders ready for domain logic implementation in Phase 2.
- **Route Alias `/planner` vs `/tasks`**: The design documents initially referenced the academic tracker as `features/planner/`. In the application shell, Member 3 mapped this route to `/tasks`. Future feature owners can alias `/planner` to redirect to `/tasks` if needed.
- **Direct Navigation to UI Showcase**: The UI Showcase is mapped to `/welcome`. It is not present as a link in the primary student sidebar to keep the navigation focused on student daily tools; access it directly via `http://localhost:3000/welcome`.
- **Zero Backend Architecture**: By specification, Campus Compass has no backend, database, or external API dependency. All future data structures should be modeled locally using `src/utils/storage.js`.

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
