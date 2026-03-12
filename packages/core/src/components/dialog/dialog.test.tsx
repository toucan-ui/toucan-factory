import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Dialog } from './dialog.js';

function renderDialog(props: Partial<React.ComponentProps<typeof Dialog>> = {}) {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    'aria-label': 'Test dialog',
    ...props,
  };
  return render(
    <Dialog {...defaultProps}>
      <h2>Title</h2>
      <p>Dialog content</p>
      <button>Cancel</button>
      <button>Confirm</button>
    </Dialog>,
  );
}

describe('Dialog', () => {
  // --- Rendering ---

  it('renders when open', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderDialog({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders children', () => {
    renderDialog();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('applies tcn-dialog class', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toHaveClass('tcn-dialog');
  });

  it('renders into a portal on document.body', () => {
    const { container } = renderDialog();
    // The dialog should not be inside the container
    expect(container.querySelector("[role='dialog']")).toBeNull();
    // But it should exist in the document
    expect(document.querySelector("[role='dialog']")).toBeInTheDocument();
  });

  it('renders backdrop element', () => {
    renderDialog();
    const backdrop = document.querySelector('.tcn-dialog-backdrop');
    expect(backdrop).toBeInTheDocument();
  });

  // --- Focus Management ---

  it('traps focus: Tab cycles within dialog', async () => {
    const user = userEvent.setup();
    renderDialog();
    const buttons = screen.getAllByRole('button');
    // Focus should be on first focusable element
    expect(document.activeElement).toBe(buttons[0]);
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(buttons[1]);
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('traps focus: Shift+Tab cycles within dialog', async () => {
    const user = userEvent.setup();
    renderDialog();
    const buttons = screen.getAllByRole('button');
    expect(document.activeElement).toBe(buttons[0]);
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(document.activeElement).toBe(buttons[1]);
  });

  it('restores focus on close', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const onClose = vi.fn();
    const { rerender } = render(
      <Dialog open onClose={onClose} aria-label="Test">
        <button>Inside</button>
      </Dialog>,
    );

    // Rerender as closed
    rerender(
      <Dialog open={false} onClose={onClose} aria-label="Test">
        <button>Inside</button>
      </Dialog>,
    );

    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  // --- Escape Key ---

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onClose });
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onClose, closeOnEscape: false });
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  // --- Backdrop Click ---

  it('calls onClose on backdrop click', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onClose });
    const backdrop = document.querySelector('.tcn-dialog-backdrop')!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on backdrop click when closeOnBackdropClick is false', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onClose, closeOnBackdropClick: false });
    const backdrop = document.querySelector('.tcn-dialog-backdrop')!;
    await user.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking dialog content', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onClose });
    await user.click(screen.getByText('Dialog content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  // --- Scroll Lock ---

  it('locks body scroll when open', () => {
    document.body.style.overflow = '';
    renderDialog();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    document.body.style.overflow = '';
    const { rerender } = render(
      <Dialog open onClose={vi.fn()} aria-label="Test">
        <p>Content</p>
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Dialog open={false} onClose={vi.fn()} aria-label="Test">
        <p>Content</p>
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe('');
  });

  // --- ARIA ---

  it('has role=dialog', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal=true', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('supports aria-label', () => {
    renderDialog({ 'aria-label': 'My dialog' });
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'My dialog');
  });

  it('supports aria-labelledby', () => {
    render(
      <Dialog open onClose={vi.fn()} aria-labelledby="heading">
        <h2 id="heading">Dialog Title</h2>
      </Dialog>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'heading');
  });

  it('warns when no aria-label or aria-labelledby in dev mode', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Dialog open onClose={vi.fn()}>
        <p>Content</p>
      </Dialog>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('[tcn-dialog]'));
    warn.mockRestore();
  });

  // --- Accessibility ---

  it('passes axe checks when open', async () => {
    renderDialog();
    // axe needs to check the portal content, which is in document.body
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when closed', async () => {
    const { container } = renderDialog({ open: false });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with aria-labelledby', async () => {
    render(
      <Dialog open onClose={vi.fn()} aria-labelledby="title">
        <h2 id="title">My Dialog</h2>
        <p>Content</p>
      </Dialog>,
    );
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
