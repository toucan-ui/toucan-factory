import { forwardRef } from 'react';
import { cn, Heading, Text, Button } from '@toucan-ui/core';

export interface HeroCenteredProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export const HeroCentered = forwardRef<HTMLDivElement, HeroCenteredProps>(function HeroCentered(
  { title, subtitle, ctaLabel, onCtaClick, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-hero-centered', className)} {...props}>
      <Heading level={1} display="lg">
        {title}
      </Heading>
      {subtitle && (
        <Text as="p" size="lg" className="tcn-hero-centered-subtitle">
          {subtitle}
        </Text>
      )}
      {ctaLabel && (
        <Button variant="primary" size="lg" className="tcn-hero-centered-cta" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
});
