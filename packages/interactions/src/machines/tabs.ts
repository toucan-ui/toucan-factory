import type { Item, Orientation, TransitionResult } from '../types.js';
import {
  getNextEnabledIndex,
  getPrevEnabledIndex,
  getFirstEnabledIndex,
  getLastEnabledIndex,
} from './navigation.js';

export interface TabsState {
  selectedValue: string;
}

export type TabsAction =
  | { type: 'SELECT'; value: string }
  | { type: 'ARROW_NEXT'; currentIndex: number }
  | { type: 'ARROW_PREV'; currentIndex: number }
  | { type: 'HOME' }
  | { type: 'END' };

export interface TabsConfig {
  items: Item[];
  orientation: Orientation;
}

export function tabsReducer(
  state: TabsState,
  action: TabsAction,
  config: TabsConfig,
): TransitionResult<TabsState> {
  const { items } = config;

  switch (action.type) {
    case 'SELECT': {
      return {
        state: { selectedValue: action.value },
        effects: [],
      };
    }
    case 'ARROW_NEXT': {
      const nextIdx = getNextEnabledIndex(items, action.currentIndex, true);
      if (nextIdx < 0 || nextIdx === action.currentIndex) return { state, effects: [] };
      const value = items[nextIdx].id;
      return {
        state: { selectedValue: value },
        effects: [{ type: 'focus', target: 'item', index: nextIdx }],
      };
    }
    case 'ARROW_PREV': {
      const prevIdx = getPrevEnabledIndex(items, action.currentIndex, true);
      if (prevIdx < 0 || prevIdx === action.currentIndex) return { state, effects: [] };
      const value = items[prevIdx].id;
      return {
        state: { selectedValue: value },
        effects: [{ type: 'focus', target: 'item', index: prevIdx }],
      };
    }
    case 'HOME': {
      const firstIdx = getFirstEnabledIndex(items);
      if (firstIdx < 0) return { state, effects: [] };
      const value = items[firstIdx].id;
      return {
        state: { selectedValue: value },
        effects: [{ type: 'focus', target: 'item', index: firstIdx }],
      };
    }
    case 'END': {
      const lastIdx = getLastEnabledIndex(items);
      if (lastIdx < 0) return { state, effects: [] };
      const value = items[lastIdx].id;
      return {
        state: { selectedValue: value },
        effects: [{ type: 'focus', target: 'item', index: lastIdx }],
      };
    }
  }
}

export function tabsKeyToAction(
  key: string,
  orientation: Orientation,
  currentIndex: number,
): TabsAction | null {
  const isHorizontal = orientation === 'horizontal';
  const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
  const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

  if (key === nextKey) return { type: 'ARROW_NEXT', currentIndex };
  if (key === prevKey) return { type: 'ARROW_PREV', currentIndex };
  if (key === 'Home') return { type: 'HOME' };
  if (key === 'End') return { type: 'END' };
  return null;
}
