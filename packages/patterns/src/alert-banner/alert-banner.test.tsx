import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AlertBanner } from './alert-banner.js';

describe('AlertBanner', () => {
  it('renders the message', () => {
    render(<AlertBanner message="System update available" />);
    expect(screen.getByText('System update available')).toBeInTheDocument();
  });

  it('has role=alert', () => {
    render(<AlertBanner message="Test" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('defaults to info variant', () => {
    const { container } = render(<AlertBanner message="Test" />);
    const banner = container.querySelector('.tcn-alert-banner');
    expect(banner).toHaveAttribute('data-alert-variant', 'info');
  });

  it('applies warning variant', () => {
    const { container } = render(<AlertBanner message="Test" variant="warning" />);
    const banner = container.querySelector('.tcn-alert-banner');
    expect(banner).toHaveAttribute('data-alert-variant', 'warning');
  });

  it('applies danger variant', () => {
    const { container } = render(<AlertBanner message="Test" variant="danger" />);
    const banner = container.querySelector('.tcn-alert-banner');
    expect(banner).toHaveAttribute('data-alert-variant', 'danger');
  });

  it('applies neutral variant', () => {
    const { container } = render(<AlertBanner message="Test" variant="neutral" />);
    const banner = container.querySelector('.tcn-alert-banner');
    expect(banner).toHaveAttribute('data-alert-variant', 'neutral');
  });

  it('renders icon with aria-hidden', () => {
    const { container } = render(<AlertBanner message="Test" icon={<svg data-testid="icon" />} />);
    const iconWrapper = container.querySelector('.tcn-alert-banner-icon');
    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders action slot', () => {
    render(<AlertBanner message="Test" action={<button>Dismiss</button>} />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });
});
