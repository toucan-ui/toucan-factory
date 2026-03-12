import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './footer.js';
import type { FooterColumn } from './footer.js';

const columns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

describe('Footer', () => {
  it('renders all column headings', () => {
    render(<Footer columns={columns} />);
    expect(screen.getByRole('heading', { level: 4, name: 'Product' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Resources' })).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    render(<Footer columns={columns} />);
    const link = screen.getByRole('link', { name: 'Features' });
    expect(link).toHaveAttribute('href', '/features');
  });

  it('renders logo slot', () => {
    render(<Footer columns={columns} logo={<span data-testid="logo">Logo</span>} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('does not render logo when omitted', () => {
    const { container } = render(<Footer columns={columns} />);
    expect(container.querySelector('.tcn-footer-brand')).not.toBeInTheDocument();
  });

  it('renders legal text', () => {
    render(<Footer columns={columns} legal="© 2026 Factory" />);
    expect(screen.getByText('© 2026 Factory')).toBeInTheDocument();
  });

  it('renders separator when legal is present', () => {
    const { container } = render(<Footer columns={columns} legal="© 2026 Factory" />);
    expect(container.querySelector('.tcn-separator')).toBeInTheDocument();
  });

  it('does not render separator when legal is omitted', () => {
    const { container } = render(<Footer columns={columns} />);
    expect(container.querySelector('.tcn-separator')).not.toBeInTheDocument();
  });

  it('spreads HTML attributes', () => {
    const { container } = render(
      <Footer columns={columns} data-testid="footer" id="site-footer" />,
    );
    const footer = container.querySelector('.tcn-footer');
    expect(footer).toHaveAttribute('data-testid', 'footer');
    expect(footer).toHaveAttribute('id', 'site-footer');
  });
});
