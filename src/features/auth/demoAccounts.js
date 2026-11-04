/**
 * Demo Accounts for Campus Compass
 *
 * ⚠️  DEMO / COLLEGE PROJECT ONLY
 * This is NOT real authentication. Credentials are stored in plain text
 * in the source code for demonstration purposes. Do NOT use this pattern
 * for any application that handles real user data.
 *
 * Each account has a stable `id` used to namespace all localStorage keys,
 * so each demo student sees completely independent data.
 */

export const DEMO_ACCOUNTS = [
  {
    id: 'student-1',
    name: 'Anurag Verma',
    email: 'anurag@demo.com',
    password: 'student1',
    avatar: 'AV',
    course: 'B.Tech CSE — 3rd Year',
    bio: 'Preparing for SDE roles and full-stack development.',
  },
  {
    id: 'student-2',
    name: 'Ayush Kumar',
    email: 'ayush@demo.com',
    password: 'student2',
    avatar: 'AK',
    course: 'B.Tech IT — 3rd Year',
    bio: 'Focused on data structures, algorithms, and internships.',
  },
  {
    id: 'student-3',
    name: 'Ankit Gupta',
    email: 'ankit@demo.com',
    password: 'student3',
    avatar: 'AG',
    course: 'B.Tech ECE — 3rd Year',
    bio: 'Exploring web technologies and competitive programming.',
  },
  {
    id: 'student-4',
    name: 'Kanhaiya Mehta',
    email: 'kanhaiya@demo.com',
    password: 'student4',
    avatar: 'KM',
    course: 'B.Tech CSE — 3rd Year',
    bio: 'Specializing in cloud systems and software engineering.',
  },
];

/** Key used to persist the currently logged-in demo student ID */
export const SESSION_KEY = 'campusCompass_activeStudentId';

/**
 * Returns the full account object for a given student ID, or null.
 * @param {string} id
 * @returns {object|null}
 */
export function getAccountById(id) {
  return DEMO_ACCOUNTS.find((a) => a.id === id) ?? null;
}

/**
 * Validates email + password against the demo accounts list.
 * Returns the matching account object, or null if no match.
 * @param {string} email
 * @param {string} password
 * @returns {object|null}
 */
export function validateCredentials(email, password) {
  const normalized = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNTS.find(
      (a) => a.email === normalized && a.password === password,
    ) ?? null
  );
}
