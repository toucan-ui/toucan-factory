import { forwardRef } from 'react';
import { cn, Badge, Heading, Text } from '@toucanui/core';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
}

export const SectionHeader = forwardRef<HTMLElement, SectionHeaderProps>(function SectionHeader(
  { title, subtitle, eyebrow, align = 'center', className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn('tcn-section-header', className)} data-align={align} {...props}>
      {eyebrow && (
        <Badge variant="neutral" size="sm">
          {eyebrow}
        </Badge>
      )}
      <Heading level={2}>{title}</Heading>
      {subtitle && (
        <Text size="lg" muted className="tcn-section-header-subtitle">
          {subtitle}
        </Text>
      )}
    </header>
  );
});
