import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';

/**
 * SummaryCards — Overview metric counters linking directly to each core feature.
 */
export const SummaryCards = ({
  taskStats = { total: 0, pending: 0, completed: 0, overdue: 0 },
  calendarStats = { total: 0, todayCount: 0, upcomingWeekCount: 0 },
  opportunityStats = { total: 0, savedCount: 0 },
  placementStats = { total: 0, activeCount: 0, interviews: 0, offers: 0 },
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Tasks Summary Card */}
      <Link
        to="/tasks"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tasks
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {taskStats.pending}
            </span>
            <span className="text-xs text-slate-500 font-medium">pending</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {taskStats.completed} completed
          </span>
          {taskStats.overdue > 0 ? (
            <Badge variant="error" size="sm" dot>
              {taskStats.overdue} overdue
            </Badge>
          ) : (
            <span className="text-[#4338CA] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Open tasks &rarr;
            </span>
          )}
        </div>
      </Link>

      {/* 2. Calendar Summary Card */}
      <Link
        to="/calendar"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Schedule &amp; Events
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {calendarStats.upcomingWeekCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">this week</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {calendarStats.todayCount} today
          </span>
          <span className="text-[#4338CA] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
            View calendar &rarr;
          </span>
        </div>
      </Link>

      {/* 3. Opportunities Summary Card */}
      <Link
        to="/opportunities"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Opportunities
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {opportunityStats.savedCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">saved / bookmarked</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {opportunityStats.total} total listings
          </span>
          <span className="text-[#4338CA] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
            Explore &rarr;
          </span>
        </div>
      </Link>

      {/* 4. Placement Tracker Summary Card */}
      <Link
        to="/placement"
        className="group bg-white border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Placement Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {placementStats.total}
            </span>
            <span className="text-xs text-slate-500 font-medium">applications</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {placementStats.interviews} in interviews
          </span>
          {placementStats.offers > 0 ? (
            <Badge variant="success" size="sm" dot>
              {placementStats.offers} offer(s)
            </Badge>
          ) : (
            <span className="text-[#4338CA] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Pipeline &rarr;
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SummaryCards;

