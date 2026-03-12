import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Section } from './section.js';

describe('Section', () => {
  it('renders a <section> with tcn-section class', () => {
    render(<Section data-testid="s">content</Section>);
    const el = screen.getByTestId('s');
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveClass('tcn-section');
  });

  it('renders children directly', () => {
    render(
      <Section data-testid="s">
        <span data-testid="child">hello</span>
      </Section>,
    );
    expect(screen.getByTestId('s')).toContainElement(screen.getByTestId('child'));
  });

  it.each(['sm', 'md', 'lg', 'xl'] as const)('sets data-padding=%s', (padding) => {
    render(<Section data-testid="s" padding={padding} />);
    expect(screen.getByTestId('s')).toHaveAttribute('data-padding', padding);
  });

  it('omits data-padding when padding is "none" (default)', () => {
    render(<Section data-testid="s" />);
    expect(screen.getByTestId('s')).not.toHaveAttribute('data-padding');
  });

  it('omits data-padding when padding is explicitly "none"', () => {
    render(<Section data-testid="s" padding="none" />);
    expect(screen.getByTestId('s')).not.toHaveAttribute('data-padding');
  });

  it.each(['default', 'muted'] as const)('sets data-background=%s', (bg) => {
    render(<Section data-testid="s" background={bg} />);
    expect(screen.getByTestId('s')).toHaveAttribute('data-background', bg);
  });

  it('omits data-background when not set', () => {
    render(<Section data-testid="s" />);
    expect(screen.getByTestId('s')).not.toHaveAttribute('data-background');
  });

  it.each([0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const)('sets data-gap=%i on section', (gap) => {
    render(<Section data-testid="s" gap={gap} />);
    expect(screen.getByTestId('s')).toHaveAttribute('data-gap', String(gap));
  });

  it('omits data-gap when gap is not set', () => {
    render(<Section data-testid="s" />);
    expect(screen.getByTestId('s')).not.toHaveAttribute('data-gap');
  });

  it('merges custom className', () => {
    render(<Section data-testid="s" className="custom" />);
    const el = screen.getByTestId('s');
    expect(el).toHaveClass('tcn-section');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>();
    render(<Section ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current!.tagName).toBe('SECTION');
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <Section background="muted" padding="lg">
        <p>Accessible content</p>
      </Section>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
