import { forwardRef } from 'react';
import { cn, Avatar, Text, FlexItem } from '@toucanui/core';

export interface CommentThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  user: string;
  userInitials?: string;
  userAvatarSrc?: string;
  timestamp: string;
  body: string;
  replyLabel?: string;
  onReply?: () => void;
}

export const CommentThread = forwardRef<HTMLDivElement, CommentThreadProps>(function CommentThread(
  {
    user,
    userInitials,
    userAvatarSrc,
    timestamp,
    body,
    replyLabel = 'Reply',
    onReply,
    className,
    ...props
  },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-comment-thread', className)} {...props}>
      <Avatar src={userAvatarSrc} initials={userInitials} alt={user} size="sm" />
      <FlexItem grow className="tcn-comment-thread-content">
        <div className="tcn-comment-thread-header">
          <Text as="span" className="tcn-comment-thread-user">
            {user}
          </Text>
          <Text as="span" size="sm" muted>
            {timestamp}
          </Text>
        </div>
        <Text as="p" className="tcn-comment-thread-body">
          {body}
        </Text>
        {onReply && (
          <button type="button" className="tcn-comment-thread-reply" onClick={onReply}>
            {replyLabel}
          </button>
        )}
      </FlexItem>
    </div>
  );
});
