import { forwardRef } from 'react';
import { cn, Box, Heading, Text, Button, Separator } from '@toucan-ui/core';
import type { Elevation } from '@toucan-ui/core';

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
  elevation?: Elevation;
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(function PricingCard(
  {
    tier,
    price,
    period,
    description,
    features,
    ctaLabel,
    onCtaClick,
    highlighted = false,
    elevation = 1 as Elevation,
    className,
    ...props
  },
  ref,
) {
  return (
    <Box
      ref={ref}
      elevation={elevation}
      className={cn('tcn-pricing-card', highlighted && 'tcn-pricing-card--highlighted', className)}
      {...props}
    >
      <div className="tcn-pricing-card-header">
        <Heading level={3} className="tcn-pricing-card-tier">
          {tier}
        </Heading>
        <div className="tcn-pricing-card-price">
          <span className="tcn-pricing-card-amount">{price}</span>
          {period && (
            <Text as="span" size="sm" muted>
              /{period}
            </Text>
          )}
        </div>
        {description && (
          <Text muted size="sm">
            {description}
          </Text>
        )}
      </div>
      <Separator />
      <ul className="tcn-pricing-card-features" role="list">
        {features.map((feature) => (
          <li key={feature} className="tcn-pricing-card-feature">
            <Text as="span" size="sm">
              {feature}
            </Text>
          </li>
        ))}
      </ul>
      {ctaLabel && (
        <Button
          variant={highlighted ? 'primary' : 'secondary'}
          className="tcn-pricing-card-cta"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      )}
    </Box>
  );
});
