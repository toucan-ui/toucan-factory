import { forwardRef } from 'react';
import { cn, Box, Heading, Text, Button } from '@toucanui/core';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: () => void;
  actionLabel?: string;
  icon?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, action, actionLabel, icon, className, ...props },
  ref,
) {
  return (
    <Box ref={ref} elevation={0} className={cn('tcn-empty-state', className)} {...props}>
      {icon && (
        <span className="tcn-empty-state-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <Heading level={3}>{title}</Heading>
      {description && (
        <Text muted className="tcn-empty-state-description">
          {description}
        </Text>
      )}
      {action && actionLabel && (
        <div className="tcn-empty-state-action">
          <Button onClick={action}>{actionLabel}</Button>
        </div>
      )}
    </Box>
  );
});
