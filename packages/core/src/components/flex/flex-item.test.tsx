import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { FlexItem } from './flex-item.js';

describe('FlexItem', () => {
  it('renders a div with tcn-flex-item class', () => {
    render(<FlexItem data-testid="fi">content</FlexItem>);
    const el = screen.getByTestId('fi');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-flex-item');
  });

  it('sets data-grow when grow is true', () => {
    render(<FlexItem data-testid="fi" grow />);
    expect(screen.getByTestId('fi')).toHaveAttribute('data-grow');
  });

  it('does not set data-grow when grow is not provided', () => {
    render(<FlexItem data-testid="fi" />);
    expect(screen.getByTestId('fi')).not.toHaveAttribute('data-grow');
  });

  it('sets data-shrink="false" when shrink is false', () => {
    render(<FlexItem data-testid="fi" shrink={false} />);
    expect(screen.getByTestId('fi')).toHaveAttribute('data-shrink', 'false');
  });

  it('does not set data-shrink when shrink is not provided', () => {
    render(<FlexItem data-testid="fi" />);
    expect(screen.getByTestId('fi')).not.toHaveAttribute('data-shrink');
  });

  it('does not set data-shrink when shrink is true', () => {
    render(<FlexItem data-testid="fi" shrink />);
    expect(screen.getByTestId('fi')).not.toHaveAttribute('data-shrink');
  });

  it('merges custom className', () => {
    render(<FlexItem data-testid="fi" className="custom" />);
    const el = screen.getByTestId('fi');
    expect(el).toHaveClass('tcn-flex-item');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<FlexItem ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads HTML attributes', () => {
    render(<FlexItem data-testid="fi" aria-label="test" id="my-item" />);
    const el = screen.getByTestId('fi');
    expect(el).toHaveAttribute('aria-label', 'test');
    expect(el).toHaveAttribute('id', 'my-item');
  });
});
