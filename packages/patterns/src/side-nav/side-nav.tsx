'use client';

import { forwardRef, useState, useEffect, useId } from 'react';
import { cn, Text } from '@toucanui/core';

export interface SideNavItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface SideNavSection {
  heading?: string;
  items: SideNavItem[];
}

export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  sections: SideNavSection[];
  collapsible?: boolean;
}

export const SideNav = forwardRef<HTMLElement, SideNavProps>(function SideNav(
  { sections, collapsible = false, className, ...props },
  ref,
) {
  const baseId = useId();

  // Start with all sections expanded (SSR-safe default)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    return new Set(sections.map((_, i) => i));
  });

  // On mobile, auto-collapse sections that don't contain the active item
  useEffect(() => {
    if (!collapsible) return;

    const md = getComputedStyle(document.documentElement)
      .getPropertyValue('--breakpoint-md')
      .trim();
    const mql = window.matchMedia(`(min-width: ${md})`);

    function applyViewport() {
      if (mql.matches) {
        // Desktop: expand all
        setExpandedSections(new Set(sections.map((_, i) => i)));
      } else {
        // Mobile: only keep sections with active items expanded
        const activeIndices = new Set<number>();
        sections.forEach((section, i) => {
          if (section.items.some((item) => item.active)) {
            activeIndices.add(i);
          }
        });
        setExpandedSections(activeIndices);
      }
    }

    applyViewport();
    mql.addEventListener('change', applyViewport);
    return () => mql.removeEventListener('change', applyViewport);
  }, [collapsible, sections]);

  function toggleSection(index: number) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <nav
      ref={ref}
      className={cn('tcn-side-nav', className)}
      aria-label="Sidebar"
      {...(collapsible ? { 'data-collapsible': '' } : {})}
      {...props}
    >
      {sections.map((section, sectionIndex) => {
        const isExpanded = expandedSections.has(sectionIndex);
        const listId = `${baseId}-list-${sectionIndex}`;

        return (
          <div key={sectionIndex} className="tcn-side-nav-section">
            {section.heading && (
              <>
                {collapsible && (
                  <button
                    type="button"
                    className="tcn-side-nav-toggle"
                    aria-expanded={isExpanded}
                    aria-controls={listId}
                    onClick={() => toggleSection(sectionIndex)}
                  >
                    {section.heading}
                  </button>
                )}
                <Text as="span" size="sm" muted className="tcn-side-nav-heading">
                  {section.heading}
                </Text>
              </>
            )}
            <ul
              id={listId}
              className="tcn-side-nav-list"
              role="list"
              {...(!isExpanded && collapsible ? { 'data-collapsed': 'true' } : {})}
            >
              {section.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href ?? '#'}
                    className={cn('tcn-side-nav-link', item.active && 'tcn-side-nav-link--active')}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
});
