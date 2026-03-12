import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsRow } from './stats-row.js';

const defaultStats = [
  { label: 'Revenue', value: '£1.2M', change: '+12%', trend: 'up' as const },
  { label: 'Users', value: '8,420', change: '-3%', trend: 'down' as const },
  { label: 'Orders', value: '1,230' },
];

describe('StatsRow', () => {
  it('renders all stat items', () => {
    render(<StatsRow stats={defaultStats} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('renders stat values', () => {
    render(<StatsRow stats={defaultStats} />);
    expect(screen.getByText('£1.2M')).toBeInTheDocument();
    expect(screen.getByText('8,420')).toBeInTheDocument();
    expect(screen.getByText('1,230')).toBeInTheDocument();
  });

  it('renders change badges when provided', () => {
    render(<StatsRow stats={defaultStats} />);
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('renders each stat inside a Box', () => {
    const { container } = render(<StatsRow stats={defaultStats} />);
    const surfaces = container.querySelectorAll('.tcn-box');
    expect(surfaces).toHaveLength(3);
  });
});
