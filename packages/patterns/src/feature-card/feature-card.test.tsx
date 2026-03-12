import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureCard } from './feature-card.js';

describe('FeatureCard', () => {
  it('renders the title as a heading', () => {
    render(<FeatureCard title="Fast builds" description="Lightning-fast compilation" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Fast builds');
  });

  it('renders the description', () => {
    render(<FeatureCard title="Fast builds" description="Lightning-fast compilation" />);
    expect(screen.getByText('Lightning-fast compilation')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = render(
      <FeatureCard title="Title" description="Desc" icon={<span data-testid="icon">⚡</span>} />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    const iconWrapper = container.querySelector('.tcn-feature-card-icon');
    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
  });
});
