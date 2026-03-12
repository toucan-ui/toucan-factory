import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar } from './avatar.js';

describe('Avatar', () => {
  // Image mode
  it('renders an image when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="User photo" />);
    const img = screen.getByAltText('User photo');
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img).toHaveClass('tcn-avatar-image');
  });

  it('does not set role img when showing image', () => {
    const { container } = render(<Avatar src="/photo.jpg" alt="User photo" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveAttribute('role');
  });

  // Initials mode
  it('renders initials when no src is provided', () => {
    render(<Avatar initials="JD" alt="Jane Doe" />);
    expect(screen.getByText('JD')).toHaveClass('tcn-avatar-initials');
    expect(screen.getByText('JD')).toHaveAttribute('aria-hidden', 'true');
  });

  it('sets role img and aria-label on initials mode', () => {
    render(<Avatar initials="JD" alt="Jane Doe" />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('aria-label', 'Jane Doe');
  });

  it('uses initials as aria-label when alt is not provided', () => {
    render(<Avatar initials="JD" />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('aria-label', 'JD');
  });

  // Fallback on error
  it('falls back to initials on image error', () => {
    render(<Avatar src="/broken.jpg" alt="User" initials="AB" />);
    const img = screen.getByAltText('User');
    fireEvent.error(img);
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'User');
  });

  it('resets error state when src changes', () => {
    const { rerender } = render(<Avatar src="/broken.jpg" alt="User" initials="AB" />);
    const img = screen.getByAltText('User');
    fireEvent.error(img);
    expect(screen.getByText('AB')).toBeInTheDocument();

    rerender(<Avatar src="/new.jpg" alt="User" initials="AB" />);
    expect(screen.getByAltText('User')).toHaveAttribute('src', '/new.jpg');
  });

  // Sizes
  it('defaults to md size', () => {
    const { container } = render(<Avatar initials="A" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-size', 'md');
  });

  it('applies size data attribute', () => {
    const { container } = render(<Avatar initials="A" size="lg" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-size', 'lg');
  });

  // Variants
  it('defaults to neutral variant', () => {
    const { container } = render(<Avatar initials="A" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-variant', 'neutral');
  });

  it('applies variant data attribute', () => {
    const { container } = render(<Avatar initials="A" variant="primary" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-variant', 'primary');
  });

  // Dev warning
  it('warns in development when src provided without alt', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Avatar src="/photo.jpg" />);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('src'));
    spy.mockRestore();
  });
});
