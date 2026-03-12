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
} from 'react';
import type { Anchor } from '../../types.js';
import { cn } from '../../utils/cn.js';
import { useMenu } from '../../adapters/use-menu.js';
import type { Item, MenuAction } from '@toucanui/interactions';

// --- Context ---

interface DropdownMenuContextValue {
  menuId: string;
  triggerId: string;
  isOpen: boolean;
  dispatch: (action: MenuAction) => void;
  anchor: Anchor;
  activeIndex: number;
  items: React.MutableRefObject<Item[]>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'DropdownMenu compound components must be used within a <DropdownMenu> parent.',
    );
  }
  return context;
}

// --- DropdownMenu Root ---

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchor?: Anchor;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
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
  const menuId = `${baseId}-menu`;
  const triggerId = `${baseId}-trigger`;

  const menu = useMenu({
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
  });

  return (
    <DropdownMenuContext.Provider
      value={{
        menuId,
        triggerId,
        isOpen: menu.isOpen,
        dispatch: menu.dispatch,
        anchor,
        activeIndex: menu.activeIndex,
        items: menu.items,
        triggerRef: menu.triggerRef,
        contentRef: menu.contentRef,
      }}
    >
      <div ref={ref} className={cn('tcn-dropdown-wrapper', className)} {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
});

// --- DropdownMenuTrigger ---

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ asChild = false, className, children, ...props }, ref) {
    const { menuId, triggerId, isOpen, dispatch, triggerRef, contentRef } =
      useDropdownMenuContext();

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

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (!isOpen) {
            dispatch({ type: 'OPEN_FIRST' });
          } else {
            dispatch({ type: 'ARROW_DOWN' });
            contentRef.current?.focus();
          }
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (!isOpen) {
            dispatch({ type: 'OPEN_LAST' });
          } else {
            dispatch({ type: 'ARROW_UP' });
            contentRef.current?.focus();
          }
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (!isOpen) dispatch({ type: 'OPEN_FIRST' });
        }
      },
      [isOpen, dispatch, contentRef],
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ref: mergedRef,
        id: triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        'aria-controls': isOpen ? menuId : undefined,
        className: cn(
          'tcn-dropdown-trigger',
          (children as React.ReactElement<Record<string, unknown>>).props.className as
            | string
            | undefined,
          className,
        ),
        onClick: () => dispatch({ type: 'TOGGLE' }),
        onKeyDown: handleKeyDown,
      });
    }

    return (
      <button
        ref={mergedRef}
        type="button"
        id={triggerId}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        className={cn('tcn-dropdown-trigger', className)}
        onClick={() => dispatch({ type: 'TOGGLE' })}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  },
);

// --- DropdownMenuContent ---

export type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ className, children, ...props }, ref) {
    const { menuId, triggerId, isOpen, dispatch, anchor, activeIndex, items, contentRef } =
      useDropdownMenuContext();

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

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            dispatch({ type: 'ARROW_DOWN' });
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            dispatch({ type: 'ARROW_UP' });
            break;
          }
          case 'Home': {
            event.preventDefault();
            dispatch({ type: 'HOME' });
            break;
          }
          case 'End': {
            event.preventDefault();
            dispatch({ type: 'END' });
            break;
          }
          case 'Enter':
          case ' ': {
            event.preventDefault();
            if (activeIndex >= 0 && !items.current[activeIndex]?.disabled) {
              const activeId = items.current[activeIndex]?.id;
              if (activeId) {
                const el = document.getElementById(activeId);
                el?.click();
              }
            }
            break;
          }
          case 'Tab': {
            dispatch({ type: 'TAB' });
            break;
          }
        }
      },
      [activeIndex, dispatch, items],
    );

    const activeItemId = activeIndex >= 0 ? items.current[activeIndex]?.id : undefined;

    return (
      <div
        ref={mergedRef}
        role="menu"
        id={menuId}
        aria-labelledby={triggerId}
        aria-activedescendant={activeItemId}
        data-anchor={anchor}
        data-open={isOpen ? '' : undefined}
        tabIndex={-1}
        className={cn('tcn-dropdown-content', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);

// --- DropdownMenuItem ---

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onSelect?: () => void;
  asChild?: boolean;
}

let itemCounter = 0;

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem(
    { disabled = false, onSelect, asChild = false, className, children, ...props },
    ref,
  ) {
    const { items, activeIndex, dispatch } = useDropdownMenuContext();
    const itemIdRef = useRef<string>('');
    const indexRef = useRef(-1);

    // Register item on mount
    useEffect(() => {
      const id = `tcn-dropdown-item-${itemCounter++}`;
      itemIdRef.current = id;
      const currentItems = items.current;
      const index = currentItems.length;
      indexRef.current = index;
      currentItems.push({ id, disabled });

      return () => {
        const idx = currentItems.findIndex((item) => item.id === id);
        if (idx >= 0) {
          currentItems.splice(idx, 1);
        }
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update disabled state
    useEffect(() => {
      const item = items.current.find((i) => i.id === itemIdRef.current);
      if (item) {
        item.disabled = disabled;
      }
    }, [disabled, items]);

    const isActive = indexRef.current === activeIndex;

    const handleClick = useCallback(() => {
      if (disabled) return;
      onSelect?.();
      dispatch({ type: 'CLOSE' });
    }, [disabled, onSelect, dispatch]);

    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        dispatch({ type: 'HOVER', index: indexRef.current });
      }
    }, [disabled, dispatch]);

    const sharedProps = {
      role: 'menuitem' as const,
      id: itemIdRef.current,
      tabIndex: -1,
      'data-active': isActive ? '' : undefined,
      'data-disabled': disabled ? '' : undefined,
      'aria-disabled': disabled || undefined,
      className: cn('tcn-dropdown-item', className),
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
    };

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ref,
        ...sharedProps,
        className: cn(
          'tcn-dropdown-item',
          (children as React.ReactElement<Record<string, unknown>>).props.className as
            | string
            | undefined,
          className,
        ),
        ...props,
      });
    }

    return (
      <div ref={ref} {...sharedProps} {...props}>
        {children}
      </div>
    );
  },
);

// --- DropdownMenuSeparator ---

export type DropdownMenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn('tcn-dropdown-separator', className)}
        {...props}
      />
    );
  },
);

// --- DropdownMenuLabel ---

export type DropdownMenuLabelProps = React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  function DropdownMenuLabel({ className, children, ...props }, ref) {
    return (
      <div ref={ref} role="presentation" className={cn('tcn-dropdown-label', className)} {...props}>
        {children}
      </div>
    );
  },
);
