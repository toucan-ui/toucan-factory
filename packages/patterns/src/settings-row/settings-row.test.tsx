import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SettingsRow } from './settings-row.js';

describe('SettingsRow', () => {
  it('renders the label', () => {
    render(<SettingsRow label="Notifications" control={<button>Toggle</button>} />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(
      <SettingsRow
        label="Notifications"
        description="Receive email alerts"
        control={<button>Toggle</button>}
      />,
    );
    expect(screen.getByText('Receive email alerts')).toBeInTheDocument();
  });

  it('renders the control slot', () => {
    render(<SettingsRow label="Theme" control={<button data-testid="ctrl">Switch</button>} />);
    expect(screen.getByTestId('ctrl')).toBeInTheDocument();
  });
});
