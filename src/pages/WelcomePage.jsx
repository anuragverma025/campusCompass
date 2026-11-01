import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Showcase from '../components/ui/Showcase';

export const WelcomePage = () => {
  const plannedModules = [
    {
      id: 'academic',
      title: 'Academic & Deadline Tracker',
      description:
        'Track semester assignments, lab submissions, and exam countdowns with priority tagging and status filters.',
      badgeText: 'Planned',
      badgeVariant: 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      title: 'Daily Schedule & Smart Calendar',
      description:
        'Organize weekly class timetables, daily routines, recurring slots, and campus events in an intuitive view.',
      badgeText: 'Planned',
      badgeVariant: 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'opportunities',
      title: 'Opportunity Radar',
      description:
        'Curate internships, competitive hackathons, scholarships, and technical workshops with application deadlines.',
      badgeText: 'Planned',
      badgeVariant: 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'placement',
      title: 'DSA & Placement Prep Hub',
      description:
        'Log solved LeetCode and Striver sheet problems, categorize patterns, and bookmark company-specific interview queries.',
      badgeText: 'Planned',
      badgeVariant: 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: 'analytics',
      title: 'Goals & Progress Analytics',
      description:
        'Visualize weekly study consistency, goal achievement ratios, and habit streaks through clean charts.',
      badgeText: 'Planned',
      badgeVariant: 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'offline',
      title: 'Local-First Storage',
      description:
        'Zero backend requirement — uses browser localStorage for private, instantaneous, and offline-capable data persistence.',
      badgeText: 'Configured',
      badgeVariant: 'success',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
  ];

  const teamRoster = [
    {
      member: 'Member 1',
      role: 'Foundation & Core Routing',
      scope: 'Project scaffolding, Vite config, React Router integration, production build pipeline, and release testing.',
    },
    {
      member: 'Member 2',
      role: 'Design Tokens & UI System',
      scope: 'Color palette, typography scale, Tailwind setup, atomic UI components (Button, Input, Modal, Badge).',
    },
    {
      member: 'Member 3',
      role: 'Application Shell & Navigation',
      scope: 'Collapsible sidebar, responsive top navbar, mobile navigation drawer, and layout wrapper integration.',
    },
    {
      member: 'Member 4',
      role: 'Documentation & QA Assurance',
      scope: 'README guide, setup documentation, manual test checklists, and team Git workflow facilitation.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <Badge variant="primary" className="mb-4">
          🎓 Welcome to Campus Compass
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          The Student Life <span className="text-blue-600">Assistant</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          A frontend-first productivity workspace crafted for college students. Manage academic deadlines,
          daily timetables, internships, and placement prep in one cohesive, modern web application.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              const el = document.getElementById('modules-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Planned Modules
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              const el = document.getElementById('design-system-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            UI Design System Showcase
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              const el = document.getElementById('team-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Team Contribution Guide
          </Button>
        </div>
      </section>

      {/* Reusable UI Design System Showcase (Member 2) */}
      <section id="design-system-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Showcase />
      </section>

      {/* Planned Modules Grid */}
      <section id="modules-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Project Modules &amp; Scope</h2>
          <p className="text-sm text-slate-500 mt-1">
            Planned feature suites to be implemented iteratively across Phase 2 and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plannedModules.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              badge={
                <Badge variant={item.badgeVariant}>
                  {item.badgeText}
                </Badge>
              }
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Architecture ready</span>
                <span className="font-semibold text-slate-400">#Phase2</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Ownership & Collaboration Overview */}
      <section id="team-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl text-white p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
              Team Collaboration Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              Phase 1 Foundation &amp; 4-Member Ownership Matrix
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              To avoid merge conflicts and guarantee clean Git history for evaluation, each student owns
              distinct directories and architectural layers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamRoster.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                      {item.member}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      Active
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{item.role}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.scope}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/50 text-[11px] text-slate-400">
                  See docs/TEAM_WORK.md
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;

