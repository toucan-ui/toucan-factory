import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { GridGap, SectionPadding, SectionBackground } from '../../types.js';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  gap?: GridGap;
  padding?: SectionPadding;
  background?: SectionBackground;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { gap, padding = 'none', background, className, children, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn('tcn-section', className)}
      data-padding={padding !== 'none' ? padding : undefined}
      data-background={background ?? undefined}
      data-gap={gap != null ? String(gap) : undefined}
      {...props}
    >
      {children}
    </section>
  );
});
