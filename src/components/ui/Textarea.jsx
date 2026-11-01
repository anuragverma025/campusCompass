import React, { useId } from 'react';

/**
 * Reusable Textarea component for Campus Compass design system.
 * 
 * @param {Object} props
 * @param {string} [props.label] - Accessible field label
 * @param {string} [props.id] - Element ID
 * @param {string} [props.placeholder] - Textarea placeholder
 * @param {string} [props.value] - Controlled textarea value
 * @param {string} [props.defaultValue] - Uncontrolled default value
 * @param {Function} [props.onChange] - Change handler
 * @param {number} [props.rows=3] - Number of visible text lines
 * @param {string} [props.helperText] - Supplementary hint or instruction
 * @param {string|boolean} [props.error] - Error message or boolean
 * @param {boolean} [props.disabled=false] - Disables interaction
 * @param {boolean} [props.required=false] - Marks field as required
 * @param {number} [props.maxLength] - Maximum character limit
 * @param {boolean} [props.fullWidth=true] - Fills container width
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.wrapperClassName=''] - Additional CSS classes for outer container
 */
export const Textarea = ({
  label,
  id,
  placeholder,
  value,
  defaultValue,
  onChange,
  rows = 3,
  helperText,
  error,
  disabled = false,
  required = false,
  maxLength,
  fullWidth = true,
  className = '',
  wrapperClassName = '',
  ...rest
}) => {
  const generatedId = useId();
  const textareaId = id || `textarea-${generatedId}`;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : null;

  const baseTextareaStyles =
    'block text-sm text-[#0F172A] bg-white rounded-lg border transition-all duration-150 ' +
    'placeholder:text-slate-400 focus:outline-none resize-y ' +
    'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-[#E2E8F0]';

  const stateStyles = hasError
    ? 'border-[#B91C1C] focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 text-[#B91C1C]'
    : 'border-[#E2E8F0] hover:border-slate-300 focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/20';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthStyle} ${wrapperClassName}`.trim()}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold text-[#0F172A] mb-1.5 select-none"
        >
          {label}
          {required && <span className="text-[#B91C1C] ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
        className={`${baseTextareaStyles} ${stateStyles} px-3.5 py-2.5 ${widthStyle} ${className}`.trim()}
        {...rest}
      />

      <div className="flex items-center justify-between mt-1.5">
        <div>
          {hasError && errorMessage && (
            <p id={errorId} className="text-xs text-[#B91C1C] flex items-center gap-1 font-medium">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMessage}
            </p>
          )}

          {!hasError && helperText && (
            <p id={helperId} className="text-xs text-[#64748B]">
              {helperText}
            </p>
          )}
        </div>

        {maxLength && typeof value === 'string' && (
          <span className="text-[11px] text-slate-400 font-mono ml-auto">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
