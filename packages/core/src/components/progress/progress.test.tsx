import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Progress } from './progress.js';

describe('Progress', () => {
  it('renders with role progressbar', () => {
    render(<Progress value={50} label="Loading" />);
    const el = screen.getByRole('progressbar');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('tcn-progress');
  });

  it('sets aria-valuenow, aria-valuemin, aria-valuemax', () => {
    render(<Progress value={65} label="Upload" />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '65');
    expect(el).toHaveAttribute('aria-valuemin', '0');
    expect(el).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps value to 0..max', () => {
    const { rerender } = render(<Progress value={-10} label="Test" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    rerender(<Progress value={200} label="Test" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('supports custom max', () => {
    render(<Progress value={3} max={10} label="Steps" />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '3');
    expect(el).toHaveAttribute('aria-valuemax', '10');
  });

  it('sets bar width as inline style percentage', () => {
    const { container } = render(<Progress value={65} label="Upload" />);
    const bar = container.querySelector('.tcn-progress-bar');
    expect(bar).toHaveStyle({ width: '65%' });
  });

  it('omits aria-valuenow for indeterminate', () => {
    render(<Progress label="Loading" />);
    const el = screen.getByRole('progressbar');
    expect(el).not.toHaveAttribute('aria-valuenow');
    expect(el).toHaveAttribute('data-indeterminate', '');
  });

  it('sets data-indeterminate when value is omitted', () => {
    render(<Progress label="Loading" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-indeterminate', '');
  });

  it('does not set data-indeterminate when value is provided', () => {
    render(<Progress value={50} label="Upload" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('data-indeterminate');
  });

  it('defaults to size md', () => {
    render(<Progress value={50} label="Test" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'md');
  });

  it('applies aria-label from label prop', () => {
    render(<Progress value={50} label="Upload progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress');
  });

  it('warns when no accessible label provided', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Progress value={50} />);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('no accessible label'));
    spy.mockRestore();
  });
});
