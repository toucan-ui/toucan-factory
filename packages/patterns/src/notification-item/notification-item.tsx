import { forwardRef } from 'react';
import { cn, Avatar, Text, FlexItem } from '@toucanui/core';

export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  user: string;
  userInitials?: string;
  userAvatarSrc?: string;
  message: string;
  timestamp: string;
  unread?: boolean;
  href?: string;
  onDismiss?: () => void;
}

export const NotificationItem = forwardRef<HTMLDivElement, NotificationItemProps>(
  function NotificationItem(
    {
      user,
      userInitials,
      userAvatarSrc,
      message,
      timestamp,
      unread = false,
      href,
      onDismiss,
      className,
      ...props
    },
    ref,
  ) {
    const content = (
      <>
        <FlexItem shrink={false} className="tcn-notification-item-left">
          {unread && <span className="tcn-notification-item-dot" aria-hidden="true" />}
          <Avatar src={userAvatarSrc} initials={userInitials} alt={user} size="sm" />
        </FlexItem>
        <FlexItem grow className="tcn-notification-item-content">
          <Text as="span" size="sm">
            <strong>{user}</strong> {message}
          </Text>
          <Text as="span" size="sm" muted className="tcn-notification-item-timestamp">
            {timestamp}
          </Text>
        </FlexItem>
        {onDismiss && (
          <button
            type="button"
            className="tcn-notification-item-dismiss"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDismiss();
            }}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        )}
      </>
    );

    return href ? (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(
          'tcn-notification-item',
          unread && 'tcn-notification-item--unread',
          className,
        )}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    ) : (
      <div
        ref={ref}
        className={cn(
          'tcn-notification-item',
          unread && 'tcn-notification-item--unread',
          className,
        )}
        {...props}
      >
        {content}
      </div>
    );
  },
);
