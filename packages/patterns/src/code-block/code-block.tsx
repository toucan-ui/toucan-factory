import { forwardRef, useCallback, useState } from 'react';
import { cn, Text, Button } from '@toucan-ui/core';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  code: string;
  language?: string;
  filename?: string;
  children?: React.ReactNode;
}

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(function CodeBlock(
  { code, language, filename, children, className, ...props },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const showHeader = Boolean(language || filename);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <figure ref={ref} className={cn('tcn-code-block', className)} {...props}>
      {showHeader && (
        <div className="tcn-code-block-header">
          <Text as="span" size="sm" muted>
            {filename || language}
          </Text>
          <Button variant="ghost" size="sm" onClick={handleCopy} aria-label="Copy code">
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      )}
      {!showHeader && (
        <div className="tcn-code-block-actions">
          <Button variant="ghost" size="sm" onClick={handleCopy} aria-label="Copy code">
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      )}
      <pre className="tcn-code-block-pre">
        <code className="tcn-code-block-code">{children || code}</code>
      </pre>
    </figure>
  );
});
