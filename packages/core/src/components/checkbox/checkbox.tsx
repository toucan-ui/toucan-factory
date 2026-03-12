import { forwardRef, useId, useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '../../utils/cn.js';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    error,
    required,
    hideLabel = false,
    indeterminate = false,
    disabled,
    className,
    id: idProp,
    checked: checkedProp,
    defaultChecked,
    onChange,
    ...props
  },
  forwardedRef,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const internalRef = useRef<HTMLInputElement>(null);
  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isChecked = isControlled ? checkedProp : internalChecked;

  const describedByParts: string[] = [];
  if (description) describedByParts.push(descriptionId);
  if (error) describedByParts.push(errorId);
  const describedBy = describedByParts.length ? describedByParts.join(' ') : undefined;

  // Merge forwarded ref with internal ref
  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  // Set indeterminate DOM property (not an HTML attribute)
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  return (
    <div
      className={cn('tcn-checkbox-wrapper', className)}
      data-error={error ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-required={required ? '' : undefined}
    >
      <div className="tcn-checkbox-control">
        <input
          ref={mergedRef}
          type="checkbox"
          id={id}
          className="tcn-checkbox-native"
          disabled={disabled}
          required={required}
          checked={isControlled ? checkedProp : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          {...props}
        />
        <span
          className="tcn-checkbox-indicator"
          aria-hidden="true"
          data-checked={isChecked && !indeterminate ? '' : undefined}
          data-indeterminate={indeterminate ? '' : undefined}
        />
      </div>
      <div className="tcn-checkbox-content" data-visually-hidden={hideLabel ? '' : undefined}>
        <label className="tcn-checkbox-label" htmlFor={id}>
          {label}
        </label>
        {description && (
          <div className="tcn-checkbox-description" id={descriptionId}>
            {description}
          </div>
        )}
      </div>
      <div className="tcn-checkbox-error" id={errorId} role="alert" aria-atomic="true">
        {error}
      </div>
    </div>
  );
});
