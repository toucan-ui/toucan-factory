'use client';

import { Button, Tooltip, Flex } from '@toucan-ui/core';

export function CssDisclaimer({ lines }: { lines: number }) {
  return (
    <Tooltip
      anchor="bottom-left"
      content={`This example required only ${lines} lines of additional CSS beyond the design system.`}
    >
      <Button variant="secondary" size="sm">
        <Flex row align="center" gap={1}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Disclaimer
        </Flex>
      </Button>
    </Tooltip>
  );
}
