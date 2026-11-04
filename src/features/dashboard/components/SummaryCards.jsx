import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SummaryCards — Clean, focused metric counters linking directly to each core feature.
 */
export const SummaryCards = ({
  taskStats = { total: 0, pending: 0, completed: 0, overdue: 0 },
  calendarStats = { total: 0, todayCount: 0, upcomingWeekCount: 0 },
  opportunityStats = { total: 0, savedCount: 0 },
  placementStats = { total: 0, activeCount: 0, interviews: 0, offers: 0 },
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* 1. Tasks Summary Card */}
      <Link
        to="/tasks"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#64748B]">Pending Tasks</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-[#4338CA] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {taskStats.pending}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
          <span>{taskStats.completed} completed</span>
          {taskStats.overdue > 0 ? (
            <span className="text-[#B91C1C] font-semibold">{taskStats.overdue} overdue</span>
          ) : (
            <span className="text-[#4338CA] font-medium group-hover:underline">View &rarr;</span>
          )}
        </div>
      </Link>

      {/* 2. Calendar Summary Card */}
      <Link
        to="/calendar"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#64748B]">Events This Week</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-[#4338CA] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {calendarStats.upcomingWeekCount}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
          <span>{calendarStats.todayCount} today</span>
          <span className="text-[#4338CA] font-medium group-hover:underline">Calendar &rarr;</span>
        </div>
      </Link>

      {/* 3. Opportunities Summary Card */}
      <Link
        to="/opportunities"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#64748B]">Saved Opportunities</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-[#4338CA] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {opportunityStats.savedCount}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
          <span>{opportunityStats.total} total</span>
          <span className="text-[#4338CA] font-medium group-hover:underline">Radar &rarr;</span>
        </div>
      </Link>

      {/* 4. Placement Tracker Summary Card */}
      <Link
        to="/placement"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#64748B]">Applications</span>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-[#4338CA] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {placementStats.total}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
          <span>{placementStats.interviews} in interview</span>
          <span className="text-[#4338CA] font-medium group-hover:underline">Tracker &rarr;</span>
        </div>
      </Link>
    </div>
  );
};

export default SummaryCards;
