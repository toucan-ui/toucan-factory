import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from './drawer.js';

function renderDrawer(props: Partial<React.ComponentProps<typeof Drawer>> = {}) {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    'aria-label': 'Test drawer',
    ...props,
  };
  return render(
    <Drawer {...defaultProps}>
      <h2>Drawer Title</h2>
      <p>Drawer content</p>
      <button>Close</button>
    </Drawer>,
  );
}

describe('Drawer', () => {
  // --- Open/closed ---

  it('renders when open', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderDrawer({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // --- Portal ---

  it('renders into a portal on document.body', () => {
    const { container } = renderDrawer();
    expect(container.querySelector("[role='dialog']")).toBeNull();
    expect(document.querySelector("[role='dialog']")).toBeInTheDocument();
  });

  // --- ARIA ---

  it('has role=dialog', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal=true', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('supports aria-label', () => {
    renderDrawer({ 'aria-label': 'My drawer' });
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'My drawer');
  });

  it('supports aria-labelledby', () => {
    render(
      <Drawer open onClose={vi.fn()} aria-labelledby="heading">
        <h2 id="heading">Drawer Title</h2>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'heading');
  });

  // --- data-anchor ---

  it('sets data-anchor=right by default', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toHaveAttribute('data-anchor', 'right');
  });

  it('sets data-anchor=left', () => {
    renderDrawer({ anchor: 'left' });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-anchor', 'left');
  });

  it('sets data-anchor=top', () => {
    renderDrawer({ anchor: 'top' });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-anchor', 'top');
  });

  it('sets data-anchor=bottom', () => {
    renderDrawer({ anchor: 'bottom' });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-anchor', 'bottom');
  });

  // --- data-size ---

  it('sets data-size=md by default', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'md');
  });

  it('sets data-size=sm', () => {
    renderDrawer({ size: 'sm' });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'sm');
  });

  it('sets data-size=lg', () => {
    renderDrawer({ size: 'lg' });
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg');
  });

  // --- Focus trap ---

  it('traps focus within drawer', async () => {
    const user = userEvent.setup();
    renderDrawer();
    const button = screen.getByRole('button');
    expect(document.activeElement).toBe(button);
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(button);
  });

  // --- Scroll lock ---

  it('locks body scroll when open', () => {
    document.body.style.overflow = '';
    renderDrawer();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    document.body.style.overflow = '';
    const { rerender } = render(
      <Drawer open onClose={vi.fn()} aria-label="Test">
        <p>Content</p>
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    rerender(
      <Drawer open={false} onClose={vi.fn()} aria-label="Test">
        <p>Content</p>
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe('');
  });

  // --- Escape key ---

  it('calls onClose on Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDrawer({ onClose });
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDrawer({ onClose, closeOnEscape: false });
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  // --- Backdrop click ---

  it('calls onClose on backdrop click', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDrawer({ onClose });
    const backdrop = document.querySelector('.tcn-drawer-backdrop')!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on backdrop click when closeOnBackdropClick is false', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderDrawer({ onClose, closeOnBackdropClick: false });
    const backdrop = document.querySelector('.tcn-drawer-backdrop')!;
    await user.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  // --- Focus restore ---

  it('restores focus on close', () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const onClose = vi.fn();
    const { rerender } = render(
      <Drawer open onClose={onClose} aria-label="Test">
        <button>Inside</button>
      </Drawer>,
    );

    rerender(
      <Drawer open={false} onClose={onClose} aria-label="Test">
        <button>Inside</button>
      </Drawer>,
    );

    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  // --- Dev warning ---

  it('warns when no aria-label or aria-labelledby', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Drawer open onClose={vi.fn()}>
        <p>Content</p>
      </Drawer>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('[tcn-drawer]'));
    warn.mockRestore();
  });

  // --- Applies class ---

  it('applies tcn-drawer class', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toHaveClass('tcn-drawer');
  });

  it('renders backdrop element', () => {
    renderDrawer();
    expect(document.querySelector('.tcn-drawer-backdrop')).toBeInTheDocument();
  });

  // --- Accessibility ---

  it('passes axe checks when open', async () => {
    renderDrawer();
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when closed', async () => {
    const { container } = renderDrawer({ open: false });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
