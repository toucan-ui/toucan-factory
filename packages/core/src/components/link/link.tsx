import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { LinkVariant, LinkSize } from '../../types.js';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  size?: LinkSize;
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'inline', size = 'base', external = false, className, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn('tcn-link', className)}
      data-variant={variant}
      data-size={size}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  );
});
