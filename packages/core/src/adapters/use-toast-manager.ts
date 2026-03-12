import { useCallback, useRef, useState } from 'react';
import { toastReducer, type ToastItem, type ToastState } from '@toucan-ui/interactions';

let nextId = 0;

interface TimerEntry {
  timerId: ReturnType<typeof setTimeout>;
  remaining: number;
  startedAt: number;
}

export interface ToastOptions {
  message: string;
  description?: string;
  variant?: ToastItem['variant'];
  duration?: number;
}

export interface UseToastManagerReturn {
  toasts: ToastItem[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  pauseTimers: () => void;
  resumeTimers: () => void;
}

export function useToastManager(maxToasts: number = 5): UseToastManagerReturn {
  const [state, setState] = useState<ToastState>({ toasts: [] });
  const timersRef = useRef<Map<string, TimerEntry>>(new Map());

  const dispatch = useCallback((action: Parameters<typeof toastReducer>[1]) => {
    setState((prev) => {
      const result = toastReducer(prev, action);
      return result.state;
    });
  }, []);

  const clearTimer = useCallback((id: string) => {
    const entry = timersRef.current.get(id);
    if (entry) {
      clearTimeout(entry.timerId);
      timersRef.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      clearTimer(id);
      dispatch({ type: 'REMOVE', id });
    },
    [clearTimer, dispatch],
  );

  const startTimer = useCallback(
    (id: string, duration: number) => {
      if (duration <= 0) return;
      const timerId = setTimeout(() => {
        timersRef.current.delete(id);
        dispatch({ type: 'REMOVE', id });
      }, duration);
      timersRef.current.set(id, { timerId, remaining: duration, startedAt: Date.now() });
    },
    [dispatch],
  );

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${nextId++}`;
      const item: ToastItem = {
        id,
        message: options.message,
        description: options.description,
        variant: options.variant ?? 'info',
        duration: options.duration ?? 5000,
      };

      dispatch({ type: 'ADD', toast: item });
      startTimer(id, item.duration);

      // Enforce maxToasts by removing oldest
      setState((prev) => {
        if (prev.toasts.length > maxToasts) {
          const removed = prev.toasts[0];
          clearTimer(removed.id);
          return { toasts: prev.toasts.slice(1) };
        }
        return prev;
      });

      return id;
    },
    [dispatch, startTimer, maxToasts, clearTimer],
  );

  const dismissAll = useCallback(() => {
    for (const [id] of timersRef.current) {
      clearTimer(id);
    }
    dispatch({ type: 'REMOVE_ALL' });
  }, [clearTimer, dispatch]);

  const pauseTimers = useCallback(() => {
    const now = Date.now();
    for (const [, entry] of timersRef.current) {
      clearTimeout(entry.timerId);
      const elapsed = now - entry.startedAt;
      entry.remaining = Math.max(0, entry.remaining - elapsed);
    }
  }, []);

  const resumeTimers = useCallback(() => {
    for (const [id, entry] of timersRef.current) {
      if (entry.remaining <= 0) continue;
      entry.startedAt = Date.now();
      entry.timerId = setTimeout(() => {
        timersRef.current.delete(id);
        dispatch({ type: 'REMOVE', id });
      }, entry.remaining);
    }
  }, [dispatch]);

  return { toasts: state.toasts, toast, dismiss, dismissAll, pauseTimers, resumeTimers };
}
