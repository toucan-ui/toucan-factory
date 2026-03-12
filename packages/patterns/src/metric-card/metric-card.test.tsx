import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from './metric-card.js';

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="Revenue" value="$12,345" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  it('renders a Box with default elevation', () => {
    const { container } = render(<MetricCard label="Rev" value="$1" />);
    const surface = container.querySelector('.tcn-box');
    expect(surface).toHaveAttribute('data-elevation', '1');
  });

  it('applies custom elevation', () => {
    const { container } = render(<MetricCard label="Rev" value="$1" elevation={2} />);
    const surface = container.querySelector('.tcn-box');
    expect(surface).toHaveAttribute('data-elevation', '2');
  });

  it('renders badge with change text', () => {
    render(<MetricCard label="Rev" value="$1" change="+5.2%" />);
    expect(screen.getByText('+5.2%')).toBeInTheDocument();
  });

  it('maps up trend to success badge variant', () => {
    const { container } = render(<MetricCard label="Rev" value="$1" change="+5%" trend="up" />);
    const badge = container.querySelector('.tcn-badge');
    expect(badge).toHaveAttribute('data-variant', 'success');
  });

  it('maps down trend to danger badge variant', () => {
    const { container } = render(<MetricCard label="Rev" value="$1" change="-3%" trend="down" />);
    const badge = container.querySelector('.tcn-badge');
    expect(badge).toHaveAttribute('data-variant', 'danger');
  });

  it('maps flat trend to neutral badge variant', () => {
    const { container } = render(<MetricCard label="Rev" value="$1" change="0%" trend="flat" />);
    const badge = container.querySelector('.tcn-badge');
    expect(badge).toHaveAttribute('data-variant', 'neutral');
  });

  it('defaults trend to flat', () => {
    const { container } = render(<MetricCard label="Rev" value="$1" change="0%" />);
    const badge = container.querySelector('.tcn-badge');
    expect(badge).toHaveAttribute('data-variant', 'neutral');
  });
});
