import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { SideNav } from './side-nav.js';

const sections = [
  {
    heading: 'General',
    items: [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Settings', href: '/settings' },
    ],
  },
  {
    heading: 'Account',
    items: [
      { label: 'Profile', href: '/profile' },
      { label: 'Billing', href: '/billing' },
    ],
  },
];

// Helper to mock matchMedia with a controllable matches value and change listener.
// Also sets the --breakpoint-md CSS variable so getComputedStyle can resolve it.
function mockMatchMedia(matches: boolean) {
  document.documentElement.style.setProperty('--breakpoint-md', '768px');

  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mql = {
    matches,
    media: '(min-width: 768px)',
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.push(cb),
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(cb);
      if (idx >= 0) listeners.splice(idx, 1);
    },
    dispatchEvent: () => true,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
  };

  vi.spyOn(window, 'matchMedia').mockReturnValue(mql as unknown as MediaQueryList);

  return {
    /** Simulate a viewport change */
    setMatches(next: boolean) {
      mql.matches = next;
      listeners.forEach((cb) => cb({ matches: next } as MediaQueryListEvent));
    },
  };
}

describe('SideNav', () => {
  it('renders as a nav with aria-label', () => {
    render(<SideNav sections={sections} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Sidebar');
  });

  it('renders section headings', () => {
    render(<SideNav sections={sections} />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders all nav items', () => {
    render(<SideNav sections={sections} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('renders items as links', () => {
    render(<SideNav sections={sections} />);
    const dashboard = screen.getByText('Dashboard');
    expect(dashboard.closest('a')).toHaveAttribute('href', '/dashboard');
  });

  it('marks active item with aria-current', () => {
    render(<SideNav sections={sections} />);
    const active = screen.getByText('Dashboard').closest('a');
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('applies active class to active item', () => {
    render(<SideNav sections={sections} />);
    const active = screen.getByText('Dashboard').closest('a');
    expect(active).toHaveClass('tcn-side-nav-link--active');
  });

  it('does not mark inactive items as current', () => {
    render(<SideNav sections={sections} />);
    const settings = screen.getByText('Settings').closest('a');
    expect(settings).not.toHaveAttribute('aria-current');
  });

  it('renders sections without headings', () => {
    render(<SideNav sections={[{ items: [{ label: 'Home', href: '/' }] }]} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  describe('collapsible', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('renders toggle buttons with aria-expanded when collapsible', () => {
      mockMatchMedia(true);
      render(<SideNav sections={sections} collapsible />);
      const toggles = screen.getAllByRole('button');
      expect(toggles).toHaveLength(2);
      expect(toggles[0]).toHaveAttribute('aria-expanded', 'true');
      expect(toggles[1]).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets data-collapsible on the nav element', () => {
      mockMatchMedia(true);
      render(<SideNav sections={sections} collapsible />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('data-collapsible');
    });

    it('does not render toggle buttons without collapsible', () => {
      render(<SideNav sections={sections} />);
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('collapses a section when its toggle is clicked', async () => {
      mockMatchMedia(true);
      const user = userEvent.setup();
      render(<SideNav sections={sections} collapsible />);

      const toggles = screen.getAllByRole('button');
      await user.click(toggles[0]);

      expect(toggles[0]).toHaveAttribute('aria-expanded', 'false');
      const listId = toggles[0].getAttribute('aria-controls')!;
      const list = document.getElementById(listId)!;
      expect(list).toHaveAttribute('data-collapsed', 'true');
    });

    it('expands a collapsed section when toggled again', async () => {
      mockMatchMedia(true);
      const user = userEvent.setup();
      render(<SideNav sections={sections} collapsible />);

      const toggles = screen.getAllByRole('button');
      await user.click(toggles[0]);
      await user.click(toggles[0]);

      expect(toggles[0]).toHaveAttribute('aria-expanded', 'true');
      const listId = toggles[0].getAttribute('aria-controls')!;
      const list = document.getElementById(listId)!;
      expect(list).not.toHaveAttribute('data-collapsed');
    });

    it('on desktop, all sections are expanded', () => {
      mockMatchMedia(true);
      render(<SideNav sections={sections} collapsible />);
      const lists = document.querySelectorAll('.tcn-side-nav-list');
      lists.forEach((list) => {
        expect(list).not.toHaveAttribute('data-collapsed');
      });
    });

    it('on mobile, auto-collapses sections without active items', () => {
      mockMatchMedia(false);
      render(<SideNav sections={sections} collapsible />);

      const toggles = screen.getAllByRole('button');
      // General section has active item — stays expanded
      expect(toggles[0]).toHaveAttribute('aria-expanded', 'true');
      // Account section has no active item — auto-collapsed
      expect(toggles[1]).toHaveAttribute('aria-expanded', 'false');
    });

    it('responds to viewport changes', () => {
      const media = mockMatchMedia(false);
      render(<SideNav sections={sections} collapsible />);

      // Starts mobile — Account collapsed
      const toggles = screen.getAllByRole('button');
      expect(toggles[1]).toHaveAttribute('aria-expanded', 'false');

      // Resize to desktop — all expand
      act(() => media.setMatches(true));
      expect(toggles[1]).toHaveAttribute('aria-expanded', 'true');

      // Resize back to mobile — Account collapses again
      act(() => media.setMatches(false));
      expect(toggles[1]).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggle has aria-controls pointing to the list id', () => {
      mockMatchMedia(true);
      render(<SideNav sections={sections} collapsible />);
      const toggles = screen.getAllByRole('button');
      toggles.forEach((toggle) => {
        const controlsId = toggle.getAttribute('aria-controls')!;
        expect(document.getElementById(controlsId)).toBeInTheDocument();
      });
    });
  });
});
