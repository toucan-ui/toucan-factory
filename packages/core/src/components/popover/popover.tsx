import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { Anchor } from '../../types.js';
import { cn } from '../../utils/cn.js';
import {
  disclosureReducer,
  type DisclosureAction,
  type DisclosureConfig,
  type Effect,
} from '@toucanui/interactions';
import { onClickOutside } from '@toucanui/interactions/dom';

// --- Context ---

interface PopoverContextValue {
  popoverId: string;
  triggerId: string;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  anchor: Anchor;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover compound components must be used within a <Popover> parent.');
  }
  return context;
}

// --- Popover Root ---

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchor?: Anchor;
}

const popoverConfig: DisclosureConfig = {
  focusContentOnOpen: true,
  focusTriggerOnClose: true,
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    anchor = 'bottom',
    className,
    children,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const popoverId = `${baseId}-content`;
  const triggerId = `${baseId}-trigger`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
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
    (action: DisclosureAction) => {
      const result = disclosureReducer({ isOpen }, action, popoverConfig);
      if (result.state.isOpen !== isOpen) {
        if (!isControlled) setUncontrolledOpen(result.state.isOpen);
        onOpenChange?.(result.state.isOpen);
      }
      executeEffects(result.effects);
    },
    [isOpen, isControlled, onOpenChange, executeEffects],
  );

  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' }), [dispatch]);
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), [dispatch]);

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

  return (
    <PopoverContext.Provider
      value={{ popoverId, triggerId, isOpen, toggle, close, anchor, triggerRef, contentRef }}
    >
      <div ref={ref} className={cn('tcn-popover-wrapper', className)} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
});

// --- PopoverTrigger ---

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({ asChild = false, className, children, ...props }, ref) {
    const { popoverId, triggerId, isOpen, toggle, triggerRef } = usePopoverContext();

    const mergedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref, triggerRef],
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ref: mergedRef,
        id: triggerId,
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        'aria-controls': isOpen ? popoverId : undefined,
        className: cn(
          'tcn-popover-trigger',
          (children as React.ReactElement<Record<string, unknown>>).props.className as
            | string
            | undefined,
          className,
        ),
        onClick: toggle,
      });
    }

    return (
      <button
        ref={mergedRef}
        type="button"
        id={triggerId}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        className={cn('tcn-popover-trigger', className)}
        onClick={toggle}
        {...props}
      >
        {children}
      </button>
    );
  },
);

// --- PopoverContent ---

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ className, children, maxWidth, ...props }, ref) {
    const { popoverId, triggerId, isOpen, anchor, contentRef } = usePopoverContext();

    // Focus content when opened
    useEffect(() => {
      if (isOpen) {
        contentRef.current?.focus();
      }
    }, [isOpen, contentRef]);

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref, contentRef],
    );

    return (
      <div
        ref={mergedRef}
        role="dialog"
        id={popoverId}
        aria-labelledby={triggerId}
        data-anchor={anchor}
        data-open={isOpen ? '' : undefined}
        tabIndex={-1}
        className={cn('tcn-popover-content', className)}
        style={maxWidth ? ({ '--popover-max-width': maxWidth } as React.CSSProperties) : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);
