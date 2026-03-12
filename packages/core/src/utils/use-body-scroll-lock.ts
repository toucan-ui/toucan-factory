import { useEffect } from 'react';
import { lockScroll } from '@toucanui/interactions/dom';

export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);
}
