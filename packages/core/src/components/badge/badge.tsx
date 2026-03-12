import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { BadgeVariant, Size } from '../../types.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: Size;
  live?: boolean;
  surface?: string;
  onSurface?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'neutral',
    size = 'md',
    live = false,
    surface,
    onSurface,
    className,
    style,
    ...props
  },
  ref,
) {
  const isCustom = surface !== undefined || onSurface !== undefined;

  const mergedStyle = isCustom
    ? {
        ...style,
        ...(surface !== undefined && { '--badge-surface': surface }),
        ...(onSurface !== undefined && { '--badge-on-surface': onSurface }),
      }
    : style;

  return (
    <span
      ref={ref}
      className={cn('tcn-badge', className)}
      data-variant={isCustom ? 'custom' : variant}
      data-size={size}
      data-live={live || undefined}
      role={live ? 'status' : undefined}
      aria-atomic={live ? 'true' : undefined}
      style={mergedStyle as React.CSSProperties}
      {...props}
    />
  );
});
