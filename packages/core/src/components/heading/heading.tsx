import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import type { DisplaySize } from '../../types.js';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  as?: HeadingTag;
  /** Visual display size. `true` maps to `"md"`. Purely visual — `level` still controls the HTML tag. */
  display?: boolean | DisplaySize;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level, as, display, className, ...props },
  ref,
) {
  const Tag = as ?? (`h${level}` as HeadingTag);
  const displaySize = display === true ? 'md' : display === false ? undefined : display;

  if (process.env.NODE_ENV !== 'production' && as) {
    const expectedTag = `h${level}`;
    if (as !== expectedTag) {
      console.warn(
        `[tcn-heading] Rendered as <${as}> but level=${level} implies <${expectedTag}>. ` +
          `Screen readers use the DOM tag, not the data-level attribute. ` +
          `Ensure this mismatch is intentional.`,
      );
    }
  }

  return (
    <Tag
      ref={ref}
      className={cn('tcn-heading', className)}
      data-level={level}
      data-display={displaySize}
      {...props}
    />
  );
});
