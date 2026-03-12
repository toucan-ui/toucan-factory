import { forwardRef } from 'react';
import { cn, Box, Text, Badge } from '@toucanui/core';
import type { BadgeVariant, Elevation } from '@toucanui/core';

export type StatTrend = 'up' | 'down' | 'flat';

export interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: StatTrend;
}

export interface StatsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Stat[];
  elevation?: Elevation;
}

const trendVariantMap: Record<StatTrend, BadgeVariant> = {
  up: 'success',
  down: 'danger',
  flat: 'neutral',
};

export const StatsRow = forwardRef<HTMLDivElement, StatsRowProps>(function StatsRow(
  { stats, elevation = 1 as Elevation, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-stats-row', className)} {...props}>
      {stats.map((stat) => (
        <Box key={stat.label} elevation={elevation} className="tcn-stats-row-item">
          <Text as="span" size="sm" muted className="tcn-stats-row-label">
            {stat.label}
          </Text>
          <span className="tcn-stats-row-value">{stat.value}</span>
          {stat.change && (
            <Badge variant={trendVariantMap[stat.trend ?? 'flat']} size="sm">
              {stat.change}
            </Badge>
          )}
        </Box>
      ))}
    </div>
  );
});
