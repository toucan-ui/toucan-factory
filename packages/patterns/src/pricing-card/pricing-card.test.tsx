import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PricingCard } from './pricing-card.js';

const defaultProps = {
  tier: 'Pro',
  price: '£29',
  features: ['Unlimited projects', '10 GB storage', 'Priority support'],
};

describe('PricingCard', () => {
  it('renders the tier as a heading', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Pro');
  });

  it('renders the price', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('£29')).toBeInTheDocument();
  });

  it('renders period when provided', () => {
    render(<PricingCard {...defaultProps} period="month" />);
    expect(screen.getByText('/month')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<PricingCard {...defaultProps} description="Best for teams" />);
    expect(screen.getByText('Best for teams')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
    expect(screen.getByText('10 GB storage')).toBeInTheDocument();
    expect(screen.getByText('Priority support')).toBeInTheDocument();
  });

  it('renders features as a list', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders CTA button when ctaLabel is provided', () => {
    render(<PricingCard {...defaultProps} ctaLabel="Subscribe" />);
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('fires onCtaClick when CTA is clicked', () => {
    const onClick = vi.fn();
    render(<PricingCard {...defaultProps} ctaLabel="Subscribe" onCtaClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('uses primary variant button when highlighted', () => {
    render(<PricingCard {...defaultProps} ctaLabel="Subscribe" highlighted />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('uses secondary variant button when not highlighted', () => {
    render(<PricingCard {...defaultProps} ctaLabel="Subscribe" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
  });

  it('applies highlighted modifier class', () => {
    const { container } = render(<PricingCard {...defaultProps} highlighted />);
    expect(container.querySelector('.tcn-pricing-card--highlighted')).toBeInTheDocument();
  });

  it('renders a separator between header and features', () => {
    const { container } = render(<PricingCard {...defaultProps} />);
    expect(container.querySelector('.tcn-separator')).toBeInTheDocument();
  });
});
