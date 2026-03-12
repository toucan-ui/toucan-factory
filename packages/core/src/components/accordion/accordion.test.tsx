import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from './accordion.js';

function renderAccordion(props: Record<string, unknown> = {}) {
  return render(
    <Accordion {...props}>
      <AccordionItem value="one">
        <AccordionTrigger>Item One</AccordionTrigger>
        <AccordionPanel>Panel One</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Item Two</AccordionTrigger>
        <AccordionPanel>Panel Two</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="three">
        <AccordionTrigger>Item Three</AccordionTrigger>
        <AccordionPanel>Panel Three</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );
}

describe('Accordion', () => {
  // --- Rendering ---

  it('renders triggers as buttons', () => {
    renderAccordion();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('applies tcn-accordion class', () => {
    const { container } = renderAccordion();
    expect(container.firstChild).toHaveClass('tcn-accordion');
  });

  // --- Uncontrolled toggle ---

  it('toggles panel on trigger click', async () => {
    const user = userEvent.setup();
    renderAccordion();
    const triggers = screen.getAllByRole('button');

    // Initially all closed
    expect(screen.getByText('Panel One')).not.toBeVisible();

    await user.click(triggers[0]);
    expect(screen.getByText('Panel One')).toBeVisible();

    await user.click(triggers[0]);
    expect(screen.getByText('Panel One')).not.toBeVisible();
  });

  // --- Single mode closes others ---

  it('closes other items in single mode', async () => {
    const user = userEvent.setup();
    renderAccordion({ type: 'single' });
    const triggers = screen.getAllByRole('button');

    await user.click(triggers[0]);
    expect(screen.getByText('Panel One')).toBeVisible();

    await user.click(triggers[1]);
    expect(screen.getByText('Panel One')).not.toBeVisible();
    expect(screen.getByText('Panel Two')).toBeVisible();
  });

  // --- Multiple mode keeps many open ---

  it('keeps multiple items open in multiple mode', async () => {
    const user = userEvent.setup();
    renderAccordion({ type: 'multiple' });
    const triggers = screen.getAllByRole('button');

    await user.click(triggers[0]);
    await user.click(triggers[1]);
    expect(screen.getByText('Panel One')).toBeVisible();
    expect(screen.getByText('Panel Two')).toBeVisible();
  });

  // --- Controlled value ---

  it('respects controlled value', () => {
    renderAccordion({ value: 'two' });
    expect(screen.getByText('Panel One')).not.toBeVisible();
    expect(screen.getByText('Panel Two')).toBeVisible();
  });

  it('calls onChange with value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderAccordion({ onChange });
    await user.click(screen.getAllByRole('button')[1]);
    expect(onChange).toHaveBeenCalledWith('two');
  });

  // --- collapsible=false ---

  it('prevents collapsing when collapsible is false', async () => {
    const user = userEvent.setup();
    renderAccordion({ defaultValue: 'one', collapsible: false });
    const trigger = screen.getAllByRole('button')[0];

    expect(screen.getByText('Panel One')).toBeVisible();
    await user.click(trigger);
    // Should still be open
    expect(screen.getByText('Panel One')).toBeVisible();
  });

  // --- Disabled ---

  it('does not toggle disabled item', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="one" disabled>
          <AccordionTrigger>Item One</AccordionTrigger>
          <AccordionPanel>Panel One</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Panel One')).not.toBeVisible();
  });

  it('disables trigger button when item is disabled', () => {
    render(
      <Accordion>
        <AccordionItem value="one" disabled>
          <AccordionTrigger>Item One</AccordionTrigger>
          <AccordionPanel>Panel One</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  // --- ARIA attributes ---

  it('sets aria-expanded on trigger', async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getAllByRole('button')[0];

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-controls linking trigger to panel', () => {
    renderAccordion({ defaultValue: 'one' });
    const trigger = screen.getAllByRole('button')[0];
    const panelId = trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toBeInTheDocument();
  });

  it('sets role=region on panel with aria-labelledby', () => {
    renderAccordion({ defaultValue: 'one' });
    const region = screen.getAllByRole('region')[0];
    expect(region).toBeInTheDocument();
    const labelledBy = region.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toBeInTheDocument();
  });

  it('hides panel with hidden attribute when closed', () => {
    renderAccordion();
    // Panel text is not visible when closed (hidden attribute)
    expect(screen.getByText('Panel One')).not.toBeVisible();
  });

  // --- data-state ---

  it('sets data-state on accordion item', async () => {
    const user = userEvent.setup();
    const { container } = renderAccordion();
    const items = container.querySelectorAll('.tcn-accordion-item');

    expect(items[0]).toHaveAttribute('data-state', 'closed');
    await user.click(screen.getAllByRole('button')[0]);
    expect(items[0]).toHaveAttribute('data-state', 'open');
  });

  it('sets data-disabled on disabled item', () => {
    render(
      <Accordion>
        <AccordionItem value="one" disabled>
          <AccordionTrigger>Item One</AccordionTrigger>
          <AccordionPanel>Panel One</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );

    const item = document.querySelector('.tcn-accordion-item')!;
    expect(item).toHaveAttribute('data-disabled', '');
  });

  // --- Keyboard ---

  it('toggles on Enter/Space (native button)', async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getAllByRole('button')[0];
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Panel One')).toBeVisible();
    await user.keyboard(' ');
    expect(screen.getByText('Panel One')).not.toBeVisible();
  });

  // --- Default value ---

  it('supports defaultValue as string', () => {
    renderAccordion({ defaultValue: 'two' });
    expect(screen.getByText('Panel Two')).toBeVisible();
    expect(screen.getByText('Panel One')).not.toBeVisible();
  });

  it('supports defaultValue as array in multiple mode', () => {
    renderAccordion({ type: 'multiple', defaultValue: ['one', 'three'] });
    expect(screen.getByText('Panel One')).toBeVisible();
    expect(screen.getByText('Panel Two')).not.toBeVisible();
    expect(screen.getByText('Panel Three')).toBeVisible();
  });

  // --- Accessibility ---

  it('passes axe checks', async () => {
    const { container } = renderAccordion({ defaultValue: 'one' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with all closed', async () => {
    const { container } = renderAccordion();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with disabled item', async () => {
    const { container } = render(
      <Accordion defaultValue="two">
        <AccordionItem value="one" disabled>
          <AccordionTrigger>Item One</AccordionTrigger>
          <AccordionPanel>Panel One</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Item Two</AccordionTrigger>
          <AccordionPanel>Panel Two</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
