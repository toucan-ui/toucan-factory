export function saveFocus(): () => void {
  const previousElement = document.activeElement as HTMLElement | null;

  return () => {
    previousElement?.focus?.();
  };
}

export function scrollIntoView(element: HTMLElement): void {
  element.scrollIntoView?.({ block: 'nearest' });
}
