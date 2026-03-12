import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button.js';

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button>Click me</Button>);
    const el = screen.getByRole('button', { name: 'Click me' });
    expect(el.tagName).toBe('BUTTON');
    expect(el).toHaveClass('tcn-button');
  });

  it('defaults to type=button', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('allows overriding type', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('defaults to primary variant and md size', () => {
    render(<Button>Click</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('data-variant', 'primary');
    expect(el).toHaveAttribute('data-size', 'md');
  });

  it('applies variant data attribute', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'ghost');
  });

  it('applies size data attribute', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg');
  });

  it('sets disabled attribute', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets data-disabled when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled');
  });

  it('sets disabled and aria-busy when loading', () => {
    render(<Button loading>Loading</Button>);
    const el = screen.getByRole('button');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el).toHaveAttribute('data-loading');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>Normal</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('forwards onClick handler', () => {
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>,
    );
    screen.getByRole('button').click();
    expect(clicked).toBe(true);
  });

  // Polymorphic as="a"
  it('renders as an anchor when as="a"', () => {
    render(
      <Button as="a" href="/test">
        Link
      </Button>,
    );
    const el = screen.getByRole('link', { name: 'Link' });
    expect(el.tagName).toBe('A');
    expect(el).toHaveClass('tcn-button');
    expect(el).toHaveAttribute('href', '/test');
  });

  it('applies variant and size data attributes when as="a"', () => {
    render(
      <Button as="a" href="/test" variant="ghost" size="lg">
        Link
      </Button>,
    );
    const el = screen.getByRole('link');
    expect(el).toHaveAttribute('data-variant', 'ghost');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('passes anchor-specific attributes when as="a"', () => {
    render(
      <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
        External
      </Button>,
    );
    const el = screen.getByRole('link');
    expect(el).toHaveAttribute('target', '_blank');
    expect(el).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render type or disabled attributes when as="a"', () => {
    render(
      <Button as="a" href="/test">
        Link
      </Button>,
    );
    const el = screen.getByRole('link');
    expect(el).not.toHaveAttribute('type');
    expect(el).not.toHaveAttribute('disabled');
  });

  it('passes axe checks for as="a"', async () => {
    const { container } = render(
      <Button as="a" href="/test">
        Accessible Link
      </Button>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Icon-only
  it('sets data-icon-only when iconOnly is true', () => {
    render(
      <Button iconOnly aria-label="Close">
        ✕
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-icon-only');
  });

  it('does not set data-icon-only by default', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-icon-only');
  });

  // Toggle
  it('sets aria-pressed when toggle is true', () => {
    render(
      <Button toggle pressed={false}>
        Off
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('sets aria-pressed=true when pressed', () => {
    render(
      <Button toggle pressed>
        On
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('sets data-toggle and data-pressed', () => {
    render(
      <Button toggle pressed>
        On
      </Button>,
    );
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('data-toggle');
    expect(el).toHaveAttribute('data-pressed', 'true');
  });

  it('does not set aria-pressed when toggle is false', () => {
    render(<Button>Normal</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button toggle pressed={false} onClick={onClick}>
        Toggle
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // Dev warnings
  it('warns when toggle=true without pressed prop', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Button toggle>Toggle</Button>);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('toggle={true} requires a `pressed` prop'),
    );
    warn.mockRestore();
  });

  it('warns when iconOnly without accessible name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Button iconOnly>✕</Button>);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('iconOnly buttons must have an accessible name'),
    );
    warn.mockRestore();
  });

  it('does not warn when iconOnly has aria-label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Button iconOnly aria-label="Close">
        ✕
      </Button>,
    );
    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('iconOnly buttons must have an accessible name'),
    );
    warn.mockRestore();
  });

  // Axe
  it('passes axe accessibility checks', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks for icon-only button', async () => {
    const { container } = render(
      <Button iconOnly aria-label="Close dialog">
        ✕
      </Button>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks for toggle button', async () => {
    const { container } = render(
      <Button toggle pressed={false}>
        Toggle
      </Button>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
