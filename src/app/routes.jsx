import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PagePlaceholder from '../pages/PagePlaceholder';
import WelcomePage from '../pages/WelcomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TasksPage from '../features/tasks/TasksPage';

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
        <Route path="calendar" element={<PagePlaceholder title="Calendar" />} />
        <Route
          path="opportunities"
          element={<PagePlaceholder title="Opportunities" />}
        />
        <Route
          path="placement"
          element={<PagePlaceholder title="Placement Tracker" />}
        />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
