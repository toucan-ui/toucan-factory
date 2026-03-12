import { forwardRef } from 'react';
import { cn, Skeleton, FlexItem } from '@toucanui/core';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  showAvatar?: boolean;
  showHeading?: boolean;
}

export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(function LoadingState(
  { lines = 3, showAvatar = false, showHeading = true, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-loading-state', className)} {...props}>
      {showAvatar && (
        <div className="tcn-loading-state-header">
          <Skeleton variant="circular" />
          <FlexItem grow className="tcn-loading-state-header-text">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </FlexItem>
        </div>
      )}
      {showHeading && <Skeleton variant="text" className="tcn-loading-state-heading" />}
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} variant="text" />
      ))}
    </div>
  );
});
