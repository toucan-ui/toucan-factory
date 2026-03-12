import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  label?: string;
}

export function getPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): (number | 'ellipsis')[] {
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 1;

  if (totalPages <= totalNumbers + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftBoundary = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const rightBoundary = Array.from(
    { length: boundaryCount },
    (_, i) => totalPages - boundaryCount + 1 + i,
  );

  const siblingLeft = Math.max(page - siblingCount, boundaryCount + 1);
  const siblingRight = Math.min(page + siblingCount, totalPages - boundaryCount);

  const showLeftEllipsis = siblingLeft > boundaryCount + 2;
  const showRightEllipsis = siblingRight < totalPages - boundaryCount - 1;

  const middle: (number | 'ellipsis')[] = [];

  if (showLeftEllipsis) {
    middle.push('ellipsis');
  } else {
    for (let i = boundaryCount + 1; i < siblingLeft; i++) {
      middle.push(i);
    }
  }

  for (let i = siblingLeft; i <= siblingRight; i++) {
    middle.push(i);
  }

  if (showRightEllipsis) {
    middle.push('ellipsis');
  } else {
    for (let i = siblingRight + 1; i <= totalPages - boundaryCount; i++) {
      middle.push(i);
    }
  }

  return [...leftBoundary, ...middle, ...rightBoundary];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    totalPages,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    label = 'Pagination',
    className,
    ...props
  },
  ref,
) {
  const range = getPageRange(page, totalPages, siblingCount, boundaryCount);
  let ellipsisKey = 0;

  return (
    <nav ref={ref} aria-label={label} className={cn('tcn-pagination', className)} {...props}>
      <button
        type="button"
        className="tcn-pagination-item"
        aria-label="Go to previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        &lsaquo;
      </button>

      {range.map((item) => {
        if (item === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${ellipsisKey++}`}
              className="tcn-pagination-ellipsis"
              aria-hidden="true"
            >
              &hellip;
            </span>
          );
        }

        const isCurrent = item === page;
        return (
          <button
            key={item}
            type="button"
            className="tcn-pagination-item"
            aria-label={`Go to page ${item}`}
            aria-current={isCurrent ? 'page' : undefined}
            data-current={isCurrent ? '' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        className="tcn-pagination-item"
        aria-label="Go to next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        &rsaquo;
      </button>
    </nav>
  );
});
