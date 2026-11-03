import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useOpportunitiesData } from '../features/opportunities/hooks/useOpportunitiesData';
import { OpportunityCard } from '../features/opportunities/components/OpportunityCard';
import { OpportunityFormModal } from '../features/opportunities/components/OpportunityFormModal';
import { DeleteConfirmModal } from '../features/opportunities/components/DeleteConfirmModal';
import { OPPORTUNITY_CATEGORIES } from '../features/opportunities/utils/constants';

const CATEGORY_FILTER_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  ...OPPORTUNITY_CATEGORIES,
];

const BOOKMARK_FILTER_OPTIONS = [
  { value: 'all', label: 'All Opportunities' },
  { value: 'saved', label: '⭐ Saved / Bookmarked' },
];

const SORT_OPTIONS = [
  { value: 'deadline_asc', label: 'Deadline (Earliest first)' },
  { value: 'deadline_desc', label: 'Deadline (Latest first)' },
  { value: 'created_desc', label: 'Recently Added' },
];

export const OpportunitiesPage = () => {
  const {
    opportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    toggleBookmark,
  } = useOpportunitiesData();

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkFilter, setBookmarkFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline_asc');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [deletingOpportunity, setDeletingOpportunity] = useState(null);

  // Metrics calculation
  const stats = useMemo(() => {
    const total = opportunities.length;
    const savedCount = opportunities.filter((o) => o.isBookmarked).length;
    const internshipCount = opportunities.filter((o) => o.category === 'internship').length;
    const grantAndContestCount = opportunities.filter(
      (o) => o.category === 'scholarship' || o.category === 'hackathon',
    ).length;

    return { total, savedCount, internshipCount, grantAndContestCount };
  }, [opportunities]);

  // Filtered & sorted opportunities
  const filteredOpportunities = useMemo(() => {
    let result = [...opportunities];

    // Bookmark filter
    if (bookmarkFilter === 'saved') {
      result = result.filter((o) => o.isBookmarked);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((o) => o.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.organization.toLowerCase().includes(q) ||
          o.description?.toLowerCase().includes(q) ||
          o.eligibility?.toLowerCase().includes(q) ||
          o.location?.toLowerCase().includes(q),
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'deadline_asc') return a.deadline.localeCompare(b.deadline);
      if (sortBy === 'deadline_desc') return b.deadline.localeCompare(a.deadline);
      if (sortBy === 'created_desc') return (b.createdAt || '').localeCompare(a.createdAt || '');
      return 0;
    });

    return result;
  }, [opportunities, bookmarkFilter, selectedCategory, searchQuery, sortBy]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'all' ||
    bookmarkFilter !== 'all' ||
    sortBy !== 'deadline_asc';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setBookmarkFilter('all');
    setSortBy('deadline_asc');
  };

  const hasSampleListings = opportunities.some((o) => o.isSample);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Opportunity Radar
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Discover internships, placement drives, national hackathons, and scholarships.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setEditingOpportunity(null);
            setIsAddModalOpen(true);
          }}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Add Opportunity
        </Button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Total Listings
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#0F172A]">{stats.total}</span>
            <span className="text-xs text-slate-400">tracked</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Saved / Bookmarked
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600">{stats.savedCount}</span>
            {stats.savedCount > 0 && (
              <Badge variant="warning" size="sm" dot>
                Shortlisted
              </Badge>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Internships
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#4338CA]">{stats.internshipCount}</span>
            <span className="text-xs text-slate-400">open roles</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
            Scholarships &amp; Grants
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#15803D]">{stats.grantAndContestCount}</span>
            <span className="text-xs text-slate-400">funded</span>
          </div>
        </div>
      </div>

      {/* Sample Data Notice */}
      {hasSampleListings && (
        <div
          role="note"
          className="flex items-start gap-3 bg-[#E0F2FE] border border-[#BAE6FD] rounded-xl px-4 py-3 text-xs text-[#0369A1]"
        >
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <strong>Sample Opportunity Listings:</strong> These listings represent realistic college internships, scholarships, and hackathons for demonstration purposes. They are not live verified openings. You can bookmark, edit, delete, or publish your own opportunities; your preferences persist in localStorage.
          </div>
        </div>
      )}

      {/* Search & Filters Toolbar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            placeholder="Search role, company, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search opportunities"
            leftIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            }
          />

          <Select
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={CATEGORY_FILTER_OPTIONS}
          />

          <Select
            aria-label="Filter by bookmark"
            value={bookmarkFilter}
            onChange={(e) => setBookmarkFilter(e.target.value)}
            options={BOOKMARK_FILTER_OPTIONS}
          />

          <Select
            aria-label="Sort listings"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={SORT_OPTIONS}
          />
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
            <span>
              Showing <strong className="text-[#0F172A]">{filteredOpportunities.length}</strong> of{' '}
              <strong className="text-[#0F172A]">{opportunities.length}</strong> listings
              {bookmarkFilter === 'saved' && (
                <span className="ml-1 text-amber-600 font-semibold">(Saved only)</span>
              )}
            </span>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-[#4338CA] font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Opportunities Cards Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4338CA] mx-auto flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M3 12h2m14 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              <circle cx="12" cy="12" r="5" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F172A]">
            {bookmarkFilter === 'saved' ? 'No saved opportunities' : 'No opportunities found'}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
            {bookmarkFilter === 'saved'
              ? 'You have not bookmarked any opportunities yet. Click the bookmark icon on any card to save it here.'
              : hasActiveFilters
              ? 'No listings match your search or category criteria. Try broadening your filter selection.'
              : 'There are currently no opportunity listings available. Click "Add Opportunity" to share one.'}
          </p>
          {hasActiveFilters ? (
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              Reset Filters
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingOpportunity(null);
                setIsAddModalOpen(true);
              }}
            >
              Add New Opportunity
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onToggleBookmark={toggleBookmark}
              onEdit={(opportunityToEdit) => {
                setEditingOpportunity(opportunityToEdit);
                setIsAddModalOpen(true);
              }}
              onDelete={(opportunityToDelete) => {
                setDeletingOpportunity(opportunityToDelete);
              }}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Opportunity Modal */}
      <OpportunityFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingOpportunity(null);
        }}
        onSubmit={(formData) => {
          if (editingOpportunity) {
            updateOpportunity(editingOpportunity.id, formData);
          } else {
            addOpportunity(formData);
          }
        }}
        initialData={editingOpportunity}
        mode={editingOpportunity ? 'edit' : 'add'}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingOpportunity)}
        onClose={() => setDeletingOpportunity(null)}
        onConfirm={() => {
          if (deletingOpportunity) {
            deleteOpportunity(deletingOpportunity.id);
            setDeletingOpportunity(null);
          }
        }}
        opportunity={deletingOpportunity}
      />
    </div>
  );
};

export default OpportunitiesPage;

