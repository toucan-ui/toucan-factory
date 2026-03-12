import type { TransitionResult } from '../types.js';

export interface DialogState {
  isOpen: boolean;
}

export type DialogAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'ESCAPE' }
  | { type: 'BACKDROP_CLICK' };

export interface DialogConfig {
  closeOnEscape: boolean;
  closeOnBackdropClick: boolean;
}

export const defaultDialogConfig: DialogConfig = {
  closeOnEscape: true,
  closeOnBackdropClick: true,
};

export function dialogReducer(
  state: DialogState,
  action: DialogAction,
  config: DialogConfig = defaultDialogConfig,
): TransitionResult<DialogState> {
  switch (action.type) {
    case 'OPEN': {
      if (state.isOpen) return { state, effects: [] };
      return {
        state: { isOpen: true },
        effects: [{ type: 'focus', target: 'content' }],
      };
    }
    case 'CLOSE': {
      if (!state.isOpen) return { state, effects: [] };
      return {
        state: { isOpen: false },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
    case 'ESCAPE': {
      if (!config.closeOnEscape || !state.isOpen) return { state, effects: [] };
      return dialogReducer(state, { type: 'CLOSE' }, config);
    }
    case 'BACKDROP_CLICK': {
      if (!config.closeOnBackdropClick || !state.isOpen) return { state, effects: [] };
      return dialogReducer(state, { type: 'CLOSE' }, config);
    }
  }
}
