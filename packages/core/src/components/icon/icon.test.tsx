import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './icon.js';

describe('Icon', () => {
  it('renders a span with icon class', () => {
    render(
      <Icon data-testid="icon">
        <svg />
      </Icon>,
    );
    const el = screen.getByTestId('icon');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('tcn-icon');
  });

  it('defaults to md size', () => {
    render(
      <Icon data-testid="icon">
        <svg />
      </Icon>,
    );
    expect(screen.getByTestId('icon')).toHaveAttribute('data-size', 'md');
  });

  it('applies size data attribute', () => {
    render(
      <Icon data-testid="icon" size="sm">
        <svg />
      </Icon>,
    );
    expect(screen.getByTestId('icon')).toHaveAttribute('data-size', 'sm');
  });

  it('is aria-hidden when no label provided', () => {
    render(
      <Icon data-testid="icon">
        <svg />
      </Icon>,
    );
    const el = screen.getByTestId('icon');
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).not.toHaveAttribute('role');
    expect(el).not.toHaveAttribute('aria-label');
  });

  it('has role=img and aria-label when label provided', () => {
    render(
      <Icon label="Close">
        <svg />
      </Icon>,
    );
    const el = screen.getByLabelText('Close');
    expect(el).toHaveAttribute('role', 'img');
    expect(el).toHaveAttribute('aria-label', 'Close');
    expect(el).not.toHaveAttribute('aria-hidden');
  });

  it('merges custom className', () => {
    render(
      <Icon data-testid="icon" className="custom">
        <svg />
      </Icon>,
    );
    const el = screen.getByTestId('icon');
    expect(el).toHaveClass('tcn-icon');
    expect(el).toHaveClass('custom');
  });
});
