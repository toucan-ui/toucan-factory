import { forwardRef } from 'react';
import { cn, Heading, Text, Button } from '@toucan-ui/core';

export interface HeroFullProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  backgroundSrc?: string;
}

export const HeroFull = forwardRef<HTMLDivElement, HeroFullProps>(function HeroFull(
  { title, subtitle, ctaLabel, onCtaClick, backgroundSrc, className, style, ...props },
  ref,
) {
  const bgStyle = backgroundSrc ? { ...style, backgroundImage: `url(${backgroundSrc})` } : style;

  return (
    <div ref={ref} className={cn('tcn-hero-full', className)} style={bgStyle} {...props}>
      <div className="tcn-hero-full-overlay">
        <div className="tcn-hero-full-content">
          <Heading level={1} display="lg">
            {title}
          </Heading>
          {subtitle && (
            <Text as="p" size="lg" className="tcn-hero-full-subtitle">
              {subtitle}
            </Text>
          )}
          {ctaLabel && (
            <Button variant="primary" size="lg" className="tcn-hero-full-cta" onClick={onCtaClick}>
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});
