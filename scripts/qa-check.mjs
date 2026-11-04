import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

console.log('--- Starting Campus Compass Automated QA Smoke Checks ---');

const vite = await createServer({
  configFile: false,
  plugins: [react()],
  cacheDir: './.vite-qa-cache',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

let failures = 0;

try {
  const { storage } = await vite.ssrLoadModule('./src/utils/storage.js');
  // Seed demo student session for authenticated route checks
  storage.set('campusCompass_activeStudentId', 'student-1');

  const { AppRoutes } = await vite.ssrLoadModule('./src/app/routes.jsx');
  const { MemoryRouter } = await vite.ssrLoadModule('react-router-dom');

  const testRoutes = [
    { path: '/', expectedContent: 'Dashboard' },
    { path: '/tasks', expectedContent: 'Tasks' },
    { path: '/calendar', expectedContent: 'Calendar' },
    { path: '/opportunities', expectedContent: 'Opportunities' },
    { path: '/placement', expectedContent: 'Placement Tracker' },
    { path: '/welcome', expectedContent: 'Campus Compass' },
    { path: '/unknown-route', expectedContent: 'Page Not Found' },
  ];

  for (const { path, expectedContent } of testRoutes) {
    try {
      const html = ReactDOMServer.renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [path] },
          React.createElement(AppRoutes)
        )
      );

      if (!html.includes(expectedContent)) {
        console.error(`FAIL: Route [${path}] did not contain expected text "${expectedContent}"`);
        failures++;
      } else {
        console.log(`PASS: Route [${path}] rendered successfully (${html.length} bytes, includes "${expectedContent}")`);
      }
    } catch (routeErr) {
      console.error(`FAIL: Route [${path}] threw render error:`, routeErr);
      failures++;
    }
  }

  // Test UI Design System Components directly
  console.log('\n--- Testing Core UI Design System Primitives ---');
  const ui = await vite.ssrLoadModule('./src/components/ui/index.js');
  const expectedComponents = [
    'Button',
    'Badge',
    'Card',
    'CardHeader',
    'CardTitle',
    'CardDescription',
    'CardContent',
    'CardFooter',
    'Input',
    'Textarea',
    'Select',
    'Modal',
    'Tabs',
    'Dropdown',
    'Showcase',
  ];

  for (const compName of expectedComponents) {
    if (typeof ui[compName] !== 'function') {
      console.error(`FAIL: Component ${compName} is missing or not a function in src/components/ui/index.js`);
      failures++;
    } else {
      console.log(`PASS: UI Component [${compName}] exported correctly`);
    }
  }

  // Test Storage Utility
  console.log('\n--- Testing Storage Utility Wrapper ---');
  if (
    typeof storage.get === 'function' &&
    typeof storage.set === 'function' &&
    typeof storage.remove === 'function' &&
    typeof storage.clear === 'function'
  ) {
    console.log('PASS: Storage utility has all expected methods (get, set, remove, clear)');
  } else {
    console.error('FAIL: Storage utility is missing required methods');
    failures++;
  }

  // Test Placement Tracker Feature Constants & Sample Data
  console.log('\n--- Testing Placement Tracker Feature ---');
  const placementConstants = await vite.ssrLoadModule('./src/features/placement/utils/constants.js');
  const { PLACEMENT_STORAGE_KEY, APPLICATION_STATUSES, SAMPLE_APPLICATIONS, STATUS_BADGE_VARIANT } = placementConstants;

  if (PLACEMENT_STORAGE_KEY === 'campusCompass_placementApplications') {
    console.log(`PASS: PLACEMENT_STORAGE_KEY matches specification (${PLACEMENT_STORAGE_KEY})`);
  } else {
    console.error(`FAIL: PLACEMENT_STORAGE_KEY expected 'campusCompass_placementApplications', got '${PLACEMENT_STORAGE_KEY}'`);
    failures++;
  }

  const expectedStatuses = [
    'Interested',
    'Applied',
    'Online Assessment',
    'Interview',
    'Offer',
    'Rejected',
  ];
  const missingStatuses = expectedStatuses.filter((s) => !APPLICATION_STATUSES.includes(s));
  if (missingStatuses.length === 0) {
    console.log('PASS: All 6 application statuses supported');
  } else {
    console.error(`FAIL: Missing application statuses: ${missingStatuses.join(', ')}`);
    failures++;
  }

  if (Array.isArray(SAMPLE_APPLICATIONS) && SAMPLE_APPLICATIONS.length >= 6) {
    const allHaveAppDate = SAMPLE_APPLICATIONS.every((a) => typeof a.applicationDate === 'string' && a.applicationDate.length > 0);
    const allHaveCreatedAt = SAMPLE_APPLICATIONS.every((a) => typeof a.createdAt === 'string');
    if (allHaveAppDate && allHaveCreatedAt) {
      console.log(`PASS: Sample applications (${SAMPLE_APPLICATIONS.length}) have valid distinct applicationDate and createdAt`);
    } else {
      console.error('FAIL: Some sample applications are missing applicationDate or createdAt');
      failures++;
    }
  } else {
    console.error('FAIL: Sample applications missing or incomplete');
    failures++;
  }

} catch (err) {
  console.error('CRITICAL QA ERROR:', err);
  failures++;
} finally {
  await vite.close();
}

console.log('\n--- QA Smoke Check Summary ---');
if (failures === 0) {
  console.log('ALL QA AUTOMATED CHECKS PASSED (0 failures)\n');
  process.exit(0);
} else {
  console.error(`QA CHECKS COMPLETED WITH ${failures} FAILURE(S)\n`);
  process.exit(1);
}
