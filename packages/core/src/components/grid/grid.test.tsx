import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Grid } from './grid.js';

describe('Grid', () => {
  it('renders a div with tcn-grid class', () => {
    render(<Grid data-testid="g">content</Grid>);
    const el = screen.getByTestId('g');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-grid');
  });

  it('defaults to 1 column', () => {
    render(<Grid data-testid="g" />);
    expect(screen.getByTestId('g')).toHaveAttribute('data-columns', '1');
  });

  it.each([1, 2, 3, 4, 5, 6, 'auto'] as const)('supports columns=%s', (columns) => {
    render(<Grid data-testid="g" columns={columns} />);
    expect(screen.getByTestId('g')).toHaveAttribute('data-columns', String(columns));
  });

  it('supports columns beyond 6 (e.g. 12)', () => {
    render(<Grid data-testid="g" columns={12} />);
    const el = screen.getByTestId('g');
    expect(el).toHaveAttribute('data-columns', '12');
    expect(el.style.getPropertyValue('--tcn-grid-columns')).toBe('12');
  });

  it('supports arbitrary column counts via CSS custom property', () => {
    render(<Grid data-testid="g" columns={16} />);
    const el = screen.getByTestId('g');
    expect(el).toHaveAttribute('data-columns', '16');
    expect(el.style.getPropertyValue('--tcn-grid-columns')).toBe('16');
  });

  it('sets --tcn-grid-columns for numeric columns', () => {
    render(<Grid data-testid="g" columns={3} />);
    expect(screen.getByTestId('g').style.getPropertyValue('--tcn-grid-columns')).toBe('3');
  });

  it('does not set --tcn-grid-columns for auto columns', () => {
    render(<Grid data-testid="g" columns="auto" />);
    expect(screen.getByTestId('g').style.getPropertyValue('--tcn-grid-columns')).toBe('');
  });

  it('sets data-gap when gap is provided', () => {
    render(<Grid data-testid="g" gap={4} />);
    expect(screen.getByTestId('g')).toHaveAttribute('data-gap', '4');
  });

  it('does not set data-gap when gap is not provided', () => {
    render(<Grid data-testid="g" />);
    expect(screen.getByTestId('g')).not.toHaveAttribute('data-gap');
  });

  it('supports gap=0', () => {
    render(<Grid data-testid="g" gap={0} />);
    expect(screen.getByTestId('g')).toHaveAttribute('data-gap', '0');
  });

  it('sets --tcn-grid-min-item-size custom property', () => {
    render(<Grid data-testid="g" minItemSize="300px" />);
    const el = screen.getByTestId('g');
    expect(el.style.getPropertyValue('--tcn-grid-min-item-size')).toBe('300px');
  });

  it('does not set custom property when minItemSize is not provided', () => {
    render(<Grid data-testid="g" />);
    const el = screen.getByTestId('g');
    expect(el.style.getPropertyValue('--tcn-grid-min-item-size')).toBe('');
  });

  it('merges custom className', () => {
    render(<Grid data-testid="g" className="custom" />);
    const el = screen.getByTestId('g');
    expect(el).toHaveClass('tcn-grid');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('preserves existing style when minItemSize is set', () => {
    render(<Grid data-testid="g" minItemSize="200px" style={{ color: 'red' }} />);
    const el = screen.getByTestId('g');
    expect(el.style.color).toBe('red');
    expect(el.style.getPropertyValue('--tcn-grid-min-item-size')).toBe('200px');
  });

  // Responsive columns
  it('supports responsive columns object', () => {
    render(<Grid data-testid="g" columns={{ base: 1, md: 3 }} />);
    const el = screen.getByTestId('g');
    expect(el).toHaveAttribute('data-columns', '1');
    expect(el).toHaveAttribute('data-columns-md', '3');
  });

  it('supports responsive columns with auto', () => {
    render(<Grid data-testid="g" columns={{ base: 1, lg: 'auto' }} />);
    const el = screen.getByTestId('g');
    expect(el).toHaveAttribute('data-columns', '1');
    expect(el).toHaveAttribute('data-columns-lg', 'auto');
  });

  it('does not set --tcn-grid-columns for responsive columns', () => {
    render(<Grid data-testid="g" columns={{ base: 2, md: 4 }} />);
    expect(screen.getByTestId('g').style.getPropertyValue('--tcn-grid-columns')).toBe('');
  });

  // Responsive gap
  it('supports responsive gap object', () => {
    render(<Grid data-testid="g" gap={{ base: 2, lg: 6 }} />);
    const el = screen.getByTestId('g');
    expect(el).toHaveAttribute('data-gap', '2');
    expect(el).toHaveAttribute('data-gap-lg', '6');
  });

  it('supports responsive gap with 0', () => {
    render(<Grid data-testid="g" gap={{ base: 0, md: 4 }} />);
    const el = screen.getByTestId('g');
    expect(el).toHaveAttribute('data-gap', '0');
    expect(el).toHaveAttribute('data-gap-md', '4');
  });
});
