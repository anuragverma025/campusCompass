import { useState, useCallback, useEffect } from 'react';
import { storage as globalStorage } from '../../../utils/storage';
import { OPPORTUNITIES_STORAGE_KEY, SAMPLE_OPPORTUNITIES } from '../utils/constants';

/**
 * Validates and sanitizes raw opportunities array from localStorage.
 * Ensures the app handles malformed or empty data safely.
 * @param {*} raw
 * @returns {Array}
 */
function sanitizeOpportunities(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (o) =>
      o &&
      typeof o === 'object' &&
      typeof o.id === 'string' &&
      typeof o.title === 'string' &&
      typeof o.organization === 'string' &&
      typeof o.category === 'string' &&
      typeof o.deadline === 'string',
  );
}

/**
 * Custom hook for opportunities lifecycle and bookmarks with localStorage persistence.
 * Accepts an optional `store` adapter (studentStorage) so each demo student's
 * data is saved under a namespaced key. Falls back to global storage.
 *
 * @param {{ store?: object }} [options]
 */
export function useOpportunitiesData({ store } = {}) {
  const adapter = store ?? globalStorage;

  const [opportunities, setOpportunities] = useState(() => {
    const raw = adapter.get(OPPORTUNITIES_STORAGE_KEY, null);
    if (raw === null) {
      adapter.set(OPPORTUNITIES_STORAGE_KEY, SAMPLE_OPPORTUNITIES);
      return SAMPLE_OPPORTUNITIES;
    }
    return sanitizeOpportunities(raw);
  });

  // Synchronize state with localStorage
  useEffect(() => {
    adapter.set(OPPORTUNITIES_STORAGE_KEY, opportunities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunities]);

  /** Add a new opportunity listing */
  const addOpportunity = useCallback((data) => {
    const newOpportunity = {
      id: `opp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: data.title.trim(),
      organization: data.organization.trim(),
      category: data.category || 'internship',
      deadline: data.deadline,
      location: data.location?.trim() || 'Remote / Flexible',
      stipend: data.stipend?.trim() || '',
      eligibility: data.eligibility?.trim() || 'Open to eligible college students',
      description: data.description?.trim() || '',
      link: data.link?.trim() || '',
      isBookmarked: false,
      isSample: false,
      createdAt: new Date().toISOString(),
    };

    setOpportunities((prev) => [newOpportunity, ...prev]);
    return newOpportunity;
  }, []);

  /** Update an existing opportunity listing */
  const updateOpportunity = useCallback((id, updatedData) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? {
              ...opp,
              title: updatedData.title.trim(),
              organization: updatedData.organization.trim(),
              category: updatedData.category || 'internship',
              deadline: updatedData.deadline,
              location: updatedData.location?.trim() || 'Remote / Flexible',
              stipend: updatedData.stipend?.trim() || '',
              eligibility: updatedData.eligibility?.trim() || 'Open to eligible college students',
              description: updatedData.description?.trim() || '',
              link: updatedData.link?.trim() || '',
            }
          : opp,
      ),
    );
  }, []);

  /** Delete an opportunity listing */
  const deleteOpportunity = useCallback((id) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
  }, []);

  /** Toggle saved / bookmarked status */
  const toggleBookmark = useCallback((id) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, isBookmarked: !opp.isBookmarked } : opp,
      ),
    );
  }, []);

  return {
    opportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    toggleBookmark,
  };
}

export default useOpportunitiesData;
