import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { SortDirection } from '../../types.js';

// ---------- Table ----------

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Alternate row shading. */
  striped?: boolean;
  /** Compact cell padding. */
  dense?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped, dense, className, ...props },
  ref,
) {
  return (
    <table
      ref={ref}
      className={cn('tcn-table', className)}
      data-striped={striped ? '' : undefined}
      data-dense={dense ? '' : undefined}
      {...props}
    />
  );
});

// ---------- TableCaption ----------

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cn('tcn-table-caption', className)} {...props} />;
  },
);

// ---------- TableHead ----------

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(function TableHead(
  { className, ...props },
  ref,
) {
  return <thead ref={ref} className={cn('tcn-table-head', className)} {...props} />;
});

// ---------- TableBody ----------

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className, ...props },
  ref,
) {
  return <tbody ref={ref} className={cn('tcn-table-body', className)} {...props} />;
});

// ---------- TableRow ----------

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return <tr ref={ref} className={cn('tcn-table-row', className)} {...props} />;
});

// ---------- TableHeader ----------

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Sort direction. Omit for non-sortable columns. */
  sortDirection?: SortDirection;
}

export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(function TableHeader(
  { scope = 'col', sortDirection, className, ...props },
  ref,
) {
  return (
    <th
      ref={ref}
      className={cn('tcn-table-header', className)}
      scope={scope}
      aria-sort={sortDirection}
      {...props}
    />
  );
});

// ---------- TableCell ----------

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td ref={ref} className={cn('tcn-table-cell', className)} {...props} />;
});
