import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 tracking-tight text-lg leading-tight">
                  Campus Compass
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  The Student Life Assistant
                </span>
              </div>
            </Link>
            <Badge variant="primary" className="ml-2">
              Phase 1 Foundation
            </Badge>
          </div>

          <nav aria-label="Main Navigation" className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">Frontend Architecture Ready</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

