import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { AlertVariant } from '../../types.js';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  surface?: string;
  onSurface?: string;
  border?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', surface, onSurface, border, className, style, children, ...props },
  ref,
) {
  const isCustom = surface !== undefined || onSurface !== undefined || border !== undefined;

  const mergedStyle = isCustom
    ? {
        ...style,
        ...(surface !== undefined && { '--alert-surface': surface }),
        ...(onSurface !== undefined && { '--alert-on-surface': onSurface }),
        ...(border !== undefined && { '--alert-custom-border': border }),
      }
    : style;

  return (
    <div
      ref={ref}
      className={cn('tcn-alert', className)}
      role="alert"
      data-variant={isCustom ? 'custom' : variant}
      style={mergedStyle as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
});
