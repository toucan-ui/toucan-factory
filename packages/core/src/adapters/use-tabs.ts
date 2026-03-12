import { useCallback, useRef, useState } from 'react';
import {
  tabsReducer,
  tabsKeyToAction,
  type TabsConfig,
  type Item,
  type Orientation,
  type Effect,
} from '@toucan-ui/interactions';

export interface UseTabsOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: Orientation;
}

export interface UseTabsReturn {
  selectedValue: string;
  orientation: Orientation;
  tabValues: React.MutableRefObject<Array<{ value: string; disabled: boolean }>>;
  onSelect: (value: string) => void;
  registerTab: (value: string, disabled: boolean) => void;
  getTabKeyHandler: (
    value: string,
    baseId: string,
  ) => (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export function useTabs(options: UseTabsOptions = {}): UseTabsReturn {
  const {
    value: controlledValue,
    defaultValue = '',
    onChange,
    orientation = 'horizontal',
  } = options;

  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;
  const tabValues = useRef<Array<{ value: string; disabled: boolean }>>([]);

  const onSelect = useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolledValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const registerTab = useCallback((val: string, disabled: boolean) => {
    const existing = tabValues.current.find((t) => t.value === val);
    if (existing) {
      existing.disabled = disabled;
    } else {
      tabValues.current.push({ value: val, disabled });
    }
  }, []);

  const toItems = useCallback((): Item[] => {
    return tabValues.current.map((t) => ({ id: t.value, disabled: t.disabled }));
  }, []);

  const executeEffects = useCallback((effects: Effect[], baseId: string) => {
    for (const effect of effects) {
      if (effect.type === 'focus' && effect.target === 'item' && effect.index !== undefined) {
        const targetValue = tabValues.current[effect.index]?.value;
        if (targetValue) {
          const targetId = `${baseId}-tab-${targetValue}`;
          document.getElementById(targetId)?.focus();
        }
      }
    }
  }, []);

  const getTabKeyHandler = useCallback(
    (value: string, baseId: string) => {
      return (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const items = toItems();
        const currentIndex = items.findIndex((t) => t.id === value);
        if (currentIndex === -1) return;

        const action = tabsKeyToAction(event.key, orientation, currentIndex);
        if (!action) return;

        event.preventDefault();
        const config: TabsConfig = { items, orientation };
        const result = tabsReducer({ selectedValue }, action, config);

        if (result.state.selectedValue !== selectedValue) {
          onSelect(result.state.selectedValue);
        }
        executeEffects(result.effects, baseId);
      };
    },
    [orientation, selectedValue, onSelect, toItems, executeEffects],
  );

  return {
    selectedValue,
    orientation,
    tabValues,
    onSelect,
    registerTab,
    getTabKeyHandler,
  };
}
