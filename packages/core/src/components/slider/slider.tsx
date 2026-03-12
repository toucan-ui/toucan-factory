import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import { useSlider } from '../../adapters/use-slider.js';

export interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  label?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value: controlledValue,
    defaultValue,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    orientation = 'horizontal',
    disabled = false,
    label,
    className,
    ...props
  },
  ref,
) {
  const slider = useSlider({
    value: controlledValue,
    defaultValue,
    onChange,
    min,
    max,
    step,
    orientation,
    disabled,
  });

  // Dev warning: no accessible label
  if (
    process.env.NODE_ENV !== 'production' &&
    !label &&
    !props['aria-label'] &&
    !props['aria-labelledby']
  ) {
    console.warn(
      '[tcn-slider] Slider requires a label, aria-label, or aria-labelledby attribute for accessibility.',
    );
  }

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={ref}
      className={cn('tcn-slider', className)}
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      {...props}
    >
      <div className="tcn-slider-track" {...slider.trackProps}>
        <div
          className="tcn-slider-fill"
          style={
            isHorizontal ? { width: `${slider.percentage}%` } : { height: `${slider.percentage}%` }
          }
        />
        <div
          className="tcn-slider-thumb"
          style={
            isHorizontal ? { left: `${slider.percentage}%` } : { bottom: `${slider.percentage}%` }
          }
          aria-label={label ?? props['aria-label']}
          {...slider.thumbProps}
        />
      </div>
    </div>
  );
});
