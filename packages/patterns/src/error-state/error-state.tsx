import { forwardRef } from 'react';
import { cn, Box, Heading, Text, Button } from '@toucanui/core';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  icon?: React.ReactNode;
}

export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(function ErrorState(
  { title, description, retryLabel = 'Try again', onRetry, icon, className, ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      elevation={0}
      className={cn('tcn-error-state', className)}
      data-variant="danger"
      {...props}
    >
      {icon && (
        <span className="tcn-error-state-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <Heading level={3}>{title}</Heading>
      {description && (
        <Text muted className="tcn-error-state-description">
          {description}
        </Text>
      )}
      {onRetry && (
        <div className="tcn-error-state-action">
          <Button variant="primary" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </Box>
  );
});
