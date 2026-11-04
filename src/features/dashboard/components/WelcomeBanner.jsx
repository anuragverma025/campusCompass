import React from 'react';
import { useAuth } from '../../auth/AuthContext';

/**
 * WelcomeBanner — Clean, personal greeting header for the student dashboard.
 * Focused, readable, and free of decorative visual noise.
 */
export const WelcomeBanner = () => {
  const { student } = useAuth();
  const displayName = student?.name || 'Student';

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="border-b border-[#E2E8F0] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-[#64748B] mb-1">
          {dateFormatted} &bull; {student?.course || 'Campus Compass'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
          Welcome back, {displayName}
        </h1>
        <p className="text-sm text-[#64748B] mt-1 max-w-xl">
          Here is your summary of upcoming assignments, scheduled events, opportunities, and placement applications.
        </p>
      </div>

      <div className="text-xs text-[#64748B] shrink-0 sm:text-right">
        <span className="block text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">Active Profile</span>
        <span className="font-medium text-[#0F172A]">{student?.email || 'Demo Session'}</span>
      </div>
    </div>
  );
};

export default WelcomeBanner;
