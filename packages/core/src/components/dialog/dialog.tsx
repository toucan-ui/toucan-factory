import { forwardRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn.js';
import { useDialog } from '../../adapters/use-dialog.js';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    open,
    onClose,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const dialogId = useId();
  const { dialogRef, dialogProps, backdropProps } = useDialog({
    open,
    onClose,
    closeOnEscape,
    closeOnBackdropClick,
  });

  // Dev warning for missing accessible name
  if (process.env.NODE_ENV !== 'production') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      console.warn(
        '[tcn-dialog] Dialog requires an aria-label or aria-labelledby attribute for accessibility.',
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
    <div className="tcn-dialog-backdrop" {...backdropProps}>
      <div
        ref={mergedRef}
        id={dialogId}
        className={cn('tcn-dialog', className)}
        {...dialogProps}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
});
