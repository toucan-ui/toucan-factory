import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

export type PageProps = React.HTMLAttributes<HTMLDivElement>;

export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-page', className)} {...props}>
      {children}
    </div>
  );
});
