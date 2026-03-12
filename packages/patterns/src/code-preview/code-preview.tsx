import { forwardRef } from 'react';
import { cn, Button } from '@toucanui/core';
import { CodeBlock } from '../code-block/code-block';

export interface CodePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  toolbar?: React.ReactNode;
  showCode?: boolean;
  onToggleCode?: () => void;
}

export const CodePreview = forwardRef<HTMLDivElement, CodePreviewProps>(function CodePreview(
  {
    code,
    language = 'tsx',
    toolbar,
    showCode = false,
    onToggleCode,
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <div ref={ref} className={cn('tcn-code-preview', className)} {...props}>
      <div className="tcn-code-preview-toolbar" role="toolbar" aria-label="Demo controls">
        {toolbar && <div className="tcn-code-preview-controls">{toolbar}</div>}
        {onToggleCode && (
          <Button variant="ghost" size="sm" onClick={onToggleCode}>
            {showCode ? 'Hide code' : 'Show code'}
          </Button>
        )}
      </div>
      <div className="tcn-code-preview-canvas">{children}</div>
      {showCode && (
        <div className="tcn-code-preview-source">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
});
