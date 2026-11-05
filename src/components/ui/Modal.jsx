import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';

/**
 * Reusable Modal / Dialog component for Campus Compass design system.
 * Accessible dialog with backdrop blur, focus handling, and Escape key dismissal.
 * Teleported to document.body via React Portal to prevent CSS stacking context clipping.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Dismissal handler
 * @param {string} [props.title] - Modal title heading
 * @param {string} [props.description] - Supplementary description under title
 * @param {React.ReactNode} props.children - Modal content body
 * @param {React.ReactNode} [props.footer] - Custom footer actions slot (e.g., Cancel & Submit buttons)
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Max width size of dialog
 * @param {boolean} [props.closeOnOverlayClick=true] - Dismiss on clicking outside dialog
 * @param {boolean} [props.closeOnEsc=true] - Dismiss on Escape key press
 * @param {string} [props.className=''] - Additional CSS classes for dialog container
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
}) => {
  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;
  const descId = `modal-desc-${generatedId}`;
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        className={`w-full ${currentSize} bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col my-auto transition-transform animate-in zoom-in-95 duration-200 ${className}`.trim()}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#E2E8F0]">
            <div>
              {title && (
                <h2 id={titleId} className="text-lg font-semibold text-[#0F172A] leading-snug">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="mt-1 text-sm text-[#64748B]">
                  {description}
                </p>
              )}
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 -mr-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 text-sm text-[#0F172A] overflow-y-auto max-h-[75vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-5 py-4 sm:px-6 bg-slate-50 border-t border-[#E2E8F0]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default Modal;
