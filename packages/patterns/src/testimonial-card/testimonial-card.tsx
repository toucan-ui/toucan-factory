import { forwardRef } from 'react';
import { cn, Box, Avatar, Text } from '@toucanui/core';
import type { Elevation } from '@toucanui/core';

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
  initials?: string;
  elevation?: Elevation;
}

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  function TestimonialCard(
    { quote, name, role, avatarSrc, initials, elevation = 1 as Elevation, className, ...props },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        elevation={elevation}
        className={cn('tcn-testimonial-card', className)}
        {...props}
      >
        <blockquote className="tcn-testimonial-card-quote">
          <Text as="p" size="lg">
            {quote}
          </Text>
        </blockquote>
        <div className="tcn-testimonial-card-attribution">
          <Avatar src={avatarSrc} initials={initials} alt={name} size="sm" />
          <div className="tcn-testimonial-card-author">
            <Text as="span" className="tcn-testimonial-card-name">
              {name}
            </Text>
            {role && (
              <Text as="span" size="sm" muted>
                {role}
              </Text>
            )}
          </div>
        </div>
      </Box>
    );
  },
);
