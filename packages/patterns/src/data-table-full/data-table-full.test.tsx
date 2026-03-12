import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTableFull } from './data-table-full.js';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Amount', mono: true },
  { key: 'status', label: 'Status' },
];

const rows = [
  {
    name: 'Alice Smith',
    amount: '£1,200',
    status: { text: 'Paid', badge: 'Paid', badgeVariant: 'success' as const },
  },
  {
    name: 'Bob Jones',
    amount: '£850',
    status: { text: 'Pending', badge: 'Pending', badgeVariant: 'warning' as const },
  },
];

describe('DataTableFull', () => {
  it('renders column headers', () => {
    render(<DataTableFull columns={columns} rows={rows} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<DataTableFull columns={columns} rows={rows} />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('£1,200')).toBeInTheDocument();
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
  });

  it('renders badges in cells', () => {
    const { container } = render(<DataTableFull columns={columns} rows={rows} />);
    const badges = container.querySelectorAll('.tcn-badge');
    expect(badges).toHaveLength(2);
  });

  it('renders caption when provided', () => {
    render(<DataTableFull caption="Transaction history" columns={columns} rows={rows} />);
    expect(screen.getByText('Transaction history')).toBeInTheDocument();
  });

  it('applies mono class to mono columns', () => {
    const { container } = render(<DataTableFull columns={columns} rows={rows} />);
    const monoCells = container.querySelectorAll('.tcn-mono');
    expect(monoCells).toHaveLength(2);
  });

  it('renders as a table element', () => {
    render(<DataTableFull columns={columns} rows={rows} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('calls onSort when sortable header is clicked', () => {
    const onSort = vi.fn();
    const sortableColumns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'amount', label: 'Amount' },
    ];
    render(<DataTableFull columns={sortableColumns} rows={rows} onSort={onSort} />);
    fireEvent.click(screen.getByText('Name'));
    expect(onSort).toHaveBeenCalledWith('name');
  });
});
