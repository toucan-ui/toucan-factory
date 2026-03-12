import { forwardRef } from 'react';
import { cn, Box, Text, Badge } from '@toucan-ui/core';
import type { BadgeVariant, Elevation } from '@toucan-ui/core';

export type Trend = 'up' | 'down' | 'flat';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change?: string;
  trend?: Trend;
  elevation?: Elevation;
}

const trendVariantMap: Record<Trend, BadgeVariant> = {
  up: 'success',
  down: 'danger',
  flat: 'neutral',
};

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(function MetricCard(
  {
    label,
    value,
    change,
    trend = 'flat' as Trend,
    elevation = 1 as Elevation,
    className,
    ...props
  },
  ref,
) {
  return (
    <Box ref={ref} elevation={elevation} className={cn('tcn-metric-card', className)} {...props}>
      <Text as="span" size="sm" muted className="tcn-metric-card-label">
        {label}
      </Text>
      <span className="tcn-metric-card-value">{value}</span>
      {change && (
        <div className="tcn-metric-card-change">
          <Badge variant={trendVariantMap[trend]} size="sm">
            {change}
          </Badge>
        </div>
      )}
    </Box>
  );
});
