import { forwardRef, Children } from 'react';
import { cn } from '../../utils/cn.js';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible label for the navigation landmark. Defaults to "Breadcrumb". */
  label?: string;
  /** Custom separator rendered between items. Defaults to "/". */
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Marks this item as the current page. Sets aria-current="page". */
  isCurrent?: boolean;
  /** When provided, wraps children in an anchor element. */
  href?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { label = 'Breadcrumb', separator = '/', className, children, ...props },
  ref,
) {
  const items = Children.toArray(children);

  return (
    <nav ref={ref} className={cn('tcn-breadcrumb', className)} aria-label={label} {...props}>
      <ol className="tcn-breadcrumb-list">
        {items.map((child, index) => {
          const nodes: React.ReactNode[] = [child];

          if (index < items.length - 1) {
            nodes.push(
              <li key={`sep-${index}`} className="tcn-breadcrumb-separator-item">
                <span className="tcn-breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              </li>,
            );
          }

          return nodes;
        })}
      </ol>
    </nav>
  );
});

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ isCurrent = false, href, className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cn('tcn-breadcrumb-item', className)}
        aria-current={isCurrent ? 'page' : undefined}
        {...props}
      >
        {href ? <a href={href}>{children}</a> : children}
      </li>
    );
  },
);
