import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge.js';

describe('Badge', () => {
  it('renders a span with badge class', () => {
    render(<Badge>New</Badge>);
    const el = screen.getByText('New');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('tcn-badge');
  });

  it('defaults to neutral variant and md size', () => {
    render(<Badge>Default</Badge>);
    const el = screen.getByText('Default');
    expect(el).toHaveAttribute('data-variant', 'neutral');
    expect(el).toHaveAttribute('data-size', 'md');
  });

  it('applies variant data attribute', () => {
    render(<Badge variant="danger">Error</Badge>);
    expect(screen.getByText('Error')).toHaveAttribute('data-variant', 'danger');
  });

  it('applies size data attribute', () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveAttribute('data-size', 'sm');
  });

  // Live region
  it('does not add role=status by default', () => {
    render(<Badge>Static</Badge>);
    const el = screen.getByText('Static');
    expect(el).not.toHaveAttribute('role');
    expect(el).not.toHaveAttribute('aria-atomic');
    expect(el).not.toHaveAttribute('data-live');
  });

  it('adds role=status and aria-atomic when live', () => {
    render(<Badge live>3 errors</Badge>);
    const el = screen.getByText('3 errors');
    expect(el).toHaveAttribute('role', 'status');
    expect(el).toHaveAttribute('aria-atomic', 'true');
    expect(el).toHaveAttribute('data-live');
  });

  // Custom color props
  describe('custom colors', () => {
    it('sets data-variant="custom" and --badge-surface when surface is provided', () => {
      render(<Badge surface="var(--color-blue-100)">Custom</Badge>);
      const el = screen.getByText('Custom');
      expect(el).toHaveAttribute('data-variant', 'custom');
      expect(el.style.getPropertyValue('--badge-surface')).toBe('var(--color-blue-100)');
    });

    it('sets data-variant="custom" and --badge-on-surface when onSurface is provided', () => {
      render(<Badge onSurface="var(--color-blue-900)">Custom</Badge>);
      const el = screen.getByText('Custom');
      expect(el).toHaveAttribute('data-variant', 'custom');
      expect(el.style.getPropertyValue('--badge-on-surface')).toBe('var(--color-blue-900)');
    });

    it('sets both custom properties when both props are provided', () => {
      render(
        <Badge surface="var(--color-blue-100)" onSurface="var(--color-blue-900)">
          Custom
        </Badge>,
      );
      const el = screen.getByText('Custom');
      expect(el).toHaveAttribute('data-variant', 'custom');
      expect(el.style.getPropertyValue('--badge-surface')).toBe('var(--color-blue-100)');
      expect(el.style.getPropertyValue('--badge-on-surface')).toBe('var(--color-blue-900)');
    });

    it('overrides explicit variant when custom props are present', () => {
      render(
        <Badge variant="danger" surface="var(--color-purple-100)">
          Override
        </Badge>,
      );
      const el = screen.getByText('Override');
      expect(el).toHaveAttribute('data-variant', 'custom');
    });

    it('preserves existing style alongside custom props', () => {
      render(
        <Badge surface="var(--color-blue-100)" style={{ marginTop: '8px' }}>
          Styled
        </Badge>,
      );
      const el = screen.getByText('Styled');
      expect(el.style.marginTop).toBe('8px');
      expect(el.style.getPropertyValue('--badge-surface')).toBe('var(--color-blue-100)');
    });

    it('does not add custom properties when neither prop is provided', () => {
      render(<Badge>Plain</Badge>);
      const el = screen.getByText('Plain');
      expect(el.style.getPropertyValue('--badge-surface')).toBe('');
      expect(el.style.getPropertyValue('--badge-on-surface')).toBe('');
      expect(el).toHaveAttribute('data-variant', 'neutral');
    });
  });
});
