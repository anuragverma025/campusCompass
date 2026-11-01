# Campus Compass — Manual Testing & Verification Checklist

This checklist tracks standard verification routines for each release milestone. Run these tests on every feature branch prior to merging into `main`.

---

## Phase 1: Foundation Verification Matrix

| Category | Verification Item | Target Standard | Status | Verified By |
| :--- | :--- | :--- | :--- | :--- |
| **Dependency Installation** | Clean install with `npm install` | Completes with zero errors or unresolvable peer conflicts. | **PASS** | Member 1 |
| **Dev Server Startup** | `npm run dev` execution | Vite server starts up on `http://localhost:3000` (or default port) in under 1 second. | **PASS** | Member 1 |
| **Route Loading** | Root route (`/`) navigation | Correctly renders `WelcomePage` with Header, Hero, Modules Grid, and Footer. | **PASS** | Member 1 |
| **Route Loading** | Catch-all route (`/*`) fallback | Navigating to arbitrary URL (e.g. `/non-existent`) displays the accessible `NotFoundPage`. | **PASS** | Member 1 |
| **Responsive Layout** | Mobile viewport (375px & 414px) | Navigation collapses gracefully, grids stack to 1 column, zero horizontal overflow. | **PASS** | Member 1 |
| **Responsive Layout** | Tablet viewport (768px - 1024px) | 2-column grid rendering, cards align properly, typography scales legibly. | **PASS** | Member 1 |
| **Responsive Layout** | Desktop viewport (1280px+) | 3-column feature grid and 4-column team cards render with optimal spacing. | **PASS** | Member 1 |
| **Console Errors** | Browser DevTools Console | Zero unhandled exceptions, zero missing key warnings, zero hydration errors. | **PASS** | Member 1 |
| **Production Build** | `npm run build` command | Vite produces optimized output in `dist/` without errors or missing imports. | **PASS** | Member 1 |
| **Production Preview** | `npm run preview` test | Static build serves cleanly and all assets load without 404s. | **PASS** | Member 1 |

---

## Detailed Step-by-Step Testing Procedure

### 1. Dependency Installation
```bash
# Verify clean install
npm install
```
- **Check**: No critical fatal errors. The `node_modules` directory and `package-lock.json` are generated cleanly.

### 2. Development Server Startup
```bash
npm run dev
```
- **Check**: Open `http://localhost:3000` in your browser. Verify the page updates instantaneously on file edits via Vite HMR.

### 3. Route Testing
- Navigate to:
  - `http://localhost:3000/` &rarr; Should display the Campus Compass welcome banner, planned feature cards, and team structure.
  - `http://localhost:3000/arbitrary-test-route` &rarr; Should display the "Page Not Found" screen with a working "Return to Campus Compass" button.

### 4. Responsiveness and Layout
- Open Developer Tools (`F12` or `Ctrl+Shift+I`).
- Toggle Device Toolbar (`Ctrl+Shift+M`).
- Test standard profiles: iPhone 12/14 (390px), iPad Mini (768px), and 1080p Desktop (1920px).
- Verify no text clipping or horizontal scrollbars occur.

### 5. Production Build Verification
```bash
npm run build
npm run preview
```
- **Check**: Vite outputs assets inside `dist/assets/`.
- Run preview server and confirm the compiled version runs identically to the development version.

