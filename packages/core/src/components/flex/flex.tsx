import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { resolveResponsive } from '../../utils/responsive.js';
import type { Breakpoint, FlexAlign, FlexJustify, GridGap, Responsive } from '../../types.js';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: GridGap;
  row?: boolean | Breakpoint;
  wrap?: boolean;
  align?: Responsive<FlexAlign>;
  justify?: Responsive<FlexJustify>;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { gap, row, wrap, align, justify, className, children, ...props },
  ref,
) {
  const rowValue = row === true ? 'true' : typeof row === 'string' ? row : undefined;

  return (
    <div
      ref={ref}
      className={cn('tcn-flex', className)}
      data-row={rowValue}
      data-wrap={wrap ? 'true' : undefined}
      data-gap={gap != null ? String(gap) : undefined}
      {...resolveResponsive('align', align)}
      {...resolveResponsive('justify', justify)}
      {...props}
    >
      {children}
    </div>
  );
});
