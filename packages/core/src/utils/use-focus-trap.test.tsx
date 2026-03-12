import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useRef } from 'react';
import { useFocusTrap } from './use-focus-trap.js';

function TrapFixture({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);
  return (
    <div ref={ref} tabIndex={-1} data-testid="container">
      <button>First</button>
      <button>Second</button>
      <button>Third</button>
    </div>
  );
}

function EmptyTrapFixture({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);
  return (
    <div ref={ref} tabIndex={-1} data-testid="container">
      <span>No focusable elements</span>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('moves focus to first focusable element on activate', () => {
    render(<TrapFixture active />);
    expect(document.activeElement).toBe(screen.getByText('First'));
  });

  it('does not move focus when inactive', () => {
    render(<TrapFixture active={false} />);
    expect(document.activeElement).toBe(document.body);
  });

  it('wraps focus from last to first on Tab', async () => {
    const user = userEvent.setup();
    render(<TrapFixture active />);
    screen.getByText('Third').focus();
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(screen.getByText('First'));
  });

  it('wraps focus from first to last on Shift+Tab', async () => {
    const user = userEvent.setup();
    render(<TrapFixture active />);
    screen.getByText('First').focus();
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(document.activeElement).toBe(screen.getByText('Third'));
  });

  it('cycles through middle elements normally', async () => {
    const user = userEvent.setup();
    render(<TrapFixture active />);
    expect(document.activeElement).toBe(screen.getByText('First'));
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(screen.getByText('Second'));
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(screen.getByText('Third'));
  });

  it('focuses container when no focusable elements exist', () => {
    render(<EmptyTrapFixture active />);
    expect(document.activeElement).toBe(screen.getByTestId('container'));
  });

  it('prevents Tab when no focusable elements exist', async () => {
    const user = userEvent.setup();
    render(<EmptyTrapFixture active />);
    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(screen.getByTestId('container'));
  });

  it('does not interfere with non-Tab keys', async () => {
    const user = userEvent.setup();
    render(<TrapFixture active />);
    expect(document.activeElement).toBe(screen.getByText('First'));
    await user.keyboard('{Enter}');
    // Focus should remain on First (Enter does not move focus)
    expect(document.activeElement).toBe(screen.getByText('First'));
  });
});
