export function onClickOutside(
  containers: Array<HTMLElement | null>,
  callback: () => void,
): () => void {
  function handleMouseDown(event: MouseEvent) {
    const target = event.target as Node;
    const isInside = containers.some((container) => container && container.contains(target));
    if (!isInside) {
      callback();
    }
  }

  document.addEventListener('mousedown', handleMouseDown);
  return () => {
    document.removeEventListener('mousedown', handleMouseDown);
  };
}
