import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from './separator.js';

describe('Separator', () => {
  it('renders with role separator by default', () => {
    render(<Separator />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('tcn-separator');
  });

  it('defaults to horizontal orientation', () => {
    render(<Separator />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('does not emit aria-orientation for horizontal (ARIA default)', () => {
    render(<Separator />);
    const separator = screen.getByRole('separator');
    expect(separator).not.toHaveAttribute('aria-orientation');
  });

  it('sets aria-orientation to vertical when vertical', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('uses role none when decorative', () => {
    const { container } = render(<Separator decorative />);
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('role', 'none');
  });

  it('does not emit aria-orientation when decorative', () => {
    const { container } = render(<Separator decorative orientation="vertical" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).not.toHaveAttribute('aria-orientation');
    expect(el).toHaveAttribute('data-orientation', 'vertical');
  });
});
