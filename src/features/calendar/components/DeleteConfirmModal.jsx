import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { CATEGORY_BADGE_VARIANT, CATEGORY_LABELS } from '../utils/constants';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, event }) => {
  if (!event) return null;

  const badgeVariant = CATEGORY_BADGE_VARIANT[event.category] || 'default';
  const categoryLabel = CATEGORY_LABELS[event.category] || event.category;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Calendar Event"
      description="Are you sure you want to delete this event? This action will remove it from your schedule."
      size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} type="button">
            Delete Event
          </Button>
        </>
      }
    >
      <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[#0F172A] text-sm truncate">
            {event.title}
          </span>
          <Badge variant={badgeVariant} size="sm" dot>
            {categoryLabel}
          </Badge>
        </div>
        <p className="text-xs text-[#64748B]">
          {event.date} at {event.time}
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

