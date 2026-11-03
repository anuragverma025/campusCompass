import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';

const PRIORITY_OPTIONS = [
  { value: 'high', label: '🔴 High Priority' },
  { value: 'medium', label: '🟡 Medium Priority' },
  { value: 'low', label: '🟢 Low Priority' },
];

/** ISO date string for today used as the minimum due-date value */
const todayISO = () => new Date().toISOString().slice(0, 10);

const EMPTY_FORM = { title: '', description: '', dueDate: '', priority: 'medium' };

/**
 * Validates the task form fields.
 * @param {{ title: string, dueDate: string, priority: string }} fields
 * @returns {{ title?: string, dueDate?: string, priority?: string }} — error map
 */
function validateTask(fields) {
  const errors = {};
  if (!fields.title.trim()) {
    errors.title = 'Task title is required.';
  } else if (fields.title.trim().length > 120) {
    errors.title = 'Title must be 120 characters or fewer.';
  }
  if (!fields.dueDate) {
    errors.dueDate = 'Due date is required.';
  }
  if (!['high', 'medium', 'low'].includes(fields.priority)) {
    errors.priority = 'Please select a valid priority.';
  }
  if (fields.description && fields.description.length > 500) {
    errors.description = 'Description must be 500 characters or fewer.';
  }
  return errors;
}

/**
 * TaskFormModal — accessible add/edit task form inside a Modal.
 *
 * @param {{ isOpen: boolean, onClose: Function, onSubmit: Function, initialData?: object, mode: 'add'|'edit' }} props
 */
export function TaskFormModal({ isOpen, onClose, onSubmit, initialData = null, mode = 'add' }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form state when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setForm(
        initialData
          ? {
              title: initialData.title ?? '',
              description: initialData.description ?? '',
              dueDate: initialData.dueDate ?? '',
              priority: initialData.priority ?? 'medium',
            }
          : EMPTY_FORM,
      );
      setErrors({});
    }
  }, [isOpen, initialData]);

  function handleChange(field) {
    return (e) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear per-field error on user input
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateTask(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulated sync — no async operation, just keeps UX consistent
    try {
      onSubmit(form);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEdit = mode === 'edit';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Add New Task'}
      description={
        isEdit
          ? 'Update the details for this task.'
          : 'Fill in the details below to add a new task to your list.'
      }
      size="md"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
            form="task-form"
            isLoading={isSubmitting}
          >
            {isEdit ? 'Save Changes' : 'Add Task'}
          </Button>
        </>
      }
    >
      <form id="task-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Task Title"
          required
          placeholder="e.g. Submit assignment report"
          value={form.title}
          onChange={handleChange('title')}
          error={errors.title}
          maxLength={120}
        />

        <Textarea
          label="Description"
          placeholder="Optional — add extra details, links, or instructions…"
          value={form.description}
          onChange={handleChange('description')}
          error={errors.description}
          helperText="Max 500 characters."
          rows={3}
          maxLength={500}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Due Date"
            type="date"
            required
            value={form.dueDate}
            onChange={handleChange('dueDate')}
            error={errors.dueDate}
            min={todayISO()}
          />

          <Select
            label="Priority"
            required
            value={form.priority}
            onChange={handleChange('priority')}
            options={PRIORITY_OPTIONS}
            error={errors.priority}
          />
        </div>
      </form>
    </Modal>
  );
}

export default TaskFormModal;

