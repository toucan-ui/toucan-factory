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
  Text,
} from '@toucan-ui/core';
import type { BadgeVariant } from '@toucan-ui/core';

export interface ComparisonFeature {
  feature: string;
  values: Record<string, string | { text: string; variant: BadgeVariant }>;
}

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  products: string[];
  features: ComparisonFeature[];
  highlightedProduct?: string;
  caption?: string;
}

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  function ComparisonTable(
    { products, features, highlightedProduct, caption, className, ...props },
    ref,
  ) {
    return (
      <div ref={ref} className={cn('tcn-comparison-table-wrapper', className)} {...props}>
        <Table className="tcn-comparison-table">
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHead>
            <TableRow>
              <TableHeader className="tcn-comparison-table-feature-header">Feature</TableHeader>
              {products.map((product) => (
                <TableHeader
                  key={product}
                  data-highlighted={product === highlightedProduct ? '' : undefined}
                  className="tcn-comparison-table-product-header"
                >
                  {product}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((row) => (
              <TableRow key={row.feature}>
                <TableCell className="tcn-comparison-table-feature-name">{row.feature}</TableCell>
                {products.map((product) => {
                  const value = row.values[product];
                  const isHighlighted = product === highlightedProduct;
                  return (
                    <TableCell key={product} data-highlighted={isHighlighted ? '' : undefined}>
                      {value == null ? (
                        <Text as="span" size="sm" muted>
                          —
                        </Text>
                      ) : typeof value === 'string' ? (
                        <Text as="span" size="sm">
                          {value}
                        </Text>
                      ) : (
                        <Badge variant={value.variant} size="sm">
                          {value.text}
                        </Badge>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
);
