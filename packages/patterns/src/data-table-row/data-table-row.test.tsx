import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTableRow } from './data-table-row.js';

describe('DataTableRow', () => {
  it('renders label and value', () => {
    render(<DataTableRow label="AAPL" value="$178.50" />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('$178.50')).toBeInTheDocument();
  });

  it('renders secondary text when provided', () => {
    render(<DataTableRow label="AAPL" value="$178.50" secondary="Apple Inc." />);
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
  });

  it('renders status badge when provided', () => {
    render(<DataTableRow label="Order" value="$100" status="Completed" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('applies statusVariant to badge', () => {
    const { container } = render(
      <DataTableRow label="Order" value="$100" status="Failed" statusVariant="danger" />,
    );
    const badge = container.querySelector('.tcn-badge');
    expect(badge).toHaveAttribute('data-variant', 'danger');
  });

  it('applies mono class when mono is true', () => {
    const { container } = render(<DataTableRow label="AAPL" value="$178.50" mono />);
    expect(container.querySelector('.tcn-mono')).toBeInTheDocument();
  });

  it('has role=row on container', () => {
    const { container } = render(<DataTableRow label="AAPL" value="$178.50" />);
    expect(container.querySelector('[role="row"]')).toBeInTheDocument();
  });

  it('has role=cell on columns', () => {
    const { container } = render(<DataTableRow label="AAPL" value="$178.50" status="Active" />);
    const cells = container.querySelectorAll('[role="cell"]');
    expect(cells).toHaveLength(3);
  });
});
