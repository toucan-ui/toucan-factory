import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActivityItem } from './activity-item.js';

describe('ActivityItem', () => {
  it('renders user and action', () => {
    render(<ActivityItem user="Alice" action="created a deal" timestamp="2m ago" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText(/created a deal/)).toBeInTheDocument();
  });

  it('renders an Avatar', () => {
    const { container } = render(
      <ActivityItem user="Alice" userInitials="AL" action="updated" timestamp="5m ago" />,
    );
    const avatar = container.querySelector('.tcn-avatar');
    expect(avatar).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('renders Avatar with src', () => {
    const { container } = render(
      <ActivityItem
        user="Alice"
        userAvatarSrc="https://example.com/alice.jpg"
        action="updated"
        timestamp="5m ago"
      />,
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://example.com/alice.jpg');
  });

  it('renders the timestamp', () => {
    render(<ActivityItem user="Alice" action="updated" timestamp="5 minutes ago" />);
    expect(screen.getByText('5 minutes ago')).toBeInTheDocument();
  });

  it('renders detail when provided', () => {
    render(
      <ActivityItem
        user="Alice"
        action="updated"
        timestamp="5m ago"
        detail="Changed status to Closed Won"
      />,
    );
    expect(screen.getByText('Changed status to Closed Won')).toBeInTheDocument();
  });

  it('renders user name in a strong element', () => {
    const { container } = render(<ActivityItem user="Alice" action="updated" timestamp="5m ago" />);
    const strong = container.querySelector('strong.tcn-activity-item-user');
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent('Alice');
  });
});
