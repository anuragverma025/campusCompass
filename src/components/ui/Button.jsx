import React from 'react';

/**
 * Reusable Button component for Campus Compass design system.
 * Follows student-focused SaaS styling with accessible focus, loading, and disabled states.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / content
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} [props.variant='primary'] - Button style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.isLoading=false] - Displays accessible loading spinner and disables interactions
 * @param {boolean} [props.disabled=false] - Disables button interactions
 * @param {boolean} [props.fullWidth=false] - Spans the full width of container
 * @param {React.ReactNode} [props.leftIcon] - Icon displayed before button text
 * @param {React.ReactNode} [props.rightIcon] - Icon displayed after button text
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button HTML type
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 ease-in-out select-none ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg shadow-2xs',
    md: 'text-sm px-4 py-2 gap-2 rounded-lg shadow-xs',
    lg: 'text-base px-5 py-2.5 gap-2.5 rounded-xl shadow-xs',
  };

  const variantStyles = {
    primary:
      'bg-[#4338CA] hover:bg-[#3730A3] text-white focus-visible:ring-[#4338CA] focus-visible:ring-offset-white border border-transparent',
    secondary:
      'bg-[#0F766E] hover:bg-[#115E59] text-white focus-visible:ring-[#0F766E] focus-visible:ring-offset-white border border-transparent',
    outline:
      'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-slate-300 focus-visible:ring-[#4338CA]',
    ghost:
      'bg-transparent text-[#0F172A] hover:bg-slate-100 hover:text-[#0F172A] border border-transparent focus-visible:ring-[#4338CA]',
    danger:
      'bg-[#B91C1C] hover:bg-[#991B1B] text-white focus-visible:ring-[#B91C1C] focus-visible:ring-offset-white border border-transparent',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      onClick={isDisabled ? undefined : onClick}
      className={`${baseStyles} ${currentSize} ${currentVariant} ${widthStyle} ${className}`.trim()}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>{typeof children === 'string' ? 'Loading...' : children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
