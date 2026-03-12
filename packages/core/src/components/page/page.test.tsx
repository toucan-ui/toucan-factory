import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Page } from './page.js';

describe('Page', () => {
  it('renders a <div> with tcn-page class', () => {
    render(<Page data-testid="p">content</Page>);
    const el = screen.getByTestId('p');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-page');
  });

  it('renders children', () => {
    render(
      <Page data-testid="p">
        <span data-testid="child">hello</span>
      </Page>,
    );
    expect(screen.getByTestId('p')).toContainElement(screen.getByTestId('child'));
  });

  it('merges custom className', () => {
    render(<Page data-testid="p" className="custom" />);
    const el = screen.getByTestId('p');
    expect(el).toHaveClass('tcn-page');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Page ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <Page>
        <p>Accessible content</p>
      </Page>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
