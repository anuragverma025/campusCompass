import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';

function formatTaskDue(dateStr) {
  if (!dateStr) return { text: 'No due date', isOverdue: false, isToday: false };
  const todayStr = new Date().toISOString().slice(0, 10);

  if (dateStr < todayStr) {
    return { text: 'Overdue', isOverdue: true, isToday: false };
  }
  if (dateStr === todayStr) {
    return { text: 'Due today', isOverdue: false, isToday: true };
  }

  const [y, m, d] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    text: `Due ${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]}`,
    isOverdue: false,
    isToday: false,
  };
}

const PRIORITY_BADGE = {
  high: { variant: 'error', label: 'High' },
  medium: { variant: 'warning', label: 'Medium' },
  low: { variant: 'success', label: 'Low' },
};

export const UpcomingTasksCard = ({ tasks = [], onToggleTask }) => {
  // Filter pending tasks and sort by earliest due date
  const pendingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4338CA]" />
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              Action Items &amp; Tasks
            </h2>
          </div>
          <Link
            to="/tasks"
            className="text-xs text-[#4338CA] hover:underline font-semibold"
          >
            View all ({tasks.filter((t) => !t.completed).length}) &rarr;
          </Link>
        </div>

        {pendingTasks.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">All caught up!</p>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto">
              You have no pending assignments or tasks on your list.
            </p>
            <Link
              to="/tasks"
              className="inline-block mt-2 text-xs font-semibold text-[#4338CA] hover:underline"
            >
              + Add a new task
            </Link>
          </div>
        ) : (
          <ul className="space-y-2.5" role="list">
            {pendingTasks.map((task) => {
              const due = formatTaskDue(task.dueDate);
              const priority = PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.medium;

              return (
                <li
                  key={task.id}
                  className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <button
                    type="button"
                    onClick={() => onToggleTask?.(task.id)}
                    className="mt-0.5 w-4 h-4 rounded-full border-2 border-slate-300 hover:border-[#4338CA] flex items-center justify-center transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
                    aria-label={`Mark "${task.title}" as complete`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-[#0F172A] truncate max-w-[200px] sm:max-w-xs">
                        {task.title}
                      </span>
                      {task.isSample && (
                        <Badge variant="info" size="sm">
                          Sample
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px]">
                      <Badge variant={priority.variant} size="sm" dot>
                        {priority.label}
                      </Badge>
                      <span
                        className={`font-medium ${
                          due.isOverdue
                            ? 'text-[#B91C1C]'
                            : due.isToday
                            ? 'text-[#B45309]'
                            : 'text-slate-500'
                        }`}
                      >
                        {due.text}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Organized by due date</span>
        <Link to="/tasks" className="text-[#4338CA] hover:underline font-medium">
          Open Tasks Board
        </Link>
      </div>
    </div>
  );
};

export default UpcomingTasksCard;

