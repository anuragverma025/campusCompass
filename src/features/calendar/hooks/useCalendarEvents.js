import { useState, useCallback, useEffect } from 'react';
import { storage as globalStorage } from '../../../utils/storage';
import { CALENDAR_STORAGE_KEY, SAMPLE_CALENDAR_EVENTS } from '../utils/constants';

/**
 * Validates and sanitizes raw events array from localStorage.
 * Ensures the app won't crash if malformed or partial data exists.
 * @param {*} raw
 * @returns {Array}
 */
function sanitizeEvents(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (e) =>
      e &&
      typeof e === 'object' &&
      typeof e.id === 'string' &&
      typeof e.title === 'string' &&
      typeof e.date === 'string' &&
      typeof e.category === 'string',
  );
}

/**
 * Custom hook to manage student calendar events lifecycle with localStorage persistence.
 * Accepts an optional `store` adapter (studentStorage) so each demo student's
 * events are saved under a namespaced key. Falls back to global storage.
 *
 * @param {{ store?: object }} [options]
 */
export function useCalendarEvents({ store } = {}) {
  const adapter = store ?? globalStorage;

  const [events, setEvents] = useState(() => {
    const raw = adapter.get(CALENDAR_STORAGE_KEY, null);
    if (raw === null) {
      // First visit: seed sample events
      adapter.set(CALENDAR_STORAGE_KEY, SAMPLE_CALENDAR_EVENTS);
      return SAMPLE_CALENDAR_EVENTS;
    }
    return sanitizeEvents(raw);
  });

  // Keep storage synchronized
  useEffect(() => {
    adapter.set(CALENDAR_STORAGE_KEY, events);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  /** Add an event */
  const addEvent = useCallback((eventData) => {
    const newEvent = {
      id: `cal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: eventData.title.trim(),
      date: eventData.date,
      time: eventData.time?.trim() || 'All Day',
      endTime: eventData.endTime?.trim() || '',
      category: eventData.category || 'academic',
      location: eventData.location?.trim() || '',
      description: eventData.description?.trim() || '',
      isSample: false,
      createdAt: new Date().toISOString(),
    };

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  }, []);

  /** Update an existing event */
  const updateEvent = useCallback((id, updatedData) => {
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === id
          ? {
              ...evt,
              title: updatedData.title.trim(),
              date: updatedData.date,
              time: updatedData.time?.trim() || 'All Day',
              endTime: updatedData.endTime?.trim() || '',
              category: updatedData.category || 'academic',
              location: updatedData.location?.trim() || '',
              description: updatedData.description?.trim() || '',
            }
          : evt,
      ),
    );
  }, []);

  /** Delete an event */
  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}

export default useCalendarEvents;
