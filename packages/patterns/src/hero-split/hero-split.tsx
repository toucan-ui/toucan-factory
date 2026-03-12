import { forwardRef } from 'react';
import { cn, Heading, Text, Button, FlexItem } from '@toucanui/core';

export interface HeroSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export const HeroSplit = forwardRef<HTMLDivElement, HeroSplitProps>(function HeroSplit(
  {
    title,
    subtitle,
    ctaLabel,
    onCtaClick,
    imageSrc,
    imageAlt = '',
    reverse = false,
    className,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('tcn-hero-split', reverse && 'tcn-hero-split--reverse', className)}
      {...props}
    >
      <FlexItem grow className="tcn-hero-split-content">
        <Heading level={1} display="lg">
          {title}
        </Heading>
        {subtitle && (
          <Text as="p" size="lg" className="tcn-hero-split-subtitle">
            {subtitle}
          </Text>
        )}
        {ctaLabel && (
          <Button variant="primary" size="lg" className="tcn-hero-split-cta" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        )}
      </FlexItem>
      {imageSrc && (
        <FlexItem grow className="tcn-hero-split-image">
          <img src={imageSrc} alt={imageAlt} />
        </FlexItem>
      )}
    </div>
  );
});
