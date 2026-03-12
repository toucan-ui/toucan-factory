import { forwardRef } from 'react';
import { cn, Box, Avatar, Heading, Text, Button } from '@toucan-ui/core';
import type { Elevation } from '@toucan-ui/core';

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  bio?: string;
  avatarSrc?: string;
  initials?: string;
  title?: string;
  primaryAction?: string;
  onPrimaryAction?: () => void;
  secondaryAction?: string;
  onSecondaryAction?: () => void;
  elevation?: Elevation;
}

export const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(function ProfileCard(
  {
    name,
    bio,
    avatarSrc,
    initials,
    title,
    primaryAction,
    onPrimaryAction,
    secondaryAction,
    onSecondaryAction,
    elevation = 1 as Elevation,
    className,
    ...props
  },
  ref,
) {
  return (
    <Box ref={ref} elevation={elevation} className={cn('tcn-profile-card', className)} {...props}>
      <Avatar src={avatarSrc} initials={initials} alt={name} size="lg" />
      <Heading level={3} className="tcn-profile-card-name">
        {name}
      </Heading>
      {title && (
        <Text size="sm" muted>
          {title}
        </Text>
      )}
      {bio && (
        <Text muted className="tcn-profile-card-bio">
          {bio}
        </Text>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="tcn-profile-card-actions">
          {primaryAction && (
            <Button variant="primary" onClick={onPrimaryAction}>
              {primaryAction}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="secondary" onClick={onSecondaryAction}>
              {secondaryAction}
            </Button>
          )}
        </div>
      )}
    </Box>
  );
});
