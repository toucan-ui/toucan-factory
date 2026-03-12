import { forwardRef } from 'react';
import { cn, Heading, Text, Breadcrumb, BreadcrumbItem, FlexItem } from '@toucan-ui/core';

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbEntry[];
  actions?: React.ReactNode;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, description, breadcrumbs, actions, className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn('tcn-page-header', className)} {...props}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={crumb.label} isCurrent={index === breadcrumbs.length - 1}>
              {crumb.href ? <a href={crumb.href}>{crumb.label}</a> : crumb.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      <div className="tcn-page-header-row">
        <FlexItem grow className="tcn-page-header-text">
          <Heading level={1}>{title}</Heading>
          {description && (
            <Text muted className="tcn-page-header-description">
              {description}
            </Text>
          )}
        </FlexItem>
        {actions && (
          <FlexItem shrink={false} className="tcn-page-header-actions">
            {actions}
          </FlexItem>
        )}
      </div>
    </header>
  );
});
