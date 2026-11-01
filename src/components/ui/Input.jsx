import React, { useId } from 'react';

/**
 * Reusable Input component for Campus Compass design system.
 * Implements accessible labels, helper text, error states, and icon slots.
 * 
 * @param {Object} props
 * @param {string} [props.label] - Accessible field label
 * @param {string} [props.id] - Element ID (auto-generated if omitted)
 * @param {string} [props.type='text'] - HTML input type
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.value] - Controlled input value
 * @param {string} [props.defaultValue] - Uncontrolled default value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.helperText] - Supplementary hint or instruction
 * @param {string|boolean} [props.error] - Error message or error state boolean
 * @param {boolean} [props.disabled=false] - Disables interaction
 * @param {boolean} [props.required=false] - Marks field as required
 * @param {React.ReactNode} [props.leftIcon] - Leading decorative or functional icon
 * @param {React.ReactNode} [props.rightIcon] - Trailing icon or action button
 * @param {boolean} [props.fullWidth=true] - Fills container width
 * @param {string} [props.className=''] - Additional CSS classes for input element
 * @param {string} [props.wrapperClassName=''] - Additional CSS classes for outer container
 */
export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  helperText,
  error,
  disabled = false,
  required = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  wrapperClassName = '',
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : null;

  // Base styling following 10-12px radius, subtle border, and clear focus ring
  const baseInputStyles =
    'block text-sm text-[#0F172A] bg-white rounded-lg border transition-all duration-150 ' +
    'placeholder:text-slate-400 focus:outline-none ' +
    'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-[#E2E8F0]';

  const stateStyles = hasError
    ? 'border-[#B91C1C] focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 text-[#B91C1C]'
    : 'border-[#E2E8F0] hover:border-slate-300 focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/20';

  const paddingLeft = leftIcon ? 'pl-10' : 'pl-3.5';
  const paddingRight = rightIcon ? 'pr-10' : 'pr-3.5';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthStyle} ${wrapperClassName}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[#0F172A] mb-1.5 select-none"
        >
          {label}
          {required && <span className="text-[#B91C1C] ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div
            className="absolute left-3 flex items-center justify-center text-slate-400 pointer-events-none"
            aria-hidden="true"
          >
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          className={`${baseInputStyles} ${stateStyles} ${paddingLeft} ${paddingRight} py-2 ${widthStyle} ${className}`.trim()}
          {...rest}
        />

        {rightIcon && (
          <div className="absolute right-3 flex items-center justify-center text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {hasError && errorMessage && (
        <p id={errorId} className="mt-1.5 text-xs text-[#B91C1C] flex items-center gap-1 font-medium">
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
        <p id={helperId} className="mt-1.5 text-xs text-[#64748B]">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
