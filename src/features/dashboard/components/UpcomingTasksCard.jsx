import React from 'react';
import { Link } from 'react-router-dom';

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

export const UpcomingTasksCard = ({ tasks = [], onToggleTask }) => {
  const pendingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Pending Tasks ({tasks.filter((t) => !t.completed).length})
          </h2>
          <Link
            to="/tasks"
            className="text-xs text-[#4338CA] hover:underline font-medium"
          >
            All tasks &rarr;
          </Link>
        </div>

        {pendingTasks.length === 0 ? (
          <div className="py-8 text-center space-y-1.5">
            <p className="text-sm font-medium text-[#0F172A]">All caught up</p>
            <p className="text-xs text-[#64748B]">You have no pending tasks on your list.</p>
            <Link to="/tasks" className="inline-block mt-1 text-xs text-[#4338CA] hover:underline font-medium">
              + Add a task
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100" role="list">
            {pendingTasks.map((task) => {
              const due = formatTaskDue(task.dueDate);

              return (
                <li
                  key={task.id}
                  className="py-2.5 flex items-start gap-3 first:pt-0 last:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => onToggleTask?.(task.id)}
                    className="mt-0.5 w-4 h-4 rounded-full border border-slate-300 hover:border-[#4338CA] flex items-center justify-center transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
                    aria-label={`Mark "${task.title}" as complete`}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0F172A] truncate">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                      <span
                        className={`font-medium ${
                          due.isOverdue
                            ? 'text-[#B91C1C]'
                            : due.isToday
                            ? 'text-[#B45309]'
                            : 'text-[#64748B]'
                        }`}
                      >
                        {due.text}
                      </span>
                      {task.priority === 'high' && (
                        <span className="text-[#B91C1C] text-[10px] font-medium bg-red-50 px-1.5 py-0.5 rounded">
                          High
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
        <span>Sorted by due date</span>
        <Link to="/tasks" className="text-[#4338CA] hover:underline font-medium">
          Manage tasks
        </Link>
      </div>
    </div>
  );
};

export default UpcomingTasksCard;
