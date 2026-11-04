import React, { useState, useMemo } from 'react';
import { Card, Badge, Button, Input, Tabs } from '../components/ui';
import {
  APPLICATION_STATUSES,
  STATUS_BADGE_VARIANT,
} from '../features/placement/utils/constants';
import usePlacementData from '../features/placement/hooks/usePlacementData';
import ApplicationList from '../features/placement/components/ApplicationList';
import ApplicationFormModal from '../features/placement/components/ApplicationFormModal';
import DeleteConfirmModal from '../features/placement/components/DeleteConfirmModal';
import SampleDataNotice from '../features/placement/components/SampleDataNotice';
import { useAuth } from '../features/auth/AuthContext';
import { studentStorage } from '../utils/studentStorage';

/**
 * PlacementPage — Comprehensive Placement Tracker.
 * Supports CRUD, direct status change, search, filtering, summary counts,
 * and localStorage persistence with safe fallback.
 */
const PlacementPage = () => {
  const { student } = useAuth();
  const store = studentStorage(student?.id);
  const {
    applications,
    addApplication,
    updateApplication,
    updateStatus,
    deleteApplication,
    loadSampleData,
    clearAllApplications,
    hasSampleData,
  } = usePlacementData({ store });

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal dialog states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [deletingApplication, setDeletingApplication] = useState(null);

  // Status counts across all applications
  const statusCounts = useMemo(() => {
    return APPLICATION_STATUSES.reduce((acc, status) => {
      acc[status] = applications.filter((app) => app.status === status).length;
      return acc;
    }, {});
  }, [applications]);

  // Filtered and searched applications
  const filteredApplications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return applications.filter((app) => {
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      const matchesSearch =
        !q ||
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        (app.notes && app.notes.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [applications, statusFilter, searchQuery]);

  // Handle saving an edited application
  const handleSaveEdit = (updatedData) => {
    if (!editingApplication) return;
    updateApplication(editingApplication.id, updatedData);
    setEditingApplication(null);
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (deletingApplication) {
      deleteApplication(deletingApplication.id);
      setDeletingApplication(null);
    }
  };

  // Status filter tabs definition
  const filterTabs = useMemo(() => {
    return [
      {
        id: 'All',
        label: 'All Applications',
        badge: <Badge size="sm">{applications.length}</Badge>,
      },
      ...APPLICATION_STATUSES.map((status) => ({
        id: status,
        label: status,
        badge: (
          <Badge
            size="sm"
            variant={STATUS_BADGE_VARIANT[status]}
          >
            {statusCounts[status] || 0}
          </Badge>
        ),
      })),
    ];
  }, [applications.length, statusCounts]);

  // Render contextual empty states
  const renderEmptyState = () => {
    const isSearchingOrFiltering =
      searchQuery.trim() !== '' || statusFilter !== 'All';

    if (isSearchingOrFiltering) {
      return (
        <Card className="!py-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#0F172A]">
              No applications match your criteria
            </h3>
            <p className="text-xs text-[#64748B] max-w-sm">
              We couldn't find any application matching "{searchQuery}" in{' '}
              {statusFilter === 'All' ? 'any status' : `status "${statusFilter}"`}.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
              }}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <Card className="!py-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#0F172A]">
            No applications yet
          </h3>
          <p className="text-sm text-[#64748B] max-w-sm">
            Start tracking your placement journey by logging your first application or reload sample applications.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Your First Application
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
            >
              Load Sample Applications
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Sample Data Notice */}
      {hasSampleData && (
        <SampleDataNotice
          onClear={clearAllApplications}
          onReload={loadSampleData}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" dot>
              Placement Tracker
            </Badge>
            <span className="text-xs text-[#64748B]">Local-First Storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Placement Tracker
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Track and manage your placement applications across every pipeline stage.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Add Application
          </Button>
        </div>
      </div>

      {/* Status Summary Cards (Clickable to Filter) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Pipeline Summary
          </span>
          {statusFilter !== 'All' && (
            <button
              type="button"
              onClick={() => setStatusFilter('All')}
              className="text-xs text-[#4338CA] hover:underline font-medium"
            >
              Reset filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {APPLICATION_STATUSES.map((status) => {
            const isSelected = statusFilter === status;
            return (
              <div
                key={status}
                onClick={() =>
                  setStatusFilter((prev) => (prev === status ? 'All' : status))
                }
                className={`cursor-pointer transition-all duration-150 rounded-xl bg-white border p-3.5 text-center select-none ${
                  isSelected
                    ? 'border-[#4338CA] ring-2 ring-[#4338CA]/20 shadow-xs'
                    : 'border-[#E2E8F0] hover:border-slate-300 hover:shadow-xs'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setStatusFilter((prev) => (prev === status ? 'All' : status));
                  }
                }}
                aria-pressed={isSelected}
                aria-label={`Filter by ${status} status, ${statusCounts[status] || 0} applications`}
              >
                <Badge variant={STATUS_BADGE_VARIANT[status]} size="sm">
                  {status}
                </Badge>
                <p className="text-2xl font-bold text-[#0F172A] mt-2">
                  {statusCounts[status] || 0}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  {statusCounts[status] === 1 ? 'application' : 'applications'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:max-w-md">
            <Input
              placeholder="Search by company, role, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search applications by company or role"
              leftIcon={
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              rightIcon={
                searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : null
              }
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#64748B]">
            <span>
              Showing <strong className="text-[#0F172A]">{filteredApplications.length}</strong> of{' '}
              <strong className="text-[#0F172A]">{applications.length}</strong>
            </span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="overflow-x-auto pb-1">
          <Tabs
            tabs={filterTabs}
            activeTab={statusFilter}
            onChange={setStatusFilter}
            variant="pills"
          />
        </div>
      </div>

      {/* Application Listing */}
      <ApplicationList
        applications={filteredApplications}
        onEdit={(app) => setEditingApplication(app)}
        onDelete={(id) => {
          const app = applications.find((a) => a.id === id);
          if (app) setDeletingApplication(app);
        }}
        onStatusChange={updateStatus}
        emptyState={renderEmptyState()}
      />

      {/* Add Application Modal */}
      <ApplicationFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addApplication}
      />

      {/* Edit Application Modal */}
      <ApplicationFormModal
        isOpen={Boolean(editingApplication)}
        initialData={editingApplication}
        onClose={() => setEditingApplication(null)}
        onSubmit={handleSaveEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingApplication)}
        application={deletingApplication}
        onClose={() => setDeletingApplication(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PlacementPage;
