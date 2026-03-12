import { forwardRef } from 'react';
import { cn, Text } from '@toucan-ui/core';

export interface FieldRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  mono?: boolean;
}

export const FieldRow = forwardRef<HTMLDivElement, FieldRowProps>(function FieldRow(
  { label, value, mono = false, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-field-row', className)} {...props}>
      <Text as="span" size="sm" muted className="tcn-field-row-label">
        {label}
      </Text>
      <Text as="span" className={cn('tcn-field-row-value', mono && 'tcn-mono')}>
        {value}
      </Text>
    </div>
  );
});
