import { forwardRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn.js';
import { useDrawer } from '../../adapters/use-drawer.js';
import type { DrawerAnchor, DrawerSize } from '../../types.js';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  anchor?: DrawerAnchor;
  size?: DrawerSize;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onClose,
    anchor = 'right',
    size = 'md',
    closeOnEscape = true,
    closeOnBackdropClick = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const drawerId = useId();
  const { dialogRef, dialogProps, backdropProps } = useDrawer({
    open,
    onClose,
    closeOnEscape,
    closeOnBackdropClick,
  });

  // Dev warning for missing accessible name
  if (process.env.NODE_ENV !== 'production') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      console.warn(
        '[tcn-drawer] Drawer requires an aria-label or aria-labelledby attribute for accessibility.',
      );
    }
  }

  // Merge refs
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref, dialogRef],
  );

  if (!open) return null;

  return createPortal(
    <>
      <div className="tcn-drawer-backdrop" {...backdropProps} />
      <div
        ref={mergedRef}
        id={drawerId}
        className={cn('tcn-drawer', className)}
        data-anchor={anchor}
        data-size={size}
        {...dialogProps}
        {...props}
      >
        {children}
      </div>
    </>,
    document.body,
  );
});
