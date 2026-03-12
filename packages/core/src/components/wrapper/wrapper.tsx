import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { WrapperSize, WrapperPadding } from '../../types.js';

export interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: WrapperSize;
  padding?: WrapperPadding;
}

export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(function Wrapper(
  { size = 'lg', padding = 'lg', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('tcn-wrapper', className)}
      data-size={size}
      data-padding={padding !== 'none' ? padding : undefined}
      {...props}
    >
      {children}
    </div>
  );
});
