import { useCallback, useEffect, useRef, useState } from 'react';
import {
  disclosureReducer,
  type DisclosureAction,
  type DisclosureConfig,
  type Effect,
} from '@toucanui/interactions';
import { onClickOutside } from '@toucanui/interactions/dom';

export interface UseDisclosureOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  focusContentOnOpen?: boolean;
  focusTriggerOnClose?: boolean;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerProps: {
    onClick: () => void;
    'aria-expanded': boolean;
  };
  contentProps: {
    tabIndex: -1;
  };
  close: () => void;
}

export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    focusContentOnOpen = true,
    focusTriggerOnClose = true,
  } = options;

  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const config: DisclosureConfig = {
    focusContentOnOpen,
    focusTriggerOnClose,
  };

  const executeEffects = useCallback((effects: Effect[]) => {
    for (const effect of effects) {
      if (effect.type === 'focus') {
        if (effect.target === 'trigger') triggerRef.current?.focus();
        if (effect.target === 'content') contentRef.current?.focus();
      }
    }
  }, []);

  const dispatch = useCallback(
    (action: DisclosureAction) => {
      const result = disclosureReducer({ isOpen }, action, config);
      if (result.state.isOpen !== isOpen) {
        if (!isControlled) setUncontrolledOpen(result.state.isOpen);
        onOpenChange?.(result.state.isOpen);
      }
      executeEffects(result.effects);
    },
    [isOpen, isControlled, onOpenChange, config, executeEffects],
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
    if (isOpen && focusContentOnOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen, focusContentOnOpen]);

  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' }), [dispatch]);
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), [dispatch]);

  return {
    isOpen,
    triggerRef,
    contentRef,
    triggerProps: {
      onClick: toggle,
      'aria-expanded': isOpen,
    },
    contentProps: {
      tabIndex: -1,
    },
    close,
  };
}
