import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { TextSize, TextWeight, TextVariant, TextAlign } from '../../types.js';

type TextElement = 'p' | 'span' | 'label' | 'small' | 'strong' | 'em' | 'div';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  muted?: boolean;
  mono?: boolean;
  weight?: TextWeight;
  variant?: TextVariant;
  align?: TextAlign;
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Tag = 'p',
    size = 'base',
    muted = false,
    mono = false,
    weight,
    variant,
    align,
    className,
    ...props
  },
  ref,
) {
  const isMuted = muted || variant === 'muted';
  return (
    <Tag
      ref={ref as React.RefCallback<HTMLElement>}
      className={cn('tcn-text', className)}
      data-size={size}
      data-muted={isMuted || undefined}
      data-mono={mono || undefined}
      data-weight={weight && weight !== 'regular' ? weight : undefined}
      data-variant={variant && variant !== 'default' ? variant : undefined}
      data-align={align || undefined}
      {...props}
    />
  );
});
