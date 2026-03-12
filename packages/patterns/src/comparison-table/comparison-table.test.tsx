import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComparisonTable } from './comparison-table.js';
import type { ComparisonFeature } from './comparison-table.js';

const products = ['Starter', 'Pro', 'Enterprise'];

const features: ComparisonFeature[] = [
  {
    feature: 'Users',
    values: {
      Starter: '5',
      Pro: '50',
      Enterprise: { text: 'Unlimited', variant: 'success' },
    },
  },
  {
    feature: 'Storage',
    values: {
      Starter: '1 GB',
      Pro: '100 GB',
      Enterprise: '1 TB',
    },
  },
  {
    feature: 'Support',
    values: {
      Starter: 'Email',
      Pro: { text: 'Priority', variant: 'info' },
      Enterprise: { text: 'Dedicated', variant: 'success' },
    },
  },
];

describe('ComparisonTable', () => {
  it('renders all product headers', () => {
    render(<ComparisonTable products={products} features={features} />);
    expect(screen.getByRole('columnheader', { name: 'Starter' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Pro' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Enterprise' })).toBeInTheDocument();
  });

  it('renders all feature rows', () => {
    render(<ComparisonTable products={products} features={features} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders plain string values as text', () => {
    render(<ComparisonTable products={products} features={features} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('1 GB')).toBeInTheDocument();
  });

  it('renders badge values with correct variant', () => {
    const { container } = render(<ComparisonTable products={products} features={features} />);
    const badges = container.querySelectorAll('.tcn-badge');
    expect(badges.length).toBe(3);
    expect(screen.getByText('Unlimited')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Dedicated')).toBeInTheDocument();
  });

  it('highlighted column gets data attribute on header', () => {
    render(<ComparisonTable products={products} features={features} highlightedProduct="Pro" />);
    const proHeader = screen.getByRole('columnheader', { name: 'Pro' });
    expect(proHeader).toHaveAttribute('data-highlighted');

    const starterHeader = screen.getByRole('columnheader', {
      name: 'Starter',
    });
    expect(starterHeader).not.toHaveAttribute('data-highlighted');
  });

  it('highlighted column gets data attribute on cells', () => {
    render(<ComparisonTable products={products} features={features} highlightedProduct="Pro" />);
    const cells = document.querySelectorAll('.tcn-table-cell[data-highlighted]');
    expect(cells.length).toBe(features.length);
  });

  it('renders caption when provided', () => {
    render(<ComparisonTable products={products} features={features} caption="Plan comparison" />);
    expect(screen.getByText('Plan comparison')).toBeInTheDocument();
  });

  it('spreads HTML attributes', () => {
    const { container } = render(
      <ComparisonTable
        products={products}
        features={features}
        data-testid="comparison"
        id="plans"
      />,
    );
    const wrapper = container.querySelector('.tcn-comparison-table-wrapper');
    expect(wrapper).toHaveAttribute('data-testid', 'comparison');
    expect(wrapper).toHaveAttribute('id', 'plans');
  });
});
