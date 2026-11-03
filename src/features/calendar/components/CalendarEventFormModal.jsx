import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { EVENT_CATEGORIES } from '../utils/constants';

const EMPTY_FORM = {
  title: '',
  category: 'academic',
  date: '',
  time: '',
  endTime: '',
  location: '',
  description: '',
};

function validateEvent(fields) {
  const errors = {};
  if (!fields.title.trim()) {
    errors.title = 'Event title is required.';
  } else if (fields.title.trim().length > 100) {
    errors.title = 'Title must be 100 characters or fewer.';
  }

  if (!fields.date) {
    errors.date = 'Event date is required.';
  }

  if (!fields.time.trim()) {
    errors.time = 'Event start time is required (e.g. 10:00 AM).';
  }

  if (!['academic', 'club', 'personal', 'placement'].includes(fields.category)) {
    errors.category = 'Please choose a valid category.';
  }

  if (fields.location && fields.location.length > 100) {
    errors.location = 'Location must be 100 characters or fewer.';
  }

  if (fields.description && fields.description.length > 400) {
    errors.description = 'Description must be 400 characters or fewer.';
  }

  return errors;
}

export const CalendarEventFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = 'add',
  defaultDate = '',
}) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          title: initialData.title || '',
          category: initialData.category || 'academic',
          date: initialData.date || '',
          time: initialData.time || '',
          endTime: initialData.endTime || '',
          location: initialData.location || '',
          description: initialData.description || '',
        });
      } else {
        setForm({
          ...EMPTY_FORM,
          date: defaultDate || new Date().toISOString().slice(0, 10),
          time: '10:00 AM',
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData, defaultDate]);

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateEvent(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
    onClose();
  };

  const isEdit = mode === 'edit';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Calendar Event' : 'Add Calendar Event'}
      description={
        isEdit
          ? 'Update the event details, timings, or location below.'
          : 'Schedule a lecture, exam, club workshop, or study session.'
      }
      size="md"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" form="calendar-event-form">
            {isEdit ? 'Save Changes' : 'Schedule Event'}
          </Button>
        </>
      }
    >
      <form id="calendar-event-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Event Title"
          required
          placeholder="e.g. Distributed Systems Lab Exam"
          value={form.title}
          onChange={handleChange('title')}
          error={errors.title}
          maxLength={100}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            required
            value={form.category}
            onChange={handleChange('category')}
            options={EVENT_CATEGORIES}
            error={errors.category}
          />

          <Input
            label="Date"
            type="date"
            required
            value={form.date}
            onChange={handleChange('date')}
            error={errors.date}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Time"
            required
            placeholder="e.g. 10:00 AM"
            value={form.time}
            onChange={handleChange('time')}
            error={errors.time}
          />

          <Input
            label="End Time (Optional)"
            placeholder="e.g. 11:30 AM"
            value={form.endTime}
            onChange={handleChange('endTime')}
          />
        </div>

        <Input
          label="Location / Link (Optional)"
          placeholder="e.g. Hall 4 / Google Meet / Discord"
          value={form.location}
          onChange={handleChange('location')}
          error={errors.location}
          maxLength={100}
        />

        <Textarea
          label="Description / Agenda Notes (Optional)"
          placeholder="Key topics to cover, prerequisites, or preparation notes..."
          value={form.description}
          onChange={handleChange('description')}
          error={errors.description}
          rows={3}
          maxLength={400}
          helperText="Max 400 characters."
        />
      </form>
    </Modal>
  );
};

export default CalendarEventFormModal;

