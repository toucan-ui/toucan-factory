import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from './section-header.js';

describe('SectionHeader', () => {
  it('renders the title as an h2', () => {
    render(<SectionHeader title="Features" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Features' })).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Features" subtitle="Everything you need" />);
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
  });

  it('does not render subtitle when omitted', () => {
    const { container } = render(<SectionHeader title="Features" />);
    expect(container.querySelector('.tcn-section-header-subtitle')).not.toBeInTheDocument();
  });

  it('renders eyebrow badge when provided', () => {
    render(<SectionHeader title="Features" eyebrow="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('defaults align to center', () => {
    const { container } = render(<SectionHeader title="Features" />);
    const header = container.querySelector('.tcn-section-header');
    expect(header).toHaveAttribute('data-align', 'center');
  });

  it('applies left alignment', () => {
    const { container } = render(<SectionHeader title="Features" align="left" />);
    const header = container.querySelector('.tcn-section-header');
    expect(header).toHaveAttribute('data-align', 'left');
  });

  it('spreads HTML attributes', () => {
    const { container } = render(
      <SectionHeader title="Features" data-testid="section" id="features" />,
    );
    const header = container.querySelector('.tcn-section-header');
    expect(header).toHaveAttribute('data-testid', 'section');
    expect(header).toHaveAttribute('id', 'features');
  });
});
