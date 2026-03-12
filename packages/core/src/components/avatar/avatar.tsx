import { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn.js';
import type { Size } from '../../types.js';
import type { AvatarVariant } from '../../types.js';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: Size;
  variant?: AvatarVariant;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, initials, size = 'md', variant = 'neutral', className, ...props },
  ref,
) {
  const [imgError, setImgError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImgError(false);
  }, [src]);

  // Dev warning: src without alt
  if (process.env.NODE_ENV !== 'production' && src && !alt) {
    console.warn('Avatar: `src` was provided without `alt`. Add an `alt` prop for accessibility.');
  }

  const showImage = src && !imgError;

  const sharedProps = {
    ref,
    className: cn('tcn-avatar', className),
    'data-size': size,
    'data-variant': variant,
  };

  if (showImage) {
    return (
      <span {...sharedProps} {...props}>
        <img
          className="tcn-avatar-image"
          src={src}
          alt={alt ?? ''}
          onError={() => setImgError(true)}
        />
      </span>
    );
  }

  const label = alt || initials;

  return (
    <span {...sharedProps} role="img" aria-label={label} {...props}>
      {initials && (
        <span className="tcn-avatar-initials" aria-hidden="true">
          {initials}
        </span>
      )}
    </span>
  );
});
