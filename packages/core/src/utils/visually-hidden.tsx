import './visually-hidden.css';
import { forwardRef } from 'react';

export type VisuallyHiddenProps = React.HTMLAttributes<HTMLSpanElement>;

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden(props, ref) {
    return <span ref={ref} data-visually-hidden="" {...props} />;
  },
);
