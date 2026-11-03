# Campus Compass — Quality Assurance & Testing Protocols

This document defines standard verification routines, automated smoke tests, manual testing matrices, and bug reporting protocols for **Campus Compass — The Student Life Assistant**.

All team members must run these tests on their feature branches prior to requesting peer review or merging into `main`.

---

## 1. Automated QA Smoke Testing Routine

Campus Compass includes a headless, zero-dependency automated verification suite using Vite's server module runner and React SSR.

### Running the Suite:
```bash
npm test
```

### What `npm test` Validates:
1. **Full Route Tree Rendering**:
   - `/` &rarr; Renders Dashboard view with `PagePlaceholder`
   - `/tasks` &rarr; Renders Academic Task Tracker view with `PagePlaceholder`
   - `/calendar` &rarr; Renders Smart Calendar view with `PagePlaceholder`
   - `/opportunities` &rarr; Renders Opportunity Radar view with `PagePlaceholder`
   - `/placement` &rarr; Renders Placement Prep Hub view with `PagePlaceholder`
   - `/welcome` &rarr; Renders Welcome Page and interactive `Showcase`
   - Catch-all `/*` (e.g. `/unknown-path`) &rarr; Renders `NotFoundPage`
2. **UI Design System Export Integrity**:
   - Asserts that all 15 component primitives in `src/components/ui/index.js` (`Button`, `Badge`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Input`, `Textarea`, `Select`, `Modal`, `Tabs`, `Dropdown`, `Showcase`) are correctly exported and callable.
3. **Storage Utility Contract**:
   - Validates that `src/utils/storage.js` exposes the full API surface (`get`, `set`, `remove`, `clear`).

---

## 2. Integrated Team QA Verification Matrix

| Area | Verification Item | Target Standard | Status | Verified By |
| :--- | :--- | :--- | :--- | :--- |
| **Dependency Install** | `npm install` | Clean installation with 0 fatal errors. | **PASS** | Member 1 & 4 |
| **Automated Tests** | `npm test` | All route renders and component assertions pass (0 failures). | **PASS** | Member 4 |
| **Production Build** | `npm run build` | Vite produces bundled CSS & JS in `dist/assets/` in under 5 seconds. | **PASS** | Member 1 & 4 |
| **Production Preview** | `npm run preview` | Static preview server serves production assets without 404s. | **PASS** | Member 1 & 4 |
| **Desktop Layout** | Viewport 1280px+ | Sticky top navbar, fixed desktop sidebar (w-64), right content area expands gracefully. | **PASS** | Member 3 & 4 |
| **Mobile Drawer** | Viewport 375px - 767px | Sidebar collapses into off-canvas drawer; hamburger button toggles drawer; backdrop click or `Escape` closes it. | **PASS** | Member 3 & 4 |
| **Accessibility (a11y)** | Keyboard Navigation | Accessible skip-to-content link appears on `Tab`; modal traps focus and dismisses on `Escape`. | **PASS** | Member 2 & 4 |
| **Design System Tokens** | Theme Consistency | Primary indigo (`#4338CA`) and secondary teal (`#0F766E`) tokens applied uniformly across components. | **PASS** | Member 2 & 4 |
| **Interactive Showcase** | `/welcome` Route | All component tabs (Buttons, Badges, Cards, Forms, Tabs, Modals, Dropdowns) function without console warnings. | **PASS** | Member 2 & 4 |
| **404 Routing** | Invalid URLs | Arbitrary routes load `NotFoundPage` with return-to-dashboard CTA button. | **PASS** | Member 1 & 4 |

---

## 3. Step-by-Step Manual QA Procedure

Follow these manual steps when verifying any UI or routing pull request:

### Step 1: Clean Install & Production Build
```bash
cd campusCompass
npm install
npm test
npm run build
```
- **Check**: Verify that the production bundle in `dist/` builds with zero errors.

### Step 2: Local Server Startup
```bash
npm run dev
```
- **Check**: Dev server starts at `http://localhost:3000` with instant HMR response.

### Step 3: Navigation & Route Testing
- Click each sidebar link in sequence:
  1. **Dashboard** (`/`) &rarr; Header displays `Dashboard`, placeholder indicates "Coming soon".
  2. **Tasks** (`/tasks`) &rarr; Header displays `Tasks`, placeholder indicates "Coming soon".
  3. **Calendar** (`/calendar`) &rarr; Header displays `Calendar`, placeholder indicates "Coming soon".
  4. **Opportunities** (`/opportunities`) &rarr; Header displays `Opportunities`, placeholder indicates "Coming soon".
  5. **Placement Tracker** (`/placement`) &rarr; Header displays `Placement Tracker`, placeholder indicates "Coming soon".
- Navigate to `http://localhost:3000/welcome`:
  - Verify Hero section, Planned Modules Grid, Design System Showcase, and Team Ownership Matrix render cleanly.
- Navigate to an invalid path `http://localhost:3000/non-existent-page`:
  - Verify `NotFoundPage` renders with warning icon and "Return to Campus Compass" button.

### Step 4: Responsive Viewport Checks
Using browser DevTools (`F12` &rarr; Toggle Device Toolbar `Ctrl+Shift+M`):
- **Mobile Viewports (375px, 390px, 414px)**:
  - Sidebar is hidden by default.
  - Header displays hamburger menu icon.
  - Clicking hamburger opens mobile slide-over drawer with backdrop overlay.
  - Clicking backdrop or pressing `Escape` closes drawer immediately.
  - Page content has 0 horizontal scrollbar overflow.
- **Tablet Viewports (768px - 1024px)**:
  - Sidebar displays in static desktop mode.
  - Grid layouts adapt from 1 column to 2 columns.
- **Desktop Viewports (1280px+)**:
  - Full width layout with 64-width sidebar, centered content max-w-5xl/max-w-7xl.

### Step 5: Accessibility & Keyboard Navigation
- Reload page and press `Tab` key:
  - "Skip to page content" button appears at the top left.
  - Press `Enter` &rarr; Focus shifts directly to `#page-content`.
- Open Modal demo on `/welcome`:
  - Press `Escape` key &rarr; Modal dismisses and body scrolling unlocks.

---

## 4. Standardized Bug Reporting Format

When a defect is identified during testing, file an issue using this template:

```markdown
### 🐞 Bug Report

**1. Issue Summary**:
[Short, precise description of the issue]

**2. Steps to Reproduce**:
1. [First action]
2. [Second action]
3. [Third action]

**3. Expected Result**:
[What should happen based on specifications]

**4. Actual Result**:
[What actually happened, including any console errors]

**5. Severity**:
- [ ] Critical (Build failure, crash, unhandled exception)
- [ ] High (Feature completely blocked, navigation broken)
- [ ] Medium (UI rendering defect, styling glitch, incorrect state)
- [ ] Low (Cosmetic imperfection, typo, non-breaking warning)

**Environment**:
- OS: [Windows / macOS / Linux]
- Browser: [Chrome / Firefox / Edge / Safari + version]
- Viewport / Screen Size: [e.g., 390px mobile, 1440px desktop]
```
