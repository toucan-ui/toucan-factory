import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorState } from './error-state.js';

describe('ErrorState', () => {
  it('renders the title as a heading', () => {
    render(<ErrorState title="Something went wrong" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Something went wrong');
  });

  it('renders description when provided', () => {
    render(<ErrorState title="Error" description="Please try again later" />);
    expect(screen.getByText('Please try again later')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = render(
      <ErrorState title="Error" icon={<span data-testid="icon">⚠️</span>} />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    const iconWrapper = container.querySelector('.tcn-error-state-icon');
    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorState title="Error" onRetry={() => {}} />);
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('uses custom retryLabel', () => {
    render(<ErrorState title="Error" onRetry={() => {}} retryLabel="Reload" />);
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('fires onRetry when retry is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorState title="Error" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
