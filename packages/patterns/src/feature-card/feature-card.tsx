import { forwardRef } from 'react';
import { cn, Box, Heading, Text } from '@toucanui/core';
import type { Elevation } from '@toucanui/core';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  elevation?: Elevation;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(function FeatureCard(
  { title, description, icon, elevation = 1 as Elevation, className, ...props },
  ref,
) {
  return (
    <Box ref={ref} elevation={elevation} className={cn('tcn-feature-card', className)} {...props}>
      {icon && (
        <span className="tcn-feature-card-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <Heading level={3} className="tcn-feature-card-title">
        {title}
      </Heading>
      <Text muted className="tcn-feature-card-description">
        {description}
      </Text>
    </Box>
  );
});
