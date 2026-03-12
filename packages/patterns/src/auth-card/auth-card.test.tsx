import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthCard } from './auth-card.js';

const defaultProps = {
  title: 'Sign in',
  fields: [
    { label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
    { label: 'Password', type: 'password', required: true },
  ],
  submitLabel: 'Sign in',
};

describe('AuthCard', () => {
  it('renders the title as a heading', () => {
    render(<AuthCard {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sign in');
  });

  it('renders description when provided', () => {
    render(<AuthCard {...defaultProps} description="Enter your credentials" />);
    expect(screen.getByText('Enter your credentials')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<AuthCard {...defaultProps} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<AuthCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('fires onSubmit when form is submitted', () => {
    const onSubmit = vi.fn();
    const nonRequiredProps = {
      title: 'Sign in',
      fields: [
        { label: 'Email', type: 'email' },
        { label: 'Password', type: 'password' },
      ],
      submitLabel: 'Sign in',
    };
    render(<AuthCard {...nonRequiredProps} onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form')!);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders footer when provided', () => {
    render(<AuthCard {...defaultProps} footer={<span>No account? Sign up</span>} />);
    expect(screen.getByText('No account? Sign up')).toBeInTheDocument();
  });
});
