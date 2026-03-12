import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = false, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('tcn-separator', className)}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={!decorative && orientation === 'vertical' ? 'vertical' : undefined}
      data-orientation={orientation}
      {...props}
    />
  );
});
