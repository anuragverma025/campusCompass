import React, { useEffect, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const pageTitles = {
  '/': 'Dashboard',
  '/tasks': 'Tasks',
  '/calendar': 'Calendar',
  '/opportunities': 'Opportunities',
  '/placement': 'Placement Tracker',
  '/welcome': 'Welcome',
};

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const outlet = useOutlet();

  // Reset scroll position to top on every page navigation.
  // Without this, React Router preserves the scroll offset from the
  // previous page, causing new pages to appear mid-scroll.
  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  const normalizedPath =
    location.pathname.length > 1
      ? location.pathname.replace(/\/+$/, '')
      : location.pathname;
  const title = pageTitles[normalizedPath] || 'Page not found';

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Header
        title={title}
        onMenuClick={() => setIsSidebarOpen(true)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="relative flex flex-1">
        {isSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 cursor-default bg-slate-950/30 md:hidden"
            aria-label="Close navigation menu"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Sidebar
          isOpen={isSidebarOpen}
          onNavigate={() => setIsSidebarOpen(false)}
        />
        <main id="main-content" className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <a
            href="#page-content"
            className="sr-only rounded-md bg-white px-3 py-2 text-sm text-[#4338CA] focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-50"
          >
            Skip to page content
          </a>
          <div id="page-content" tabIndex={-1} className="outline-none">{outlet}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
