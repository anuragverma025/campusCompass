import React from 'react';

/**
 * Reusable Tabs component for Campus Compass design system.
 * Accessible tab navigation supporting pill and underline styles.
 * 
 * @param {Object} props
 * @param {Array<{id: string, label: string, icon?: React.ReactNode, badge?: React.ReactNode, disabled?: boolean}>} props.tabs - Tab definitions
 * @param {string} props.activeTab - Currently selected tab id
 * @param {Function} props.onChange - Selection change callback (id: string) => void
 * @param {'pills'|'underline'} [props.variant='pills'] - Tab visual style
 * @param {boolean} [props.fullWidth=false] - Whether tabs should expand equally to fill container
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'pills',
  fullWidth = false,
  className = '',
}) => {
  const isPills = variant === 'pills';

  const containerStyles = isPills
    ? 'inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 gap-1'
    : 'flex border-b border-[#E2E8F0] gap-6';

  const widthStyle = fullWidth ? 'w-full flex' : '';

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`overflow-x-auto no-scrollbar ${containerStyles} ${widthStyle} ${className}`.trim()}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isDisabled = tab.disabled;

        let tabStyles = '';

        if (isPills) {
          tabStyles = isActive
            ? 'bg-white text-[#4338CA] shadow-xs font-semibold'
            : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/50 font-medium';
        } else {
          // Underline variant
          tabStyles = isActive
            ? 'border-b-2 border-[#4338CA] text-[#4338CA] font-semibold -mb-px pb-3'
            : 'border-b-2 border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300 font-medium pb-3';
        }

        const pillRadius = isPills ? 'rounded-lg' : '';
        const itemWidth = fullWidth ? 'flex-1 justify-center' : '';

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange?.(tab.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm transition-all duration-150 whitespace-nowrap select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed ${pillRadius} ${tabStyles} ${itemWidth}`.trim()}
          >
            {tab.icon && (
              <span className={`inline-flex shrink-0 ${isActive ? 'text-[#4338CA]' : 'text-slate-400'}`}>
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="ml-0.5 inline-flex">{tab.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
