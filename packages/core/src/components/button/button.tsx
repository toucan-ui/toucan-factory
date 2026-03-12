import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { ButtonVariant, ButtonElement, Size } from '../../types.js';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
  toggle?: boolean;
  pressed?: boolean;
  iconOnly?: boolean;
  as?: ButtonElement;
};

export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
        as?: 'button';
      })
    | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { as: 'a' })
  );

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      as: Tag = 'button',
      variant = 'primary',
      size = 'md',
      loading = false,
      toggle = false,
      pressed,
      iconOnly = false,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const isButton = Tag === 'button';
    const disabled = isButton
      ? (props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled
      : undefined;
    const isDisabled = disabled || loading;

    if (process.env.NODE_ENV !== 'production') {
      if (toggle && pressed === undefined) {
        console.warn(
          '[tcn-button] toggle={true} requires a `pressed` prop to control the toggle state.',
        );
      }
      if (iconOnly && !props['aria-label'] && !props['aria-labelledby']) {
        console.warn(
          '[tcn-button] iconOnly buttons must have an accessible name. ' +
            'Provide `aria-label` or `aria-labelledby`.',
        );
      }
    }

    const sharedProps = {
      ref: ref as React.Ref<HTMLElement>,
      className: cn('tcn-button', className),
      'data-variant': variant,
      'data-size': size,
      'data-loading': loading || undefined,
      'data-disabled': isDisabled || undefined,
      'data-toggle': toggle || undefined,
      'data-pressed': toggle ? String(!!pressed) : undefined,
      'data-icon-only': iconOnly || undefined,
      'aria-busy': loading || undefined,
      'aria-pressed': toggle ? !!pressed : undefined,
    };

    if (isButton) {
      const { disabled: _, ...buttonRest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
      return (
        <button
          {...sharedProps}
          ref={ref as React.Ref<HTMLButtonElement>}
          type={(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>).type ?? 'button'}
          disabled={isDisabled}
          {...buttonRest}
        >
          {children}
        </button>
      );
    }

    return (
      <a
        {...sharedProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  },
);
