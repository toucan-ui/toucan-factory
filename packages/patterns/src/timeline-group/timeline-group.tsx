import { forwardRef } from 'react';
import { cn, Text } from '@toucan-ui/core';

export interface TimelineGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string;
  children: React.ReactNode;
}

export const TimelineGroup = forwardRef<HTMLDivElement, TimelineGroupProps>(function TimelineGroup(
  { date, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-timeline-group', className)} {...props}>
      <Text as="span" size="sm" muted className="tcn-timeline-group-date">
        {date}
      </Text>
      <div className="tcn-timeline-group-items">{children}</div>
    </div>
  );
});
