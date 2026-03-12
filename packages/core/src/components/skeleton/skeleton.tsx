import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { SkeletonVariant } from '../../types.js';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant. */
  variant?: SkeletonVariant;
  /** Width — CSS value or number (auto-converted to px). */
  width?: string | number;
  /** Height — CSS value or number (auto-converted to px). */
  height?: string | number;
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = 'text', width, height, className, style, ...props },
  ref,
) {
  const dimensionStyle: React.CSSProperties = {};
  if (width !== undefined) dimensionStyle.width = toPx(width);
  if (height !== undefined) dimensionStyle.height = toPx(height);

  const hasDimensions = width !== undefined || height !== undefined;

  return (
    <div
      ref={ref}
      className={cn('tcn-skeleton', className)}
      data-variant={variant}
      aria-hidden="true"
      style={hasDimensions ? { ...dimensionStyle, ...style } : style}
      {...props}
    />
  );
});
