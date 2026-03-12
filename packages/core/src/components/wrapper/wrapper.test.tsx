import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Wrapper } from './wrapper.js';

describe('Wrapper', () => {
  it('renders a div with tcn-wrapper class', () => {
    render(<Wrapper data-testid="w">content</Wrapper>);
    const el = screen.getByTestId('w');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-wrapper');
  });

  it('defaults to lg size', () => {
    render(<Wrapper data-testid="w" />);
    expect(screen.getByTestId('w')).toHaveAttribute('data-size', 'lg');
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const)('supports size="%s"', (size) => {
    render(<Wrapper data-testid="w" size={size} />);
    expect(screen.getByTestId('w')).toHaveAttribute('data-size', size);
  });

  it('defaults to lg padding', () => {
    render(<Wrapper data-testid="w" />);
    expect(screen.getByTestId('w')).toHaveAttribute('data-padding', 'lg');
  });

  it.each(['sm', 'md', 'lg', 'xl'] as const)('supports padding="%s"', (padding) => {
    render(<Wrapper data-testid="w" padding={padding} />);
    expect(screen.getByTestId('w')).toHaveAttribute('data-padding', padding);
  });

  it('omits data-padding when padding="none"', () => {
    render(<Wrapper data-testid="w" padding="none" />);
    expect(screen.getByTestId('w')).not.toHaveAttribute('data-padding');
  });

  it('merges custom className', () => {
    render(<Wrapper data-testid="w" className="custom" />);
    const el = screen.getByTestId('w');
    expect(el).toHaveClass('tcn-wrapper');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Wrapper ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through children', () => {
    render(<Wrapper>hello</Wrapper>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
