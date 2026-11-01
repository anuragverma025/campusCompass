import React from 'react';

/**
 * Reusable Badge component for status indicators and category tags.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'default'|'success'|'warning'|'info'|'primary'} [props.variant='default'] - Color variant
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  };

  const style = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

