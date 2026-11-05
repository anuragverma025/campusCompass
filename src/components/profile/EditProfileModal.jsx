import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { useAuth } from '../../features/auth/AuthContext';

function computeInitials(name) {
  if (!name || typeof name !== 'string') return 'S';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'S';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { student, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    course: '',
    email: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen && student) {
      setFormData({
        name: student.name || '',
        course: student.course || '',
        email: student.email || '',
        bio: student.bio || '',
      });
      setErrors({});
      setIsSaved(false);
    }
  }, [isOpen, student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedAvatar = computeInitials(formData.name);

    updateProfile({
      name: formData.name.trim(),
      course: formData.course.trim(),
      email: formData.email.trim(),
      bio: formData.bio.trim(),
      avatar: updatedAvatar,
    });

    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      description="Update your personal student details and campus information."
      size="md"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-profile-form"
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-4">
        {isSaved && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-600 shrink-0">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Profile updated successfully!
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF] text-base font-bold text-[#4338CA] border border-indigo-100 shrink-0">
            {computeInitials(formData.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0F172A] truncate">
              {formData.name || 'Student Name'}
            </p>
            <p className="text-xs text-[#64748B] truncate">
              Avatar initials are previewed automatically
            </p>
          </div>
        </div>

        <Input
          label="Full Name"
          id="profile-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Ayush Kumar"
          required
          error={errors.name}
        />

        <Input
          label="Email Address"
          id="profile-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. ayush@demo.com"
          required
          error={errors.email}
        />

        <Input
          label="Course / Program & Year"
          id="profile-course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="e.g. B.Tech IT — 3rd Year"
          helperText="Appears beneath your name in the navigation header."
        />

        <Textarea
          label="Bio / Academic Focus"
          id="profile-bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="e.g. Focused on data structures, algorithms, and internships."
          helperText="Brief summary of your academic or career goals."
        />
      </form>
    </Modal>
  );
};

export default EditProfileModal;
