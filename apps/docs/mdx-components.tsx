import type { MDXComponents } from 'mdx/types';
import { Heading, Text } from '@toucan-ui/core';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading level={1} {...props} />,
    h2: (props) => <Heading level={2} {...props} />,
    h3: (props) => <Heading level={3} {...props} />,
    h4: (props) => <Heading level={4} {...props} />,
    p: (props) => <Text as="p" {...props} />,
    ...components,
  };
}
