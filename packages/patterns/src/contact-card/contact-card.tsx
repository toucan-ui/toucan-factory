import { forwardRef } from 'react';
import { cn, Box, Avatar, Heading, Text, Badge, FlexItem } from '@toucan-ui/core';
import type { BadgeVariant, Elevation } from '@toucan-ui/core';

export interface ContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  title?: string;
  avatarSrc?: string;
  initials?: string;
  status?: string;
  statusVariant?: BadgeVariant;
  email?: string;
  elevation?: Elevation;
}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(function ContactCard(
  {
    name,
    title,
    avatarSrc,
    initials,
    status,
    statusVariant = 'neutral',
    email,
    elevation = 1 as Elevation,
    className,
    ...props
  },
  ref,
) {
  return (
    <Box ref={ref} elevation={elevation} className={cn('tcn-contact-card', className)} {...props}>
      <div className="tcn-contact-card-header">
        <Avatar src={avatarSrc} initials={initials} alt={name} size="md" />
        <FlexItem grow className="tcn-contact-card-info">
          <Heading level={4} className="tcn-contact-card-name">
            {name}
          </Heading>
          {title && (
            <Text as="span" size="sm" muted>
              {title}
            </Text>
          )}
        </FlexItem>
        {status && (
          <Badge variant={statusVariant} size="sm">
            {status}
          </Badge>
        )}
      </div>
      {email && (
        <Text as="span" size="sm" muted className="tcn-contact-card-email">
          {email}
        </Text>
      )}
    </Box>
  );
});
