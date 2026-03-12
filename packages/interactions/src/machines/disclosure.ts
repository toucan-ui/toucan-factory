import type { Effect, TransitionResult } from '../types.js';

export interface DisclosureState {
  isOpen: boolean;
}

export type DisclosureAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'ESCAPE' }
  | { type: 'CLICK_OUTSIDE' };

export interface DisclosureConfig {
  focusContentOnOpen: boolean;
  focusTriggerOnClose: boolean;
}

export const defaultDisclosureConfig: DisclosureConfig = {
  focusContentOnOpen: true,
  focusTriggerOnClose: true,
};

export function disclosureReducer(
  state: DisclosureState,
  action: DisclosureAction,
  config: DisclosureConfig = defaultDisclosureConfig,
): TransitionResult<DisclosureState> {
  switch (action.type) {
    case 'OPEN': {
      if (state.isOpen) return { state, effects: [] };
      const effects: Effect[] = [];
      if (config.focusContentOnOpen) effects.push({ type: 'focus', target: 'content' });
      return { state: { isOpen: true }, effects };
    }
    case 'CLOSE': {
      if (!state.isOpen) return { state, effects: [] };
      const effects: Effect[] = [];
      if (config.focusTriggerOnClose) effects.push({ type: 'focus', target: 'trigger' });
      return { state: { isOpen: false }, effects };
    }
    case 'TOGGLE': {
      return disclosureReducer(state, { type: state.isOpen ? 'CLOSE' : 'OPEN' }, config);
    }
    case 'ESCAPE':
    case 'CLICK_OUTSIDE': {
      if (!state.isOpen) return { state, effects: [] };
      return disclosureReducer(state, { type: 'CLOSE' }, config);
    }
  }
}
