import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Heading } from './heading.js';

describe('Heading', () => {
  it('renders h1 for level 1', () => {
    render(<Heading level={1}>Title</Heading>);
    const el = screen.getByText('Title');
    expect(el.tagName).toBe('H1');
    expect(el).toHaveClass('tcn-heading');
    expect(el).toHaveAttribute('data-level', '1');
  });

  it('renders h3 for level 3', () => {
    render(<Heading level={3}>Subtitle</Heading>);
    expect(screen.getByText('Subtitle').tagName).toBe('H3');
  });

  it('allows overriding the rendered tag with as', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Heading level={1} as="h2">
        Visual H2
      </Heading>,
    );
    const el = screen.getByText('Visual H2');
    expect(el.tagName).toBe('H2');
    expect(el).toHaveAttribute('data-level', '1');
    warn.mockRestore();
  });

  it('renders h5 and h6 levels', () => {
    const { container } = render(
      <>
        <Heading level={5}>Five</Heading>
        <Heading level={6}>Six</Heading>
      </>,
    );
    expect(container.querySelector('h5')).toBeInTheDocument();
    expect(container.querySelector('h6')).toBeInTheDocument();
  });

  // Dev warning for as/level mismatch
  it('warns when as diverges from level', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Heading level={1} as="h3">
        Mismatch
      </Heading>,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Rendered as <h3> but level=1 implies <h1>'),
    );
    warn.mockRestore();
  });

  it('does not warn when as matches level', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Heading level={2} as="h2">
        Match
      </Heading>,
    );
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('does not warn when as is not provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Heading level={1}>No Override</Heading>);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  // Display prop
  it("sets data-display='md' when display={true}", () => {
    render(
      <Heading level={1} display>
        Display Heading
      </Heading>,
    );
    expect(screen.getByText('Display Heading')).toHaveAttribute('data-display', 'md');
  });

  it('sets data-display to explicit size', () => {
    render(
      <Heading level={1} display="lg">
        Large Display
      </Heading>,
    );
    expect(screen.getByText('Large Display')).toHaveAttribute('data-display', 'lg');
  });

  it('does not set data-display when display is omitted', () => {
    render(<Heading level={1}>No Display</Heading>);
    expect(screen.getByText('No Display')).not.toHaveAttribute('data-display');
  });

  it('preserves semantic tag when display is set', () => {
    render(
      <Heading level={2} display="lg">
        Semantic
      </Heading>,
    );
    const el = screen.getByText('Semantic');
    expect(el.tagName).toBe('H2');
    expect(el).toHaveAttribute('data-level', '2');
    expect(el).toHaveAttribute('data-display', 'lg');
  });
});
