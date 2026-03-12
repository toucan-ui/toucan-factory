import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VisuallyHidden } from './visually-hidden.js';

describe('VisuallyHidden', () => {
  it('renders a span element', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    const el = screen.getByText('Hidden text');
    expect(el.tagName).toBe('SPAN');
  });

  it('applies data-visually-hidden attribute', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    const el = screen.getByText('Hidden text');
    expect(el).toHaveAttribute('data-visually-hidden');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
    render(<VisuallyHidden ref={ref}>Hidden text</VisuallyHidden>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('forwards additional HTML attributes', () => {
    render(
      <VisuallyHidden data-testid="vh" id="sr-label">
        Hidden text
      </VisuallyHidden>,
    );
    expect(screen.getByTestId('vh')).toHaveAttribute('id', 'sr-label');
  });
});
