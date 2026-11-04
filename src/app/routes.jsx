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
import LoginPage from '../pages/LoginPage';
import RequireAuth from '../components/auth/RequireAuth';
import { AuthProvider } from '../features/auth/AuthContext';

/**
 * Main application routing configuration.
 * - Wraps all routes in AuthProvider so auth state is universally available.
 * - /login is the public demo entry point.
 * - Feature pages render inside AppLayout and are guarded by RequireAuth.
 */
export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        {/* Protected routes wrapped with RequireAuth */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="placement" element={<PlacementPage />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
