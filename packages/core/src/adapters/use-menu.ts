import { useCallback, useEffect, useRef, useState } from 'react';
import {
  menuReducer,
  type MenuAction,
  type MenuConfig,
  type Item,
  type Effect,
} from '@toucanui/interactions';
import { onClickOutside } from '@toucanui/interactions/dom';

export interface UseMenuOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseMenuReturn {
  isOpen: boolean;
  activeIndex: number;
  items: React.MutableRefObject<Item[]>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  dispatch: (action: MenuAction) => void;
}

export function useMenu(options: UseMenuOptions = {}): UseMenuReturn {
  const { open: controlledOpen, defaultOpen = false, onOpenChange } = options;

  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const [activeIndex, setActiveIndex] = useState(-1);
  const items = useRef<Item[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const executeEffects = useCallback((effects: Effect[]) => {
    for (const effect of effects) {
      if (effect.type === 'focus') {
        if (effect.target === 'trigger') triggerRef.current?.focus();
        if (effect.target === 'content') contentRef.current?.focus();
      }
    }
  }, []);

  const dispatch = useCallback(
    (action: MenuAction) => {
      const currentConfig: MenuConfig = { items: items.current };
      const result = menuReducer({ isOpen, activeIndex }, action, currentConfig);
      const next = result.state;

      if (next.isOpen !== isOpen) {
        if (!isControlled) setUncontrolledOpen(next.isOpen);
        onOpenChange?.(next.isOpen);
      }
      if (next.activeIndex !== activeIndex) setActiveIndex(next.activeIndex);

      executeEffects(result.effects);
    },
    [isOpen, activeIndex, isControlled, onOpenChange, executeEffects],
  );

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    return onClickOutside([triggerRef.current, contentRef.current], () =>
      dispatch({ type: 'CLICK_OUTSIDE' }),
    );
  }, [isOpen, dispatch]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        dispatch({ type: 'ESCAPE' });
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  // Focus content on open
  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  return {
    isOpen,
    activeIndex,
    items,
    triggerRef,
    contentRef,
    dispatch,
  };
}
