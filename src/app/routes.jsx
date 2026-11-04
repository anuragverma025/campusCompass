import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import WelcomePage from '../pages/WelcomePage';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardPage from '../pages/DashboardPage';
import TasksPage from '../features/tasks/TasksPage';
import CalendarPage from '../pages/CalendarPage';
import OpportunitiesPage from '../pages/OpportunitiesPage';
import PlacementPage from '../pages/PlacementPage';

/**
 * Main application routing configuration.
 * Feature pages render inside the shared application shell.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
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
