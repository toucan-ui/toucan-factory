import { forwardRef, useId, useState, createContext, useContext } from 'react';
import { cn } from '../../utils/cn.js';
import type { Orientation } from '../../types.js';

// ---------- Context ----------

interface RadioGroupContextValue {
  name: string;
  value: string;
  disabled: boolean;
  required: boolean;
  error: string | undefined;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('Radio must be used within a RadioGroup');
  }
  return ctx;
}

// ---------- RadioGroup ----------

export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: Orientation;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    label,
    description,
    error,
    required,
    hideLabel: hideLabelProp,
    name: nameProp,
    value: valueProp,
    defaultValue,
    onChange,
    disabled = false,
    orientation = 'vertical',
    className,
    id: idProp,
    children,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const generatedName = useId();
  const name = nameProp ?? generatedName;
  const hideLabel = hideLabelProp ?? !label;

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectedValue = isControlled ? valueProp : internalValue;

  const describedByParts: string[] = [];
  if (description) describedByParts.push(descriptionId);
  if (error) describedByParts.push(errorId);
  const describedBy = describedByParts.length ? describedByParts.join(' ') : undefined;

  const handleChange = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: selectedValue,
        disabled,
        required: required ?? false,
        error,
        onChange: handleChange,
      }}
    >
      <div
        ref={ref}
        className={cn('tcn-radio-group', className)}
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        data-error={error ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        data-required={required ? '' : undefined}
        {...props}
      >
        <span
          className="tcn-radio-group-label"
          id={labelId}
          data-visually-hidden={hideLabel ? '' : undefined}
        >
          {label}
        </span>
        {description && (
          <div className="tcn-radio-group-description" id={descriptionId}>
            {description}
          </div>
        )}
        <div className="tcn-radio-group-items" data-orientation={orientation}>
          {children}
        </div>
        <div className="tcn-radio-group-error" id={errorId} role="alert" aria-atomic="true">
          {error}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
});

// ---------- Radio ----------

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'checked' | 'onChange'
> {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, disabled: disabledProp, className, id: idProp, ...props },
  ref,
) {
  const group = useRadioGroup();
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = `${id}-description`;

  const isDisabled = group.disabled || disabledProp;
  const isChecked = group.value === value;

  const handleChange = () => {
    group.onChange(value);
  };

  return (
    <div className={cn('tcn-radio-wrapper', className)} data-disabled={isDisabled ? '' : undefined}>
      <div className="tcn-radio-control">
        <input
          ref={ref}
          type="radio"
          id={id}
          className="tcn-radio-native"
          name={group.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          required={group.required}
          aria-describedby={description ? descriptionId : undefined}
          onChange={handleChange}
          {...props}
        />
        <span
          className="tcn-radio-indicator"
          aria-hidden="true"
          data-checked={isChecked ? '' : undefined}
        />
      </div>
      <div className="tcn-radio-content">
        <label className="tcn-radio-label" htmlFor={id}>
          {label}
        </label>
        {description && (
          <div className="tcn-radio-description" id={descriptionId}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
});
