import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotificationItem } from './notification-item.js';

describe('NotificationItem', () => {
  it('renders user and message', () => {
    render(<NotificationItem user="Alice" message="liked your post" timestamp="2m ago" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText(/liked your post/)).toBeInTheDocument();
  });

  it('renders timestamp', () => {
    render(<NotificationItem user="Alice" message="liked your post" timestamp="2m ago" />);
    expect(screen.getByText('2m ago')).toBeInTheDocument();
  });

  it('renders an avatar', () => {
    const { container } = render(
      <NotificationItem user="Alice" message="msg" timestamp="now" userInitials="AL" />,
    );
    expect(container.querySelector('.tcn-avatar')).toBeInTheDocument();
  });

  it('renders unread dot when unread', () => {
    const { container } = render(
      <NotificationItem user="Alice" message="msg" timestamp="now" unread />,
    );
    expect(container.querySelector('.tcn-notification-item-dot')).toBeInTheDocument();
  });

  it('applies unread modifier class', () => {
    const { container } = render(
      <NotificationItem user="Alice" message="msg" timestamp="now" unread />,
    );
    expect(container.querySelector('.tcn-notification-item--unread')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(<NotificationItem user="Alice" message="msg" timestamp="now" href="/notifications/1" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/notifications/1');
  });

  it('renders as a div when no href', () => {
    const { container } = render(<NotificationItem user="Alice" message="msg" timestamp="now" />);
    expect(container.querySelector('a')).not.toBeInTheDocument();
    expect(container.querySelector('.tcn-notification-item')?.tagName).toBe('DIV');
  });

  it('renders dismiss button when onDismiss is provided', () => {
    const onDismiss = vi.fn();
    render(<NotificationItem user="Alice" message="msg" timestamp="now" onDismiss={onDismiss} />);
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBeInTheDocument();
  });

  it('fires onDismiss when dismiss is clicked', () => {
    const onDismiss = vi.fn();
    render(<NotificationItem user="Alice" message="msg" timestamp="now" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
