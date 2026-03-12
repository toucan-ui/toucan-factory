import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './text.js';

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Hello</Text>);
    const el = screen.getByText('Hello');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('tcn-text');
  });

  it('renders as a custom element', () => {
    render(<Text as="span">Hello</Text>);
    expect(screen.getByText('Hello').tagName).toBe('SPAN');
  });

  it('applies size data attribute', () => {
    render(<Text size="lg">Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-size', 'lg');
  });

  it('defaults to base size', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-size', 'base');
  });

  it('applies muted data attribute when true', () => {
    render(<Text muted>Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-muted');
  });

  it('does not apply muted data attribute when false', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).not.toHaveAttribute('data-muted');
  });

  it('applies mono data attribute when true', () => {
    render(<Text mono>Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-mono');
  });

  it('does not apply mono data attribute when false', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).not.toHaveAttribute('data-mono');
  });

  it('applies xs size', () => {
    render(<Text size="xs">Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-size', 'xs');
  });

  it('applies weight data attribute', () => {
    render(<Text weight="bold">Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-weight', 'bold');
  });

  it('does not apply weight when regular', () => {
    render(<Text weight="regular">Hello</Text>);
    expect(screen.getByText('Hello')).not.toHaveAttribute('data-weight');
  });

  it('applies variant data attribute', () => {
    render(<Text variant="muted">Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-variant', 'muted');
    expect(screen.getByText('Hello')).toHaveAttribute('data-muted');
  });

  it('does not apply variant when default', () => {
    render(<Text variant="default">Hello</Text>);
    expect(screen.getByText('Hello')).not.toHaveAttribute('data-variant');
  });

  it('applies align data attribute', () => {
    render(<Text align="center">Hello</Text>);
    expect(screen.getByText('Hello')).toHaveAttribute('data-align', 'center');
  });

  it('does not apply align when not set', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).not.toHaveAttribute('data-align');
  });
});
