import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { Size } from '../../types.js';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0 to max). Omit for indeterminate. */
  value?: number;
  /** Maximum value. Defaults to 100. */
  max?: number;
  /** Size variant. */
  size?: Size;
  /** Accessible label for the progress bar. */
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, size = 'md', label, className, ...props },
  ref,
) {
  const isIndeterminate = value === undefined;
  const clampedValue = isIndeterminate ? undefined : Math.min(Math.max(0, value), max);
  const percentage = isIndeterminate ? undefined : (clampedValue! / max) * 100;

  // Dev warning: no accessible label
  if (
    process.env.NODE_ENV !== 'production' &&
    !label &&
    !props['aria-label'] &&
    !props['aria-labelledby']
  ) {
    console.warn(
      'Progress: no accessible label provided. Pass `label`, `aria-label`, or `aria-labelledby`.',
    );
  }

  return (
    <div
      ref={ref}
      className={cn('tcn-progress', className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label ?? props['aria-label']}
      data-size={size}
      data-indeterminate={isIndeterminate ? '' : undefined}
      {...props}
    >
      <div
        className="tcn-progress-bar"
        style={!isIndeterminate ? { width: `${percentage}%` } : undefined}
      />
    </div>
  );
});
