import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommentThread } from './comment-thread.js';

describe('CommentThread', () => {
  it('renders the user name', () => {
    render(<CommentThread user="Alice" timestamp="2m ago" body="Great work!" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders the timestamp', () => {
    render(<CommentThread user="Alice" timestamp="2m ago" body="Great work!" />);
    expect(screen.getByText('2m ago')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<CommentThread user="Alice" timestamp="2m ago" body="Great work!" />);
    expect(screen.getByText('Great work!')).toBeInTheDocument();
  });

  it('renders an avatar', () => {
    const { container } = render(
      <CommentThread user="Alice" timestamp="now" body="Text" userInitials="AL" />,
    );
    expect(container.querySelector('.tcn-avatar')).toBeInTheDocument();
  });

  it('renders reply button when onReply is provided', () => {
    render(<CommentThread user="Alice" timestamp="now" body="Text" onReply={() => {}} />);
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });

  it('uses custom replyLabel', () => {
    render(
      <CommentThread
        user="Alice"
        timestamp="now"
        body="Text"
        replyLabel="Respond"
        onReply={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Respond' })).toBeInTheDocument();
  });

  it('fires onReply when reply is clicked', () => {
    const onReply = vi.fn();
    render(<CommentThread user="Alice" timestamp="now" body="Text" onReply={onReply} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    expect(onReply).toHaveBeenCalledTimes(1);
  });
});
