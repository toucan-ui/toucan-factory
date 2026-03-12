import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Link } from './link.js';

describe('Link', () => {
  it('renders an anchor with link class', () => {
    render(<Link href="/test">Click me</Link>);
    const el = screen.getByText('Click me');
    expect(el.tagName).toBe('A');
    expect(el).toHaveClass('tcn-link');
  });

  it('defaults to inline variant and base size', () => {
    render(<Link href="/test">Default</Link>);
    const el = screen.getByText('Default');
    expect(el).toHaveAttribute('data-variant', 'inline');
    expect(el).toHaveAttribute('data-size', 'base');
  });

  it('applies variant data attribute', () => {
    render(
      <Link href="/test" variant="standalone">
        Standalone
      </Link>,
    );
    expect(screen.getByText('Standalone')).toHaveAttribute('data-variant', 'standalone');
  });

  it('applies size data attribute', () => {
    render(
      <Link href="/test" size="sm">
        Small
      </Link>,
    );
    expect(screen.getByText('Small')).toHaveAttribute('data-size', 'sm');
  });

  it('adds target and rel for external links', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const el = screen.getByText('External');
    expect(el).toHaveAttribute('target', '_blank');
    expect(el).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target/rel by default', () => {
    render(<Link href="/internal">Internal</Link>);
    const el = screen.getByText('Internal');
    expect(el).not.toHaveAttribute('target');
    expect(el).not.toHaveAttribute('rel');
  });

  it('passes through href', () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByText('Docs')).toHaveAttribute('href', '/docs');
  });

  it('merges custom className', () => {
    render(
      <Link href="/test" className="custom">
        Custom
      </Link>,
    );
    const el = screen.getByText('Custom');
    expect(el).toHaveClass('tcn-link');
    expect(el).toHaveClass('custom');
  });
});
