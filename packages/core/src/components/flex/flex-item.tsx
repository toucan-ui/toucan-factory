import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

export interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
  grow?: boolean;
  shrink?: boolean;
}

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(function FlexItem(
  { grow, shrink, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('tcn-flex-item', className)}
      {...(grow ? { 'data-grow': '' } : {})}
      {...(shrink === false ? { 'data-shrink': 'false' } : {})}
      {...props}
    >
      {children}
    </div>
  );
});
