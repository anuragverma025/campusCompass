import React, { useState } from 'react';
import {
  Button,
  Badge,
  Card,
  Input,
  Textarea,
  Select,
  Modal,
  Tabs,
  Dropdown,
} from './index';

/**
 * Campus Compass — Design System Component Showcase
 * Demonstrates all reusable UI primitives in active, interactive states.
 * Maintained by Member 2 (Design Systems Lead).
 */
export const Showcase = () => {
  // Interactive state demos
  const [activeTab, setActiveTab] = useState('buttons');
  const [underlineTab, setUnderlineTab] = useState('tab-1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  // Form states
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [textareaValue, setTextareaValue] = useState('Preparing for upcoming data structures and algorithms mock interview.');
  const [selectedSemester, setSelectedSemester] = useState('sem-5');

  const mainTabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'badges', label: 'Badges' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Form Controls' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'modals', label: 'Modal Dialog' },
    { id: 'dropdowns', label: 'Dropdowns' },
  ];

  const semesterOptions = [
    { value: 'sem-1', label: 'Semester 1 — Foundation' },
    { value: 'sem-2', label: 'Semester 2 — Core Computing' },
    { value: 'sem-3', label: 'Semester 3 — Data Structures' },
    { value: 'sem-4', label: 'Semester 4 — Operating Systems' },
    { value: 'sem-5', label: 'Semester 5 — System Design' },
    { value: 'sem-6', label: 'Semester 6 — Placement Drive' },
  ];

  const dropdownItems = [
    {
      label: 'View Syllabus PDF',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: () => alert('Viewing syllabus...'),
    },
    {
      label: 'Copy Share Link',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => alert('Link copied to clipboard!'),
    },
    { divider: true },
    {
      label: 'Archive Record',
      danger: true,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: () => alert('Record archived.'),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
      {/* Showcase Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot>
              Member 2 Showcase
            </Badge>
            <span className="text-xs text-[#64748B]">Design Tokens &amp; Reusable UI</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-2">
            Campus Compass UI Design System
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Polished, accessible, student SaaS components built with Tailwind CSS design tokens.
          </p>
        </div>

        {/* Global Modal Trigger */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Open Modal Demo
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="my-6">
        <Tabs
          tabs={mainTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Tab Panels */}
      <div className="space-y-6 pt-2">
        {/* BUTTONS PANEL */}
        {activeTab === 'buttons' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-3">
                Style Variants
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary (#4338CA)</Button>
                <Button variant="secondary">Secondary (#0F766E)</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger (#B91C1C)</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-3">
                Sizes &amp; States
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small Size</Button>
                <Button size="md">Medium Size</Button>
                <Button size="lg">Large Size</Button>
                <Button disabled>Disabled Button</Button>
                <Button
                  isLoading={isLoadingDemo}
                  onClick={() => {
                    setIsLoadingDemo(true);
                    setTimeout(() => setIsLoadingDemo(false), 2000);
                  }}
                  variant="primary"
                >
                  {isLoadingDemo ? 'Saving...' : 'Click for Loading State'}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-3">
                With Icons
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  variant="primary"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  }
                >
                  Add Assignment
                </Button>
                <Button
                  variant="outline"
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  }
                >
                  Next Step
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* BADGES PANEL */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-3">
                Semantic Status Variants
              </h3>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary / Academic</Badge>
                <Badge variant="success">Success / Verified</Badge>
                <Badge variant="warning">Warning / Approaching</Badge>
                <Badge variant="error">Error / Overdue</Badge>
                <Badge variant="info">Info / Scheduled</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-3">
                Pills with Indicator Dots
              </h3>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="default" dot>Offline Draft</Badge>
                <Badge variant="primary" dot>Registered</Badge>
                <Badge variant="success" dot>Assignment Completed</Badge>
                <Badge variant="warning" dot>Due in 24 Hours</Badge>
                <Badge variant="error" dot>Late Submission</Badge>
                <Badge variant="info" dot>Lecture in Session</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-3">
                Sizes
              </h3>
              <div className="flex items-center gap-3">
                <Badge size="sm" variant="primary">Small Badge (11px)</Badge>
                <Badge size="md" variant="primary">Medium Badge (12px)</Badge>
              </div>
            </div>
          </div>
        )}

        {/* CARDS PANEL */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Standard Card"
              description="Basic card with header, subtle border (#E2E8F0), and 12px border radius."
              badge={<Badge variant="default">Default</Badge>}
              footer="Last edited 2 hours ago"
            >
              <p className="text-xs text-[#64748B]">
                Provides clean encapsulation for student assignments and notices.
              </p>
            </Card>

            <Card
              title="Hoverable Card"
              hoverable
              description="Elevates on hover with subtle SaaS shadow and smooth border transition."
              badge={<Badge variant="success" dot>Interactive</Badge>}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              footer="Click to inspect details"
            >
              <div className="text-xs text-[#0F766E] font-medium">
                Try hovering over this card!
              </div>
            </Card>

            <Card
              title="Academic Milestone"
              badge={<Badge variant="warning">Semester 5</Badge>}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              footer={
                <div className="flex items-center justify-between">
                  <span>Progress: 8/10 credits</span>
                  <span className="font-semibold text-[#15803D]">80%</span>
                </div>
              }
            >
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1 mb-2">
                <div className="bg-[#4338CA] h-full rounded-full w-4/5" />
              </div>
            </Card>
          </div>
        )}

        {/* FORM CONTROLS PANEL */}
        {activeTab === 'forms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Student Name"
                placeholder="e.g. Alex Sharma"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Enter your official college enrollment name"
                required
              />

              <Input
                label="Search Modules / Topics"
                placeholder="Search algorithms, notes, companies..."
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />

              <Input
                label="Course Portal Email (With Error State)"
                defaultValue="invalid-email@"
                error={inputError || 'Please enter a valid academic email address (@college.edu)'}
                onChange={() => setInputError('')}
                required
              />

              <Input
                label="University Roll ID (Disabled)"
                value="21CS1092 (Locked by Admin)"
                disabled
                helperText="Field is locked during semester examination window"
              />
            </div>

            <div className="space-y-4">
              <Select
                label="Academic Semester"
                options={semesterOptions}
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                helperText="Select your active curriculum track"
                required
              />

              <Textarea
                label="Study Notes / Task Description"
                rows={4}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                maxLength={250}
                helperText="Write markdown notes or lecture summaries"
              />

              <Select
                label="Exam Schedule Window (Disabled)"
                disabled
                options={[{ value: 'none', label: 'No schedule active' }]}
                helperText="Timetable has not yet been published by department"
              />
            </div>
          </div>
        )}

        {/* TABS PANEL */}
        {activeTab === 'tabs' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                Pill Variant (Segmented Control)
              </h3>
              <p className="text-xs text-[#64748B] mb-3">
                Ideal for filters, sub-navigation, and view toggles.
              </p>
              <Tabs
                tabs={[
                  { id: 'all', label: 'All Tasks', badge: <Badge size="sm">14</Badge> },
                  { id: 'pending', label: 'Pending', badge: <Badge size="sm" variant="warning">4</Badge> },
                  { id: 'completed', label: 'Completed', badge: <Badge size="sm" variant="success">10</Badge> },
                  { id: 'archived', label: 'Archived', disabled: true },
                ]}
                activeTab="pending"
                onChange={() => {}}
                variant="pills"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                Underline Variant
              </h3>
              <p className="text-xs text-[#64748B] mb-3">
                Ideal for page-level navigation and section routing.
              </p>
              <Tabs
                tabs={[
                  { id: 'tab-1', label: 'Overview & Syllabus' },
                  { id: 'tab-2', label: 'Assignments & Labs' },
                  { id: 'tab-3', label: 'Question Bank' },
                  { id: 'tab-4', label: 'Discussion Forum' },
                ]}
                activeTab={underlineTab}
                onChange={setUnderlineTab}
                variant="underline"
              />
              <div className="p-4 bg-slate-50 rounded-xl mt-3 text-xs text-[#64748B]">
                Active Tab Content: <strong>{underlineTab}</strong>
              </div>
            </div>
          </div>
        )}

        {/* MODALS PANEL */}
        {activeTab === 'modals' && (
          <div className="space-y-4">
            <p className="text-sm text-[#64748B]">
              The Modal dialog provides accessible backdrop blur, keyboard dismissal via Escape key,
              and focus trap. Test it by clicking below:
            </p>
            <div className="flex gap-3">
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Launch Modal Demo
              </Button>
            </div>
          </div>
        )}

        {/* DROPDOWNS PANEL */}
        {activeTab === 'dropdowns' && (
          <div className="space-y-4">
            <p className="text-sm text-[#64748B]">
              Lightweight action dropdown menu with outside-click detection and dividers:
            </p>
            <div className="flex items-center gap-4">
              <Dropdown
                trigger={
                  <Button
                    variant="outline"
                    rightIcon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    }
                  >
                    Manage Course Options
                  </Button>
                }
                items={dropdownItems}
              />

              <Dropdown
                align="right"
                trigger={
                  <Button variant="ghost" size="sm">
                    More Actions ▾
                  </Button>
                }
                items={dropdownItems}
              />
            </div>
          </div>
        )}
      </div>

      {/* Interactive Modal Instance */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Academic Deadline"
        description="Add a lab submission or assignment reminder to your semester tracker."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Deadline successfully created!');
                setIsModalOpen(false);
              }}
            >
              Save Deadline
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Assignment Title"
            placeholder="e.g. Operating Systems Lab 4 — CPU Scheduling"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Subject / Course"
              options={[
                { value: 'os', label: 'CS301 — Operating Systems' },
                { value: 'dbms', label: 'CS302 — Database Systems' },
                { value: 'cn', label: 'CS303 — Computer Networks' },
              ]}
              required
            />
            <Input
              type="date"
              label="Due Date"
              required
            />
          </div>
          <Textarea
            label="Submission Notes / Criteria"
            placeholder="Include GitHub repo link and PDF report."
            rows={3}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Showcase;
