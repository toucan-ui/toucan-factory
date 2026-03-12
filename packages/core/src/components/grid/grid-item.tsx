import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { resolveResponsive } from '../../utils/responsive.js';
import type { Responsive } from '../../types.js';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: Responsive<number>;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { span, className, style, children, ...props },
  ref,
) {
  const itemStyle: Record<string, string | number | undefined> = { ...style };
  const isSpanResponsive = typeof span === 'object' && span !== null;

  // Scalar span: set CSS custom property for arbitrary values
  if (!isSpanResponsive && span != null) {
    itemStyle['--tcn-grid-item-span'] = String(span);
  }

  const spanAttrs = isSpanResponsive
    ? resolveResponsive('span', span)
    : span != null
      ? { 'data-span': String(span) }
      : {};

  return (
    <div
      ref={ref}
      className={cn('tcn-grid-item', className)}
      {...spanAttrs}
      style={itemStyle as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
});
