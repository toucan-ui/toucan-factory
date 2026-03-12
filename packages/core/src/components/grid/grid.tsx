import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { resolveResponsive } from '../../utils/responsive.js';
import type { FlexAlign, GridColumns, GridGap, Responsive } from '../../types.js';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: Responsive<GridColumns>;
  gap?: Responsive<GridGap>;
  align?: Responsive<FlexAlign>;
  minItemSize?: string;
}

function isResponsiveObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 1, gap, align, minItemSize, className, style, children, ...props },
  ref,
) {
  const gridStyle: Record<string, string | number | undefined> = { ...style };
  const isColumnsResponsive = isResponsiveObject(columns);
  const isGapResponsive = isResponsiveObject(gap);

  // Scalar columns: set CSS custom property for arbitrary values
  if (!isColumnsResponsive && typeof columns === 'number') {
    gridStyle['--tcn-grid-columns'] = String(columns);
  }
  if (minItemSize) {
    gridStyle['--tcn-grid-min-item-size'] = minItemSize;
  }

  // Build data attributes
  const columnsAttrs = isColumnsResponsive
    ? resolveResponsive('columns', columns)
    : { 'data-columns': String(columns) };

  const gapAttrs = isGapResponsive
    ? resolveResponsive('gap', gap)
    : gap != null
      ? { 'data-gap': String(gap) }
      : {};

  return (
    <div
      ref={ref}
      className={cn('tcn-grid', className)}
      {...columnsAttrs}
      {...gapAttrs}
      {...resolveResponsive('align', align)}
      style={gridStyle as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
});
