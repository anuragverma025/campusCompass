import React from 'react';
import { Link } from 'react-router-dom';

/**
 * QuickActions — Compact, direct shortcuts to primary student workflows.
 */
export const QuickActions = () => {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-semibold text-[#64748B] mr-1 hidden sm:inline">
        Quick actions:
      </span>
      <Link
        to="/tasks"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#4338CA] hover:text-[#4338CA] text-xs font-medium text-[#0F172A] shadow-2xs transition-colors"
      >
        <svg className="w-3.5 h-3.5 text-[#4338CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Task</span>
      </Link>
      <Link
        to="/calendar"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#4338CA] hover:text-[#4338CA] text-xs font-medium text-[#0F172A] shadow-2xs transition-colors"
      >
        <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>Schedule Event</span>
      </Link>
      <Link
        to="/opportunities"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#4338CA] hover:text-[#4338CA] text-xs font-medium text-[#0F172A] shadow-2xs transition-colors"
      >
        <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <span>Browse Opportunities</span>
      </Link>
      <Link
        to="/placement"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:border-[#4338CA] hover:text-[#4338CA] text-xs font-medium text-[#0F172A] shadow-2xs transition-colors"
      >
        <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span>Placement Pipeline</span>
      </Link>
    </div>
  );
};

export default QuickActions;
