import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroCentered } from './hero-centered.js';

describe('HeroCentered', () => {
  it('renders the title as a display heading', () => {
    render(<HeroCentered title="Manage your pipeline" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Manage your pipeline');
    expect(heading).toHaveAttribute('data-display', 'lg');
  });

  it('renders subtitle when provided', () => {
    render(<HeroCentered title="Title" subtitle="A subtitle" />);
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('renders CTA button when ctaLabel is provided', () => {
    render(<HeroCentered title="Title" ctaLabel="Start now" />);
    expect(screen.getByRole('button', { name: 'Start now' })).toBeInTheDocument();
  });

  it('fires onCtaClick when CTA is clicked', () => {
    const onClick = vi.fn();
    render(<HeroCentered title="Title" ctaLabel="Click" onCtaClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a div element', () => {
    const { container } = render(<HeroCentered title="Title" />);
    expect(container.querySelector('.tcn-hero-centered')?.tagName).toBe('DIV');
  });
});
