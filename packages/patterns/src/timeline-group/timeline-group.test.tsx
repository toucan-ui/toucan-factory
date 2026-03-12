import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TimelineGroup } from './timeline-group.js';

describe('TimelineGroup', () => {
  it('renders the date heading', () => {
    render(
      <TimelineGroup date="2 March 2026">
        <div>Item 1</div>
      </TimelineGroup>,
    );
    expect(screen.getByText('2 March 2026')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <TimelineGroup date="Today">
        <div>First event</div>
        <div>Second event</div>
      </TimelineGroup>,
    );
    expect(screen.getByText('First event')).toBeInTheDocument();
    expect(screen.getByText('Second event')).toBeInTheDocument();
  });

  it('renders the items container with connector line class', () => {
    const { container } = render(
      <TimelineGroup date="Today">
        <div>Item</div>
      </TimelineGroup>,
    );
    expect(container.querySelector('.tcn-timeline-group-items')).toBeInTheDocument();
  });
});
