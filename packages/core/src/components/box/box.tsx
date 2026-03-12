import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { Elevation, Radius, BoxOverflow } from '../../types.js';

type BoxPadding = 'none' | 'sm' | 'md' | 'lg';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: Elevation;
  radius?: Radius;
  padding?: BoxPadding;
  overflow?: BoxOverflow;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { elevation = 1, radius = 'md', padding = 'md', overflow, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('tcn-box', className)}
      data-elevation={elevation}
      data-radius={radius}
      data-padding={padding}
      {...(overflow ? { 'data-overflow': overflow } : {})}
      {...props}
    >
      {children}
    </div>
  );
});
