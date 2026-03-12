import type { Item, TransitionResult } from '../types.js';
import {
  getNextEnabledIndex,
  getPrevEnabledIndex,
  getFirstEnabledIndex,
  getLastEnabledIndex,
} from './navigation.js';

export interface MenuState {
  isOpen: boolean;
  activeIndex: number;
}

export type MenuAction =
  | { type: 'OPEN_FIRST' }
  | { type: 'OPEN_LAST' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'ARROW_DOWN' }
  | { type: 'ARROW_UP' }
  | { type: 'HOME' }
  | { type: 'END' }
  | { type: 'ACTIVATE' }
  | { type: 'HOVER'; index: number }
  | { type: 'CLICK_OUTSIDE' }
  | { type: 'TAB' }
  | { type: 'ESCAPE' };

export interface MenuConfig {
  items: Item[];
}

export function menuReducer(
  state: MenuState,
  action: MenuAction,
  config: MenuConfig,
): TransitionResult<MenuState> {
  const { items } = config;

  switch (action.type) {
    case 'OPEN_FIRST': {
      if (state.isOpen) return { state, effects: [] };
      const first = getFirstEnabledIndex(items);
      return {
        state: { isOpen: true, activeIndex: first },
        effects: [{ type: 'focus', target: 'content' }],
      };
    }
    case 'OPEN_LAST': {
      if (state.isOpen) return { state, effects: [] };
      const last = getLastEnabledIndex(items);
      return {
        state: { isOpen: true, activeIndex: last },
        effects: [{ type: 'focus', target: 'content' }],
      };
    }
    case 'CLOSE': {
      if (!state.isOpen) return { state, effects: [] };
      return {
        state: { isOpen: false, activeIndex: -1 },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
    case 'TOGGLE': {
      if (state.isOpen) {
        return menuReducer(state, { type: 'CLOSE' }, config);
      }
      return menuReducer(state, { type: 'OPEN_FIRST' }, config);
    }
    case 'ARROW_DOWN': {
      if (!state.isOpen) return { state, effects: [] };
      const next = getNextEnabledIndex(items, state.activeIndex, true);
      if (next === state.activeIndex) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: next },
        effects: [],
      };
    }
    case 'ARROW_UP': {
      if (!state.isOpen) return { state, effects: [] };
      const prev = getPrevEnabledIndex(items, state.activeIndex, true);
      if (prev === state.activeIndex) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: prev },
        effects: [],
      };
    }
    case 'HOME': {
      if (!state.isOpen) return { state, effects: [] };
      const first = getFirstEnabledIndex(items);
      if (first < 0) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: first },
        effects: [],
      };
    }
    case 'END': {
      if (!state.isOpen) return { state, effects: [] };
      const last = getLastEnabledIndex(items);
      if (last < 0) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: last },
        effects: [],
      };
    }
    case 'ACTIVATE': {
      if (!state.isOpen || state.activeIndex < 0) return { state, effects: [] };
      const item = items[state.activeIndex];
      if (!item || item.disabled) return { state, effects: [] };
      return {
        state: { isOpen: false, activeIndex: -1 },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
    case 'HOVER': {
      if (!state.isOpen) return { state, effects: [] };
      const item = items[action.index];
      if (!item || item.disabled) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: action.index },
        effects: [],
      };
    }
    case 'CLICK_OUTSIDE':
    case 'TAB':
    case 'ESCAPE': {
      if (!state.isOpen) return { state, effects: [] };
      return {
        state: { isOpen: false, activeIndex: -1 },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
  }
}
