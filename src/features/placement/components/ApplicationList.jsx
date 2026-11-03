import React from 'react';
import ApplicationCard from './ApplicationCard';

/**
 * ApplicationList — Renders a list of placement application cards.
 *
 * @param {Object} props
 * @param {Array} props.applications - List of application objects
 * @param {Function} [props.onEdit] - Edit application callback
 * @param {Function} [props.onDelete] - Delete application callback
 * @param {Function} [props.onStatusChange] - Status change callback
 * @param {React.ReactNode} [props.emptyState] - Optional custom empty state
 */
export const ApplicationList = ({
  applications = [],
  onEdit,
  onDelete,
  onStatusChange,
  emptyState,
}) => {
  if (applications.length === 0) {
    return emptyState || null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0F172A]">
          Applications ({applications.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationList;

