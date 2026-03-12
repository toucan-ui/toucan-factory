import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavBar } from './nav-bar.js';

describe('NavBar', () => {
  it('renders the logo', () => {
    render(<NavBar logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders a header root with nav inside', () => {
    const { container } = render(<NavBar logo={<span>Logo</span>} />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main');
    expect(header!.contains(nav)).toBe(true);
  });

  it('renders links when provided', () => {
    render(
      <NavBar
        logo={<span>Logo</span>}
        links={
          <>
            <a href="/home">Home</a>
            <a href="/about">About</a>
          </>
        }
      />,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders desktop links with desktop visibility class', () => {
    const { container } = render(<NavBar logo={<span>Logo</span>} links={<a href="/">Home</a>} />);
    const linksWrapper = container.querySelector('.tcn-nav-bar-links');
    expect(linksWrapper).toHaveClass('tcn-nav-bar-desktop');
  });

  it('renders actions when provided', () => {
    render(<NavBar logo={<span>Logo</span>} actions={<button>Sign in</button>} />);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('renders actions with desktop visibility class', () => {
    const { container } = render(
      <NavBar logo={<span>Logo</span>} actions={<button>Sign in</button>} />,
    );
    const actionsWrapper = container.querySelector('.tcn-nav-bar-actions.tcn-nav-bar-desktop');
    expect(actionsWrapper).toBeInTheDocument();
  });

  it('renders mobileActions with mobile visibility class', () => {
    const { container } = render(
      <NavBar logo={<span>Logo</span>} mobileActions={<button>Menu</button>} />,
    );
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    const mobileWrapper = container.querySelector('.tcn-nav-bar-actions.tcn-nav-bar-mobile');
    expect(mobileWrapper).toBeInTheDocument();
  });

  it('sets link gap custom property when gap prop is provided', () => {
    const { container } = render(<NavBar logo={<span>Logo</span>} gap={6} />);
    const header = container.querySelector('header')!;
    expect(header.style.getPropertyValue('--tcn-nav-bar-link-gap')).toBe('var(--scale-6)');
  });
});
