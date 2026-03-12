import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroFull } from './hero-full.js';

describe('HeroFull', () => {
  it('renders the title as a display heading', () => {
    render(<HeroFull title="Transform your business" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Transform your business');
    expect(heading).toHaveAttribute('data-display', 'lg');
  });

  it('renders subtitle when provided', () => {
    render(<HeroFull title="Title" subtitle="A subtitle" />);
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('renders CTA button when ctaLabel is provided', () => {
    render(<HeroFull title="Title" ctaLabel="Get started" />);
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  it('fires onCtaClick when CTA is clicked', () => {
    const onClick = vi.fn();
    render(<HeroFull title="Title" ctaLabel="Click me" onCtaClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies background image as inline style', () => {
    const { container } = render(<HeroFull title="Title" backgroundSrc="/bg.jpg" />);
    const hero = container.querySelector('.tcn-hero-full') as HTMLElement;
    expect(hero.style.backgroundImage).toContain('/bg.jpg');
  });

  it('renders as a div element', () => {
    const { container } = render(<HeroFull title="Title" />);
    expect(container.querySelector('.tcn-hero-full')?.tagName).toBe('DIV');
  });
});
