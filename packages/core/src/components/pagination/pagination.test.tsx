import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Pagination, getPageRange } from './pagination.js';

describe('Pagination', () => {
  // --- Rendering ---

  it('renders a nav landmark', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders page buttons', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    // 5 page buttons + prev + next = 7
    expect(screen.getAllByRole('button')).toHaveLength(7);
  });

  it('applies tcn-pagination class', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole('navigation')).toHaveClass('tcn-pagination');
  });

  it('sets aria-label on nav', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} label="Pages" />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pages');
  });

  // --- aria-current ---

  it('sets aria-current=page on current page', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />);
    const current = screen.getByText('3');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on non-current pages', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByText('1')).not.toHaveAttribute('aria-current');
  });

  it('sets data-current on current page button', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByText('2')).toHaveAttribute('data-current', '');
  });

  // --- Disabled at boundaries ---

  it('disables prev button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
  });

  it('enables both prev and next on middle page', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled();
  });

  // --- onPageChange ---

  it('calls onPageChange when page button is clicked', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange on next click', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByLabelText('Go to next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange on prev click', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByLabelText('Go to previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  // --- Ellipsis ---

  it('renders ellipsis for large page ranges', () => {
    const { container } = render(<Pagination page={5} totalPages={20} onPageChange={vi.fn()} />);
    const ellipses = container.querySelectorAll('.tcn-pagination-ellipsis');
    expect(ellipses.length).toBeGreaterThan(0);
    ellipses.forEach((el) => {
      expect(el).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // --- Edge cases ---

  it('handles single page', () => {
    render(<Pagination page={1} totalPages={1} onPageChange={vi.fn()} />);
    // 1 page button + prev + next = 3
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
  });

  it('handles two pages', () => {
    render(<Pagination page={1} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  // --- getPageRange utility ---

  it('returns all pages when totalPages is small', () => {
    expect(getPageRange(1, 5, 1, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it('shows ellipsis on right side', () => {
    const range = getPageRange(1, 20, 1, 1);
    expect(range).toContain('ellipsis');
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(20);
  });

  it('shows ellipsis on both sides', () => {
    const range = getPageRange(10, 20, 1, 1);
    const ellipsisCount = range.filter((r) => r === 'ellipsis').length;
    expect(ellipsisCount).toBe(2);
  });

  // --- Aria labels on page buttons ---

  it('sets aria-label on page buttons', () => {
    render(<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByText('2')).toHaveAttribute('aria-label', 'Go to page 2');
  });

  // --- Accessibility ---

  it('passes axe checks', async () => {
    const { container } = render(<Pagination page={3} totalPages={10} onPageChange={vi.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks on first page', async () => {
    const { container } = render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
