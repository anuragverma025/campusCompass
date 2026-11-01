# Campus Compass — The Student Life Assistant

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

**Campus Compass** is an open-source, frontend-first student productivity web application designed to help college students streamline academic commitments, daily schedules, career opportunities, and placement preparation within a single unified platform.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Key Planned Modules](#-key-planned-modules)
- [Technology Stack](#-technology-stack)
- [Phase 1 Implementation Status](#-phase-1-implementation-status)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Team Work Allocation & Collaboration](#-team-work-allocation--collaboration)
- [Quality & Testing Checklist](#-quality--testing-checklist)
- [Contributing Guidelines](#-contributing-guidelines)
- [License](#-license)

---

## 🎯 Project Overview

College students routinely juggle assignments across multiple portals, clash course schedules with club events, miss internship deadlines, and struggle to systematically track DSA placement preparations. 

Campus Compass resolves this fragmentation with a local-first, zero-backend, client-side web application that provides:
- **Zero backend or database requirement**: Uses browser `localStorage` for responsive, private, and offline-capable data storage.
- **Modern, responsive UI**: Built with accessible component patterns and modern Tailwind styling.
- **Modular feature structure**: Designed for clean, conflict-free collaborative team engineering.

---

## 🚀 Key Planned Modules

1. **Academic & Deadline Tracker (`features/planner/`)**: Semester assignment tracking, lab report deadlines, exam countdowns, priority sorting, and submission indicators.
2. **Daily Schedule & Smart Calendar (`features/calendar/`)**: Weekly class schedules, recurring lectures, club meetings, and time blocks.
3. **Opportunity Radar (`features/opportunities/`)**: Curated tracking for internships, scholarships, hackathons, and technical campus drives.
4. **DSA & Placement Prep Hub (`features/placement/`)**: Problem-solving logs (LeetCode / Striver sheets), category-wise revision status, and company interview notes.
5. **Goals & Progress Analytics (`features/dashboard/`)**: Weekly productivity charts, habit consistency rings, and academic milestone visualizers.

---

## 🛠 Technology Stack

- **Core Framework**: [React 18](https://react.dev/) (Component-based UI)
- **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/) (Blazing fast HMR and optimized bundling)
- **Client-Side Routing**: [React Router DOM v6](https://reactrouter.com/) (Declarative multi-page routing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Persistence**: Browser `localStorage` (via custom abstraction wrapper `src/utils/storage.js`)
- **Code Language**: JavaScript (ES2022+ / JSX)

---

## 📌 Phase 1 Implementation Status

- [x] **Project Scaffolding**: React + Vite initialized with ES modules and clean configuration.
- [x] **Routing Setup**: React Router configured with root (`/`) and fallback (`*`) routes.
- [x] **Styling Architecture**: Tailwind CSS integration configured with base styles and custom variables.
- [x] **Scalable Folder Structure**: Clean segregation (`components/ui`, `components/layout`, `pages`, `features`, `utils`, `styles`).
- [x] **Initial Application Screen**: Responsive welcome and architecture showcase screen with modular previews.
- [x] **Team Ownership Matrix**: Detailed allocation in [`docs/TEAM_WORK.md`](docs/TEAM_WORK.md).
- [x] **Quality & Testing Checklist**: Complete verification guide in [`docs/TESTING_CHECKLIST.md`](docs/TESTING_CHECKLIST.md).
- [x] **Build Verification**: Verified production bundle generation via `npm run build`.

---

## 📂 Project Architecture & Directory Structure

```text
campusCompass/
├── docs/                           # Team coordination and quality assurance docs
│   ├── TEAM_WORK.md                # 4-member roles, file ownership, and Git workflows
│   └── TESTING_CHECKLIST.md        # Manual test protocols and verification logs
├── public/                         # Public static assets (favicon, manifest)
├── src/
│   ├── app/                        # Application bootstrap and routing core
│   │   ├── App.jsx                 # App layout wrapper with Header, Routes, and Footer
│   │   └── routes.jsx              # React Router route registry
│   ├── assets/                     # Media assets and vector graphics
│   ├── components/                 # Shared presentation components
│   │   ├── layout/                 # Shell elements (Header, Footer, Sidebar)
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/                     # Atomic reusable UI components
│   │       ├── Badge.jsx           # Status indicators and labels
│   │       ├── Button.jsx          # Accessible button with variants
│   │       └── Card.jsx            # Multi-purpose content card
│   ├── features/                   # Domain-specific modules (Phase 2+)
│   │   └── README.md               # Guidelines for feature modularization
│   ├── pages/                      # Page-level components
│   │   ├── WelcomePage.jsx         # Phase 1 welcome & architecture dashboard
│   │   └── NotFoundPage.jsx        # 404 error page
│   ├── styles/                     # Global stylesheets and design tokens
│   │   └── index.css               # Tailwind CSS entry & base theme styles
│   ├── utils/                      # Shared helper functions
│   │   ├── constants.js            # App configuration and metadata
│   │   └── storage.js              # Safe localStorage wrapper
│   └── main.jsx                    # React DOM entry point
├── index.html                      # HTML entry template
├── package.json                    # Dependencies and npm scripts
├── vite.config.js                  # Vite & Tailwind build configuration
├── .gitignore                      # Git ignore rules
└── LICENSE                         # Apache 2.0 License
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: Version `18.0.0` or higher (`node -v`)
- **npm**: Version `9.0.0` or higher (`npm -v`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anuragverma025/campusCompass.git
   cd campusCompass
   ```

2. Checkout the feature branch:
   ```bash
   git checkout -b feature/project-foundation
   ```

3. Install project dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 👥 Team Work Allocation & Collaboration

The project follows a 4-member modular ownership model to guarantee independent progress and clean Git commit history:

- **Member 1 (Architect)**: Project foundation, routing, Vite configuration, release integration.
- **Member 2 (Design System)**: Design tokens, Tailwind configuration, reusable atomic UI components (`src/components/ui/`).
- **Member 3 (App Shell)**: Sidebar, responsive navigation, mobile drawer layout (`src/components/layout/`).
- **Member 4 (QA & Docs)**: README, setup instructions, manual testing checklist, and verification.

For full contribution details, review [`docs/TEAM_WORK.md`](docs/TEAM_WORK.md).

---

## ✅ Quality & Testing Checklist

All changes must satisfy the verification criteria outlined in [`docs/TESTING_CHECKLIST.md`](docs/TESTING_CHECKLIST.md) before merging into `main`.

---

## 🤝 Contributing Guidelines

1. Always create a branch from the updated `main` (`git checkout -b feature/<name>`).
2. Write atomic, conventional commit messages (e.g. `feat:`, `fix:`, `docs:`, `chore:`).
3. Do not push breaking changes to `main`.
4. Ensure `npm run build` succeeds prior to creating a Pull Request.

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

