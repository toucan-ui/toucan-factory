import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestimonialCard } from './testimonial-card.js';

describe('TestimonialCard', () => {
  it('renders the quote text', () => {
    render(<TestimonialCard quote="Great product!" name="Jane Doe" />);
    expect(screen.getByText('Great product!')).toBeInTheDocument();
  });

  it('renders the quote in a blockquote', () => {
    const { container } = render(<TestimonialCard quote="Great product!" name="Jane Doe" />);
    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  it('renders the attribution name', () => {
    render(<TestimonialCard quote="Quote" name="Jane Doe" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders role when provided', () => {
    render(<TestimonialCard quote="Quote" name="Jane Doe" role="CTO, Acme Inc" />);
    expect(screen.getByText('CTO, Acme Inc')).toBeInTheDocument();
  });

  it('renders an avatar', () => {
    const { container } = render(<TestimonialCard quote="Quote" name="Jane Doe" initials="JD" />);
    expect(container.querySelector('.tcn-avatar')).toBeInTheDocument();
  });
});
