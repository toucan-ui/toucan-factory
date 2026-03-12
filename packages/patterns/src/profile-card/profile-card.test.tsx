import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProfileCard } from './profile-card.js';

describe('ProfileCard', () => {
  it('renders the name as a heading', () => {
    render(<ProfileCard name="Jane Doe" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Jane Doe');
  });

  it('renders the title when provided', () => {
    render(<ProfileCard name="Jane Doe" title="Lead Designer" />);
    expect(screen.getByText('Lead Designer')).toBeInTheDocument();
  });

  it('renders the bio when provided', () => {
    render(<ProfileCard name="Jane Doe" bio="Passionate about design systems." />);
    expect(screen.getByText('Passionate about design systems.')).toBeInTheDocument();
  });

  it('renders an avatar', () => {
    const { container } = render(<ProfileCard name="Jane Doe" initials="JD" />);
    expect(container.querySelector('.tcn-avatar')).toBeInTheDocument();
  });

  it('renders primary action button', () => {
    render(<ProfileCard name="Jane Doe" primaryAction="Follow" />);
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });

  it('renders secondary action button', () => {
    render(<ProfileCard name="Jane Doe" secondaryAction="Message" />);
    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument();
  });

  it('fires onPrimaryAction when clicked', () => {
    const onClick = vi.fn();
    render(<ProfileCard name="Jane Doe" primaryAction="Follow" onPrimaryAction={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onSecondaryAction when clicked', () => {
    const onClick = vi.fn();
    render(<ProfileCard name="Jane Doe" secondaryAction="Message" onSecondaryAction={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Message' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
