import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { STATUS_BADGE_VARIANT } from '../../placement/utils/constants';

const STAGE_ORDER = [
  'Interested',
  'Applied',
  'Online Assessment',
  'Interview',
  'Offer',
];

export const PlacementSnapshotCard = ({ applications = [] }) => {
  const total = applications.length;

  const countsByStatus = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const recentActive = applications
    .filter((a) => a.status === 'Interview' || a.status === 'Online Assessment' || a.status === 'Offer')
    .slice(0, 3);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
          <h2 className="text-sm font-semibold text-[#0F172A]">
            Placement Pipeline ({total})
          </h2>
          <Link
            to="/placement"
            className="text-xs text-[#4338CA] hover:underline font-medium"
          >
            Tracker &rarr;
          </Link>
        </div>

        {total === 0 ? (
          <div className="py-8 text-center space-y-1.5">
            <p className="text-sm font-medium text-[#0F172A]">No applications tracked</p>
            <p className="text-xs text-[#64748B]">Log placement drives and company applications.</p>
            <Link to="/placement" className="inline-block mt-1 text-xs text-[#4338CA] hover:underline font-medium">
              + Track an application
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Simple stages count list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STAGE_ORDER.map((stage) => {
                const count = countsByStatus[stage] || 0;
                return (
                  <div
                    key={stage}
                    className="p-2 rounded-lg border border-[#E2E8F0] bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <span className="text-[#64748B] truncate max-w-[85px]">{stage}</span>
                    <span className="font-semibold text-[#0F172A]">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Active Interviews & OA */}
            {recentActive.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] block mb-1.5">
                  Active Applications
                </span>
                <div className="space-y-1.5">
                  {recentActive.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-[#E2E8F0]"
                    >
                      <span className="font-medium text-[#0F172A] truncate">
                        {app.company} <span className="text-[#64748B]">({app.role})</span>
                      </span>
                      <Badge variant={STATUS_BADGE_VARIANT[app.status] || 'default'} size="sm">
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
        <span>Current recruitment cycle</span>
        <Link to="/placement" className="text-[#4338CA] hover:underline font-medium">
          Manage tracker
        </Link>
      </div>
    </div>
  );
};

export default PlacementSnapshotCard;
