import { forwardRef, useId, useState, useCallback } from 'react';
import { cn } from '../../utils/cn.js';
import type { ToggleSize } from '../../types.js';

export interface ToggleProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'role' | 'aria-checked' | 'onChange'
> {
  label: string;
  description?: string;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  hideLabel?: boolean;
  size?: ToggleSize;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    label,
    description,
    disabled,
    checked: checkedProp,
    defaultChecked = false,
    onChange,
    hideLabel = false,
    size = 'md',
    className,
    id: idProp,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checkedProp : internalChecked;

  if (process.env.NODE_ENV !== 'production') {
    if (isControlled && !onChange) {
      console.warn(
        '[tcn-toggle] `checked` was provided without an `onChange` handler. ' +
          'This will render a read-only toggle. If the toggle should be interactive, ' +
          'provide an `onChange` handler.',
      );
    }
  }

  const handleClick = useCallback(() => {
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  }, [isChecked, isControlled, onChange]);

  return (
    <div className={cn('tcn-toggle-wrapper', className)} data-disabled={disabled ? '' : undefined}>
      <button
        ref={ref}
        type="button"
        id={id}
        className="tcn-toggle"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        data-checked={isChecked ? '' : undefined}
        data-size={size}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        <span className="tcn-toggle-thumb" aria-hidden="true" />
      </button>
      <div className="tcn-toggle-content" data-visually-hidden={hideLabel ? '' : undefined}>
        <span className="tcn-toggle-label" id={labelId}>
          {label}
        </span>
        {description && (
          <div className="tcn-toggle-description" id={descriptionId}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
});
