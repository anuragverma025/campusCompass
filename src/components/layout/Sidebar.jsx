import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </>
    ),
  },
  {
    label: 'Tasks',
    to: '/tasks',
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    label: 'Calendar',
    to: '/calendar',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
  },
  {
    label: 'Opportunities',
    to: '/opportunities',
    icon: (
      <>
        <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M3 12h2m14 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        <circle cx="12" cy="12" r="5" />
      </>
    ),
  },
  {
    label: 'Placement Tracker',
    to: '/placement',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2" />
      </>
    ),
  },
];

export const Sidebar = ({ isOpen, onNavigate }) => {
  const { student, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    navigate('/login', { replace: true });
  };

  return (
    <aside
      id="app-sidebar"
      aria-label="Sidebar"
      className={`fixed inset-y-0 left-0 z-40 flex flex-col w-72 border-r border-[#E2E8F0] bg-white px-4 py-6 shadow-xl transition-transform duration-200 md:visible md:static md:z-auto md:w-64 md:shrink-0 md:translate-x-0 md:shadow-none ${
        isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
      }`}
    >
      <div className="mb-8 flex items-center justify-between px-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Workspace
          </p>
          <p className="mt-1 text-sm font-medium text-[#0F172A]">
            Your student life
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigate}
          className="rounded-lg p-2 text-[#64748B] hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA] md:hidden"
          aria-label="Close navigation menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav aria-label="Main navigation" className="flex-1">
        <ul className="space-y-1">
          {navigationItems.map(({ label, to, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA] ${
                    isActive
                      ? 'bg-[#EEF2FF] text-[#4338CA]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon}
                </svg>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Demo Student Account Footer */}
      <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4338CA]">
              {student?.avatar || 'S'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#0F172A] truncate">
                {student?.name || 'Demo Student'}
              </p>
              <p className="text-[11px] text-[#64748B] truncate">
                {student?.email || 'Logged in'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 text-[#64748B] hover:text-[#B91C1C] hover:bg-white rounded-lg transition-colors shrink-0"
            aria-label="Sign out"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
