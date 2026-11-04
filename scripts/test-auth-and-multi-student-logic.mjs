/**
 * Automated Verification Script: Auth & Multi-Student Data Isolation
 * Run with: node scripts/test-auth-and-multi-student-logic.mjs
 */

import assert from 'node:assert';
import { storage } from '../src/utils/storage.js';
import { studentStorage, migrateLegacyDataIfNeeded } from '../src/utils/studentStorage.js';
import {
  DEMO_ACCOUNTS,
  SESSION_KEY,
  getAccountById,
  validateCredentials,
} from '../src/features/auth/demoAccounts.js';

console.log('=== Campus Compass: Auth & Multi-Student Data Logic Tests ===\n');

// Clear memory storage before tests
storage.clear();

// ── Test 1: Demo Accounts Structure & Credential Validation ──────────────────
console.log('Test 1: Demo Accounts & Credential Validation');
assert.strictEqual(DEMO_ACCOUNTS.length, 3, 'Must have 3 demo accounts');

// Valid credentials
const s1 = validateCredentials('aarav@demo.com', 'student1');
assert.ok(s1, 'aarav@demo.com should authenticate');
assert.strictEqual(s1.id, 'student-1');
assert.strictEqual(s1.name, 'Aarav Sharma');

const s2 = validateCredentials('priya@demo.com', 'student2');
assert.ok(s2, 'priya@demo.com should authenticate');
assert.strictEqual(s2.id, 'student-2');

const s3 = validateCredentials('rohan@demo.com', 'student3');
assert.ok(s3, 'rohan@demo.com should authenticate');
assert.strictEqual(s3.id, 'student-3');

// Case insensitivity on email
const s1Upper = validateCredentials('AARAV@DEMO.COM', 'student1');
assert.ok(s1Upper, 'Email matching should be case-insensitive');

// Invalid password
const badPass = validateCredentials('aarav@demo.com', 'wrongpassword');
assert.strictEqual(badPass, null, 'Wrong password should fail');

// Unknown email
const badEmail = validateCredentials('unknown@demo.com', 'student1');
assert.strictEqual(badEmail, null, 'Unknown email should fail');

console.log('  ✔ All demo credentials and edge cases validated.\n');

// ── Test 2: Student Account Lookup ───────────────────────────────────────────
console.log('Test 2: getAccountById Helper');
assert.strictEqual(getAccountById('student-1')?.name, 'Aarav Sharma');
assert.strictEqual(getAccountById('student-2')?.name, 'Priya Mehta');
assert.strictEqual(getAccountById('student-3')?.name, 'Rohan Verma');
assert.strictEqual(getAccountById('non-existent'), null);
console.log('  ✔ Account lookup returns expected student metadata.\n');

// ── Test 3: Multi-Student Storage Isolation ──────────────────────────────────
console.log('Test 3: Storage Isolation Between Students');
const store1 = studentStorage('student-1');
const store2 = studentStorage('student-2');
const store3 = studentStorage('student-3');

// Store student 1 tasks
const s1Tasks = [
  { id: 'task-1', title: 'Aarav Personal Task', completed: false },
];
store1.set('campus_compass_tasks', s1Tasks);

// Store student 2 tasks
const s2Tasks = [
  { id: 'task-2', title: 'Priya Different Task', completed: true },
];
store2.set('campus_compass_tasks', s2Tasks);

// Assert student 1 only sees their tasks
const readS1 = store1.get('campus_compass_tasks');
assert.strictEqual(readS1.length, 1);
assert.strictEqual(readS1[0].title, 'Aarav Personal Task');

// Assert student 2 only sees their tasks
const readS2 = store2.get('campus_compass_tasks');
assert.strictEqual(readS2.length, 1);
assert.strictEqual(readS2[0].title, 'Priya Different Task');

// Assert student 3 has no tasks yet (returns default null)
const readS3 = store3.get('campus_compass_tasks', null);
assert.strictEqual(readS3, null);

// Underlying raw keys in storage must be namespaced with __student-<id>
assert.ok(storage.get('campus_compass_tasks__student-1'));
assert.ok(storage.get('campus_compass_tasks__student-2'));
assert.strictEqual(storage.get('campus_compass_tasks__student-3', null), null);

console.log('  ✔ Data namespaces completely isolate student data.\n');

// ── Test 4: Cross-Module Data Independence ───────────────────────────────────
console.log('Test 4: Cross-Module Multi-Student Data Mutation');

// Calendar events
store1.set('campusCompass_calendarEvents', [{ id: 'c1', title: 'Exam for Aarav' }]);
store2.set('campusCompass_calendarEvents', [{ id: 'c2', title: 'Interview for Priya' }]);

// Opportunities
store1.set('campusCompass_opportunities', [{ id: 'o1', title: 'Google Summer Intern' }]);
store2.set('campusCompass_opportunities', [{ id: 'o2', title: 'Amazon Research Fellowship' }]);

// Placement applications
store1.set('campusCompass_placementApplications', [{ id: 'p1', company: 'Microsoft', status: 'Applied' }]);
store2.set('campusCompass_placementApplications', [{ id: 'p2', company: 'Google', status: 'Offer' }]);

// Mutate student 1 - delete event
store1.set('campusCompass_calendarEvents', []);

// Verify student 2's event is untouched
const s2Events = store2.get('campusCompass_calendarEvents');
assert.strictEqual(s2Events.length, 1);
assert.strictEqual(s2Events[0].title, 'Interview for Priya');

// Verify student 1's events are empty
const s1Events = store1.get('campusCompass_calendarEvents');
assert.strictEqual(s1Events.length, 0);

console.log('  ✔ Modifying or clearing data for one student does not affect others.\n');

// ── Test 5: Legacy Unscoped Data Migration ───────────────────────────────────
console.log('Test 5: Safe Legacy Unscoped Data Migration');
storage.clear();

// Simulate legacy pre-auth user data
const legacyTasks = [{ id: 'legacy-1', title: 'Pre-existing Task', completed: false }];
const legacyPlacement = [{ id: 'legacy-app-1', company: 'Oracle', role: 'SDE' }];

storage.set('campus_compass_tasks', legacyTasks);
storage.set('campusCompass_placementApplications', legacyPlacement);

// Run migration
migrateLegacyDataIfNeeded();

// Legacy unscoped keys must still exist intact (preservation requirement)
assert.deepStrictEqual(storage.get('campus_compass_tasks'), legacyTasks);
assert.deepStrictEqual(storage.get('campusCompass_placementApplications'), legacyPlacement);

// Student 1 must now have the migrated data
const student1MigratedTasks = studentStorage('student-1').get('campus_compass_tasks');
assert.deepStrictEqual(student1MigratedTasks, legacyTasks);

const student1MigratedPlacement = studentStorage('student-1').get('campusCompass_placementApplications');
assert.deepStrictEqual(student1MigratedPlacement, legacyPlacement);

// Student 2 and 3 should NOT have received student 1's legacy data
assert.strictEqual(studentStorage('student-2').get('campus_compass_tasks', null), null);
assert.strictEqual(studentStorage('student-3').get('campus_compass_tasks', null), null);

console.log('  ✔ Legacy data safely migrated to student-1 without bleeding to other accounts.\n');

// ── Test 6: Session Management ───────────────────────────────────────────────
console.log('Test 6: Active Session Key Handling');
storage.set(SESSION_KEY, 'student-2');
assert.strictEqual(storage.get(SESSION_KEY), 'student-2');

// Logout removes session
storage.remove(SESSION_KEY);
assert.strictEqual(storage.get(SESSION_KEY, null), null);

console.log('  ✔ Session login and logout persistence validated.\n');

console.log('🎉 ALL 6 AUTH & MULTI-STUDENT LOGIC TESTS PASSED!\n');

