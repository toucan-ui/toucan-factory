import type { Item, TransitionResult } from '../types.js';
import {
  getNextEnabledIndex,
  getPrevEnabledIndex,
  getFirstEnabledIndex,
  getLastEnabledIndex,
} from './navigation.js';

export interface ListboxState {
  isOpen: boolean;
  activeIndex: number;
  selectedValue: string;
}

export type ListboxAction =
  | { type: 'OPEN'; selectedValue?: string }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE'; selectedValue?: string }
  | { type: 'ARROW_DOWN' }
  | { type: 'ARROW_UP' }
  | { type: 'HOME' }
  | { type: 'END' }
  | { type: 'SELECT' }
  | { type: 'HOVER'; index: number }
  | { type: 'CLICK_OPTION'; index: number }
  | { type: 'CLICK_OUTSIDE' }
  | { type: 'TAB' }
  | { type: 'ESCAPE' }
  | { type: 'OPEN_LAST' };

export interface ListboxConfig {
  items: Item[];
}

function findSelectedIndex(items: Item[], selectedValue: string): number {
  return items.findIndex((item) => item.id === selectedValue);
}

function initialActiveIndex(items: Item[], selectedValue?: string): number {
  if (selectedValue) {
    const idx = findSelectedIndex(items, selectedValue);
    if (idx >= 0 && !items[idx].disabled) return idx;
  }
  return getFirstEnabledIndex(items);
}

export function listboxReducer(
  state: ListboxState,
  action: ListboxAction,
  config: ListboxConfig,
): TransitionResult<ListboxState> {
  const { items } = config;

  switch (action.type) {
    case 'OPEN': {
      if (state.isOpen) return { state, effects: [] };
      const activeIdx = initialActiveIndex(items, action.selectedValue ?? state.selectedValue);
      return {
        state: { ...state, isOpen: true, activeIndex: activeIdx },
        effects: activeIdx >= 0 ? [{ type: 'scrollIntoView', index: activeIdx }] : [],
      };
    }
    case 'OPEN_LAST': {
      if (state.isOpen) return { state, effects: [] };
      const lastIdx = getLastEnabledIndex(items);
      return {
        state: { ...state, isOpen: true, activeIndex: lastIdx },
        effects: lastIdx >= 0 ? [{ type: 'scrollIntoView', index: lastIdx }] : [],
      };
    }
    case 'CLOSE': {
      if (!state.isOpen) return { state, effects: [] };
      return {
        state: { ...state, isOpen: false, activeIndex: -1 },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
    case 'TOGGLE': {
      if (state.isOpen) {
        return listboxReducer(state, { type: 'CLOSE' }, config);
      }
      return listboxReducer(state, { type: 'OPEN', selectedValue: action.selectedValue }, config);
    }
    case 'ARROW_DOWN': {
      if (!state.isOpen) return { state, effects: [] };
      const next = getNextEnabledIndex(items, state.activeIndex, false);
      if (next === state.activeIndex) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: next },
        effects: [{ type: 'scrollIntoView', index: next }],
      };
    }
    case 'ARROW_UP': {
      if (!state.isOpen) return { state, effects: [] };
      const prev = getPrevEnabledIndex(items, state.activeIndex, false);
      if (prev === state.activeIndex) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: prev },
        effects: [{ type: 'scrollIntoView', index: prev }],
      };
    }
    case 'HOME': {
      if (!state.isOpen) return { state, effects: [] };
      const first = getFirstEnabledIndex(items);
      if (first < 0) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: first },
        effects: [{ type: 'scrollIntoView', index: first }],
      };
    }
    case 'END': {
      if (!state.isOpen) return { state, effects: [] };
      const last = getLastEnabledIndex(items);
      if (last < 0) return { state, effects: [] };
      return {
        state: { ...state, activeIndex: last },
        effects: [{ type: 'scrollIntoView', index: last }],
      };
    }
    case 'SELECT': {
      if (!state.isOpen || state.activeIndex < 0) return { state, effects: [] };
      const item = items[state.activeIndex];
      if (!item || item.disabled) return { state, effects: [] };
      return {
        state: { isOpen: false, activeIndex: -1, selectedValue: item.id },
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
    case 'CLICK_OPTION': {
      const item = items[action.index];
      if (!item || item.disabled) return { state, effects: [] };
      return {
        state: { isOpen: false, activeIndex: -1, selectedValue: item.id },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
    case 'CLICK_OUTSIDE':
    case 'TAB':
    case 'ESCAPE': {
      if (!state.isOpen) return { state, effects: [] };
      return {
        state: { ...state, isOpen: false, activeIndex: -1 },
        effects: [{ type: 'focus', target: 'trigger' }],
      };
    }
  }
}
