import type { TransitionResult } from '../types.js';

export interface ToastItem {
  id: string;
  message: string;
  description?: string;
  variant: 'info' | 'success' | 'warning' | 'danger';
  duration: number;
}

export interface ToastState {
  toasts: ToastItem[];
}

export type ToastAction =
  | { type: 'ADD'; toast: ToastItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'REMOVE_ALL' };

export function toastReducer(state: ToastState, action: ToastAction): TransitionResult<ToastState> {
  switch (action.type) {
    case 'ADD': {
      return {
        state: { toasts: [...state.toasts, action.toast] },
        effects: [],
      };
    }
    case 'REMOVE': {
      return {
        state: { toasts: state.toasts.filter((t) => t.id !== action.id) },
        effects: [],
      };
    }
    case 'REMOVE_ALL': {
      return {
        state: { toasts: [] },
        effects: [],
      };
    }
  }
}
