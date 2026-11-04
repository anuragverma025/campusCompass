import React, { useState, useMemo } from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { useTasks } from './useTasks';
import { TaskFormModal } from './TaskFormModal';
import { TaskItem } from './TaskItem';
import { useAuth } from '../auth/AuthContext';
import { studentStorage } from '../../utils/studentStorage';

/* ─── Filter options ─────────────────────────────────────────────────────── */

const STATUS_FILTERS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const PRIORITY_FILTERS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: '🔴 High' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'low', label: '🟢 Low' },
];

const SORT_OPTIONS = [
  { value: 'dueDate_asc', label: 'Due Date (earliest first)' },
  { value: 'dueDate_desc', label: 'Due Date (latest first)' },
  { value: 'priority', label: 'Priority (high → low)' },
  { value: 'createdAt_desc', label: 'Recently Added' },
];

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

/* ─── Empty state ─────────────────────────────────────────────────────────── */

function EmptyState({ hasFilters, onAddTask }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-[#4338CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-base font-semibold text-[#0F172A] mb-1">No tasks match your filters</h3>
          <p className="text-sm text-[#64748B] max-w-xs">
            Try clearing the status or priority filters to see more tasks.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-base font-semibold text-[#0F172A] mb-1">No tasks yet</h3>
          <p className="text-sm text-[#64748B] max-w-xs mb-5">
            Add your first task to start tracking academic deadlines, study goals, and more.
          </p>
          <Button variant="primary" size="md" onClick={onAddTask}
            leftIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Your First Task
          </Button>
        </>
      )}
    </div>
  );
}

/* ─── Stats bar ───────────────────────────────────────────────────────────── */

function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const high = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
  const today = new Date().toISOString().slice(0, 10);
  const overdue = tasks.filter((t) => !t.completed && t.dueDate < today).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[
        { label: 'Total Tasks', value: total, badge: null },
        { label: 'Pending', value: pending, badge: 'warning' },
        { label: 'Completed', value: completed, badge: 'success' },
        { label: overdue > 0 ? 'Overdue' : 'High Priority', value: overdue > 0 ? overdue : high, badge: overdue > 0 ? 'error' : 'primary' },
      ].map(({ label, value, badge }) => (
        <div key={label} className="bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 flex flex-col gap-1 shadow-xs">
          <span className="text-xs text-[#64748B] font-medium">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#0F172A]">{value}</span>
            {badge && <Badge variant={badge} dot size="sm">{label}</Badge>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Tasks page component ───────────────────────────────────────────── */

/**
 * TasksPage — full-featured task management view.
 * Renders inside the shared AppLayout shell via React Router at /tasks.
 * Uses the useTasks custom hook for state and localStorage persistence.
 */
export function TasksPage() {
  const { student } = useAuth();
  const store = studentStorage(student?.id);
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks({ store });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filter / sort state
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate_asc');
  const [searchQuery, setSearchQuery] = useState('');

  /* Derived: filtered + sorted tasks */
  const visibleTasks = useMemo(() => {
    let list = [...tasks];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }

    // Status filter
    if (statusFilter === 'pending') list = list.filter((t) => !t.completed);
    if (statusFilter === 'completed') list = list.filter((t) => t.completed);

    // Priority filter
    if (priorityFilter !== 'all') list = list.filter((t) => t.priority === priorityFilter);

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'dueDate_asc') return a.dueDate.localeCompare(b.dueDate);
      if (sortBy === 'dueDate_desc') return b.dueDate.localeCompare(a.dueDate);
      if (sortBy === 'priority') return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
      if (sortBy === 'createdAt_desc') return b.createdAt.localeCompare(a.createdAt);
      return 0;
    });

    return list;
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  const hasActiveFilters =
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    searchQuery.trim().length > 0;

  /* Handlers */
  function openAddModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTask(null);
  }

  function handleSubmit(fields) {
    if (editingTask) {
      updateTask(editingTask.id, fields);
    } else {
      addTask(fields);
    }
  }

  function clearFilters() {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchQuery('');
  }

  return (
    <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6" aria-labelledby="tasks-heading">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1
            id="tasks-heading"
            className="text-2xl font-bold text-[#0F172A] tracking-tight"
          >
            My Tasks
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Track assignments, study goals, and deadlines in one place.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={openAddModal}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Add Task
        </Button>
      </div>

      {/* ── Stats ── */}
      <StatsBar tasks={tasks} />

      {/* ── Filters toolbar ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-4 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <Input
            placeholder="Search tasks…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            wrapperClassName="flex-1"
            aria-label="Search tasks"
            leftIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            }
          />

          {/* Status filter */}
          <Select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={STATUS_FILTERS}
            wrapperClassName="sm:w-40"
          />

          {/* Priority filter */}
          <Select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={PRIORITY_FILTERS}
            wrapperClassName="sm:w-44"
          />

          {/* Sort */}
          <Select
            aria-label="Sort tasks"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={SORT_OPTIONS}
            wrapperClassName="sm:w-52"
          />
        </div>

        {/* Active filter indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E2E8F0]">
            <span className="text-xs text-[#64748B]">
              Showing <strong className="text-[#0F172A]">{visibleTasks.length}</strong> of{' '}
              <strong className="text-[#0F172A]">{tasks.length}</strong> tasks
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-[#4338CA] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] rounded"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── Sample data notice ── */}
      {tasks.some((t) => t.isSample) && (
        <div
          role="note"
          className="flex items-start gap-3 bg-[#E0F2FE] border border-[#BAE6FD] rounded-xl px-4 py-3 mb-4 text-xs text-[#0369A1]"
        >
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>Sample tasks are shown above</strong> to demonstrate the interface. They are clearly labelled{' '}
            <Badge variant="info" size="sm">Sample</Badge> and can be deleted once you add your own tasks.
          </span>
        </div>
      )}

      {/* ── Task list ── */}
      {visibleTasks.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <EmptyState hasFilters={hasActiveFilters} onAddTask={openAddModal} />
        </div>
      ) : (
        <ul className="flex flex-col gap-2" role="list" aria-label="Task list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={openEditModal}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      {/* ── Add / Edit modal ── */}
      <TaskFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingTask}
        mode={editingTask ? 'edit' : 'add'}
      />
    </section>
  );
}

export default TasksPage;

