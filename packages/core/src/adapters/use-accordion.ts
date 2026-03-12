import { useCallback, useState } from 'react';
import type { AccordionType } from '../types.js';

export interface UseAccordionOptions {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

export interface UseAccordionReturn {
  expandedValues: string[];
  toggleItem: (value: string) => void;
}

function normalizeValue(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export function useAccordion(options: UseAccordionOptions = {}): UseAccordionReturn {
  const {
    type = 'single',
    value: controlledValue,
    defaultValue,
    onChange,
    collapsible = true,
  } = options;

  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
    normalizeValue(defaultValue),
  );
  const expandedValues = isControlled ? normalizeValue(controlledValue) : uncontrolledValue;

  const toggleItem = useCallback(
    (itemValue: string) => {
      const isOpen = expandedValues.includes(itemValue);

      let next: string[];
      if (isOpen) {
        if (!collapsible && type === 'single') return;
        next = expandedValues.filter((v) => v !== itemValue);
      } else {
        if (type === 'single') {
          next = [itemValue];
        } else {
          next = [...expandedValues, itemValue];
        }
      }

      if (!isControlled) setUncontrolledValue(next);
      onChange?.(type === 'single' ? (next[0] ?? '') : next);
    },
    [expandedValues, type, collapsible, isControlled, onChange],
  );

  return { expandedValues, toggleItem };
}
