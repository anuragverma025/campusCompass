import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <p className="font-medium text-slate-700">
            Campus Compass &mdash; Built with React + Vite
          </p>
          <p className="text-slate-400 mt-0.5">
            Phase 1: Project Foundation &amp; Team Collaboration Guide
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span>Clean Architecture</span>
          <span>&bull;</span>
          <span>Zero Backend Dependency</span>
          <span>&bull;</span>
          <span>Modular Student System</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

