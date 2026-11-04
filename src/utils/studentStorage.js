/**
 * studentStorage — a thin wrapper around the global `storage` utility that
 * namespaces every key with the active demo student's ID.
 *
 * Example: studentStorage('student-1').get('campus_compass_tasks')
 *   reads from localStorage key: 'campus_compass_tasks__student-1'
 *
 * This keeps each demo student's data completely separate.
 * Legacy unscoped keys are safely preserved and migrated once to student-1.
 */

import { storage } from './storage.js';

const LEGACY_KEYS = [
  'campus_compass_tasks',
  'campusCompass_calendarEvents',
  'campusCompass_opportunities',
  'campusCompass_placementApplications',
];

/**
 * Safely migrate existing legacy (unscoped) localStorage data to student-1.
 * Leaves the original legacy keys untouched for safety and backward compatibility.
 */
export function migrateLegacyDataIfNeeded() {
  const MIGRATION_DONE_KEY = 'campusCompass_legacy_migrated_to_student1';
  try {
    if (storage.get(MIGRATION_DONE_KEY, false)) {
      return;
    }

    for (const key of LEGACY_KEYS) {
      const legacyVal = storage.get(key, null);
      const targetKey = `${key}__student-1`;
      if (legacyVal !== null && storage.get(targetKey, null) === null) {
        storage.set(targetKey, legacyVal);
      }
    }

    storage.set(MIGRATION_DONE_KEY, true);
  } catch (err) {
    console.warn('[Campus Compass] One-time legacy data migration notice:', err);
  }
}

/**
 * Returns a storage adapter scoped to the given student ID.
 * @param {string} studentId  e.g. 'student-1'
 * @returns {{ get, set, remove }}
 */
export function studentStorage(studentId) {
  if (!studentId) {
    return storage;
  }

  const scope = (key) => `${key}__${studentId}`;

  return {
    get(key, defaultValue = null) {
      return storage.get(scope(key), defaultValue);
    },
    set(key, value) {
      return storage.set(scope(key), value);
    },
    remove(key) {
      return storage.remove(scope(key));
    },
  };
}

export default studentStorage;
