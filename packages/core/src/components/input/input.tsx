import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn.js';
import type { Size } from '../../types.js';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
  size?: Size;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    description,
    error,
    required,
    hideLabel: hideLabelProp,
    size,
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
      className={cn('tcn-input-wrapper', className)}
      data-error={error ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-required={required ? '' : undefined}
      data-size={size ?? undefined}
    >
      <label
        className="tcn-input-label"
        htmlFor={id}
        data-visually-hidden={hideLabel ? '' : undefined}
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className="tcn-input"
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {description && (
        <div className="tcn-input-description" id={descriptionId}>
          {description}
        </div>
      )}
      <div className="tcn-input-error" id={errorId} role="alert" aria-atomic="true">
        {error}
      </div>
    </div>
  );
});
