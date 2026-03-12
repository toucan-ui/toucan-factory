import { createContext, forwardRef, useContext, useId } from 'react';
import type { AccordionType } from '../../types.js';
import { cn } from '../../utils/cn.js';
import { useAccordion } from '../../adapters/use-accordion.js';

// --- Contexts ---

interface AccordionContextValue {
  baseId: string;
  expandedValues: string[];
  toggleItem: (value: string) => void;
  type: AccordionType;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion compound components must be used within an <Accordion> parent.');
  }
  return context;
}

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionTrigger and AccordionPanel must be used within an <AccordionItem> parent.',
    );
  }
  return context;
}

// --- Accordion Root ---

export interface AccordionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = 'single',
    value: controlledValue,
    defaultValue,
    onChange,
    collapsible = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const { expandedValues, toggleItem } = useAccordion({
    type,
    value: controlledValue,
    defaultValue,
    onChange,
    collapsible,
  });

  return (
    <AccordionContext.Provider value={{ baseId, expandedValues, toggleItem, type }}>
      <div ref={ref} className={cn('tcn-accordion', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

// --- AccordionItem ---

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, disabled = false, className, children, ...props },
  ref,
) {
  const { expandedValues } = useAccordionContext();
  const isOpen = expandedValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        ref={ref}
        className={cn('tcn-accordion-item', className)}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

// --- AccordionTrigger ---

export type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, ...props }, ref) {
    const { baseId, toggleItem } = useAccordionContext();
    const { value, isOpen, disabled } = useAccordionItemContext();

    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        className={cn('tcn-accordion-trigger', className)}
        onClick={() => {
          if (!disabled) toggleItem(value);
        }}
        {...props}
      >
        <span>{children}</span>
        <svg
          className="tcn-accordion-indicator"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    );
  },
);

// --- AccordionPanel ---

export type AccordionPanelProps = React.HTMLAttributes<HTMLDivElement>;

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  function AccordionPanel({ className, children, ...props }, ref) {
    const { baseId } = useAccordionContext();
    const { value, isOpen } = useAccordionItemContext();

    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <div
        ref={ref}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className={cn('tcn-accordion-panel', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
