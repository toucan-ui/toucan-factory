import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb.js';

describe('Breadcrumb', () => {
  it('renders a nav element', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveClass('tcn-breadcrumb');
  });

  it("has default aria-label 'Breadcrumb'", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('supports custom aria-label via label prop', () => {
    render(
      <Breadcrumb label="Page trail">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Page trail');
  });

  it('renders an ol list', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    expect(ol).toHaveClass('tcn-breadcrumb-list');
  });

  it('renders children as li items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Widget</BreadcrumbItem>
      </Breadcrumb>,
    );
    const items = screen
      .getAllByRole('listitem')
      .filter((el) => el.classList.contains('tcn-breadcrumb-item'));
    expect(items).toHaveLength(3);
  });

  it('inserts separators between items but not before first or after last', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Widget</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separators = container.querySelectorAll('.tcn-breadcrumb-separator');
    expect(separators).toHaveLength(2);
  });

  it('separator spans have aria-hidden', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separator = container.querySelector('.tcn-breadcrumb-separator');
    expect(separator).toHaveAttribute('aria-hidden', 'true');
  });

  it('separator li elements are present with correct class', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumb>,
    );
    const sepItems = container.querySelectorAll('.tcn-breadcrumb-separator-item');
    expect(sepItems).toHaveLength(1);
  });

  it('renders default separator /', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separator = container.querySelector('.tcn-breadcrumb-separator');
    expect(separator).toHaveTextContent('/');
  });

  it('supports custom separator', () => {
    const { container } = render(
      <Breadcrumb separator="›">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separator = container.querySelector('.tcn-breadcrumb-separator');
    expect(separator).toHaveTextContent('›');
  });

  it('does not insert separators for single item', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    const separators = container.querySelectorAll('.tcn-breadcrumb-separator');
    expect(separators).toHaveLength(0);
  });
});

describe('BreadcrumbItem', () => {
  it("sets aria-current='page' when isCurrent is true", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>,
    );
    const item = screen.getByText('Current').closest('li');
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when isCurrent is false', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Not current</BreadcrumbItem>
      </Breadcrumb>,
    );
    const item = screen.getByText('Not current').closest('li');
    expect(item).not.toHaveAttribute('aria-current');
  });

  it('renders children including links', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/');
  });
});

describe('Breadcrumb accessibility', () => {
  it('passes axe checks with links', async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="/products">Products</a>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>Widget</BreadcrumbItem>
      </Breadcrumb>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with single item', async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem isCurrent>Home</BreadcrumbItem>
      </Breadcrumb>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
