import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import EditProfileModal from '../profile/EditProfileModal';
import { useAuth } from '../../features/auth/AuthContext';

export const Header = ({ title, onMenuClick, isSidebarOpen }) => {
  const { student, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            className="!p-2 md:!hidden"
            aria-label="Open navigation menu"
            aria-controls="app-sidebar"
            aria-expanded={isSidebarOpen}
            onClick={onMenuClick}
            leftIcon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          />
          <Link to="/" className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4338CA] text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
              </svg>
            </span>
            <span className="hidden font-semibold tracking-tight text-[#0F172A] sm:inline">
              Campus Compass
            </span>
          </Link>
          <span aria-hidden="true" className="hidden text-slate-300 sm:inline">/</span>
          <p className="truncate text-sm font-medium text-[#475569] sm:text-base">
            {title}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <Dropdown
            align="right"
            className="w-56"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 sm:gap-3 p-1.5 -mr-1.5 rounded-xl hover:bg-slate-100/80 active:bg-slate-200/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA] text-left cursor-pointer"
                aria-label={`Profile menu for ${student?.name || 'Student'}`}
              >
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold leading-5 text-[#0F172A]">{student?.name || 'Student'}</p>
                  <p className="text-xs leading-4 text-[#64748B]">{student?.course || 'Campus Compass'}</p>
                </div>
                <div
                  role="img"
                  aria-label={`Profile of ${student?.name || 'Student'}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4338CA] border border-indigo-100 shrink-0"
                >
                  {student?.avatar || 'S'}
                </div>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-[#64748B] hidden sm:block shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            }
            items={[
              {
                label: 'Edit profile',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
                onClick: () => setIsEditModalOpen(true),
              },
              {
                divider: true,
              },
              {
                label: 'Sign out',
                danger: true,
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                ),
                onClick: handleLogout,
              },
            ]}
          />
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </header>
  );
};

export default Header;
