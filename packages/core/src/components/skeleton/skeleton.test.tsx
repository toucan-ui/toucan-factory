import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './skeleton.js';

describe('Skeleton', () => {
  it('renders a div', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-skeleton');
  });

  it('defaults to text variant', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('data-variant', 'text');
  });

  it('applies variant data attribute', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveAttribute('data-variant', 'circular');
  });

  it('has aria-hidden true', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies width as string', () => {
    const { container } = render(<Skeleton width="200px" />);
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  it('applies width as number (converts to px)', () => {
    const { container } = render(<Skeleton width={200} />);
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  it('applies height as string', () => {
    const { container } = render(<Skeleton height="3rem" />);
    expect(container.firstChild).toHaveStyle({ height: '3rem' });
  });

  it('applies height as number (converts to px)', () => {
    const { container } = render(<Skeleton height={48} />);
    expect(container.firstChild).toHaveStyle({ height: '48px' });
  });

  it('merges with existing style prop', () => {
    const { container } = render(<Skeleton width={100} height={50} style={{ opacity: 0.5 }} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ width: '100px', height: '50px', opacity: '0.5' });
  });

  it('does not set inline style when no dimensions provided', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('style')).toBeNull();
  });
});
