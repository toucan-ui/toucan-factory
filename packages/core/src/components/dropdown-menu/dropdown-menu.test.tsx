import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './dropdown-menu.js';

function renderMenu(
  props: Partial<React.ComponentProps<typeof DropdownMenu>> = {},
  itemProps: { onEdit?: () => void; onDelete?: () => void; deleteDisabled?: boolean } = {},
) {
  return render(
    <DropdownMenu {...props}>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuItem onSelect={itemProps.onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={itemProps.onDelete}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={itemProps.deleteDisabled} onSelect={itemProps.onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
}

describe('DropdownMenu', () => {
  // --- Rendering ---

  it('renders trigger button', () => {
    renderMenu();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('menu is hidden by default', () => {
    renderMenu();
    expect(screen.getByRole('menu', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('applies tcn-dropdown-wrapper class', () => {
    const { container } = renderMenu();
    expect(container.firstChild).toHaveClass('tcn-dropdown-wrapper');
  });

  // --- Open/Close ---

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
  });

  it('closes on second trigger click', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('closes on click outside', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
    await user.click(document.body);
    expect(screen.getByRole('menu', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('menu', { hidden: true })).not.toHaveAttribute('data-open');
  });

  // --- Item Activation ---

  it('calls onSelect on item click', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    renderMenu({}, { onEdit });
    await user.click(screen.getByText('Actions'));
    await user.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('closes menu after item click', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    await user.click(screen.getByText('Edit'));
    expect(screen.getByRole('menu', { hidden: true })).not.toHaveAttribute('data-open');
  });

  it('activates item with Enter key', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    renderMenu({}, { onEdit });
    await user.click(screen.getByText('Actions'));
    // First item (Edit) should be active
    await user.keyboard('{Enter}');
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('activates item with Space key', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    renderMenu({}, { onEdit });
    await user.click(screen.getByText('Actions'));
    await user.keyboard(' ');
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  // --- Disabled Items ---

  it('does not call onSelect on disabled item click', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    renderMenu({}, { onDelete, deleteDisabled: true });
    await user.click(screen.getByText('Actions'));
    await user.click(screen.getByText('Delete'));
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('skips disabled items in keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>First</DropdownMenuItem>
          <DropdownMenuItem disabled>Second</DropdownMenuItem>
          <DropdownMenuItem>Third</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText('Actions'));
    // First item active
    expect(screen.getByText('First')).toHaveAttribute('data-active', '');
    await user.keyboard('{ArrowDown}');
    // Should skip disabled Second and go to Third
    expect(screen.getByText('Third')).toHaveAttribute('data-active', '');
  });

  // --- Keyboard Navigation ---

  it('navigates down with ArrowDown', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('data-active', '');
    await user.keyboard('{ArrowDown}');
    expect(items[1]).toHaveAttribute('data-active', '');
  });

  it('navigates up with ArrowUp', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const items = screen.getAllByRole('menuitem');
    await user.keyboard('{ArrowDown}'); // Move to second
    expect(items[1]).toHaveAttribute('data-active', '');
    await user.keyboard('{ArrowUp}');
    expect(items[0]).toHaveAttribute('data-active', '');
  });

  it('wraps from last to first with ArrowDown', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const items = screen.getAllByRole('menuitem');
    await user.keyboard('{ArrowDown}'); // Second
    await user.keyboard('{ArrowDown}'); // Third (Delete)
    await user.keyboard('{ArrowDown}'); // Wrap to First (Edit)
    expect(items[0]).toHaveAttribute('data-active', '');
  });

  it('wraps from first to last with ArrowUp', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('data-active', '');
    await user.keyboard('{ArrowUp}');
    expect(items[items.length - 1]).toHaveAttribute('data-active', '');
  });

  it('navigates to first item with Home', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    await user.keyboard('{ArrowDown}'); // Move to second
    await user.keyboard('{Home}');
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('data-active', '');
  });

  it('navigates to last item with End', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    await user.keyboard('{End}');
    const items = screen.getAllByRole('menuitem');
    expect(items[items.length - 1]).toHaveAttribute('data-active', '');
  });

  it('opens and focuses first item on Enter from trigger', async () => {
    const user = userEvent.setup();
    renderMenu();
    screen.getByText('Actions').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('data-active', '');
  });

  it('opens and focuses first item on ArrowDown from trigger', async () => {
    const user = userEvent.setup();
    renderMenu();
    screen.getByText('Actions').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('data-active', '');
  });

  it('opens and focuses first item on Space from trigger', async () => {
    const user = userEvent.setup();
    renderMenu();
    screen.getByText('Actions').focus();
    await user.keyboard(' ');
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
  });

  // --- Separators and Labels ---

  it('renders separator with role=separator', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toHaveClass('tcn-dropdown-separator');
  });

  it('renders label with role=presentation', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByText('Options')).toHaveAttribute('role', 'presentation');
    expect(screen.getByText('Options')).toHaveClass('tcn-dropdown-label');
  });

  // --- Focus Management ---

  it('returns focus to trigger on close', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    await user.keyboard('{Escape}');
    expect(document.activeElement).toBe(screen.getByText('Actions'));
  });

  it('returns focus to trigger after item selection', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    await user.click(screen.getByText('Edit'));
    expect(document.activeElement).toBe(screen.getByText('Actions'));
  });

  // --- Controlled ---

  it('respects controlled open prop', () => {
    renderMenu({ open: true });
    expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
  });

  it('calls onOpenChange on trigger click', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderMenu({ onOpenChange });
    await user.click(screen.getByText('Actions'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // --- Anchor ---

  it('sets data-anchor=bottom by default', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-anchor', 'bottom');
  });

  it('sets data-anchor=top', async () => {
    const user = userEvent.setup();
    renderMenu({ anchor: 'top' });
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toHaveAttribute('data-anchor', 'top');
  });

  // --- ARIA ---

  it('trigger has aria-haspopup=menu', () => {
    renderMenu();
    expect(screen.getByText('Actions')).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('trigger has aria-expanded matching state', async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByText('Actions');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('trigger has aria-controls when open', async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByText('Actions');
    expect(trigger).not.toHaveAttribute('aria-controls');
    await user.click(trigger);
    const menuId = screen.getByRole('menu').id;
    expect(trigger).toHaveAttribute('aria-controls', menuId);
  });

  it('menu has role=menu', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('items have role=menuitem', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const items = screen.getAllByRole('menuitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('menu has aria-activedescendant tracking active item', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const menu = screen.getByRole('menu');
    const items = screen.getAllByRole('menuitem');
    expect(menu).toHaveAttribute('aria-activedescendant', items[0].id);
  });

  it('menu has aria-labelledby pointing to trigger', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText('Actions'));
    const menu = screen.getByRole('menu');
    const triggerId = screen.getByText('Actions').id;
    expect(menu).toHaveAttribute('aria-labelledby', triggerId);
  });

  it('disabled items have aria-disabled', async () => {
    const user = userEvent.setup();
    renderMenu({}, { deleteDisabled: true });
    await user.click(screen.getByText('Actions'));
    expect(screen.getByText('Delete')).toHaveAttribute('aria-disabled', 'true');
  });

  // --- Accessibility ---

  it('passes axe checks when closed', async () => {
    const { container } = renderMenu();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when open', async () => {
    const user = userEvent.setup();
    const { container } = renderMenu();
    await user.click(screen.getByText('Actions'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with disabled items', async () => {
    const user = userEvent.setup();
    const { container } = renderMenu({}, { deleteDisabled: true });
    await user.click(screen.getByText('Actions'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // --- asChild ---

  describe('asChild', () => {
    function renderAsChild() {
      return render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="custom-trigger">
              Actions
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );
    }

    it('renders child element without wrapping button', () => {
      renderAsChild();
      const trigger = screen.getByText('Actions');
      expect(trigger.tagName).toBe('BUTTON');
      expect(trigger).toHaveClass('custom-trigger');
      // Should not be nested inside another button
      expect(trigger.parentElement?.tagName).not.toBe('BUTTON');
    });

    it('merges ARIA attributes onto child', () => {
      renderAsChild();
      const trigger = screen.getByText('Actions');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('id');
    });

    it('click opens and closes menu', async () => {
      const user = userEvent.setup();
      renderAsChild();
      const trigger = screen.getByText('Actions');
      await user.click(trigger);
      expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
      await user.click(trigger);
      expect(screen.getByRole('menu', { hidden: true })).not.toHaveAttribute('data-open');
    });

    it('keyboard navigation still works', async () => {
      const user = userEvent.setup();
      renderAsChild();
      const trigger = screen.getByText('Actions');
      trigger.focus();
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menu')).toHaveAttribute('data-open', '');
      const items = screen.getAllByRole('menuitem');
      expect(items[0]).toHaveAttribute('data-active', '');
    });

    it('merges tcn-dropdown-trigger class with child class', () => {
      renderAsChild();
      const trigger = screen.getByText('Actions');
      expect(trigger).toHaveClass('tcn-dropdown-trigger');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('sets aria-controls when open', async () => {
      const user = userEvent.setup();
      renderAsChild();
      const trigger = screen.getByText('Actions');
      await user.click(trigger);
      const menuId = screen.getByRole('menu').id;
      expect(trigger).toHaveAttribute('aria-controls', menuId);
    });
  });
});
