'use client';

import { useState, useRef, useCallback } from 'react';
import { Button, Box, Grid } from '@toucan-ui/core';
import { CodeBlock } from './patterns';

type CodeView = 'none' | 'react' | 'html';

const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

function formatHtml(html: string): string {
  let indent = 0;
  const tab = '  ';
  const lines: string[] = [];

  // Tokenise into tags and text nodes
  const tokens = html.match(/<[^>]+>|[^<]+/g) || [];

  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('</')) {
      // Closing tag
      indent = Math.max(0, indent - 1);
      lines.push(tab.repeat(indent) + trimmed);
    } else if (trimmed.startsWith('<')) {
      // Opening or self-closing tag
      const tagName = (trimmed.match(/<([a-zA-Z][a-zA-Z0-9-]*)/)?.[1] || '').toLowerCase();
      const selfClosing = trimmed.endsWith('/>') || VOID_ELEMENTS.has(tagName);
      lines.push(tab.repeat(indent) + trimmed);
      if (!selfClosing) {
        indent++;
      }
    } else {
      // Text content
      lines.push(tab.repeat(indent) + trimmed);
    }
  }

  return lines.join('\n');
}

interface LiveDemoProps {
  code: string;
  language?: string;
  hideHtml?: boolean;
  children: React.ReactNode;
}

export function LiveDemo({ code, language, hideHtml, children }: LiveDemoProps) {
  const [codeView, setCodeView] = useState<CodeView>('none');
  const [renderedHtml, setRenderedHtml] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const showReact = useCallback(() => {
    setCodeView((prev) => (prev === 'react' ? 'none' : 'react'));
  }, []);

  const showHtml = useCallback(() => {
    if (codeView === 'html') {
      setCodeView('none');
      return;
    }
    if (previewRef.current) {
      const raw = previewRef.current.innerHTML;
      setRenderedHtml(formatHtml(raw));
    }
    setCodeView('html');
  }, [codeView]);

  return (
    <Box padding="none" radius="md" elevation={0} overflow="hidden">
      <Grid gap={0}>
        <div className="docs-demo-toolbar" role="toolbar" aria-label="Demo controls">
          <div className="docs-demo-controls">
            <Button variant="ghost" size="sm" onClick={showReact}>
              {codeView === 'react' ? 'Hide code' : 'React'}
            </Button>
            {!hideHtml && (
              <Button variant="ghost" size="sm" onClick={showHtml}>
                {codeView === 'html' ? 'Hide HTML' : 'HTML'}
              </Button>
            )}
          </div>
        </div>
        <div ref={previewRef} className="docs-demo-preview">
          {children}
        </div>
        {codeView === 'react' && (
          <div className="docs-demo-code">
            <CodeBlock code={code} language={language || 'tsx'} />
          </div>
        )}
        {codeView === 'html' && (
          <div className="docs-demo-code">
            <CodeBlock code={renderedHtml} language="html" />
          </div>
        )}
      </Grid>
    </Box>
  );
}
