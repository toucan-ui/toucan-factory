import { useCallback, useEffect, useRef, useState } from 'react';
import {
  listboxReducer,
  type ListboxAction,
  type ListboxConfig,
  type Item,
  type Effect,
} from '@toucan-ui/interactions';
import { onClickOutside, scrollIntoView } from '@toucan-ui/interactions/dom';

export interface UseListboxOptions {
  items: Item[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export interface UseListboxReturn {
  isOpen: boolean;
  activeIndex: number;
  selectedValue: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  listboxRef: React.RefObject<HTMLUListElement | null>;
  dispatch: (action: ListboxAction) => void;
}

export function useListbox(options: UseListboxOptions): UseListboxReturn {
  const { items, value: controlledValue, defaultValue = '', onChange, disabled = false } = options;

  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const config: ListboxConfig = { items };

  const executeEffects = useCallback((effects: Effect[]) => {
    for (const effect of effects) {
      if (effect.type === 'focus' && effect.target === 'trigger') {
        triggerRef.current?.focus();
      }
      if (effect.type === 'scrollIntoView') {
        // Defer to allow DOM to render
        requestAnimationFrame(() => {
          const listbox = listboxRef.current;
          const activeEl = listbox?.querySelector('[data-active]') as HTMLElement | null;
          if (activeEl) scrollIntoView(activeEl);
        });
      }
    }
  }, []);

  const dispatch = useCallback(
    (action: ListboxAction) => {
      if (
        disabled &&
        (action.type === 'OPEN' || action.type === 'TOGGLE' || action.type === 'OPEN_LAST')
      ) {
        return;
      }

      const currentState = { isOpen, activeIndex, selectedValue };
      const result = listboxReducer(currentState, action, config);
      const next = result.state;

      if (next.isOpen !== isOpen) setIsOpen(next.isOpen);
      if (next.activeIndex !== activeIndex) setActiveIndex(next.activeIndex);
      if (next.selectedValue !== selectedValue) {
        if (!isControlled) setUncontrolledValue(next.selectedValue);
        onChange?.(next.selectedValue);
      }

      executeEffects(result.effects);
    },
    [isOpen, activeIndex, selectedValue, disabled, isControlled, onChange, config, executeEffects],
  );

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    return onClickOutside([triggerRef.current, listboxRef.current], () =>
      dispatch({ type: 'CLICK_OUTSIDE' }),
    );
  }, [isOpen, dispatch]);

  return {
    isOpen,
    activeIndex,
    selectedValue,
    triggerRef,
    listboxRef,
    dispatch,
  };
}
