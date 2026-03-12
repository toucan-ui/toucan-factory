import { useCallback, useMemo, useRef, useState } from 'react';
import { sliderReducer, type SliderConfig } from '@toucanui/interactions';

export interface UseSliderOptions {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

export interface UseSliderReturn {
  value: number;
  percentage: number;
  trackProps: {
    ref: React.RefObject<HTMLDivElement | null>;
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  };
  thumbProps: {
    role: 'slider';
    tabIndex: number;
    'aria-valuenow': number;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-orientation': 'horizontal' | 'vertical';
    'aria-disabled': boolean | undefined;
    onKeyDown: (event: React.KeyboardEvent) => void;
    onPointerDown: (event: React.PointerEvent) => void;
  };
}

export function useSlider(options: UseSliderOptions = {}): UseSliderReturn {
  const {
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    orientation = 'horizontal',
    disabled = false,
  } = options;

  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : uncontrolledValue;
  const trackRef = useRef<HTMLDivElement>(null);

  const config = useMemo<SliderConfig>(
    () => ({ min, max, step, largeStep: step * 10 }),
    [min, max, step],
  );

  const percentage = max === min ? 0 : ((currentValue - min) / (max - min)) * 100;

  const setValue = useCallback(
    (newValue: number) => {
      const result = sliderReducer(
        { value: currentValue },
        { type: 'SET', value: newValue },
        config,
      );
      if (!isControlled) setUncontrolledValue(result.state.value);
      onChange?.(result.state.value);
    },
    [currentValue, config, isControlled, onChange],
  );

  const dispatch = useCallback(
    (
      actionType: 'INCREASE' | 'DECREASE' | 'INCREASE_LARGE' | 'DECREASE_LARGE' | 'HOME' | 'END',
    ) => {
      const result = sliderReducer({ value: currentValue }, { type: actionType }, config);
      if (!isControlled) setUncontrolledValue(result.state.value);
      onChange?.(result.state.value);
    },
    [currentValue, config, isControlled, onChange],
  );

  const getValueFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      if (!track) return currentValue;
      const rect = track.getBoundingClientRect();

      let ratio: number;
      if (orientation === 'horizontal') {
        ratio = (clientX - rect.left) / rect.width;
      } else {
        ratio = 1 - (clientY - rect.top) / rect.height;
      }

      ratio = Math.min(Math.max(ratio, 0), 1);
      return min + ratio * (max - min);
    },
    [orientation, min, max, currentValue],
  );

  const handleTrackPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      event.preventDefault();
      const value = getValueFromPointer(event.clientX, event.clientY);
      setValue(value);
    },
    [disabled, getValueFromPointer, setValue],
  );

  const handleThumbPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();

      const target = event.currentTarget as HTMLElement;
      target.setPointerCapture(event.pointerId);

      const handleMove = (e: PointerEvent) => {
        const value = getValueFromPointer(e.clientX, e.clientY);
        setValue(value);
      };

      const handleUp = () => {
        target.removeEventListener('pointermove', handleMove);
        target.removeEventListener('pointerup', handleUp);
      };

      target.addEventListener('pointermove', handleMove);
      target.addEventListener('pointerup', handleUp);
    },
    [disabled, getValueFromPointer, setValue],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;
      const isVertical = orientation === 'vertical';

      const keyMap: Record<
        string,
        'INCREASE' | 'DECREASE' | 'INCREASE_LARGE' | 'DECREASE_LARGE' | 'HOME' | 'END'
      > = {
        ArrowRight: isVertical ? 'INCREASE' : 'INCREASE',
        ArrowUp: 'INCREASE',
        ArrowLeft: isVertical ? 'DECREASE' : 'DECREASE',
        ArrowDown: 'DECREASE',
        PageUp: 'INCREASE_LARGE',
        PageDown: 'DECREASE_LARGE',
        Home: 'HOME',
        End: 'END',
      };

      const action = keyMap[event.key];
      if (action) {
        event.preventDefault();
        dispatch(action);
      }
    },
    [disabled, orientation, dispatch],
  );

  return {
    value: currentValue,
    percentage,
    trackProps: {
      ref: trackRef,
      onPointerDown: handleTrackPointerDown,
    },
    thumbProps: {
      role: 'slider',
      tabIndex: disabled ? -1 : 0,
      'aria-valuenow': currentValue,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-orientation': orientation,
      'aria-disabled': disabled || undefined,
      onKeyDown: handleKeyDown,
      onPointerDown: handleThumbPointerDown,
    },
  };
}
