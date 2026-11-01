import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Main application routing configuration.
 * Configured with React Router for Phase 1 and prepared for future feature routes.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      {/* Future routes will be plugged here by feature owners:
          <Route path="/planner/*" element={<PlannerPage />} />
          <Route path="/calendar/*" element={<CalendarPage />} />
          <Route path="/opportunities/*" element={<OpportunitiesPage />} />
          <Route path="/placement/*" element={<PlacementPage />} />
      */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

