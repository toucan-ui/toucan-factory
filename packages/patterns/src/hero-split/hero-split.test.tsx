import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSplit } from './hero-split.js';

describe('HeroSplit', () => {
  it('renders the title as a display heading', () => {
    render(<HeroSplit title="Grow your wealth" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Grow your wealth');
    expect(heading).toHaveAttribute('data-display', 'lg');
  });

  it('renders subtitle when provided', () => {
    render(<HeroSplit title="Title" subtitle="A subtitle" />);
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('renders CTA button when ctaLabel is provided', () => {
    render(<HeroSplit title="Title" ctaLabel="Get started" />);
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  it('fires onCtaClick when CTA is clicked', () => {
    const onClick = vi.fn();
    render(<HeroSplit title="Title" ctaLabel="Click me" onCtaClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders image when imageSrc is provided', () => {
    render(<HeroSplit title="Title" imageSrc="/hero.png" imageAlt="Hero" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/hero.png');
    expect(img).toHaveAttribute('alt', 'Hero');
  });

  it('applies reverse modifier class when reverse is true', () => {
    const { container } = render(<HeroSplit title="Title" reverse />);
    expect(container.querySelector('.tcn-hero-split--reverse')).toBeInTheDocument();
  });

  it('does not apply reverse class by default', () => {
    const { container } = render(<HeroSplit title="Title" />);
    expect(container.querySelector('.tcn-hero-split--reverse')).not.toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<HeroSplit title="Title" />);
    expect(container.querySelector('.tcn-hero-split')?.tagName).toBe('DIV');
  });
});
