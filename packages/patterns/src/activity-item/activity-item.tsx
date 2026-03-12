import { forwardRef } from 'react';
import { cn, Avatar, Text, FlexItem } from '@toucanui/core';

export interface ActivityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  user: string;
  userInitials?: string;
  userAvatarSrc?: string;
  action: string;
  timestamp: string;
  detail?: string;
}

export const ActivityItem = forwardRef<HTMLDivElement, ActivityItemProps>(function ActivityItem(
  { user, userInitials, userAvatarSrc, action, timestamp, detail, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-activity-item', className)} {...props}>
      <Avatar src={userAvatarSrc} initials={userInitials} alt={user} size="sm" />
      <FlexItem grow className="tcn-activity-item-content">
        <Text as="span" size="sm">
          <strong className="tcn-activity-item-user">{user}</strong> {action}
        </Text>
        {detail && (
          <Text as="span" size="sm" muted>
            {detail}
          </Text>
        )}
        <Text as="span" size="sm" muted className="tcn-activity-item-timestamp">
          {timestamp}
        </Text>
      </FlexItem>
    </div>
  );
});
