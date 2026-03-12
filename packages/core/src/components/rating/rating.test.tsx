import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Rating } from './rating.js';

describe('Rating', () => {
  it('renders a div with rating class', () => {
    render(<Rating value={3} />);
    const el = screen.getByRole('img');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-rating');
  });

  it('defaults to md size and 5 max', () => {
    render(<Rating value={3} />);
    const el = screen.getByRole('img');
    expect(el).toHaveAttribute('data-size', 'md');
    // 5 SVG stars
    expect(el.querySelectorAll('svg')).toHaveLength(5);
  });

  it('generates aria-label from value and max', () => {
    render(<Rating value={3.5} max={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '3.5 out of 5');
  });

  it('uses custom label when provided', () => {
    render(<Rating value={4} label="Excellent" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Excellent');
  });

  it('applies size data attribute', () => {
    render(<Rating value={2} size="lg" />);
    expect(screen.getByRole('img')).toHaveAttribute('data-size', 'lg');
  });

  it('renders correct number of stars for custom max', () => {
    render(<Rating value={3} max={10} />);
    expect(screen.getByRole('img').querySelectorAll('svg')).toHaveLength(10);
  });

  it('renders filled stars with data-filled attribute', () => {
    render(<Rating value={3} />);
    const stars = screen.getByRole('img').querySelectorAll('svg');
    // First 3 filled
    expect(stars[0]).toHaveAttribute('data-filled');
    expect(stars[1]).toHaveAttribute('data-filled');
    expect(stars[2]).toHaveAttribute('data-filled');
    // Last 2 empty
    expect(stars[3]).not.toHaveAttribute('data-filled');
    expect(stars[4]).not.toHaveAttribute('data-filled');
  });

  it('renders half star for fractional values', () => {
    render(<Rating value={2.5} />);
    const stars = screen.getByRole('img').querySelectorAll('svg');
    // First 2 filled, third is half (has linearGradient), last 2 empty
    expect(stars[0]).toHaveAttribute('data-filled');
    expect(stars[1]).toHaveAttribute('data-filled');
    expect(stars[2]).toHaveAttribute('data-filled'); // half star also has data-filled
    expect(stars[2].querySelector('linearGradient')).toBeTruthy();
    expect(stars[3]).not.toHaveAttribute('data-filled');
    expect(stars[4]).not.toHaveAttribute('data-filled');
  });

  it('marks all stars as aria-hidden', () => {
    render(<Rating value={3} />);
    const stars = screen.getByRole('img').querySelectorAll('svg');
    for (const star of stars) {
      expect(star).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('merges custom className', () => {
    render(<Rating value={1} className="custom" />);
    expect(screen.getByRole('img')).toHaveClass('tcn-rating', 'custom');
  });
});
