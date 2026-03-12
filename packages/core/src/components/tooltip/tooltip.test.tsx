import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './tooltip.js';

function renderTooltip(props: Partial<React.ComponentProps<typeof Tooltip>> = {}) {
  const defaultProps = {
    content: 'Tooltip text',
    ...props,
  };
  return render(
    <Tooltip {...defaultProps}>
      <button>Trigger</button>
    </Tooltip>,
  );
}

describe('Tooltip', () => {
  // --- Rendering ---

  it('renders the trigger', () => {
    renderTooltip();
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('tooltip is not visible by default', () => {
    renderTooltip();
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-visible');
  });

  it('applies tcn-tooltip-wrapper class', () => {
    const { container } = renderTooltip();
    expect(container.firstChild).toHaveClass('tcn-tooltip-wrapper');
  });

  // --- Show/Hide ---

  it('shows on hover', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.hover(screen.getByText('Trigger'));
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-visible', '');
  });

  it('hides on mouse leave', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.hover(screen.getByText('Trigger'));
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-visible', '');
    await user.unhover(screen.getByText('Trigger'));
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-visible');
  });

  it('shows on focus', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-visible', '');
  });

  it('hides on blur', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.tab(); // focus trigger
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-visible', '');
    await user.tab(); // blur trigger
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-visible');
  });

  it('hides on Escape key when focused', async () => {
    const user = userEvent.setup();
    renderTooltip();
    await user.tab(); // focus the trigger
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-visible', '');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-visible');
  });

  // --- Anchor ---

  it('sets data-anchor=top by default', () => {
    renderTooltip();
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-anchor', 'top');
  });

  it('sets data-anchor=bottom', () => {
    renderTooltip({ anchor: 'bottom' });
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-anchor', 'bottom');
  });

  // --- Controlled ---

  it('respects controlled open prop', () => {
    renderTooltip({ open: true });
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-visible', '');
  });

  it('respects controlled closed prop', () => {
    renderTooltip({ open: false });
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-visible');
  });

  it('calls onOpenChange when hovered', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderTooltip({ onOpenChange });
    await user.hover(screen.getByText('Trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // --- ARIA ---

  it('has role=tooltip', () => {
    renderTooltip();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('sets aria-describedby on trigger when visible', async () => {
    const user = userEvent.setup();
    renderTooltip();
    const trigger = screen.getByText('Trigger');
    expect(trigger).not.toHaveAttribute('aria-describedby');
    await user.hover(trigger);
    const tooltipId = screen.getByRole('tooltip').id;
    expect(trigger).toHaveAttribute('aria-describedby', tooltipId);
  });

  // --- Accessibility ---

  it('passes axe checks when hidden', async () => {
    const { container } = renderTooltip();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when visible', async () => {
    const { container } = renderTooltip({ open: true });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
