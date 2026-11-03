import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { OPPORTUNITY_CATEGORIES } from '../utils/constants';

const EMPTY_FORM = {
  title: '',
  organization: '',
  category: 'internship',
  deadline: '',
  location: '',
  stipend: '',
  eligibility: '',
  description: '',
  link: '',
};

function isValidUrl(str) {
  if (!str.trim()) return true; // Optional field
  try {
    const u = new URL(str.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateOpportunity(fields) {
  const errors = {};

  if (!fields.title.trim()) {
    errors.title = 'Role or opportunity title is required.';
  } else if (fields.title.trim().length > 100) {
    errors.title = 'Title must be 100 characters or fewer.';
  }

  if (!fields.organization.trim()) {
    errors.organization = 'Organization / Company name is required.';
  } else if (fields.organization.trim().length > 100) {
    errors.organization = 'Organization name must be 100 characters or fewer.';
  }

  if (!['internship', 'placement', 'scholarship', 'hackathon'].includes(fields.category)) {
    errors.category = 'Please choose a valid category.';
  }

  if (!fields.deadline) {
    errors.deadline = 'Application deadline is required.';
  }

  if (fields.location && fields.location.length > 80) {
    errors.location = 'Location must be 80 characters or fewer.';
  }

  if (fields.stipend && fields.stipend.length > 60) {
    errors.stipend = 'Stipend / Award must be 60 characters or fewer.';
  }

  if (!fields.eligibility.trim()) {
    errors.eligibility = 'Eligibility criteria is required.';
  } else if (fields.eligibility.length > 200) {
    errors.eligibility = 'Eligibility must be 200 characters or fewer.';
  }

  if (fields.description && fields.description.length > 500) {
    errors.description = 'Description must be 500 characters or fewer.';
  }

  if (fields.link.trim() && !isValidUrl(fields.link)) {
    errors.link = 'Application link must be a valid URL starting with http:// or https://';
  }

  return errors;
}

export const OpportunityFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = 'add',
}) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          title: initialData.title || '',
          organization: initialData.organization || '',
          category: initialData.category || 'internship',
          deadline: initialData.deadline || '',
          location: initialData.location || '',
          stipend: initialData.stipend || '',
          eligibility: initialData.eligibility || '',
          description: initialData.description || '',
          link: initialData.link || '',
        });
      } else {
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 21);
        setForm({
          ...EMPTY_FORM,
          deadline: nextMonth.toISOString().slice(0, 10),
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateOpportunity(form);
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
      title={isEdit ? 'Edit Opportunity Listing' : 'Add Opportunity Listing'}
      description={
        isEdit
          ? 'Update the details, criteria, deadline, or application link for this listing.'
          : 'Share an internship, scholarship, hackathon, or campus placement drive.'
      }
      size="lg"
      footer={
        <>
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" form="opportunity-form">
            {isEdit ? 'Save Changes' : 'Publish Opportunity'}
          </Button>
        </>
      }
    >
      <form id="opportunity-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Organization / Company"
            required
            placeholder="e.g. Google India / Ministry of Education"
            value={form.organization}
            onChange={handleChange('organization')}
            error={errors.organization}
            maxLength={100}
          />

          <Input
            label="Role or Program Title"
            required
            placeholder="e.g. SDE Summer Intern 2027"
            value={form.title}
            onChange={handleChange('title')}
            error={errors.title}
            maxLength={100}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Opportunity Category"
            required
            value={form.category}
            onChange={handleChange('category')}
            options={OPPORTUNITY_CATEGORIES}
            error={errors.category}
          />

          <Input
            label="Application Deadline"
            type="date"
            required
            value={form.deadline}
            onChange={handleChange('deadline')}
            error={errors.deadline}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            placeholder="e.g. Bengaluru / Hybrid / Remote"
            value={form.location}
            onChange={handleChange('location')}
            error={errors.location}
            maxLength={80}
          />

          <Input
            label="Stipend / Prize / Grant (Optional)"
            placeholder="e.g. ₹60,000 / month or $2,500 Award"
            value={form.stipend}
            onChange={handleChange('stipend')}
            error={errors.stipend}
            maxLength={60}
          />
        </div>

        <Input
          label="Eligibility Criteria"
          required
          placeholder="e.g. 2nd & 3rd year B.Tech students with CGPA >= 7.5"
          value={form.eligibility}
          onChange={handleChange('eligibility')}
          error={errors.eligibility}
          maxLength={200}
        />

        <Input
          label="Application / Portal Link (Optional)"
          type="url"
          placeholder="https://careers.example.com/apply"
          value={form.link}
          onChange={handleChange('link')}
          error={errors.link}
          helperText="Must start with https:// or http://"
        />

        <Textarea
          label="Description & Key Highlights (Optional)"
          placeholder="Selection rounds, skills evaluated, tech stack, or program perks..."
          value={form.description}
          onChange={handleChange('description')}
          error={errors.description}
          rows={3}
          maxLength={500}
          helperText="Max 500 characters."
        />
      </form>
    </Modal>
  );
};

export default OpportunityFormModal;

