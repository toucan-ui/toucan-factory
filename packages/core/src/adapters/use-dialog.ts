import { useCallback, useEffect, useRef } from 'react';
import { dialogReducer, type DialogConfig, type Effect } from '@toucanui/interactions';
import { createFocusTrap, lockScroll, saveFocus } from '@toucanui/interactions/dom';

export interface UseDialogOptions {
  open: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
}

export interface UseDialogReturn {
  dialogRef: React.RefObject<HTMLDivElement | null>;
  dialogProps: {
    role: 'dialog';
    'aria-modal': true;
    tabIndex: -1;
  };
  backdropProps: {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  };
}

export function useDialog(options: UseDialogOptions): UseDialogReturn {
  const { open, onClose, closeOnEscape = true, closeOnBackdropClick = true } = options;

  const dialogRef = useRef<HTMLDivElement>(null);

  const config: DialogConfig = { closeOnEscape, closeOnBackdropClick };

  const executeEffects = useCallback((effects: Effect[]) => {
    for (const effect of effects) {
      if (effect.type === 'focus' && effect.target === 'trigger') {
        // Trigger focus is handled by focus restore
      }
    }
  }, []);

  const dispatch = useCallback(
    (actionType: 'ESCAPE' | 'BACKDROP_CLICK') => {
      const result = dialogReducer({ isOpen: open }, { type: actionType }, config);
      if (!result.state.isOpen && open) {
        onClose();
      }
      executeEffects(result.effects);
    },
    [open, config, onClose, executeEffects],
  );

  // Save and restore focus
  useEffect(() => {
    if (!open) return;
    const restore = saveFocus();
    return () => restore();
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    return createFocusTrap(dialogRef.current);
  }, [open]);

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    return lockScroll();
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        dispatch('ESCAPE');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscape, dispatch]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        dispatch('BACKDROP_CLICK');
      }
    },
    [dispatch],
  );

  return {
    dialogRef,
    dialogProps: {
      role: 'dialog',
      'aria-modal': true,
      tabIndex: -1,
    },
    backdropProps: {
      onClick: handleBackdropClick,
    },
  };
}
