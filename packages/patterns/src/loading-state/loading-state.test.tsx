import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingState } from './loading-state.js';

describe('LoadingState', () => {
  it('renders default 3 skeleton lines', () => {
    const { container } = render(<LoadingState />);
    const skeletons = container.querySelectorAll('.tcn-skeleton');
    // 1 heading + 3 lines = 4
    expect(skeletons).toHaveLength(4);
  });

  it('renders custom number of lines', () => {
    const { container } = render(<LoadingState lines={5} />);
    const skeletons = container.querySelectorAll('.tcn-skeleton');
    // 1 heading + 5 lines = 6
    expect(skeletons).toHaveLength(6);
  });

  it('shows heading skeleton by default', () => {
    const { container } = render(<LoadingState />);
    expect(container.querySelector('.tcn-loading-state-heading')).toBeInTheDocument();
  });

  it('hides heading skeleton when showHeading is false', () => {
    const { container } = render(<LoadingState showHeading={false} />);
    expect(container.querySelector('.tcn-loading-state-heading')).not.toBeInTheDocument();
  });

  it('shows avatar skeleton when showAvatar is true', () => {
    const { container } = render(<LoadingState showAvatar />);
    expect(container.querySelector('.tcn-loading-state-header')).toBeInTheDocument();
    const circles = container.querySelectorAll('[data-variant="circular"]');
    expect(circles.length).toBeGreaterThanOrEqual(1);
  });
});
