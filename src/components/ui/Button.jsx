import React from 'react';

/**
 * Reusable Button component with accessible focus states and variants.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / content
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] - Button style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {string} [props.className=''] - Additional styling
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.type='button'] - Button HTML type
 * @param {boolean} [props.disabled=false] - Disabled state
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...rest
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
    secondary:
      'bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-700 shadow-sm',
    outline:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500 shadow-xs',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

