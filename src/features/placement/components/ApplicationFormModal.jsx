import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Textarea, Button } from '../../../components/ui';
import { APPLICATION_STATUSES } from '../utils/constants';

/**
 * ApplicationFormModal — Accessible modal dialog for adding or editing an application.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal dialog is open
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onSubmit - Submission handler called with validated form data
 * @param {Object} [props.initialData=null] - Optional initial data when editing
 */
export const ApplicationFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    deadline: '',
    applicationLink: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  // Reset or populate form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          company: initialData.company || '',
          role: initialData.role || '',
          status: initialData.status || 'Applied',
          deadline: initialData.deadline || '',
          applicationLink: initialData.applicationLink || '',
          notes: initialData.notes || '',
        });
      } else {
        setFormData({
          company: '',
          role: '',
          status: 'Applied',
          deadline: '',
          applicationLink: '',
          notes: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role / position title is required';
    }

    if (!formData.status) {
      newErrors.status = 'Application status is required';
    }

    if (formData.applicationLink && formData.applicationLink.trim()) {
      try {
        const url = new URL(formData.applicationLink.trim());
        if (!['http:', 'https:'].includes(url.protocol)) {
          newErrors.applicationLink = 'Link must start with http:// or https://';
        }
      } catch {
        newErrors.applicationLink = 'Please enter a valid URL (e.g. https://careers.company.com)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...formData,
      company: formData.company.trim(),
      role: formData.role.trim(),
      deadline: formData.deadline.trim(),
      applicationLink: formData.applicationLink.trim(),
      notes: formData.notes.trim(),
    });

    onClose();
  };

  const statusOptions = APPLICATION_STATUSES.map((status) => ({
    value: status,
    label: status,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Application' : 'Add New Placement Application'}
      description={
        isEditing
          ? 'Update the details and progress of your job or internship application.'
          : 'Track a new opportunity by logging the company, role, deadline, and notes.'
      }
      size="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} type="button">
            {isEditing ? 'Save Changes' : 'Add Application'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            placeholder="e.g. Google, Microsoft, Startup"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            error={errors.company}
            required
            autoFocus
          />

          <Input
            label="Role / Position"
            placeholder="e.g. SDE Intern, Frontend Engineer"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            error={errors.role}
            required
          />
        </div>

        {/* Status & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Application Status"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            error={errors.status}
            required
          />

          <Input
            label="Application Deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            helperText="Optional submission cutoff or next round date"
          />
        </div>

        {/* Application Link */}
        <Input
          label="Application Portal Link"
          type="url"
          placeholder="https://careers.company.com/job/12345"
          value={formData.applicationLink}
          onChange={(e) => handleChange('applicationLink', e.target.value)}
          error={errors.applicationLink}
          helperText="Optional URL to job posting, career dashboard, or referral form"
        />

        {/* Notes */}
        <Textarea
          label="Notes & Interview Preparation"
          placeholder="e.g. Referred by senior, online assessment covers dynamic programming, interview on Friday..."
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
          maxLength={500}
          helperText="Add interview logs, referral details, or specific topics to study"
        />
      </form>
    </Modal>
  );
};

export default ApplicationFormModal;

