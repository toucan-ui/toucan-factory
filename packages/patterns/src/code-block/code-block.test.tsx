import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodeBlock } from './code-block.js';

describe('CodeBlock', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders code as text content', () => {
    render(<CodeBlock code="const x = 1;" />);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders language label in header', () => {
    render(<CodeBlock code="const x = 1;" language="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders filename in header', () => {
    render(<CodeBlock code="const x = 1;" filename="index.ts" language="TypeScript" />);
    expect(screen.getByText('index.ts')).toBeInTheDocument();
  });

  it('prefers filename over language label when both provided', () => {
    render(<CodeBlock code="const x = 1;" filename="index.ts" language="TypeScript" />);
    expect(screen.getByText('index.ts')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('copy button calls clipboard API with code string', () => {
    render(<CodeBlock code="const x = 1;" language="TypeScript" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1;');
  });

  it('renders children instead of code when provided', () => {
    render(
      <CodeBlock code="const x = 1;">
        <span data-testid="highlighted">highlighted code</span>
      </CodeBlock>,
    );
    expect(screen.getByTestId('highlighted')).toBeInTheDocument();
    expect(screen.queryByText('const x = 1;')).not.toBeInTheDocument();
  });

  it('spreads HTML attributes', () => {
    const { container } = render(<CodeBlock code="x" data-testid="code" id="snippet" />);
    const figure = container.querySelector('.tcn-code-block');
    expect(figure).toHaveAttribute('data-testid', 'code');
    expect(figure).toHaveAttribute('id', 'snippet');
  });

  it('shows copy button even without header', () => {
    render(<CodeBlock code="const x = 1;" />);
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });
});
