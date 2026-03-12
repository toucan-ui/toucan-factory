import { useEffect } from 'react';
import { createFocusTrap } from '@toucanui/interactions/dom';

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;
    return createFocusTrap(container);
  }, [containerRef, active]);
}
