import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';

/** Formats "YYYY-MM-DD" → human-readable "DD Mon YYYY" */
function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

/** Returns true if the task is overdue (past due date and not completed) */
function isOverdue(task) {
  if (task.completed) return false;
  const today = new Date().toISOString().slice(0, 10);
  return task.dueDate < today;
}

/** Returns true if due today */
function isDueToday(task) {
  if (task.completed) return false;
  const today = new Date().toISOString().slice(0, 10);
  return task.dueDate === today;
}

const PRIORITY_STYLES = {
  high: 'text-[#B91C1C] bg-red-50 border-red-200',
  medium: 'text-[#B45309] bg-amber-50 border-amber-200',
  low: 'text-[#15803D] bg-emerald-50 border-emerald-200',
};

/**
 * TaskItem — a single row in the task list.
 * Focuses on task title and due date, with restrained priority badges.
 */
export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);

  function handleDeleteClick() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(task.id);
  }

  function handleDeleteBlur() {
    setConfirmDelete(false);
  }

  return (
    <li
      className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 py-3.5 bg-white border rounded-xl transition-all duration-150 hover:shadow-2xs
        ${task.completed ? 'border-slate-100 bg-slate-50/50 opacity-75' : 'border-[#E2E8F0]'}
        ${overdue ? 'border-l-3 border-l-[#B91C1C]' : ''}
        ${dueToday && !overdue ? 'border-l-3 border-l-[#B45309]' : ''}
      `}
    >
      {/* Checkbox */}
      <button
        type="button"
        aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] focus-visible:ring-offset-2
          ${task.completed
            ? 'bg-[#15803D] border-[#15803D]'
            : 'border-slate-300 hover:border-[#4338CA] bg-white'}
        `}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content: Title & Due Date are the visual focus */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span
            className={`text-sm font-semibold truncate max-w-xs sm:max-w-md
              ${task.completed ? 'line-through text-slate-400' : 'text-[#0F172A]'}
            `}
          >
            {task.title}
          </span>

          {task.isSample && (
            <span className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.2 rounded font-normal">
              Sample
            </span>
          )}

          {task.priority && (
            <span
              className={`text-[10px] font-medium px-1.5 py-0.2 rounded border capitalize ${
                PRIORITY_STYLES[task.priority] || 'text-slate-600 bg-slate-50 border-slate-200'
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>

        {task.description && (
          <p className={`text-xs leading-relaxed line-clamp-2 mt-0.5 ${task.completed ? 'text-slate-400' : 'text-[#64748B]'}`}>
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1">
          <span className={`inline-flex items-center gap-1 text-xs font-medium
            ${overdue ? 'text-[#B91C1C]' : dueToday ? 'text-[#B45309]' : 'text-[#64748B]'}
          `}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {overdue && 'Overdue · '}
            {dueToday && 'Due today · '}
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          leftIcon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          }
        >
          Edit
        </Button>

        <Button
          variant={confirmDelete ? 'danger' : 'ghost'}
          size="sm"
          onClick={handleDeleteClick}
          onBlur={handleDeleteBlur}
          aria-label={confirmDelete ? `Confirm delete task: ${task.title}` : `Delete task: ${task.title}`}
          leftIcon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
        >
          {confirmDelete ? 'Confirm' : 'Delete'}
        </Button>
      </div>
    </li>
  );
}

export default TaskItem;
