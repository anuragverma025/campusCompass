import React, { useId } from 'react';

/**
 * Reusable Select component for Campus Compass design system.
 * 
 * @param {Object} props
 * @param {string} [props.label] - Accessible field label
 * @param {string} [props.id] - Element ID
 * @param {Array<{value: string|number, label: string, disabled?: boolean}>} [props.options=[]] - Select options array
 * @param {string|number} [props.value] - Controlled select value
 * @param {string|number} [props.defaultValue] - Uncontrolled default value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.placeholder] - Default unselected label
 * @param {string} [props.helperText] - Supplementary hint or instruction
 * @param {string|boolean} [props.error] - Error message or boolean
 * @param {boolean} [props.disabled=false] - Disables interaction
 * @param {boolean} [props.required=false] - Marks field as required
 * @param {boolean} [props.fullWidth=true] - Fills container width
 * @param {React.ReactNode} [props.children] - Custom option elements if not using options prop
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.wrapperClassName=''] - Additional CSS classes for outer container
 */
export const Select = ({
  label,
  id,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  helperText,
  error,
  disabled = false,
  required = false,
  fullWidth = true,
  children,
  className = '',
  wrapperClassName = '',
  ...rest
}) => {
  const generatedId = useId();
  const selectId = id || `select-${generatedId}`;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : null;

  const baseSelectStyles =
    'block text-sm text-[#0F172A] bg-white rounded-lg border appearance-none transition-all duration-150 ' +
    'pr-10 pl-3.5 py-2 focus:outline-none cursor-pointer ' +
    'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-[#E2E8F0]';

  const stateStyles = hasError
    ? 'border-[#B91C1C] focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 text-[#B91C1C]'
    : 'border-[#E2E8F0] hover:border-slate-300 focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/20';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthStyle} ${wrapperClassName}`.trim()}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-[#0F172A] mb-1.5 select-none"
        >
          {label}
          {required && <span className="text-[#B91C1C] ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          className={`${baseSelectStyles} ${stateStyles} ${widthStyle} ${className}`.trim()}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        {/* Custom styled arrow chevron */}
        <div
          className="absolute right-3.5 pointer-events-none text-slate-400 flex items-center"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

export default Select;
