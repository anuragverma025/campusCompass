import React from 'react';

/**
 * Reusable Badge component for Campus Compass design system.
 * Pill-shaped indicators for statuses, tags, and category labels.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content / label
 * @param {'default'|'primary'|'success'|'warning'|'error'|'danger'|'info'} [props.variant='default'] - Color variant
 * @param {'sm'|'md'} [props.size='md'] - Badge size
 * @param {boolean} [props.dot=false] - Display a status indicator dot
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
  ...rest
}) => {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200/80',
    primary: 'bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE]',
    success: 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]',
    warning: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
    error: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]',
    danger: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]', // Backward-compatibility alias
    info: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
  };

  const dotColorStyles = {
    default: 'bg-slate-400',
    primary: 'bg-[#4338CA]',
    success: 'bg-[#15803D]',
    warning: 'bg-[#B45309]',
    error: 'bg-[#B91C1C]',
    danger: 'bg-[#B91C1C]',
    info: 'bg-[#0369A1]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;
  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentDotColor = dotColorStyles[variant] || dotColorStyles.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors select-none ${currentVariant} ${currentSize} ${className}`.trim()}
      {...rest}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentDotColor}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
