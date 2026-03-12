import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn.js';
import type { Size } from '../../types.js';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rating score (e.g. 3, 4.5) */
  value: number;
  /** Total number of stars */
  max?: number;
  /** Star size */
  size?: Size;
  /** Custom aria-label (defaults to "{value} out of {max}") */
  label?: string;
}

const STAR_PATH =
  'M10 1.12l2.35 5.66 6.15.58-4.7 4.1 1.42 6.04L10 14.27 4.78 17.5l1.42-6.04-4.7-4.1 6.15-.58L10 1.12z';

function StarFilled() {
  return (
    <svg className="tcn-rating-star" data-filled="" viewBox="0 0 20 20" aria-hidden="true">
      <path d={STAR_PATH} />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg className="tcn-rating-star" viewBox="0 0 20 20" aria-hidden="true">
      <path d={STAR_PATH} />
    </svg>
  );
}

function StarHalf({ gradientId }: { gradientId: string }) {
  return (
    <svg className="tcn-rating-star" data-filled="" viewBox="0 0 20 20" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="50%" stopColor="var(--rating-color-filled)" />
          <stop offset="50%" stopColor="var(--rating-color-empty)" />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  { value, max = 5, size = 'md', label, className, ...props },
  ref,
) {
  const ariaLabel = label ?? `${value} out of ${max}`;
  const baseId = useId();

  const stars: React.ReactNode[] = [];
  for (let i = 0; i < max; i++) {
    if (value >= i + 1) {
      stars.push(<StarFilled key={i} />);
    } else if (value > i && value < i + 1) {
      stars.push(<StarHalf key={i} gradientId={`${baseId}-half-${i}`} />);
    } else {
      stars.push(<StarEmpty key={i} />);
    }
  }

  return (
    <div
      ref={ref}
      className={cn('tcn-rating', className)}
      role="img"
      aria-label={ariaLabel}
      data-size={size}
      {...props}
    >
      {stars}
    </div>
  );
});
