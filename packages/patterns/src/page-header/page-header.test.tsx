import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './page-header.js';

describe('PageHeader', () => {
  it('renders the title as an h1', () => {
    render(<PageHeader title="Dashboard" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard');
  });

  it('renders description when provided', () => {
    render(<PageHeader title="Dashboard" description="Overview of your account" />);
    expect(screen.getByText('Overview of your account')).toBeInTheDocument();
  });

  it('renders breadcrumbs when provided', () => {
    const { container } = render(
      <PageHeader
        title="Settings"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/account' },
          { label: 'Settings' },
        ]}
      />,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(container.querySelector('.tcn-breadcrumb')).toBeInTheDocument();
    expect(container.querySelectorAll('.tcn-breadcrumb-item')).toHaveLength(3);
  });

  it('renders actions when provided', () => {
    render(<PageHeader title="Users" actions={<button>Add user</button>} />);
    expect(screen.getByRole('button', { name: 'Add user' })).toBeInTheDocument();
  });

  it('renders as a header element', () => {
    const { container } = render(<PageHeader title="Dashboard" />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });
});
