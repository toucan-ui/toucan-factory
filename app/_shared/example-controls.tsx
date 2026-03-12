'use client';

import { useRef, useCallback, useState, type ReactNode } from 'react';
import { Box, Flex } from '@toucan-ui/core';

export function ExampleControls({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [position, setPosition] = useState({ x: 16, y: 16 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only drag from the container itself or its drag handle, not from buttons
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: position.x,
        origY: position.y,
      };
    },
    [position],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPosition({
      x: dragState.current.origX + dx,
      y: dragState.current.origY + dy,
    });
  }, []);

  const onPointerUp = useCallback(() => {
    dragState.current = null;
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 'var(--z-index-sticky)' as unknown as number,
        cursor: 'grab',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Box padding="sm" radius="md" elevation={2}>
        <Flex row align="center" gap={2}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" opacity={0.35} aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="2" cy="2" r="1.5" />
            <circle cx="8" cy="2" r="1.5" />
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="2" cy="14" r="1.5" />
            <circle cx="8" cy="14" r="1.5" />
          </svg>
          {children}
        </Flex>
      </Box>
    </div>
  );
}
