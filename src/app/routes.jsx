import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PagePlaceholder from '../pages/PagePlaceholder';
import WelcomePage from '../pages/WelcomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TasksPage from '../features/tasks/TasksPage';
import PlacementPage from '../pages/PlacementPage';
import CalendarPage from '../pages/CalendarPage';
import OpportunitiesPage from '../pages/OpportunitiesPage';

/**
 * Main application routing configuration.
 * Feature pages render inside the shared application shell.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<PagePlaceholder title="Dashboard" />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route
          path="opportunities"
          element={<OpportunitiesPage />}
        />
        <Route
          path="placement"
          element={<PlacementPage />}
        />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
