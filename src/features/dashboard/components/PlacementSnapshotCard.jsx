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

  // Recent active applications (OA, Interview, Applied)
  const recentActive = applications
    .filter((a) => a.status === 'Interview' || a.status === 'Online Assessment' || a.status === 'Offer')
    .slice(0, 3);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
              Placement &amp; Job Pipeline
            </h2>
          </div>
          <Link
            to="/placement"
            className="text-xs text-[#4338CA] hover:underline font-semibold"
          >
            Tracker ({total}) &rarr;
          </Link>
        </div>

        {total === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#0F172A]">No applications tracked</p>
            <p className="text-xs text-[#64748B] max-w-xs mx-auto">
              Start tracking on-campus placement drives and off-campus applications.
            </p>
            <Link
              to="/placement"
              className="inline-block mt-2 text-xs font-semibold text-[#4338CA] hover:underline"
            >
              + Track an application
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status Pipeline Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STAGE_ORDER.map((stage) => {
                const count = countsByStatus[stage] || 0;
                const badgeVar = STATUS_BADGE_VARIANT[stage] || 'default';

                return (
                  <div
                    key={stage}
                    className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-600 font-medium truncate max-w-[90px]">
                      {stage}
                    </span>
                    <Badge variant={badgeVar} size="sm" dot={count > 0}>
                      {count}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {/* Active Interviews & OA Spotlight */}
            {recentActive.length > 0 && (
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
                  Priority Application Watch
                </span>
                <div className="space-y-1.5">
                  {recentActive.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50/50 border border-emerald-100"
                    >
                      <span className="font-semibold text-[#0F172A] truncate">
                        {app.company} — <span className="text-slate-500 font-normal">{app.role}</span>
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

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Sorted by activity</span>
        <Link to="/placement" className="text-[#4338CA] hover:underline font-medium">
          Manage Placement Tracker
        </Link>
      </div>
    </div>
  );
};

export default PlacementSnapshotCard;

