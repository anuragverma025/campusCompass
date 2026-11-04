import React, { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { storage } from '../../../utils/storage';

const USER_NAME_KEY = 'campus_compass_student_name';

/**
 * WelcomeBanner — Friendly personalizable greeting header for the student dashboard.
 * Does not invent a fake name; allows the student to set or edit their preferred display name.
 */
export const WelcomeBanner = () => {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const saved = storage.get(USER_NAME_KEY, '');
    if (typeof saved === 'string') {
      setName(saved);
      setTempName(saved);
    }
  }, []);

  const handleSaveName = (e) => {
    e?.preventDefault();
    const clean = tempName.trim();
    setName(clean);
    storage.set(USER_NAME_KEY, clean);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setTempName(name);
      setIsEditing(false);
    }
  };

  // Get current day of week and formatted date
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-r from-[#4338CA] via-[#3730A3] to-[#1E1B4B] rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
      {/* Decorative background circle */}
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
              Student Command Center
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {name ? `Welcome back, ${name}! 👋` : 'Welcome back! 👋'}
            </h1>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setTempName(name);
                  setIsEditing(true);
                }}
                className="text-xs text-indigo-200 hover:text-white underline decoration-dotted transition-colors ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1"
                title="Personalize your name"
                aria-label="Edit your preferred name"
              >
                {name ? '✎ edit name' : '+ set your name'}
              </button>
            ) : (
              <form onSubmit={handleSaveName} className="inline-flex items-center gap-1.5 ml-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Your first name"
                  maxLength={30}
                  autoFocus
                  className="bg-white/15 border border-white/30 text-white text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-indigo-200 w-32 sm:w-40"
                  aria-label="Enter your preferred name"
                />
                <button
                  type="submit"
                  className="bg-white text-[#4338CA] font-bold text-xs px-2.5 py-1 rounded-lg hover:bg-indigo-50 transition-colors shadow-2xs"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-indigo-200 hover:text-white px-1"
                >
                  ✕
                </button>
              </form>
            )}
          </div>

          <p className="text-sm text-indigo-100/90 mt-1.5 max-w-xl leading-relaxed">
            Here is your daily snapshot of assignments, upcoming schedules, saved opportunities, and placement applications.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2 md:pt-0">
          <div className="bg-white/10 border border-white/15 backdrop-blur-xs rounded-xl px-4 py-2.5 text-right hidden sm:block">
            <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold block">
              Platform Status
            </span>
            <span className="text-xs font-bold text-white flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

