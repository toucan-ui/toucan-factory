import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { GridItem } from './grid-item.js';

describe('GridItem', () => {
  it('renders a div with tcn-grid-item class', () => {
    render(<GridItem data-testid="gi">content</GridItem>);
    const el = screen.getByTestId('gi');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-grid-item');
  });

  it('does not set data-span when span is not provided', () => {
    render(<GridItem data-testid="gi" />);
    expect(screen.getByTestId('gi')).not.toHaveAttribute('data-span');
  });

  it.each([1, 2, 3, 4, 6, 8, 12])('sets data-span=%i', (span) => {
    render(<GridItem data-testid="gi" span={span} />);
    expect(screen.getByTestId('gi')).toHaveAttribute('data-span', String(span));
  });

  it('sets --tcn-grid-item-span CSS custom property', () => {
    render(<GridItem data-testid="gi" span={4} />);
    expect(screen.getByTestId('gi').style.getPropertyValue('--tcn-grid-item-span')).toBe('4');
  });

  it('does not set CSS custom property when span is not provided', () => {
    render(<GridItem data-testid="gi" />);
    expect(screen.getByTestId('gi').style.getPropertyValue('--tcn-grid-item-span')).toBe('');
  });

  it('supports spans beyond 12', () => {
    render(<GridItem data-testid="gi" span={16} />);
    const el = screen.getByTestId('gi');
    expect(el).toHaveAttribute('data-span', '16');
    expect(el.style.getPropertyValue('--tcn-grid-item-span')).toBe('16');
  });

  it('merges custom className', () => {
    render(<GridItem data-testid="gi" className="custom" />);
    const el = screen.getByTestId('gi');
    expect(el).toHaveClass('tcn-grid-item');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<GridItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('preserves existing style', () => {
    render(<GridItem data-testid="gi" span={3} style={{ color: 'red' }} />);
    const el = screen.getByTestId('gi');
    expect(el.style.color).toBe('red');
    expect(el.style.getPropertyValue('--tcn-grid-item-span')).toBe('3');
  });

  // Responsive span
  it('supports responsive span object', () => {
    render(<GridItem data-testid="gi" span={{ base: 12, md: 6 }} />);
    const el = screen.getByTestId('gi');
    expect(el).toHaveAttribute('data-span', '12');
    expect(el).toHaveAttribute('data-span-md', '6');
  });

  it('does not set --tcn-grid-item-span for responsive span', () => {
    render(<GridItem data-testid="gi" span={{ base: 4, lg: 2 }} />);
    expect(screen.getByTestId('gi').style.getPropertyValue('--tcn-grid-item-span')).toBe('');
  });

  it('supports responsive span with all breakpoints', () => {
    render(<GridItem data-testid="gi" span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2 }} />);
    const el = screen.getByTestId('gi');
    expect(el).toHaveAttribute('data-span', '12');
    expect(el).toHaveAttribute('data-span-sm', '6');
    expect(el).toHaveAttribute('data-span-md', '4');
    expect(el).toHaveAttribute('data-span-lg', '3');
    expect(el).toHaveAttribute('data-span-xl', '2');
  });
});
