import type { TransitionResult } from '../types.js';

export interface SliderState {
  value: number;
}

export type SliderAction =
  | { type: 'SET'; value: number }
  | { type: 'INCREASE' }
  | { type: 'DECREASE' }
  | { type: 'INCREASE_LARGE' }
  | { type: 'DECREASE_LARGE' }
  | { type: 'HOME' }
  | { type: 'END' };

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  largeStep: number;
}

export const defaultSliderConfig: SliderConfig = {
  min: 0,
  max: 100,
  step: 1,
  largeStep: 10,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number): number {
  const stepped = Math.round((value - min) / step) * step + min;
  return stepped;
}

export function sliderReducer(
  state: SliderState,
  action: SliderAction,
  config: SliderConfig = defaultSliderConfig,
): TransitionResult<SliderState> {
  const { min, max, step, largeStep } = config;

  switch (action.type) {
    case 'SET': {
      const snapped = snapToStep(clamp(action.value, min, max), min, step);
      return { state: { value: snapped }, effects: [] };
    }
    case 'INCREASE': {
      const next = clamp(state.value + step, min, max);
      return { state: { value: next }, effects: [] };
    }
    case 'DECREASE': {
      const next = clamp(state.value - step, min, max);
      return { state: { value: next }, effects: [] };
    }
    case 'INCREASE_LARGE': {
      const next = clamp(state.value + largeStep, min, max);
      return { state: { value: next }, effects: [] };
    }
    case 'DECREASE_LARGE': {
      const next = clamp(state.value - largeStep, min, max);
      return { state: { value: next }, effects: [] };
    }
    case 'HOME': {
      return { state: { value: min }, effects: [] };
    }
    case 'END': {
      return { state: { value: max }, effects: [] };
    }
  }
}
