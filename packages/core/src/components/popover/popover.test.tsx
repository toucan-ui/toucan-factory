import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './popover.js';

function renderPopover(props: Partial<React.ComponentProps<typeof Popover>> = {}) {
  return render(
    <Popover {...props}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <p>Popover content</p>
        <button>Action</button>
      </PopoverContent>
    </Popover>,
  );
}

describe('Popover', () => {
  // --- Rendering ---

  it('renders trigger button', () => {
    renderPopover();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('content is hidden by default', () => {
    renderPopover();
    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('applies tcn-popover-wrapper class', () => {
    const { container } = renderPopover();
    expect(container.firstChild).toHaveClass('tcn-popover-wrapper');
  });

  // --- Open/Close ---

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
  });

  it('closes on second trigger click', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('closes on click outside', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
    await user.click(document.body);
    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('data-open');
  });

  // --- Focus Management ---

  it('moves focus to content on open', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(document.activeElement).toBe(screen.getByRole('dialog'));
  });

  it('returns focus to trigger on Escape', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    await user.keyboard('{Escape}');
    expect(document.activeElement).toBe(screen.getByText('Open'));
  });

  // --- Anchor ---

  it('sets data-anchor=bottom by default', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-anchor', 'bottom');
  });

  it('sets data-anchor=top', async () => {
    const user = userEvent.setup();
    renderPopover({ anchor: 'top' });
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-anchor', 'top');
  });

  // --- Controlled ---

  it('respects controlled open prop', () => {
    renderPopover({ open: true });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
  });

  it('respects controlled closed prop', () => {
    renderPopover({ open: false });
    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('calls onOpenChange on trigger click', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderPopover({ onOpenChange });
    await user.click(screen.getByText('Open'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // --- Uncontrolled ---

  it('starts open with defaultOpen', () => {
    renderPopover({ defaultOpen: true });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
  });

  // --- ARIA ---

  it('trigger has aria-haspopup=dialog', () => {
    renderPopover();
    expect(screen.getByText('Open')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('trigger has aria-expanded matching state', async () => {
    const user = userEvent.setup();
    renderPopover();
    const trigger = screen.getByText('Open');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('trigger has aria-controls when open', async () => {
    const user = userEvent.setup();
    renderPopover();
    const trigger = screen.getByText('Open');
    expect(trigger).not.toHaveAttribute('aria-controls');
    await user.click(trigger);
    const dialogId = screen.getByRole('dialog').id;
    expect(trigger).toHaveAttribute('aria-controls', dialogId);
  });

  it('content has role=dialog', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('content has aria-labelledby pointing to trigger', async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText('Open'));
    const dialog = screen.getByRole('dialog');
    const triggerId = screen.getByText('Open').id;
    expect(dialog).toHaveAttribute('aria-labelledby', triggerId);
  });

  // --- Accessibility ---

  it('passes axe checks when closed', async () => {
    const { container } = renderPopover();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when open', async () => {
    const user = userEvent.setup();
    const { container } = renderPopover();
    await user.click(screen.getByText('Open'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // --- asChild ---

  describe('asChild', () => {
    function renderAsChild() {
      return render(
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="custom-trigger">
              Open
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>,
      );
    }

    it('renders child element without wrapping button', () => {
      renderAsChild();
      const trigger = screen.getByText('Open');
      expect(trigger.tagName).toBe('BUTTON');
      expect(trigger).toHaveClass('custom-trigger');
      expect(trigger.parentElement?.tagName).not.toBe('BUTTON');
    });

    it('merges ARIA attributes onto child', () => {
      renderAsChild();
      const trigger = screen.getByText('Open');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('id');
    });

    it('click opens and closes popover', async () => {
      const user = userEvent.setup();
      renderAsChild();
      const trigger = screen.getByText('Open');
      await user.click(trigger);
      expect(screen.getByRole('dialog')).toHaveAttribute('data-open', '');
      await user.click(trigger);
      expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('data-open');
    });

    it('merges tcn-popover-trigger class with child class', () => {
      renderAsChild();
      const trigger = screen.getByText('Open');
      expect(trigger).toHaveClass('tcn-popover-trigger');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('sets aria-controls when open', async () => {
      const user = userEvent.setup();
      renderAsChild();
      const trigger = screen.getByText('Open');
      await user.click(trigger);
      const dialogId = screen.getByRole('dialog').id;
      expect(trigger).toHaveAttribute('aria-controls', dialogId);
    });
  });
});
