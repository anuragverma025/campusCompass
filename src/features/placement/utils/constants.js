/**
 * Placement Tracker — Constants, Status Definitions, and Sample Data
 * Part of Campus Compass — The Student Life Assistant
 */

/**
 * localStorage key for placement application data.
 * Uses a dedicated key to avoid conflicts with other features.
 */
export const PLACEMENT_STORAGE_KEY = 'campusCompass_placementApplications';

/**
 * Supported application statuses in pipeline order.
 */
export const APPLICATION_STATUSES = [
  'Interested',
  'Applied',
  'Online Assessment',
  'Interview',
  'Offer',
  'Rejected',
];

/**
 * Maps each status to a Badge component variant for consistent visual treatment.
 */
export const STATUS_BADGE_VARIANT = {
  'Interested': 'info',
  'Applied': 'primary',
  'Online Assessment': 'warning',
  'Interview': 'warning',
  'Offer': 'success',
  'Rejected': 'error',
};

/**
 * Sample placement applications seeded on first visit.
 * These use realistic company names, roles, and dates so the page
 * looks useful immediately. Each entry is clearly labelled as sample data.
 */
export const SAMPLE_APPLICATIONS = [
  {
    id: 'sample-1',
    company: 'Google',
    role: 'SDE Intern (Summer 2027)',
    status: 'Applied',
    deadline: '2027-01-15',
    notes: 'Applied through campus portal. Referral from senior batch alumni.',
    applicationLink: 'https://careers.google.com',
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
  },
  {
    id: 'sample-2',
    company: 'Microsoft',
    role: 'Software Engineer Intern',
    status: 'Online Assessment',
    deadline: '2026-12-20',
    notes: 'OA scheduled for next week. Prepare DP and graph problems.',
    applicationLink: 'https://careers.microsoft.com',
    createdAt: '2026-10-28T09:30:00.000Z',
    updatedAt: '2026-11-02T14:00:00.000Z',
  },
  {
    id: 'sample-3',
    company: 'Razorpay',
    role: 'Backend Engineering Intern',
    status: 'Interview',
    deadline: '2026-12-10',
    notes: 'Cleared OA. Technical interview round 1 on Friday.',
    applicationLink: 'https://razorpay.com/careers',
    createdAt: '2026-10-20T11:00:00.000Z',
    updatedAt: '2026-11-03T08:00:00.000Z',
  },
  {
    id: 'sample-4',
    company: 'Flipkart',
    role: 'SDE 1',
    status: 'Offer',
    deadline: '',
    notes: 'Received offer letter! Joining July 2027. CTC 24 LPA.',
    applicationLink: '',
    createdAt: '2026-09-15T10:00:00.000Z',
    updatedAt: '2026-10-30T16:00:00.000Z',
  },
  {
    id: 'sample-5',
    company: 'Amazon',
    role: 'SDE Intern',
    status: 'Rejected',
    deadline: '2026-11-01',
    notes: 'Did not clear the online assessment. Review sliding window patterns.',
    applicationLink: 'https://amazon.jobs',
    createdAt: '2026-10-10T08:00:00.000Z',
    updatedAt: '2026-11-01T12:00:00.000Z',
  },
  {
    id: 'sample-6',
    company: 'Atlassian',
    role: 'Software Engineer Intern',
    status: 'Interested',
    deadline: '2027-02-01',
    notes: 'Applications open in January. Bookmark the careers page.',
    applicationLink: 'https://www.atlassian.com/company/careers',
    createdAt: '2026-11-03T07:00:00.000Z',
    updatedAt: '2026-11-03T07:00:00.000Z',
  },
];

