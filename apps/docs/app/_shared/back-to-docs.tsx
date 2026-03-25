'use client';

import { Button, Flex } from '@toucan-ui/core';
import { ArrowLeftIcon } from './icons';

export function BackToDocs() {
  return (
    <Button variant="secondary" size="sm" as="a" href="/">
      <Flex row align="center" gap={1}>
        <ArrowLeftIcon />
        Back to Docs
      </Flex>
    </Button>
  );
}
