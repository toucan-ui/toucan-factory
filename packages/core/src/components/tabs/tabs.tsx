import { createContext, forwardRef, useContext, useId } from 'react';
import type { Orientation } from '../../types.js';
import { cn } from '../../utils/cn.js';
import { useTabs } from '../../adapters/use-tabs.js';

// --- Context ---

interface TabsContextValue {
  baseId: string;
  selectedValue: string;
  onSelect: (value: string) => void;
  orientation: Orientation;
  registerTab: (value: string, disabled: boolean) => void;
  tabValues: React.MutableRefObject<Array<{ value: string; disabled: boolean }>>;
  getTabKeyHandler: (
    value: string,
    baseId: string,
  ) => (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a <Tabs> parent.');
  }
  return context;
}

// --- Tabs Root ---

export interface TabsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: Orientation;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value: controlledValue,
    defaultValue = '',
    onChange,
    orientation = 'horizontal',
    className,
    children,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const tabs = useTabs({
    value: controlledValue,
    defaultValue,
    onChange,
    orientation,
  });

  return (
    <TabsContext.Provider
      value={{
        baseId,
        selectedValue: tabs.selectedValue,
        onSelect: tabs.onSelect,
        orientation: tabs.orientation,
        registerTab: tabs.registerTab,
        tabValues: tabs.tabValues,
        getTabKeyHandler: tabs.getTabKeyHandler,
      }}
    >
      <div
        ref={ref}
        className={cn('tcn-tabs', className)}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

// --- TabList ---

export type TabListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { className, children, ...props },
  ref,
) {
  const { orientation } = useTabsContext();

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      className={cn('tcn-tabs-list', className)}
      {...props}
    >
      {children}
    </div>
  );
});

// --- Tab ---

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled = false, className, children, ...props },
  ref,
) {
  const { baseId, selectedValue, onSelect, registerTab, getTabKeyHandler } = useTabsContext();
  const isSelected = selectedValue === value;

  // Register this tab
  registerTab(value, disabled);

  const handleKeyDown = getTabKeyHandler(value, baseId);

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      data-selected={isSelected ? '' : undefined}
      className={cn('tcn-tabs-tab', className)}
      onClick={() => {
        if (!disabled) onSelect(value);
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  );
});

// --- TabPanel ---

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, children, ...props },
  ref,
) {
  const { baseId, selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      data-selected={isSelected ? '' : undefined}
      className={cn('tcn-tabs-panel', className)}
      {...props}
    >
      {children}
    </div>
  );
});
