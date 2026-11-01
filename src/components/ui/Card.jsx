import React from 'react';

/**
 * Reusable Card component for feature overviews and modular content blocks.
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} [props.description] - Card description
 * @param {React.ReactNode} [props.icon] - Leading icon element
 * @param {React.ReactNode} [props.badge] - Optional badge element
 * @param {React.ReactNode} [props.children] - Additional content inside card body
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const Card = ({
  title,
  description,
  icon,
  badge,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
                {icon}
              </div>
            )}
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          </div>
          {badge && <div>{badge}</div>}
        </div>
        {description && (
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {description}
          </p>
        )}
      </div>
      {children && <div className="mt-2 pt-3 border-t border-slate-100">{children}</div>}
    </div>
  );
};

export default Card;

