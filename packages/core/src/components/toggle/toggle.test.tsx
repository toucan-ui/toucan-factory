import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './toggle.js';

describe('Toggle', () => {
  it('renders a switch with accessible label', () => {
    render(<Toggle label="Dark mode" />);
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveClass('tcn-toggle');
  });

  it("has role='switch'", () => {
    render(<Toggle label="Notifications" />);
    const toggle = screen.getByRole('switch');
    expect(toggle.tagName).toBe('BUTTON');
    expect(toggle).toHaveAttribute('type', 'button');
  });

  it('links label via aria-labelledby', () => {
    render(<Toggle label="Auto-save" />);
    const toggle = screen.getByRole('switch');
    const labelId = toggle.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const label = document.getElementById(labelId!);
    expect(label).toHaveTextContent('Auto-save');
  });

  it('uses span for label (not <label>)', () => {
    render(<Toggle label="Feature" />);
    const label = screen.getByText('Feature');
    expect(label.tagName).toBe('SPAN');
  });

  it('renders description with aria-describedby', () => {
    render(<Toggle label="Sync" description="Sync data in real-time" />);
    const toggle = screen.getByRole('switch');
    const desc = screen.getByText('Sync data in real-time');
    expect(desc).toHaveClass('tcn-toggle-description');
    expect(toggle).toHaveAttribute('aria-describedby', desc.id);
  });

  it('does not set aria-describedby without description', () => {
    render(<Toggle label="Simple" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toHaveAttribute('aria-describedby');
  });

  // Uncontrolled
  it('defaults to unchecked', () => {
    render(<Toggle label="Off" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(toggle).not.toHaveAttribute('data-checked');
  });

  it('respects defaultChecked', () => {
    render(<Toggle label="On" defaultChecked />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('data-checked');
  });

  it('toggles in uncontrolled mode', async () => {
    const user = userEvent.setup();
    render(<Toggle label="Toggle me" />);
    const toggle = screen.getByRole('switch');

    expect(toggle).toHaveAttribute('aria-checked', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('data-checked');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(toggle).not.toHaveAttribute('data-checked');
  });

  // Controlled
  it('reflects controlled checked state', () => {
    render(<Toggle label="Controlled" checked onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAttribute('data-checked');
  });

  it('reflects controlled unchecked state', () => {
    render(<Toggle label="Controlled" checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(toggle).not.toHaveAttribute('data-checked');
  });

  it('calls onChange with next boolean value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle label="Test" checked={false} onChange={handleChange} />);
    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when turning off', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle label="Test" checked onChange={handleChange} />);
    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  // Dev warning
  it('warns when checked without onChange in dev', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Toggle label="Stuck" checked />);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[tcn-toggle]'));
    spy.mockRestore();
  });

  // Disabled
  it('sets disabled attribute', () => {
    render(<Toggle label="Disabled" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('sets data-disabled on wrapper when disabled', () => {
    const { container } = render(<Toggle label="Disabled" disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-disabled');
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle label="Disabled" disabled onChange={handleChange} />);
    await user.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Size
  it('defaults to size md', () => {
    render(<Toggle label="Default size" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('data-size', 'md');
  });

  it('accepts size sm', () => {
    render(<Toggle label="Small" size="sm" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('data-size', 'sm');
  });

  // Hide label
  it('visually hides label content when hideLabel is true', () => {
    const { container } = render(<Toggle label="Hidden" hideLabel />);
    const content = container.querySelector('.tcn-toggle-content');
    expect(content).toHaveAttribute('data-visually-hidden');
  });

  it('label is still accessible when hidden', () => {
    render(<Toggle label="Hidden" hideLabel />);
    expect(screen.getByRole('switch', { name: 'Hidden' })).toBeInTheDocument();
  });

  // Thumb
  it('has aria-hidden thumb', () => {
    const { container } = render(<Toggle label="Test" />);
    const thumb = container.querySelector('.tcn-toggle-thumb');
    expect(thumb).toHaveAttribute('aria-hidden', 'true');
  });

  // Axe
  it('passes axe accessibility checks', async () => {
    const { container } = render(<Toggle label="Accessible Toggle" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when checked', async () => {
    const { container } = render(<Toggle label="Active" defaultChecked />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with hidden label', async () => {
    const { container } = render(<Toggle label="Hidden" hideLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
