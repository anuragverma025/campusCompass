import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const QuickActions = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Quick Actions
        </h2>
        <span className="text-xs text-slate-400">One-click student workflows</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link to="/tasks">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start text-xs font-semibold hover:border-[#4338CA] hover:text-[#4338CA] shadow-2xs"
            leftIcon={
              <span className="w-5 h-5 rounded-md bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center shrink-0">
                +
              </span>
            }
          >
            Add Task
          </Button>
        </Link>

        <Link to="/calendar">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start text-xs font-semibold hover:border-sky-600 hover:text-sky-700 shadow-2xs"
            leftIcon={
              <span className="w-5 h-5 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                📅
              </span>
            }
          >
            Schedule Event
          </Button>
        </Link>

        <Link to="/opportunities">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start text-xs font-semibold hover:border-amber-500 hover:text-amber-700 shadow-2xs"
            leftIcon={
              <span className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                🔍
              </span>
            }
          >
            Explore Radar
          </Button>
        </Link>

        <Link to="/placement">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start text-xs font-semibold hover:border-emerald-600 hover:text-emerald-700 shadow-2xs"
            leftIcon={
              <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                💼
              </span>
            }
          >
            Track Application
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;

