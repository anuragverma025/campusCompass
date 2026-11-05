import React, { useState, useRef, useEffect, useId } from 'react';

/**
 * Reusable Dropdown component for Campus Compass design system.
 * Zero-dependency accessible menu with outside-click detection and keyboard dismissal.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.trigger - Custom trigger element / button
 * @param {Array<{label?: string, icon?: React.ReactNode, onClick?: () => void, danger?: boolean, disabled?: boolean, divider?: boolean}>} [props.items=[]] - Menu items
 * @param {React.ReactNode} [props.children] - Custom dropdown body if not using items array
 * @param {'left'|'right'} [props.align='left'] - Menu alignment relative to trigger
 * @param {string} [props.className=''] - Additional CSS classes for menu dropdown container
 */
export const Dropdown = ({
  trigger,
  items = [],
  children,
  align = 'left',
  className = '',
  containerClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuId = useId();

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const alignmentStyles =
    align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left';

  return (
    <div ref={dropdownRef} className={`relative ${containerClassName || 'inline-block'} text-left`}>
      {/* Trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={`cursor-pointer ${containerClassName?.includes('w-full') ? 'w-full block' : 'inline-flex'}`}
      >
        {trigger}
      </div>

      {/* Menu Popover */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          className={`absolute ${alignmentStyles} mt-2 w-56 rounded-xl bg-white border border-[#E2E8F0] shadow-lg py-1.5 z-40 focus:outline-none transition-all animate-in fade-in zoom-in-95 duration-150 ${className}`.trim()}
        >
          {items.length > 0
            ? items.map((item, idx) => {
                if (item.divider) {
                  return (
                    <div
                      key={`div-${idx}`}
                      className="my-1 border-t border-[#E2E8F0]"
                      role="separator"
                    />
                  );
                }

                const itemColor = item.danger
                  ? 'text-[#B91C1C] hover:bg-red-50 hover:text-[#991B1B]'
                  : 'text-[#0F172A] hover:bg-slate-100 hover:text-[#0F172A]';

                return (
                  <button
                    key={item.label || idx}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed ${itemColor}`}
                  >
                    {item.icon && (
                      <span className="inline-flex text-current shrink-0">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })
            : children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
