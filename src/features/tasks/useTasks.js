import { useState, useCallback, useEffect } from 'react';
import { storage as globalStorage } from '../../utils/storage';

/**
 * Task Data Structure (documented for the team):
 * {
 *   id:          string   — UUID generated via crypto.randomUUID()
 *   title:       string   — Task title (required, 1–120 chars)
 *   description: string   — Optional detail text (max 500 chars)
 *   dueDate:     string   — ISO date string "YYYY-MM-DD" (required)
 *   priority:    'high'|'medium'|'low'  — Default 'medium'
 *   completed:   boolean  — false = pending, true = done
 *   createdAt:   string   — ISO timestamp when task was created
 *   isSample:    boolean  — true = seed data shown on first visit only
 * }
 */

const STORAGE_KEY = 'campus_compass_tasks';

/** Sample tasks pre-loaded on first visit to illustrate the UI.
 *  Clearly marked with isSample: true and a "(Sample)" prefix so
 *  students can distinguish them from real data. */
const SAMPLE_TASKS = [
  {
    id: 'sample-1',
    title: '(Sample) Submit Data Structures Lab Report',
    description: 'Complete the analysis section on AVL trees and upload to the college portal before midnight.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
    isSample: true,
  },
  {
    id: 'sample-2',
    title: '(Sample) Practice 5 LeetCode Easy problems',
    description: 'Focus on array and string manipulation patterns from the Striver SDE sheet.',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    priority: 'medium',
    completed: false,
    createdAt: new Date().toISOString(),
    isSample: true,
  },
  {
    id: 'sample-3',
    title: '(Sample) Read Operating Systems Chapter 7',
    description: 'Cover deadlock detection and prevention; make summary notes for mid-semester exam.',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    priority: 'low',
    completed: true,
    createdAt: new Date().toISOString(),
    isSample: true,
  },
];

/**
 * Validates and sanitises raw data loaded from localStorage.
 * Falls back to an empty array on any unexpected shape.
 * @param {*} raw
 * @returns {Array}
 */
function sanitiseTasksFromStorage(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (t) =>
      t &&
      typeof t === 'object' &&
      typeof t.id === 'string' &&
      typeof t.title === 'string' &&
      typeof t.dueDate === 'string' &&
      ['high', 'medium', 'low'].includes(t.priority) &&
      typeof t.completed === 'boolean',
  );
}

/**
 * Custom hook — useTasks
 *
 * Manages the full task CRUD lifecycle with localStorage persistence.
 * Accepts an optional `store` adapter (studentStorage) so each demo
 * student's tasks are saved to a namespaced localStorage key.
 * Falls back to the global storage adapter for backward compatibility.
 *
 * @param {{ store?: object }} [options]
 */
export function useTasks({ store } = {}) {
  const adapter = store ?? globalStorage;

  const [tasks, setTasks] = useState(() => {
    const raw = adapter.get(STORAGE_KEY, null);
    if (raw === null) {
      // First visit — seed sample data
      adapter.set(STORAGE_KEY, SAMPLE_TASKS);
      return SAMPLE_TASKS;
    }
    const safe = sanitiseTasksFromStorage(raw);
    // If storage was present but empty or corrupt, keep it empty (don't re-seed)
    return safe;
  });

  // Keep localStorage in sync whenever tasks change
  useEffect(() => {
    adapter.set(STORAGE_KEY, tasks);
    // adapter identity is stable per render cycle; eslint-disable is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  /** Add a new task */
  const addTask = useCallback((fields) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: fields.title.trim(),
      description: (fields.description ?? '').trim(),
      dueDate: fields.dueDate,
      priority: fields.priority ?? 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
      isSample: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  /** Update an existing task by id */
  const updateTask = useCallback((id, fields) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: fields.title.trim(),
              description: (fields.description ?? '').trim(),
              dueDate: fields.dueDate,
              priority: fields.priority,
            }
          : t,
      ),
    );
  }, []);

  /** Toggle completed state */
  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  /** Delete a task by id */
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, updateTask, toggleTask, deleteTask };
}
