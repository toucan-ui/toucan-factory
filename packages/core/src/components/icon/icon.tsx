import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { Size } from '../../types.js';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  label?: string;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { size = 'md', label, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('tcn-icon', className)}
      data-size={size}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      {...props}
    />
  );
});
