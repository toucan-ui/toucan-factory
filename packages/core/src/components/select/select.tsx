import { forwardRef, useId, useMemo } from 'react';
import { cn } from '../../utils/cn.js';
import { useListbox } from '../../adapters/use-listbox.js';
import type { Item } from '@toucan-ui/interactions';
import type { Size } from '../../types.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  label?: string;
  size?: Size;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  /** Custom render function for option content. Receives the option and returns a ReactNode. */
  renderOption?: (option: SelectOption) => React.ReactNode;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    label,
    size,
    options,
    value: valueProp,
    defaultValue,
    onChange,
    placeholder = 'Select an option',
    description,
    error,
    required,
    disabled,
    hideLabel: hideLabelProp,
    renderOption,
    className,
    id: idProp,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const hideLabel = hideLabelProp ?? !label;

  // Map options to Item[] for the machine
  const items: Item[] = useMemo(
    () => options.map((o) => ({ id: o.value, disabled: !!o.disabled })),
    [options],
  );

  const listbox = useListbox({
    items,
    value: valueProp,
    defaultValue,
    onChange,
    disabled,
  });

  const selectedOption = options.find((o) => o.value === listbox.selectedValue);

  const describedByParts: string[] = [];
  if (description) describedByParts.push(descriptionId);
  if (error) describedByParts.push(errorId);
  const describedBy = describedByParts.length ? describedByParts.join(' ') : undefined;

  const optionId = (index: number) => `${id}-option-${index}`;

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown': {
        e.preventDefault();
        listbox.dispatch({ type: 'OPEN', selectedValue: listbox.selectedValue });
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        listbox.dispatch({ type: 'OPEN_LAST' });
        break;
      }
    }
  };

  const handleListboxKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        listbox.dispatch({ type: 'ARROW_DOWN' });
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        listbox.dispatch({ type: 'ARROW_UP' });
        break;
      }
      case 'Home': {
        e.preventDefault();
        listbox.dispatch({ type: 'HOME' });
        break;
      }
      case 'End': {
        e.preventDefault();
        listbox.dispatch({ type: 'END' });
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        listbox.dispatch({ type: 'SELECT' });
        break;
      }
      case 'Escape': {
        e.preventDefault();
        listbox.dispatch({ type: 'ESCAPE' });
        break;
      }
      case 'Tab': {
        listbox.dispatch({ type: 'TAB' });
        break;
      }
    }
  };

  return (
    <div
      ref={ref}
      className={cn('tcn-select-wrapper', className)}
      data-error={error ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-required={required ? '' : undefined}
      data-open={listbox.isOpen ? '' : undefined}
      data-size={size ?? undefined}
      {...props}
    >
      <span
        className="tcn-select-label"
        id={labelId}
        data-visually-hidden={hideLabel ? '' : undefined}
      >
        {label}
      </span>
      <div className="tcn-select-sizer" aria-hidden="true">
        {options.map((option) => (
          <span key={option.value}>{renderOption ? renderOption(option) : option.label}</span>
        ))}
      </div>
      <button
        ref={listbox.triggerRef}
        type="button"
        className="tcn-select-trigger"
        role="combobox"
        aria-expanded={listbox.isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-controls={listbox.isOpen ? listboxId : undefined}
        aria-activedescendant={
          listbox.isOpen && listbox.activeIndex >= 0 ? optionId(listbox.activeIndex) : undefined
        }
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        data-placeholder={!selectedOption ? '' : undefined}
        disabled={disabled}
        onClick={() => listbox.dispatch({ type: 'TOGGLE', selectedValue: listbox.selectedValue })}
        onKeyDown={listbox.isOpen ? handleListboxKeyDown : handleTriggerKeyDown}
      >
        <span className="tcn-select-value">
          {selectedOption
            ? renderOption
              ? renderOption(selectedOption)
              : selectedOption.label
            : placeholder}
        </span>
        <span className="tcn-select-icon" aria-hidden="true" />
      </button>
      {listbox.isOpen && (
        <ul
          ref={listbox.listboxRef}
          className="tcn-select-listbox"
          role="listbox"
          id={listboxId}
          aria-labelledby={labelId}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className="tcn-select-option"
              role="option"
              id={optionId(index)}
              aria-selected={option.value === listbox.selectedValue}
              aria-disabled={option.disabled || undefined}
              data-active={index === listbox.activeIndex ? '' : undefined}
              data-disabled={option.disabled ? '' : undefined}
              onMouseEnter={() => listbox.dispatch({ type: 'HOVER', index })}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => listbox.dispatch({ type: 'CLICK_OPTION', index })}
            >
              {renderOption ? renderOption(option) : option.label}
            </li>
          ))}
        </ul>
      )}
      {description && (
        <div className="tcn-select-description" id={descriptionId}>
          {description}
        </div>
      )}
      <div className="tcn-select-error" id={errorId} role="alert" aria-atomic="true">
        {error}
      </div>
    </div>
  );
});
