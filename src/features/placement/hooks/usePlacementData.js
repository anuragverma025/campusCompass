import { useState, useEffect, useCallback } from 'react';
import storage from '../../../utils/storage';
import {
  PLACEMENT_STORAGE_KEY,
  SAMPLE_APPLICATIONS,
} from '../utils/constants';

/**
 * Validates and sanitizes loaded application records from localStorage.
 * Ensures malformed or unexpected data does not crash the application.
 *
 * @param {*} data - Raw data from localStorage
 * @returns {Array|null} Sanitized array or null if invalid
 */
const sanitizeApplications = (data) => {
  if (!Array.isArray(data)) return null;

  // Filter out non-objects and ensure required minimal fields exist
  const valid = data.filter(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof item.company === 'string' &&
      typeof item.role === 'string'
  );

  return valid;
};

/**
 * usePlacementData — Custom hook managing placement applications state and localStorage persistence.
 */
export const usePlacementData = () => {
  const [applications, setApplications] = useState(() => {
    try {
      const stored = storage.get(PLACEMENT_STORAGE_KEY, null);

      if (stored === null) {
        // First visit: Seed with sample applications
        storage.set(PLACEMENT_STORAGE_KEY, SAMPLE_APPLICATIONS);
        return SAMPLE_APPLICATIONS;
      }

      const sanitized = sanitizeApplications(stored);
      if (sanitized !== null) {
        return sanitized;
      }

      // If data was corrupted, safely re-seed
      console.warn('[Campus Compass] Malformed placement data encountered in storage; falling back to sample data.');
      storage.set(PLACEMENT_STORAGE_KEY, SAMPLE_APPLICATIONS);
      return SAMPLE_APPLICATIONS;
    } catch (err) {
      console.error('[Campus Compass] Failed to initialize placement applications:', err);
      return SAMPLE_APPLICATIONS;
    }
  });

  // Sync state to localStorage whenever applications change
  useEffect(() => {
    try {
      storage.set(PLACEMENT_STORAGE_KEY, applications);
    } catch (err) {
      console.error('[Campus Compass] Failed to sync placement applications to storage:', err);
    }
  }, [applications]);

  // Add application
  const addApplication = useCallback((formData) => {
    const now = new Date().toISOString();
    const today = now.split('T')[0];

    const newApp = {
      ...formData,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      applicationDate: formData.applicationDate || today,
      createdAt: now,
      updatedAt: now,
      isSample: false,
    };

    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  }, []);

  // Update existing application
  const updateApplication = useCallback((id, updatedData) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              ...updatedData,
              updatedAt: new Date().toISOString(),
              isSample: false,
            }
          : app
      )
    );
  }, []);

  // Update application status directly
  const updateStatus = useCallback((id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : app
      )
    );
  }, []);

  // Delete application
  const deleteApplication = useCallback((id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  // Reset / load sample applications
  const loadSampleData = useCallback(() => {
    storage.set(PLACEMENT_STORAGE_KEY, SAMPLE_APPLICATIONS);
    setApplications(SAMPLE_APPLICATIONS);
  }, []);

  // Clear all applications
  const clearAllApplications = useCallback(() => {
    storage.set(PLACEMENT_STORAGE_KEY, []);
    setApplications([]);
  }, []);

  // Check if current list contains sample data
  const hasSampleData = applications.some((app) => app.isSample);

  return {
    applications,
    addApplication,
    updateApplication,
    updateStatus,
    deleteApplication,
    loadSampleData,
    clearAllApplications,
    hasSampleData,
  };
};

export default usePlacementData;
