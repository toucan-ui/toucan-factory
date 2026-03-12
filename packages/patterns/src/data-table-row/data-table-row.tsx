import { forwardRef } from 'react';
import { cn, Text, Badge, FlexItem } from '@toucanui/core';
import type { BadgeVariant } from '@toucanui/core';

export interface DataTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  secondary?: string;
  status?: string;
  statusVariant?: BadgeVariant;
  mono?: boolean;
}

export const DataTableRow = forwardRef<HTMLDivElement, DataTableRowProps>(function DataTableRow(
  { label, value, secondary, status, statusVariant = 'neutral', mono = false, className, ...props },
  ref,
) {
  return (
    <div ref={ref} role="row" className={cn('tcn-data-table-row', className)} {...props}>
      <FlexItem grow role="cell" className="tcn-data-table-row-label">
        <Text as="span">{label}</Text>
        {secondary && (
          <Text as="span" size="sm" muted className="tcn-data-table-row-secondary">
            {secondary}
          </Text>
        )}
      </FlexItem>
      <FlexItem
        shrink={false}
        role="cell"
        className={cn('tcn-data-table-row-value', mono && 'tcn-mono')}
      >
        <Text as="span">{value}</Text>
      </FlexItem>
      {status && (
        <FlexItem shrink={false} role="cell" className="tcn-data-table-row-status">
          <Badge variant={statusVariant} size="sm">
            {status}
          </Badge>
        </FlexItem>
      )}
    </div>
  );
});
