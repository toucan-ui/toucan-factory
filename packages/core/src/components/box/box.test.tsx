import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Box } from './box.js';

describe('Box', () => {
  it('renders a div with tcn-box class', () => {
    render(<Box data-testid="b">content</Box>);
    const el = screen.getByTestId('b');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-box');
  });

  it('defaults to elevation 1, radius md, padding md', () => {
    render(<Box data-testid="b" />);
    const el = screen.getByTestId('b');
    expect(el).toHaveAttribute('data-elevation', '1');
    expect(el).toHaveAttribute('data-radius', 'md');
    expect(el).toHaveAttribute('data-padding', 'md');
  });

  it.each([0, 1, 2, 3] as const)('supports elevation=%i', (elevation) => {
    render(<Box data-testid="b" elevation={elevation} />);
    expect(screen.getByTestId('b')).toHaveAttribute('data-elevation', String(elevation));
  });

  it.each(['none', 'sm', 'md', 'lg'] as const)('supports radius="%s"', (radius) => {
    render(<Box data-testid="b" radius={radius} />);
    expect(screen.getByTestId('b')).toHaveAttribute('data-radius', radius);
  });

  it.each(['none', 'sm', 'md', 'lg'] as const)('supports padding="%s"', (padding) => {
    render(<Box data-testid="b" padding={padding} />);
    expect(screen.getByTestId('b')).toHaveAttribute('data-padding', padding);
  });

  it('merges custom className', () => {
    render(<Box data-testid="b" className="custom" />);
    const el = screen.getByTestId('b');
    expect(el).toHaveClass('tcn-box');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Box ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through children', () => {
    render(<Box>hello</Box>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('does not set data-overflow by default', () => {
    render(<Box data-testid="b" />);
    expect(screen.getByTestId('b')).not.toHaveAttribute('data-overflow');
  });

  it.each(['auto', 'hidden', 'visible', 'scroll'] as const)(
    'supports overflow="%s"',
    (overflow) => {
      render(<Box data-testid="b" overflow={overflow} />);
      expect(screen.getByTestId('b')).toHaveAttribute('data-overflow', overflow);
    },
  );
});
