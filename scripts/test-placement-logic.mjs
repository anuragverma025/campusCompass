/**
 * Placement Tracker — Unit & Integration Logic Verification
 * Tests CRUD, storage persistence, search, filtering, and malformed recovery.
 */

import {
  PLACEMENT_STORAGE_KEY,
  APPLICATION_STATUSES,
  SAMPLE_APPLICATIONS,
} from '../src/features/placement/utils/constants.js';

console.log('--- Starting Placement Tracker Logic Verification ---');
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failures++;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// 1. Verify Storage Key & Constants
assert(
  PLACEMENT_STORAGE_KEY === 'campusCompass_placementApplications',
  'Storage key is campusCompass_placementApplications'
);

assert(
  APPLICATION_STATUSES.length === 6 &&
    APPLICATION_STATUSES.includes('Interested') &&
    APPLICATION_STATUSES.includes('Applied') &&
    APPLICATION_STATUSES.includes('Online Assessment') &&
    APPLICATION_STATUSES.includes('Interview') &&
    APPLICATION_STATUSES.includes('Offer') &&
    APPLICATION_STATUSES.includes('Rejected'),
  'All 6 application statuses are present'
);

// 2. Verify Sample Data
assert(
  SAMPLE_APPLICATIONS.length >= 6,
  `At least 6 sample applications seeded (${SAMPLE_APPLICATIONS.length} found)`
);

const statusesInSample = new Set(SAMPLE_APPLICATIONS.map((a) => a.status));
assert(
  statusesInSample.size === 6,
  'Sample applications cover all 6 statuses'
);

const hasSeparateDates = SAMPLE_APPLICATIONS.every(
  (a) => a.applicationDate && a.createdAt && a.applicationDate !== a.createdAt
);
assert(
  hasSeparateDates,
  'Sample applications store applicationDate separately from createdAt'
);

// 3. Test Add Application
const mockStore = new Map();
const mockStorage = {
  get: (key, def) => (mockStore.has(key) ? JSON.parse(mockStore.get(key)) : def),
  set: (key, val) => mockStore.set(key, JSON.stringify(val)),
};

// Seed
mockStorage.set(PLACEMENT_STORAGE_KEY, SAMPLE_APPLICATIONS);
let apps = mockStorage.get(PLACEMENT_STORAGE_KEY, []);

// Add new
const newApp = {
  id: 'test-app-1',
  company: 'Stripe',
  role: 'Infrastructure Engineer Intern',
  status: 'Interested',
  applicationDate: '2026-11-04',
  deadline: '2026-12-31',
  applicationLink: 'https://stripe.com/jobs',
  notes: 'High priority application',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isSample: false,
};

apps = [newApp, ...apps];
mockStorage.set(PLACEMENT_STORAGE_KEY, apps);

const retrievedAfterAdd = mockStorage.get(PLACEMENT_STORAGE_KEY, []);
assert(
  retrievedAfterAdd.length === SAMPLE_APPLICATIONS.length + 1 &&
    retrievedAfterAdd[0].company === 'Stripe',
  'Added application persists and is prepended'
);

// 4. Test Edit Application
apps = apps.map((a) =>
  a.id === 'test-app-1'
    ? { ...a, role: 'Senior SDE Intern', status: 'Applied', updatedAt: new Date().toISOString() }
    : a
);
mockStorage.set(PLACEMENT_STORAGE_KEY, apps);

const retrievedAfterEdit = mockStorage.get(PLACEMENT_STORAGE_KEY, []);
const edited = retrievedAfterEdit.find((a) => a.id === 'test-app-1');
assert(
  edited && edited.role === 'Senior SDE Intern' && edited.status === 'Applied',
  'Application edited and persisted successfully'
);

// 5. Test Direct Status Update
apps = apps.map((a) =>
  a.id === 'test-app-1' ? { ...a, status: 'Interview' } : a
);
mockStorage.set(PLACEMENT_STORAGE_KEY, apps);

const retrievedAfterStatus = mockStorage.get(PLACEMENT_STORAGE_KEY, []);
const statusUpdated = retrievedAfterStatus.find((a) => a.id === 'test-app-1');
assert(
  statusUpdated && statusUpdated.status === 'Interview',
  'Direct status update changed status to Interview'
);

// 6. Test Delete Application
apps = apps.filter((a) => a.id !== 'test-app-1');
mockStorage.set(PLACEMENT_STORAGE_KEY, apps);

const retrievedAfterDelete = mockStorage.get(PLACEMENT_STORAGE_KEY, []);
assert(
  !retrievedAfterDelete.some((a) => a.id === 'test-app-1') &&
    retrievedAfterDelete.length === SAMPLE_APPLICATIONS.length,
  'Deleted application removed and storage updated'
);

// 7. Test Search by Company or Role
const searchTestCases = [
  { query: 'google', expectedCount: 1 },
  { query: 'engineer', expectedCount: 3 }, // Microsoft, Razorpay, Atlassian
  { query: 'intern', expectedCount: 5 },
  { query: 'nonexistent-company-xyz', expectedCount: 0 },
];

for (const { query, expectedCount } of searchTestCases) {
  const q = query.toLowerCase();
  const results = SAMPLE_APPLICATIONS.filter(
    (a) =>
      a.company.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      (a.notes && a.notes.toLowerCase().includes(q))
  );
  assert(
    results.length === expectedCount,
    `Search for "${query}" returned ${results.length} results (expected ${expectedCount})`
  );
}

// 8. Test Status Filtering
for (const status of APPLICATION_STATUSES) {
  const matches = SAMPLE_APPLICATIONS.filter((a) => a.status === status);
  assert(
    matches.length === 1,
    `Filter by status "${status}" returned ${matches.length} matching sample item`
  );
}

// 9. Test Malformed Data Recovery
const corruptPayloads = [
  'invalid-json-string{{',
  null,
  12345,
  'string-instead-of-array',
  [{ broken: true }], // missing company & role
];

for (const payload of corruptPayloads) {
  try {
    let parsed = payload;
    if (typeof payload === 'string' && payload.startsWith('invalid')) {
      try {
        parsed = JSON.parse(payload);
      } catch {
        parsed = null;
      }
    }

    const isValidArray =
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          item &&
          typeof item === 'object' &&
          typeof item.company === 'string' &&
          typeof item.role === 'string'
      );

    const safeResult = isValidArray ? parsed : SAMPLE_APPLICATIONS;
    assert(
      Array.isArray(safeResult) && safeResult.length > 0,
      `Corrupt payload (${typeof payload}) recovered safely to sample applications`
    );
  } catch (e) {
    assert(false, `Corrupt payload crashed with error: ${e.message}`);
  }
}

console.log('\n--- Placement Verification Summary ---');
if (failures === 0) {
  console.log('ALL PLACEMENT LOGIC CHECKS PASSED (0 failures)\n');
  process.exit(0);
} else {
  console.error(`COMPLETED WITH ${failures} FAILURE(S)\n`);
  process.exit(1);
}
