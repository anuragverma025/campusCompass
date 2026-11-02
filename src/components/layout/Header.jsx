import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export const Header = ({ title, onMenuClick, isSidebarOpen }) => {
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-5 text-[#0F172A]">Student</p>
            <p className="text-xs leading-4 text-[#64748B]">Campus Compass</p>
          </div>
          <div
            role="img"
            aria-label="Student profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-semibold text-[#4338CA]"
          >
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
