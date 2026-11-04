import React, { useMemo } from 'react';
import { useTasks } from '../features/tasks/useTasks';
import { useCalendarEvents } from '../features/calendar/hooks/useCalendarEvents';
import { useOpportunitiesData } from '../features/opportunities/hooks/useOpportunitiesData';
import { usePlacementData } from '../features/placement/hooks/usePlacementData';

import WelcomeBanner from '../features/dashboard/components/WelcomeBanner';
import QuickActions from '../features/dashboard/components/QuickActions';
import SummaryCards from '../features/dashboard/components/SummaryCards';
import UpcomingTasksCard from '../features/dashboard/components/UpcomingTasksCard';
import UpcomingEventsCard from '../features/dashboard/components/UpcomingEventsCard';
import SavedOpportunitiesCard from '../features/dashboard/components/SavedOpportunitiesCard';
import PlacementSnapshotCard from '../features/dashboard/components/PlacementSnapshotCard';
import { useAuth } from '../features/auth/AuthContext';
import { studentStorage } from '../utils/studentStorage';

/**
 * DashboardPage — Central command center summarizing all Campus Compass modules.
 * Reads live data from existing feature hooks and local storage without duplicating state.
 */
export const DashboardPage = () => {
  const { student } = useAuth();
  const store = studentStorage(student?.id);
  const { tasks = [], toggleTask } = useTasks({ store });
  const { events = [] } = useCalendarEvents({ store });
  const { opportunities = [] } = useOpportunitiesData({ store });
  const { applications = [] } = usePlacementData({ store });

  const todayStr = new Date().toISOString().slice(0, 10);

  // Compute Task Stats
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((t) => !t.completed && t.dueDate < todayStr).length;
    return { total, pending, completed, overdue };
  }, [tasks, todayStr]);

  // Compute Calendar Stats
  const calendarStats = useMemo(() => {
    const total = events.length;
    const todayCount = events.filter((e) => e.date === todayStr).length;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const inSevenDays = new Date();
    inSevenDays.setDate(now.getDate() + 7);
    const inSevenDaysISO = inSevenDays.toISOString().slice(0, 10);

    const upcomingWeekCount = events.filter(
      (e) => e.date >= todayStr && e.date <= inSevenDaysISO,
    ).length;

    return { total, todayCount, upcomingWeekCount };
  }, [events, todayStr]);

  // Compute Opportunities Stats
  const opportunityStats = useMemo(() => {
    const total = opportunities.length;
    const savedCount = opportunities.filter((o) => o.isBookmarked).length;
    return { total, savedCount };
  }, [opportunities]);

  // Compute Placement Stats
  const placementStats = useMemo(() => {
    const total = applications.length;
    const interviews = applications.filter((a) => a.status === 'Interview').length;
    const offers = applications.filter((a) => a.status === 'Offer').length;
    const activeCount = applications.filter(
      (a) => a.status !== 'Rejected' && a.status !== 'Offer',
    ).length;

    return { total, activeCount, interviews, offers };
  }, [applications]);

  // Check whether sample demonstration data is currently active
  const isSampleDataPresent =
    tasks.some((t) => t.isSample) ||
    events.some((e) => e.isSample) ||
    opportunities.some((o) => o.isSample) ||
    applications.some((a) => a.isSample);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. Welcome & Personalization Section */}
      <WelcomeBanner />

      {/* 2. Quick Actions Shortcuts */}
      <QuickActions />

      {/* 3. Demo / Sample Data Notice Banner */}
      {isSampleDataPresent && (
        <div
          role="note"
          className="flex items-center justify-between gap-3 bg-[#E0F2FE] border border-[#BAE6FD] rounded-xl px-4 py-2.5 text-xs text-[#0369A1]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0369A1]" />
            <span>
              <strong>Sample Preview Active:</strong> Demonstrating realistic student commitments and career deadlines. Your updates in any module will update this dashboard in real-time.
            </span>
          </div>
        </div>
      )}

      {/* 4. High-Level Summary Metric Cards */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Activity Summary Metrics
        </h2>
        <SummaryCards
          taskStats={taskStats}
          calendarStats={calendarStats}
          opportunityStats={opportunityStats}
          placementStats={placementStats}
        />
      </section>

      {/* 5. Deep-Dive Upcoming Sections (2 Columns on large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Tasks & Saved Opportunities */}
        <div className="space-y-6">
          <UpcomingTasksCard tasks={tasks} onToggleTask={toggleTask} />
          <SavedOpportunitiesCard opportunities={opportunities} />
        </div>

        {/* Right Column: Calendar Timetable & Placement Pipeline */}
        <div className="space-y-6">
          <UpcomingEventsCard events={events} />
          <PlacementSnapshotCard applications={applications} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

