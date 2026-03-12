import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useBodyScrollLock } from './use-body-scroll-lock.js';

function LockFixture({ active }: { active: boolean }) {
  useBodyScrollLock(active);
  return <div>Content</div>;
}

describe('useBodyScrollLock', () => {
  it('sets body overflow to hidden when active', () => {
    document.body.style.overflow = '';
    render(<LockFixture active />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow on deactivate', () => {
    document.body.style.overflow = '';
    const { rerender } = render(<LockFixture active />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<LockFixture active={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('restores body overflow on unmount', () => {
    document.body.style.overflow = '';
    const { unmount } = render(<LockFixture active />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
