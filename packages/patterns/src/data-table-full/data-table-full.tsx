import { forwardRef } from 'react';
import {
  cn,
  Table,
  TableCaption,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Badge,
} from '@toucan-ui/core';
import type { BadgeVariant, SortDirection } from '@toucan-ui/core';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  sortDirection?: SortDirection;
  mono?: boolean;
}

export interface DataTableCellValue {
  text: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
}

export type DataTableRowData = Record<string, string | DataTableCellValue>;

export interface DataTableFullProps extends React.HTMLAttributes<HTMLTableElement> {
  caption?: string;
  columns: DataTableColumn[];
  rows: DataTableRowData[];
  onSort?: (columnKey: string) => void;
}

function getCellContent(value: string | DataTableCellValue | undefined) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  return (
    <>
      {value.text}
      {value.badge && (
        <>
          {' '}
          <Badge variant={value.badgeVariant ?? 'neutral'} size="sm">
            {value.badge}
          </Badge>
        </>
      )}
    </>
  );
}

export const DataTableFull = forwardRef<HTMLTableElement, DataTableFullProps>(
  function DataTableFull({ caption, columns, rows, onSort, className, ...props }, ref) {
    return (
      <Table ref={ref} className={cn('tcn-data-table-full', className)} {...props}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableHeader
                key={col.key}
                sortDirection={col.sortDirection}
                onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                style={col.sortable ? { cursor: 'pointer' } : undefined}
              >
                {col.label}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key} className={cn(col.mono && 'tcn-mono')}>
                  {getCellContent(row[col.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
);
