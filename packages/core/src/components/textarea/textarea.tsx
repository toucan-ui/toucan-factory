import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn.js';

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'children'
> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    description,
    error,
    required,
    hideLabel: hideLabelProp,
    resize = 'vertical',
    disabled,
    className,
    id: idProp,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const hideLabel = hideLabelProp ?? !label;

  const describedByParts: string[] = [];
  if (description) describedByParts.push(descriptionId);
  if (error) describedByParts.push(errorId);
  const describedBy = describedByParts.length ? describedByParts.join(' ') : undefined;

  return (
    <div
      className={cn('tcn-textarea-wrapper', className)}
      data-error={error ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-required={required ? '' : undefined}
    >
      <label
        className="tcn-textarea-label"
        htmlFor={id}
        data-visually-hidden={hideLabel ? '' : undefined}
      >
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        className="tcn-textarea"
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        data-resize={resize}
        {...props}
      />
      {description && (
        <div className="tcn-textarea-description" id={descriptionId}>
          {description}
        </div>
      )}
      <div className="tcn-textarea-error" id={errorId} role="alert" aria-atomic="true">
        {error}
      </div>
    </div>
  );
});
