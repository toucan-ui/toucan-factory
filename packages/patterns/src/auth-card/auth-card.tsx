import { forwardRef } from 'react';
import { cn, Box, Grid, Heading, Text, Input, Button } from '@toucan-ui/core';
import type { Elevation } from '@toucan-ui/core';

export interface AuthCardField {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  fields: AuthCardField[];
  submitLabel: string;
  onSubmit?: (e: React.FormEvent) => void;
  footer?: React.ReactNode;
  elevation?: Elevation;
}

export const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(function AuthCard(
  {
    title,
    description,
    fields,
    submitLabel,
    onSubmit,
    footer,
    elevation = 1 as Elevation,
    className,
    ...props
  },
  ref,
) {
  return (
    <Box ref={ref} elevation={elevation} className={cn('tcn-auth-card', className)} {...props}>
      <div className="tcn-auth-card-header">
        <Heading level={2}>{title}</Heading>
        {description && (
          <Text muted size="sm">
            {description}
          </Text>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        <Grid gap={4}>
          {fields.map((field) => (
            <Input
              key={field.label}
              label={field.label}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              required={field.required}
            />
          ))}
          <Button type="submit" variant="primary" className="tcn-auth-card-submit">
            {submitLabel}
          </Button>
        </Grid>
      </form>
      {footer && <div className="tcn-auth-card-footer">{footer}</div>}
    </Box>
  );
});
