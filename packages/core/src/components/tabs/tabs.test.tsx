import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanel } from './tabs.js';

function renderTabs(props: Record<string, unknown> = {}) {
  return render(
    <Tabs {...props}>
      <TabList>
        <Tab value="one">Tab One</Tab>
        <Tab value="two">Tab Two</Tab>
        <Tab value="three">Tab Three</Tab>
      </TabList>
      <TabPanel value="one">Panel One</TabPanel>
      <TabPanel value="two">Panel Two</TabPanel>
      <TabPanel value="three">Panel Three</TabPanel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  // --- Rendering ---

  it('renders a tablist with tabs', () => {
    renderTabs({ defaultValue: 'one' });
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('renders tab panels', () => {
    renderTabs({ defaultValue: 'one' });
    expect(screen.getAllByRole('tabpanel')).toHaveLength(3);
  });

  it('applies tcn-tabs class', () => {
    const { container } = renderTabs({ defaultValue: 'one' });
    expect(container.firstChild).toHaveClass('tcn-tabs');
  });

  it('sets data-orientation attribute', () => {
    const { container } = renderTabs({ defaultValue: 'one', orientation: 'vertical' });
    expect(container.firstChild).toHaveAttribute('data-orientation', 'vertical');
  });

  // --- Selection (uncontrolled) ---

  it('selects default tab', () => {
    renderTabs({ defaultValue: 'two' });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'one' });
    const tabs = screen.getAllByRole('tab');
    await user.click(tabs[1]);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange on tab click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'one', onChange });
    await user.click(screen.getAllByRole('tab')[2]);
    expect(onChange).toHaveBeenCalledWith('three');
  });

  // --- Selection (controlled) ---

  it('respects controlled value', () => {
    renderTabs({ value: 'three' });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange in controlled mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderTabs({ value: 'one', onChange });
    await user.click(screen.getAllByRole('tab')[1]);
    expect(onChange).toHaveBeenCalledWith('two');
  });

  // --- Keyboard (horizontal) ---

  it('navigates to next tab with ArrowRight', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'one' });
    screen.getAllByRole('tab')[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[1]);
    expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates to previous tab with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'two' });
    screen.getAllByRole('tab')[1].focus();
    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[0]);
  });

  it('wraps from last to first with ArrowRight', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'three' });
    screen.getAllByRole('tab')[2].focus();
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[0]);
  });

  it('wraps from first to last with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'one' });
    screen.getAllByRole('tab')[0].focus();
    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[2]);
  });

  it('navigates to first tab with Home', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'three' });
    screen.getAllByRole('tab')[2].focus();
    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[0]);
  });

  it('navigates to last tab with End', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'one' });
    screen.getAllByRole('tab')[0].focus();
    await user.keyboard('{End}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[2]);
  });

  // --- Keyboard (vertical) ---

  it('navigates with ArrowDown in vertical mode', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'one', orientation: 'vertical' });
    screen.getAllByRole('tab')[0].focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[1]);
  });

  it('navigates with ArrowUp in vertical mode', async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: 'two', orientation: 'vertical' });
    screen.getAllByRole('tab')[1].focus();
    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[0]);
  });

  // --- Disabled tabs ---

  it('skips disabled tabs when navigating', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">Tab One</Tab>
          <Tab value="two" disabled>
            Tab Two
          </Tab>
          <Tab value="three">Tab Three</Tab>
        </TabList>
        <TabPanel value="one">Panel One</TabPanel>
        <TabPanel value="two">Panel Two</TabPanel>
        <TabPanel value="three">Panel Three</TabPanel>
      </Tabs>,
    );
    screen.getAllByRole('tab')[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[2]);
  });

  it('skips disabled tabs with Home', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="three">
        <TabList>
          <Tab value="one" disabled>
            Tab One
          </Tab>
          <Tab value="two">Tab Two</Tab>
          <Tab value="three">Tab Three</Tab>
        </TabList>
        <TabPanel value="one">Panel One</TabPanel>
        <TabPanel value="two">Panel Two</TabPanel>
        <TabPanel value="three">Panel Three</TabPanel>
      </Tabs>,
    );
    screen.getAllByRole('tab')[2].focus();
    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[1]);
  });

  it('does not select disabled tab on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">Tab One</Tab>
          <Tab value="two" disabled>
            Tab Two
          </Tab>
        </TabList>
        <TabPanel value="one">Panel One</TabPanel>
        <TabPanel value="two">Panel Two</TabPanel>
      </Tabs>,
    );
    await user.click(screen.getAllByRole('tab')[1]);
    expect(screen.getAllByRole('tab')[0]).toHaveAttribute('aria-selected', 'true');
  });

  // --- ARIA ---

  it('sets aria-selected on active tab', () => {
    renderTabs({ defaultValue: 'one' });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('sets aria-controls linking tab to panel', () => {
    renderTabs({ defaultValue: 'one' });
    const tab = screen.getAllByRole('tab')[0];
    const panelId = tab.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toBeInTheDocument();
  });

  it('sets aria-labelledby linking panel to tab', () => {
    renderTabs({ defaultValue: 'one' });
    const panels = screen.getAllByRole('tabpanel');
    const tabId = panels[0].getAttribute('aria-labelledby');
    expect(tabId).toBeTruthy();
    expect(document.getElementById(tabId!)).toBeInTheDocument();
  });

  it('sets tabindex=0 on selected tab, -1 on others', () => {
    renderTabs({ defaultValue: 'two' });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '-1');
    expect(tabs[1]).toHaveAttribute('tabindex', '0');
    expect(tabs[2]).toHaveAttribute('tabindex', '-1');
  });

  it('sets data-selected on active tab', () => {
    renderTabs({ defaultValue: 'one' });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('data-selected', '');
    expect(tabs[1]).not.toHaveAttribute('data-selected');
  });

  it('sets data-selected on active panel', () => {
    renderTabs({ defaultValue: 'one' });
    const panels = screen.getAllByRole('tabpanel');
    expect(panels[0]).toHaveAttribute('data-selected', '');
  });

  it('sets aria-orientation on tablist', () => {
    renderTabs({ defaultValue: 'one', orientation: 'vertical' });
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('sets tabindex=0 on panels', () => {
    renderTabs({ defaultValue: 'one' });
    const panels = screen.getAllByRole('tabpanel');
    panels.forEach((panel) => {
      expect(panel).toHaveAttribute('tabindex', '0');
    });
  });

  // --- Accessibility ---

  it('passes axe checks (horizontal)', async () => {
    const { container } = renderTabs({ defaultValue: 'one' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks (vertical)', async () => {
    const { container } = renderTabs({ defaultValue: 'one', orientation: 'vertical' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with disabled tab', async () => {
    const { container } = render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">Tab One</Tab>
          <Tab value="two" disabled>
            Tab Two
          </Tab>
        </TabList>
        <TabPanel value="one">Panel One</TabPanel>
        <TabPanel value="two">Panel Two</TabPanel>
      </Tabs>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
