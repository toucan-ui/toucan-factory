import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Alert } from './alert.js';

describe('Alert', () => {
  it('renders with role alert', () => {
    render(<Alert>Something happened</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('tcn-alert');
  });

  it('defaults to info variant', () => {
    render(<Alert>Info</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'info');
  });

  it('applies variant data attribute', () => {
    const { unmount } = render(<Alert variant="warning">Text</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'warning');
    unmount();
  });

  it('renders children directly without wrapper divs', () => {
    render(<Alert>Direct content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Direct content');
    expect(alert.querySelector('.tcn-alert-content')).not.toBeInTheDocument();
    expect(alert.querySelector('.tcn-alert-body')).not.toBeInTheDocument();
  });

  it('passes through arbitrary HTML attributes', () => {
    render(
      <Alert data-testid="my-alert" aria-live="assertive">
        Text
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-testid', 'my-alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  // Axe
  it('passes axe accessibility checks', async () => {
    const { container } = render(<Alert>Body text</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Custom color props
  describe('custom colors', () => {
    it('sets data-variant="custom" and --alert-surface when surface is provided', () => {
      render(<Alert surface="var(--color-blue-100)">Custom</Alert>);
      const el = screen.getByRole('alert');
      expect(el).toHaveAttribute('data-variant', 'custom');
      expect(el.style.getPropertyValue('--alert-surface')).toBe('var(--color-blue-100)');
    });

    it('sets data-variant="custom" and --alert-on-surface when onSurface is provided', () => {
      render(<Alert onSurface="var(--color-blue-900)">Custom</Alert>);
      const el = screen.getByRole('alert');
      expect(el).toHaveAttribute('data-variant', 'custom');
      expect(el.style.getPropertyValue('--alert-on-surface')).toBe('var(--color-blue-900)');
    });

    it('sets all three custom properties when all props are provided', () => {
      render(
        <Alert surface="hotpink" onSurface="white" border="deeppink">
          Custom
        </Alert>,
      );
      const el = screen.getByRole('alert');
      expect(el).toHaveAttribute('data-variant', 'custom');
      expect(el.style.getPropertyValue('--alert-surface')).toBe('hotpink');
      expect(el.style.getPropertyValue('--alert-on-surface')).toBe('white');
      expect(el.style.getPropertyValue('--alert-custom-border')).toBe('deeppink');
    });

    it('overrides explicit variant when custom props are present', () => {
      render(
        <Alert variant="danger" surface="var(--color-purple-100)">
          Override
        </Alert>,
      );
      expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'custom');
    });

    it('preserves existing style alongside custom props', () => {
      render(
        <Alert surface="var(--color-blue-100)" style={{ marginTop: '8px' }}>
          Styled
        </Alert>,
      );
      const el = screen.getByRole('alert');
      expect(el.style.marginTop).toBe('8px');
      expect(el.style.getPropertyValue('--alert-surface')).toBe('var(--color-blue-100)');
    });

    it('does not add custom properties when no custom props are provided', () => {
      render(<Alert>Plain</Alert>);
      const el = screen.getByRole('alert');
      expect(el.style.getPropertyValue('--alert-surface')).toBe('');
      expect(el.style.getPropertyValue('--alert-on-surface')).toBe('');
      expect(el.style.getPropertyValue('--alert-custom-border')).toBe('');
      expect(el).toHaveAttribute('data-variant', 'info');
    });
  });
});
