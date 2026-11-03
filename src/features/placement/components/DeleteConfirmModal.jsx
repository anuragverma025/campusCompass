import React from 'react';
import { Modal, Button, Badge } from '../../../components/ui';
import { STATUS_BADGE_VARIANT } from '../utils/constants';

/**
 * DeleteConfirmModal — Accessible confirmation modal before deleting an application.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the confirmation dialog is open
 * @param {Function} props.onClose - Dismiss modal callback
 * @param {Function} props.onConfirm - Confirm deletion callback
 * @param {Object} [props.application=null] - Application to delete
 */
export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  application,
}) => {
  if (!application) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Application"
      description="Are you sure you want to remove this application from your tracker? This action cannot be undone."
      size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            type="button"
          >
            Delete Application
          </Button>
        </>
      }
    >
      <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[#0F172A] text-sm">
            {application.company}
          </span>
          <Badge
            variant={STATUS_BADGE_VARIANT[application.status] || 'default'}
            size="sm"
            dot
          >
            {application.status}
          </Badge>
        </div>
        <p className="text-xs text-[#64748B]">
          {application.role}
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

