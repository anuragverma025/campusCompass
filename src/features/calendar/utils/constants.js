/**
 * Constants & Sample Data for Calendar Feature
 */

export const CALENDAR_STORAGE_KEY = 'campusCompass_calendarEvents';

export const EVENT_CATEGORIES = [
  { value: 'academic', label: 'Academic & Exams' },
  { value: 'club', label: 'Club & Tech Events' },
  { value: 'personal', label: 'Personal & Study' },
  { value: 'placement', label: 'Placement & Career' },
];

export const CATEGORY_BADGE_VARIANT = {
  academic: 'primary',
  club: 'info',
  personal: 'success',
  placement: 'warning',
};

export const CATEGORY_LABELS = {
  academic: 'Academic',
  club: 'Club & Tech',
  personal: 'Personal',
  placement: 'Placement',
};

// Generate relative sample dates (today, tomorrow, +3 days, +6 days, +10 days)
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export const SAMPLE_CALENDAR_EVENTS = [
  {
    id: 'cal-sample-1',
    title: '(Sample) Advanced Database Systems Mid-Term Exam',
    date: getRelativeDate(0), // Today
    time: '10:00 AM',
    endTime: '12:00 PM',
    category: 'academic',
    location: 'Main Auditorium, Hall 3',
    description: 'Covers relational algebra, normal forms (BCNF, 4NF), and transaction isolation levels.',
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cal-sample-2',
    title: '(Sample) Google Student Developer Club Tech Talk',
    date: getRelativeDate(1), // Tomorrow
    time: '04:30 PM',
    endTime: '06:00 PM',
    category: 'club',
    location: 'Seminar Room 204 & Google Meet',
    description: 'Workshop on building scalable web apps with React and modern cloud architectures.',
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cal-sample-3',
    title: '(Sample) Microsoft Placement PPT & Mock Assessment',
    date: getRelativeDate(3),
    time: '02:00 PM',
    endTime: '03:30 PM',
    category: 'placement',
    location: 'Placement Cell & Teams',
    description: 'Pre-placement presentation for upcoming Summer Internship drive with live Q&A.',
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cal-sample-4',
    title: '(Sample) DSA Study Circle: Dynamic Programming Sprint',
    date: getRelativeDate(5),
    time: '06:00 PM',
    endTime: '08:00 PM',
    category: 'personal',
    location: 'Campus Library, Discussion Room A',
    description: 'Peer problem-solving session solving 0/1 Knapsack variants and LCS problems.',
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cal-sample-5',
    title: '(Sample) Annual Inter-College Hackathon Kickoff',
    date: getRelativeDate(8),
    time: '09:00 AM',
    endTime: '05:00 PM',
    category: 'club',
    location: 'Innovation Hub & Discord',
    description: '36-hour hackathon kick-off with theme announcements and mentor assignments.',
    isSample: true,
    createdAt: new Date().toISOString(),
  },
];

