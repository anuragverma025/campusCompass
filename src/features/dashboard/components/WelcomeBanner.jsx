import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../auth/AuthContext';

/**
 * WelcomeBanner — Friendly personal greeting header for the student dashboard.
 * Consistently displays the currently authenticated student profile, course, and session.
 */
export const WelcomeBanner = () => {
  const { student } = useAuth();
  const displayName = student?.name || 'Student';

  // Get current day of week and formatted date
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-r from-[#4338CA] via-[#3730A3] to-[#1E1B4B] rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
      {/* Decorative background blur */}
      <div
        className="absolute -right-8 -bottom-10 w-48 h-48 bg-white/5 rounded-full pointer-events-none blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="default"
              size="sm"
              className="bg-white/10 text-white border-white/20 backdrop-blur-xs font-medium"
            >
              📅 {dateFormatted}
            </Badge>
            <span className="text-xs text-indigo-200 hidden sm:inline">
              {student?.course || 'Student Command Center'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {displayName}! 👋
          </h1>

          <p className="text-sm text-indigo-100/90 mt-1.5 max-w-xl leading-relaxed">
            Here is your daily snapshot of assignments, upcoming schedules, saved opportunities, and placement applications.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2 md:pt-0">
          <div className="bg-white/10 border border-white/15 backdrop-blur-xs rounded-xl px-4 py-2.5 text-right hidden sm:block">
            <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold block">
              Logged in as
            </span>
            <span className="text-xs font-bold text-white flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {student?.email || 'Demo Session'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
