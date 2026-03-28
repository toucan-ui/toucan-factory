import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { Elevation, Radius, BoxOverflow, BoxPadding } from '../../types.js';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: Elevation;
  radius?: Radius;
  padding?: BoxPadding;
  overflow?: BoxOverflow;
  /** Stretch to fill the parent's height (e.g. inside a Grid cell). */
  fill?: boolean;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { elevation = 1, radius = 'md', padding = 'md', overflow, fill, className, children, ...props },
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
      {...(fill ? { 'data-fill': '' } : {})}
      {...props}
    >
      {children}
    </div>
  );
});
