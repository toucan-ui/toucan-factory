import { useEffect } from 'react';
import { lockScroll } from '@toucan-ui/interactions/dom';

export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);
}
