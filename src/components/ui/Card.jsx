import React from 'react';

/**
 * Reusable Card component for Campus Compass design system.
 * Provides consistent 12px radius, subtle border, and optional header/footer.
 * Fully compatible with existing Phase 1 usages while offering composable subcomponents.
 * 
 * @param {Object} props
 * @param {string} [props.title] - Card title (convenience prop)
 * @param {string} [props.description] - Card description (convenience prop)
 * @param {React.ReactNode} [props.icon] - Leading icon element
 * @param {React.ReactNode} [props.badge] - Optional badge element
 * @param {React.ReactNode} [props.header] - Optional custom header slot
 * @param {React.ReactNode} [props.footer] - Optional custom footer slot
 * @param {boolean} [props.hoverable=false] - Enables elevated hover treatment
 * @param {React.ReactNode} [props.children] - Main card content
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const Card = ({
  title,
  description,
  icon,
  badge,
  header,
  footer,
  hoverable = false,
  children,
  className = '',
  ...rest
}) => {
  const hoverStyles = hoverable
    ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer'
    : 'hover:shadow-xs transition-shadow duration-150';

  return (
    <div
      className={`bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-6 flex flex-col justify-between ${hoverStyles} ${className}`.trim()}
      {...rest}
    >
      <div>
        {/* Custom Header slot or convenience header */}
        {header ? (
          header
        ) : (title || icon || badge) ? (
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center shrink-0">
                  {icon}
                </div>
              )}
              {title && (
                <h3 className="text-base font-semibold text-[#0F172A] leading-snug">
                  {title}
                </h3>
              )}
            </div>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
        ) : null}

        {/* Description */}
        {description && (
          <p className="text-sm text-[#64748B] leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Content body */}
        {children && <div className="text-sm text-[#0F172A]">{children}</div>}
      </div>

      {/* Footer slot */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B]">
          {footer}
        </div>
      )}
    </div>
  );
};

/* Composable subcomponents for flexible layouts */
export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-3 border-b border-[#E2E8F0] ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-base font-semibold text-[#0F172A] ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-[#64748B] mt-1 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`py-3 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] ${className}`}>
    {children}
  </div>
);

export default Card;
