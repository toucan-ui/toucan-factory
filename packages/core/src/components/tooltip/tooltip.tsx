import { cloneElement, forwardRef, isValidElement, useCallback, useId, useState } from 'react';
import type { Anchor } from '../../types.js';
import { cn } from '../../utils/cn.js';
import { disclosureReducer, type DisclosureConfig } from '@toucan-ui/interactions';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  anchor?: Anchor;
  maxWidth?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const tooltipConfig: DisclosureConfig = {
  focusContentOnOpen: false,
  focusTriggerOnClose: false,
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    content,
    anchor = 'top',
    maxWidth,
    open: controlledOpen,
    onOpenChange,
    className,
    children,
    ...props
  },
  ref,
) {
  const tooltipId = `${useId()}-tooltip`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const dispatch = useCallback(
    (type: 'OPEN' | 'CLOSE' | 'ESCAPE') => {
      const result = disclosureReducer({ isOpen }, { type }, tooltipConfig);
      if (result.state.isOpen !== isOpen) {
        setOpen(result.state.isOpen);
      }
    },
    [isOpen, setOpen],
  );

  const handleMouseEnter = useCallback(() => dispatch('OPEN'), [dispatch]);
  const handleMouseLeave = useCallback(() => dispatch('CLOSE'), [dispatch]);
  const handleFocus = useCallback(() => dispatch('OPEN'), [dispatch]);
  const handleBlur = useCallback(() => dispatch('CLOSE'), [dispatch]);
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') dispatch('ESCAPE');
    },
    [dispatch],
  );

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        'aria-describedby': isOpen ? tooltipId : undefined,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
      })
    : children;

  return (
    <div ref={ref} className={cn('tcn-tooltip-wrapper', className)} {...props}>
      {trigger}
      <div
        role="tooltip"
        id={tooltipId}
        className="tcn-tooltip"
        data-anchor={anchor}
        data-visible={isOpen ? '' : undefined}
        style={maxWidth ? ({ '--tooltip-max-width': maxWidth } as React.CSSProperties) : undefined}
      >
        {content}
      </div>
    </div>
  );
});
