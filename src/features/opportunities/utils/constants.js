/**
 * Constants & Sample Data for Opportunities Feature
 */

export const OPPORTUNITIES_STORAGE_KEY = 'campusCompass_opportunities';

export const OPPORTUNITY_CATEGORIES = [
  { value: 'internship', label: 'Internship' },
  { value: 'placement', label: 'Full-Time Placement' },
  { value: 'scholarship', label: 'Scholarship & Fellowship' },
  { value: 'hackathon', label: 'Hackathon & Contest' },
];

export const CATEGORY_BADGE_VARIANT = {
  internship: 'primary',
  placement: 'warning',
  scholarship: 'success',
  hackathon: 'info',
};

export const CATEGORY_LABELS = {
  internship: 'Internship',
  placement: 'Full-Time Placement',
  scholarship: 'Scholarship',
  hackathon: 'Hackathon',
};

// Generate relative sample dates (e.g. +7, +14, +21, +30 days)
const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export const SAMPLE_OPPORTUNITIES = [
  {
    id: 'opp-sample-1',
    title: '(Sample) Software Engineering Intern — Summer 2027',
    organization: 'Google India',
    category: 'internship',
    deadline: getRelativeDate(14),
    location: 'Bengaluru / Hyderabad',
    stipend: '₹1,00,000 / month',
    eligibility: 'Pre-final year B.Tech/Dual-degree students in CS/IT/circuital branches.',
    description: 'Work with engineering teams on core products, distributed infrastructure, and machine learning tools.',
    link: 'https://careers.google.com/students',
    isBookmarked: true,
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'opp-sample-2',
    title: '(Sample) Graduate SDE 1 Campus Drive 2027',
    organization: 'Amazon India',
    category: 'placement',
    deadline: getRelativeDate(25),
    location: 'Bengaluru / Pune',
    stipend: '28-32 LPA CTC',
    eligibility: 'Graduating batch students with minimum 7.0 CGPA and no active backlogs.',
    description: 'Full-time opportunity for passionate builders to design fault-tolerant microservices and AWS systems.',
    link: 'https://amazon.jobs/en/teams/student-programs',
    isBookmarked: false,
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'opp-sample-3',
    title: '(Sample) Generation Google Women in Tech Scholarship',
    organization: 'Google Diversity & Inclusion',
    category: 'scholarship',
    deadline: getRelativeDate(30),
    location: 'India / Virtual',
    stipend: '$2,500 Academic Grant',
    eligibility: 'Women undergraduate students enrolled in Computer Science or related STEM disciplines.',
    description: 'Awarded based on academic merit, demonstrated passion for computer science, and leadership impact.',
    link: 'https://buildyourfuture.withgoogle.com/scholarships',
    isBookmarked: true,
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'opp-sample-4',
    title: '(Sample) Smart India Hackathon (SIH 2027)',
    organization: 'Ministry of Education & AICTE',
    category: 'hackathon',
    deadline: getRelativeDate(18),
    location: 'Nationwide Nodal Centers',
    stipend: '₹1,00,000 Grand Prize',
    eligibility: 'Teams of 6 undergraduate/postgraduate college students with at least 1 female teammate.',
    description: 'National digital product challenge addressing real-world problem statements from government ministries and industry leaders.',
    link: 'https://www.sih.gov.in',
    isBookmarked: false,
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'opp-sample-5',
    title: '(Sample) Research Intern: Generative AI & Systems',
    organization: 'Microsoft Research India',
    category: 'internship',
    deadline: getRelativeDate(35),
    location: 'Bengaluru, India',
    stipend: '₹85,000 / month',
    eligibility: 'B.Tech/M.Tech students with strong fundamentals in algorithms, ML, and systems programming.',
    description: 'Collaborate with world-class researchers on frontier problems in multimodal reasoning and efficient LLM serving.',
    link: 'https://www.microsoft.com/en-us/research/careers',
    isBookmarked: false,
    isSample: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'opp-sample-6',
    title: '(Sample) Tata Trust Merit Scholarship for Engineering',
    organization: 'Tata Trusts Education Foundation',
    category: 'scholarship',
    deadline: getRelativeDate(45),
    location: 'India',
    stipend: 'Full Tuition Fee Support',
    eligibility: 'Engineering students in 2nd/3rd/4th year with CGPA >= 8.0 and family income < ₹6 LPA.',
    description: 'Empowers deserving engineering students with complete academic fee waivers and mentorship opportunities.',
    link: 'https://www.tatatrusts.org',
    isBookmarked: false,
    isSample: true,
    createdAt: new Date().toISOString(),
  },
];

