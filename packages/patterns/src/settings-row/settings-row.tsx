import { forwardRef } from 'react';
import { cn, Text, FlexItem } from '@toucanui/core';

export interface SettingsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description?: string;
  control: React.ReactNode;
}

export const SettingsRow = forwardRef<HTMLDivElement, SettingsRowProps>(function SettingsRow(
  { label, description, control, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-settings-row', className)} {...props}>
      <FlexItem grow className="tcn-settings-row-text">
        <Text as="span" className="tcn-settings-row-label">
          {label}
        </Text>
        {description && (
          <Text as="span" size="sm" muted>
            {description}
          </Text>
        )}
      </FlexItem>
      <FlexItem shrink={false} className="tcn-settings-row-control">
        {control}
      </FlexItem>
    </div>
  );
});
