import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { CATEGORY_BADGE_VARIANT, CATEGORY_LABELS } from '../utils/constants';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, opportunity }) => {
  if (!opportunity) return null;

  const badgeVariant = CATEGORY_BADGE_VARIANT[opportunity.category] || 'default';
  const categoryLabel = CATEGORY_LABELS[opportunity.category] || opportunity.category;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Opportunity Listing"
      description="Are you sure you want to delete this listing? It will be removed from your opportunities radar."
      size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} type="button">
            Delete Listing
          </Button>
        </>
      }
    >
      <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[#0F172A] text-sm truncate">
            {opportunity.organization}
          </span>
          <Badge variant={badgeVariant} size="sm" dot>
            {categoryLabel}
          </Badge>
        </div>
        <p className="text-xs text-[#64748B] truncate">
          {opportunity.title}
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

