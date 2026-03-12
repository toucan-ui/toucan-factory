import { forwardRef } from 'react';
import { cn, Text, FlexItem } from '@toucan-ui/core';

export type AlertVariant = 'info' | 'warning' | 'danger' | 'neutral';

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  variant?: AlertVariant;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const AlertBanner = forwardRef<HTMLDivElement, AlertBannerProps>(function AlertBanner(
  { message, variant = 'info', icon, action, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn('tcn-alert-banner', className)}
      data-alert-variant={variant}
      {...props}
    >
      {icon && (
        <span className="tcn-alert-banner-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <Text as="span" className="tcn-alert-banner-message">
        {message}
      </Text>
      {action && (
        <FlexItem shrink={false} className="tcn-alert-banner-action">
          {action}
        </FlexItem>
      )}
    </div>
  );
});
