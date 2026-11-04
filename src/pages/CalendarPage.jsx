import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useCalendarEvents } from '../features/calendar/hooks/useCalendarEvents';
import { CalendarMonthGrid } from '../features/calendar/components/CalendarMonthGrid';
import { CalendarEventCard } from '../features/calendar/components/CalendarEventCard';
import { CalendarEventFormModal } from '../features/calendar/components/CalendarEventFormModal';
import { DeleteConfirmModal } from '../features/calendar/components/DeleteConfirmModal';
import { EVENT_CATEGORIES } from '../features/calendar/utils/constants';
import { useAuth } from '../features/auth/AuthContext';
import { studentStorage } from '../utils/studentStorage';

const CATEGORY_FILTER_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  ...EVENT_CATEGORIES,
];

const TIMEFRAME_OPTIONS = [
  { value: 'all', label: 'All Dates' },
  { value: 'today', label: 'Today Only' },
  { value: 'week', label: 'Next 7 Days' },
  { value: 'month', label: 'This Month' },
];

export const CalendarPage = () => {
  // Use student-scoped storage so each demo account sees their own events
  const { student } = useAuth();
  const store = studentStorage(student?.id);
  const { events, addEvent, updateEvent, deleteEvent } = useCalendarEvents({ store });

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Stats calculation
  const stats = useMemo(() => {
    const total = events.length;
    const todayCount = events.filter((e) => e.date === todayStr).length;
    const academicCount = events.filter((e) => e.category === 'academic').length;
    const upcomingWeekCount = events.filter((e) => {
      const d = new Date(e.date);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffTime = d - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    return { total, todayCount, academicCount, upcomingWeekCount };
  }, [events, todayStr]);

  // Filtered & sorted events list
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Calendar grid single day selection filter
    if (selectedCalendarDate) {
      result = result.filter((e) => e.date === selectedCalendarDate);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Timeframe filter (if no specific single date selected)
    if (!selectedCalendarDate && selectedTimeframe !== 'all') {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const todayISO = now.toISOString().slice(0, 10);

      if (selectedTimeframe === 'today') {
        result = result.filter((e) => e.date === todayISO);
      } else if (selectedTimeframe === 'week') {
        const inSevenDays = new Date();
        inSevenDays.setDate(now.getDate() + 7);
        const inSevenDaysISO = inSevenDays.toISOString().slice(0, 10);
        result = result.filter((e) => e.date >= todayISO && e.date <= inSevenDaysISO);
      } else if (selectedTimeframe === 'month') {
        const currentYearMonth = todayISO.slice(0, 7);
        result = result.filter((e) => e.date.startsWith(currentYearMonth));
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q),
      );
    }

    // Sort chronologically (earliest first)
    result.sort((a, b) => {
      const dateCmp = a.date.localeCompare(b.date);
      if (dateCmp !== 0) return dateCmp;
      return a.time.localeCompare(b.time);
    });

    return result;
  }, [events, selectedCalendarDate, selectedCategory, selectedTimeframe, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'all' ||
    selectedTimeframe !== 'all' ||
    selectedCalendarDate !== null;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTimeframe('all');
    setSelectedCalendarDate(null);
  };

  const hasSampleEvents = events.some((e) => e.isSample);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Schedule &amp; Calendar
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Track classes, exam dates, club hackathons, and placement events.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setEditingEvent(null);
            setIsAddModalOpen(true);
          }}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Add Event
        </Button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 shadow-2xs">
          <span className="text-xs text-[#64748B] font-medium">Total Events</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#0F172A]">{stats.total}</span>
            <span className="text-[11px] text-[#94A3B8]">scheduled</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 shadow-2xs">
          <span className="text-xs text-[#64748B] font-medium">Today</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#4338CA]">{stats.todayCount}</span>
            <span className="text-[11px] text-[#94A3B8]">events</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 shadow-2xs">
          <span className="text-xs text-[#64748B] font-medium">Next 7 Days</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#0F172A]">{stats.upcomingWeekCount}</span>
            <span className="text-[11px] text-[#94A3B8]">upcoming</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 shadow-2xs">
          <span className="text-xs text-[#64748B] font-medium">Academic / Exams</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#0F172A]">{stats.academicCount}</span>
            <span className="text-[11px] text-[#94A3B8]">sessions</span>
          </div>
        </div>
      </div>

      {/* Sample Data Notice */}
      {hasSampleEvents && (
        <div
          role="note"
          className="flex items-start gap-3 bg-[#E0F2FE] border border-[#BAE6FD] rounded-xl px-4 py-3 text-xs text-[#0369A1]"
        >
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <strong>Sample Events Loaded:</strong> To demonstrate student workflows, realistic sample academic and club events have been seeded. You can edit, delete, or create your own events anytime; your changes will persist locally.
          </div>
        </div>
      )}

      {/* Main Grid: Interactive Month Calendar + Event Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Month Grid */}
        <div className="lg:col-span-5 space-y-4">
          <CalendarMonthGrid
            events={events}
            selectedDate={selectedCalendarDate}
            onSelectDate={(date) => setSelectedCalendarDate(date)}
          />

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <span className="font-semibold text-slate-800 block">Category Legend</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4338CA]" />
                <span>Academic &amp; Exams</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0369A1]" />
                <span>Club &amp; Tech</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                <span>Personal &amp; Study</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                <span>Placement Prep</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Search, Filters & Events List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filters Bar */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Search event, topic, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                wrapperClassName="flex-1"
                aria-label="Search events"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                  </svg>
                }
              />

              <Select
                aria-label="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={CATEGORY_FILTER_OPTIONS}
                wrapperClassName="sm:w-44"
              />

              <Select
                aria-label="Filter by timeframe"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                options={TIMEFRAME_OPTIONS}
                disabled={Boolean(selectedCalendarDate)}
                wrapperClassName="sm:w-36"
              />
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                <span>
                  Showing <strong className="text-[#0F172A]">{filteredEvents.length}</strong> of{' '}
                  <strong className="text-[#0F172A]">{events.length}</strong> events
                  {selectedCalendarDate && (
                    <span className="ml-1 text-[#4338CA] font-medium">
                      (Filtered on {selectedCalendarDate})
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs text-[#4338CA] font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Events Agenda List */}
          {filteredEvents.length === 0 ? (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4338CA] mx-auto flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">No events found</h3>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
                {hasActiveFilters
                  ? 'No events match your current search or date filters. Try clearing filters or picking another date.'
                  : 'You have no scheduled events right now. Click "Add Event" to plan lectures, exams, or workshops.'}
              </p>
              {hasActiveFilters ? (
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  Reset Filters
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setEditingEvent(null);
                    setIsAddModalOpen(true);
                  }}
                >
                  Schedule Your First Event
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((evt) => (
                <CalendarEventCard
                  key={evt.id}
                  event={evt}
                  onEdit={(eventToEdit) => {
                    setEditingEvent(eventToEdit);
                    setIsAddModalOpen(true);
                  }}
                  onDelete={(eventToDelete) => {
                    setDeletingEvent(eventToDelete);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Event Modal */}
      <CalendarEventFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={(formData) => {
          if (editingEvent) {
            updateEvent(editingEvent.id, formData);
          } else {
            addEvent(formData);
          }
        }}
        initialData={editingEvent}
        mode={editingEvent ? 'edit' : 'add'}
        defaultDate={selectedCalendarDate || todayStr}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingEvent)}
        onClose={() => setDeletingEvent(null)}
        onConfirm={() => {
          if (deletingEvent) {
            deleteEvent(deletingEvent.id);
            setDeletingEvent(null);
          }
        }}
        event={deletingEvent}
      />
    </div>
  );
};

export default CalendarPage;
