import { forwardRef } from 'react';
import { cn, Grid, Heading, Text, Separator } from '@toucanui/core';

export interface FormSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection = forwardRef<HTMLElement, FormSectionProps>(function FormSection(
  { title, description, children, className, ...props },
  ref,
) {
  return (
    <fieldset
      ref={ref as React.Ref<HTMLFieldSetElement>}
      className={cn('tcn-form-section', className)}
      {...(props as React.FieldsetHTMLAttributes<HTMLFieldSetElement>)}
    >
      <legend className="tcn-form-section-legend">
        <Heading level={3} className="tcn-form-section-title">
          {title}
        </Heading>
        {description && (
          <Text muted size="sm" className="tcn-form-section-description">
            {description}
          </Text>
        )}
      </legend>
      <Separator />
      <Grid gap={4}>{children}</Grid>
    </fieldset>
  );
});
