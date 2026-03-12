import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactCard } from './contact-card.js';

describe('ContactCard', () => {
  it('renders the contact name', () => {
    render(<ContactCard name="Jane Doe" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders a Box with default elevation', () => {
    const { container } = render(<ContactCard name="Jane Doe" />);
    const surface = container.querySelector('.tcn-box');
    expect(surface).toHaveAttribute('data-elevation', '1');
  });

  it('applies custom elevation', () => {
    const { container } = render(<ContactCard name="Jane Doe" elevation={2} />);
    const surface = container.querySelector('.tcn-box');
    expect(surface).toHaveAttribute('data-elevation', '2');
  });

  it('renders Avatar with initials', () => {
    const { container } = render(<ContactCard name="Jane Doe" initials="JD" />);
    const avatar = container.querySelector('.tcn-avatar');
    expect(avatar).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders Avatar with src', () => {
    const { container } = render(
      <ContactCard name="Jane Doe" avatarSrc="https://example.com/avatar.jpg" />,
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders title when provided', () => {
    render(<ContactCard name="Jane Doe" title="Product Manager" />);
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('renders status badge when provided', () => {
    render(<ContactCard name="Jane Doe" status="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies status badge variant', () => {
    const { container } = render(
      <ContactCard name="Jane Doe" status="Active" statusVariant="success" />,
    );
    const badge = container.querySelector('.tcn-badge');
    expect(badge).toHaveAttribute('data-variant', 'success');
  });

  it('renders email when provided', () => {
    render(<ContactCard name="Jane Doe" email="jane@example.com" />);
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });
});
