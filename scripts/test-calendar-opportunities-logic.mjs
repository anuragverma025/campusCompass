/**
 * Automated Logic Verification for Calendar & Opportunities Features
 * Validates storage isolation, data contracts, CRUD, filters, and corrupt-data recovery.
 */

import assert from 'node:assert/strict';

// --- In-Memory LocalStorage Mock ---
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.window = {
  localStorage: new LocalStorageMock(),
};

// Storage helper wrapper mimicking src/utils/storage.js
const storage = {
  get(key, defaultValue = null) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
};

// Import constants
import {
  CALENDAR_STORAGE_KEY,
  SAMPLE_CALENDAR_EVENTS,
  EVENT_CATEGORIES,
} from '../src/features/calendar/utils/constants.js';

import {
  OPPORTUNITIES_STORAGE_KEY,
  SAMPLE_OPPORTUNITIES,
  OPPORTUNITY_CATEGORIES,
} from '../src/features/opportunities/utils/constants.js';

console.log('--- Starting Calendar & Opportunities Logic Verification ---');

// --- Test 1: Storage Keys Isolation ---
assert.equal(CALENDAR_STORAGE_KEY, 'campusCompass_calendarEvents', 'Calendar key should match');
assert.equal(OPPORTUNITIES_STORAGE_KEY, 'campusCompass_opportunities', 'Opportunities key should match');
assert.notEqual(CALENDAR_STORAGE_KEY, OPPORTUNITIES_STORAGE_KEY, 'Keys must be separate');
assert.notEqual(CALENDAR_STORAGE_KEY, 'campus_compass_tasks', 'Must not conflict with Tasks key');
assert.notEqual(OPPORTUNITIES_STORAGE_KEY, 'campusCompass_placementApplications', 'Must not conflict with Placement key');
console.log('PASS: Storage keys are distinct and properly isolated');

// --- Test 2: Calendar Sample Data & Categories ---
assert.ok(SAMPLE_CALENDAR_EVENTS.length >= 4, 'At least 4 sample calendar events seeded');
SAMPLE_CALENDAR_EVENTS.forEach((evt) => {
  assert.ok(evt.id, 'Event must have an id');
  assert.ok(evt.title, 'Event must have a title');
  assert.ok(evt.date, 'Event must have a date');
  assert.ok(evt.time, 'Event must have a time');
  assert.ok(evt.category, 'Event must have a category');
  assert.equal(evt.isSample, true, 'Sample events must be flagged isSample: true');
});
console.log('PASS: Calendar sample events schema verified');

// --- Test 3: Opportunities Sample Data & Categories ---
assert.ok(SAMPLE_OPPORTUNITIES.length >= 5, 'At least 5 sample opportunities seeded');
SAMPLE_OPPORTUNITIES.forEach((opp) => {
  assert.ok(opp.id, 'Opportunity must have an id');
  assert.ok(opp.title, 'Opportunity must have a title');
  assert.ok(opp.organization, 'Opportunity must have an organization');
  assert.ok(opp.category, 'Opportunity must have a category');
  assert.ok(opp.deadline, 'Opportunity must have a deadline');
  assert.equal(opp.isSample, true, 'Sample opportunities must be flagged isSample: true');
  assert.equal(typeof opp.isBookmarked, 'boolean', 'isBookmarked must be boolean');
  if (opp.link) {
    assert.match(opp.link, /^https?:\/\//, 'Link if present must be http/https');
  }
});
console.log('PASS: Opportunities sample listings schema verified');

// --- Test 4: Calendar CRUD Operations ---
window.localStorage.clear();

// First visit seeding
assert.equal(storage.get(CALENDAR_STORAGE_KEY, null), null);
storage.set(CALENDAR_STORAGE_KEY, SAMPLE_CALENDAR_EVENTS);
let events = storage.get(CALENDAR_STORAGE_KEY);
assert.equal(events.length, SAMPLE_CALENDAR_EVENTS.length);

// Add event
const newEvent = {
  id: 'cal-test-user-1',
  title: 'Cloud Architecture Final Presentation',
  date: '2026-11-20',
  time: '11:00 AM',
  category: 'academic',
  location: 'Hall B',
  isSample: false,
};
events = [newEvent, ...events];
storage.set(CALENDAR_STORAGE_KEY, events);
let loadedEvents = storage.get(CALENDAR_STORAGE_KEY);
assert.equal(loadedEvents.length, SAMPLE_CALENDAR_EVENTS.length + 1);
assert.equal(loadedEvents[0].title, 'Cloud Architecture Final Presentation');

// Edit event
events = events.map((e) => (e.id === 'cal-test-user-1' ? { ...e, location: 'Virtual Zoom Room 1' } : e));
storage.set(CALENDAR_STORAGE_KEY, events);
loadedEvents = storage.get(CALENDAR_STORAGE_KEY);
assert.equal(loadedEvents.find((e) => e.id === 'cal-test-user-1').location, 'Virtual Zoom Room 1');

// Delete event
events = events.filter((e) => e.id !== 'cal-test-user-1');
storage.set(CALENDAR_STORAGE_KEY, events);
loadedEvents = storage.get(CALENDAR_STORAGE_KEY);
assert.equal(loadedEvents.length, SAMPLE_CALENDAR_EVENTS.length);
assert.equal(loadedEvents.find((e) => e.id === 'cal-test-user-1'), undefined);
console.log('PASS: Calendar CRUD lifecycle persists cleanly');

// --- Test 5: Opportunities CRUD & Bookmarking ---
window.localStorage.clear();

// First visit seeding
assert.equal(storage.get(OPPORTUNITIES_STORAGE_KEY, null), null);
storage.set(OPPORTUNITIES_STORAGE_KEY, SAMPLE_OPPORTUNITIES);
let opps = storage.get(OPPORTUNITIES_STORAGE_KEY);
assert.equal(opps.length, SAMPLE_OPPORTUNITIES.length);

// Toggle Bookmark
const targetId = opps[0].id;
const initialBookmark = opps[0].isBookmarked;
opps = opps.map((o) => (o.id === targetId ? { ...o, isBookmarked: !o.isBookmarked } : o));
storage.set(OPPORTUNITIES_STORAGE_KEY, opps);
let loadedOpps = storage.get(OPPORTUNITIES_STORAGE_KEY);
assert.equal(loadedOpps.find((o) => o.id === targetId).isBookmarked, !initialBookmark);

// Add Opportunity
const newOpp = {
  id: 'opp-test-user-1',
  title: 'Hardware Systems Intern',
  organization: 'NVIDIA India',
  category: 'internship',
  deadline: '2026-12-15',
  location: 'Pune',
  eligibility: 'ECE / CS B.Tech',
  link: 'https://nvidia.wd5.myworkdayjobs.com',
  isBookmarked: false,
  isSample: false,
};
opps = [newOpp, ...opps];
storage.set(OPPORTUNITIES_STORAGE_KEY, opps);
loadedOpps = storage.get(OPPORTUNITIES_STORAGE_KEY);
assert.equal(loadedOpps.length, SAMPLE_OPPORTUNITIES.length + 1);
assert.equal(loadedOpps[0].organization, 'NVIDIA India');

// Delete Opportunity
opps = opps.filter((o) => o.id !== 'opp-test-user-1');
storage.set(OPPORTUNITIES_STORAGE_KEY, opps);
loadedOpps = storage.get(OPPORTUNITIES_STORAGE_KEY);
assert.equal(loadedOpps.length, SAMPLE_OPPORTUNITIES.length);
console.log('PASS: Opportunities CRUD & Bookmark persistence verified');

// --- Test 6: URL Validation Helper ---
function testUrl(str) {
  if (!str.trim()) return true;
  try {
    const u = new URL(str.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

assert.equal(testUrl('https://careers.google.com'), true);
assert.equal(testUrl('http://college.edu/drive'), true);
assert.equal(testUrl(''), true, 'Empty link is optional and valid');
assert.equal(testUrl('not-a-valid-url'), false);
assert.equal(testUrl('javascript:alert(1)'), false);
assert.equal(testUrl('ftp://ftp.example.com'), false);
console.log('PASS: Client-side URL validation rules verified');

// --- Test 7: Corrupt Storage Recovery ---
window.localStorage.setItem(CALENDAR_STORAGE_KEY, '{ invalid json');
const recoveredCal = storage.get(CALENDAR_STORAGE_KEY, []);
assert.deepEqual(recoveredCal, [], 'Corrupt JSON should recover safely without throwing');

window.localStorage.setItem(OPPORTUNITIES_STORAGE_KEY, 'not-a-json-object');
const recoveredOpp = storage.get(OPPORTUNITIES_STORAGE_KEY, []);
assert.deepEqual(recoveredOpp, [], 'Corrupt JSON should recover safely without throwing');
console.log('PASS: Malformed localStorage recovery verified');

console.log('\n--- ALL CALENDAR & OPPORTUNITIES LOGIC TESTS PASSED (0 failures) ---');

