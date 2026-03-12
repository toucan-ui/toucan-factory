import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import {
  Table,
  TableCaption,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from './table.js';

// Helper: renders a minimal valid table
function renderTable(props?: React.ComponentProps<typeof Table>) {
  return render(
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Jane</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );
}

describe('Table', () => {
  it('renders a table element', () => {
    renderTable();
    expect(screen.getByRole('table')).toHaveClass('tcn-table');
  });

  it('sets data-striped when striped', () => {
    renderTable({ striped: true });
    expect(screen.getByRole('table')).toHaveAttribute('data-striped', '');
  });

  it('sets data-dense when dense', () => {
    renderTable({ dense: true });
    expect(screen.getByRole('table')).toHaveAttribute('data-dense', '');
  });

  it('sets both data-striped and data-dense', () => {
    renderTable({ striped: true, dense: true });
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('data-striped', '');
    expect(table).toHaveAttribute('data-dense', '');
  });

  it('omits data attributes when not set', () => {
    renderTable();
    const table = screen.getByRole('table');
    expect(table).not.toHaveAttribute('data-striped');
    expect(table).not.toHaveAttribute('data-dense');
  });
});

describe('TableCaption', () => {
  it('renders a caption element', () => {
    const { container } = render(
      <Table>
        <TableCaption>User accounts</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Jane</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const caption = container.querySelector('caption');
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveClass('tcn-table-caption');
  });

  it('renders children', () => {
    const { container } = render(
      <Table>
        <TableCaption>User accounts</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Jane</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('caption')).toHaveTextContent('User accounts');
  });
});

describe('TableHead', () => {
  it('renders a thead element', () => {
    const { container } = renderTable();
    const thead = container.querySelector('thead');
    expect(thead).toBeInTheDocument();
    expect(thead).toHaveClass('tcn-table-head');
  });
});

describe('TableBody', () => {
  it('renders a tbody element', () => {
    const { container } = renderTable();
    const tbody = container.querySelector('tbody');
    expect(tbody).toBeInTheDocument();
    expect(tbody).toHaveClass('tcn-table-body');
  });
});

describe('TableRow', () => {
  it('renders a tr element', () => {
    const { container } = renderTable();
    const rows = container.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]).toHaveClass('tcn-table-row');
  });
});

describe('TableHeader', () => {
  it('renders a th element', () => {
    renderTable();
    const th = screen.getByRole('columnheader');
    expect(th).toHaveClass('tcn-table-header');
  });

  it('defaults scope to col', () => {
    renderTable();
    expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col');
  });

  it('allows scope override', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableHeader scope="row">Label</TableHeader>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const th = container.querySelector('th');
    expect(th).toHaveAttribute('scope', 'row');
  });

  it('sets aria-sort ascending', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader sortDirection="ascending">Name</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Jane</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'ascending');
  });

  it('sets aria-sort descending', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader sortDirection="descending">Name</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Jane</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'descending');
  });

  it('sets aria-sort none (sortable but unsorted)', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader sortDirection="none">Name</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Jane</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('th')).toHaveAttribute('aria-sort', 'none');
  });

  it('omits aria-sort when sortDirection is undefined', () => {
    renderTable();
    expect(screen.getByRole('columnheader')).not.toHaveAttribute('aria-sort');
  });
});

describe('TableCell', () => {
  it('renders a td element', () => {
    renderTable();
    const td = screen.getByRole('cell');
    expect(td).toHaveClass('tcn-table-cell');
  });

  it('renders children', () => {
    renderTable();
    expect(screen.getByRole('cell')).toHaveTextContent('Jane');
  });
});

describe('Table accessibility', () => {
  it('passes axe with caption and headers', async () => {
    const { container } = render(
      <Table>
        <TableCaption>User accounts</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>jane@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with striped, dense, and sortable', async () => {
    const { container } = render(
      <Table striped dense>
        <TableCaption>Sortable table</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeader sortDirection="ascending">Name</TableHeader>
            <TableHeader sortDirection="none">Email</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>jane@example.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Smith</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
