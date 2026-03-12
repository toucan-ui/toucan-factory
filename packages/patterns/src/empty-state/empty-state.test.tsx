import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './empty-state.js';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No contacts yet" />);
    expect(screen.getByText('No contacts yet')).toBeInTheDocument();
  });

  it('renders a Box with elevation 0', () => {
    const { container } = render(<EmptyState title="No contacts yet" />);
    const surface = container.querySelector('.tcn-box');
    expect(surface).toHaveAttribute('data-elevation', '0');
  });

  it('renders description when provided', () => {
    render(
      <EmptyState title="No contacts yet" description="Add your first contact to get started." />,
    );
    expect(screen.getByText('Add your first contact to get started.')).toBeInTheDocument();
  });

  it('renders action button when action and actionLabel are provided', () => {
    const onClick = vi.fn();
    render(<EmptyState title="No contacts yet" action={onClick} actionLabel="Add Contact" />);
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
  });

  it('calls action callback when button is clicked', async () => {
    const onClick = vi.fn();
    render(<EmptyState title="No contacts yet" action={onClick} actionLabel="Add Contact" />);
    await userEvent.click(screen.getByText('Add Contact'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders icon when provided', () => {
    const { container } = render(<EmptyState title="No contacts yet" icon="+" />);
    const iconEl = container.querySelector('.tcn-empty-state-icon');
    expect(iconEl).toBeInTheDocument();
    expect(iconEl).toHaveTextContent('+');
  });

  it('icon has aria-hidden', () => {
    const { container } = render(<EmptyState title="No contacts yet" icon="+" />);
    const iconEl = container.querySelector('.tcn-empty-state-icon');
    expect(iconEl).toHaveAttribute('aria-hidden', 'true');
  });
});
