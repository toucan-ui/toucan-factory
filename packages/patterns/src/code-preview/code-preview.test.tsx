import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CodePreview } from './code-preview.js';

describe('CodePreview', () => {
  it('renders with code-preview class', () => {
    render(
      <CodePreview code="const x = 1;" data-testid="cp">
        Preview
      </CodePreview>,
    );
    expect(screen.getByTestId('cp')).toHaveClass('tcn-code-preview');
  });

  it('renders children in the canvas', () => {
    render(<CodePreview code="const x = 1;">Preview content</CodePreview>);
    expect(screen.getByText('Preview content')).toBeInTheDocument();
  });

  it('shows toolbar with controls', () => {
    render(
      <CodePreview code="x" toolbar={<button>Theme</button>}>
        Demo
      </CodePreview>,
    );
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('hides code by default', () => {
    render(<CodePreview code="const x = 1;">Demo</CodePreview>);
    expect(screen.queryByText('const x = 1;')).not.toBeInTheDocument();
  });

  it('shows code when showCode is true', () => {
    render(
      <CodePreview code="const x = 1;" showCode>
        Demo
      </CodePreview>,
    );
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders toggle button when onToggleCode provided', () => {
    render(
      <CodePreview code="x" onToggleCode={() => {}}>
        Demo
      </CodePreview>,
    );
    expect(screen.getByText('Show code')).toBeInTheDocument();
  });
});
