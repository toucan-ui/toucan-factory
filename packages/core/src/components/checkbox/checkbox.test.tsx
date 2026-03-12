import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './checkbox.js';

describe('Checkbox', () => {
  it('renders a checkbox with associated label', () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText('Accept terms');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveClass('tcn-checkbox-native');
  });

  it('auto-generates id for label linkage', () => {
    render(<Checkbox label="Agree" />);
    const checkbox = screen.getByLabelText('Agree');
    expect(checkbox).toHaveAttribute('id');
    const label = screen.getByText('Agree');
    expect(label).toHaveAttribute('for', checkbox.getAttribute('id'));
  });

  it('uses provided id over generated one', () => {
    render(<Checkbox label="Custom" id="custom-id" />);
    const checkbox = screen.getByLabelText('Custom');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('renders description with aria-describedby', () => {
    render(<Checkbox label="Newsletter" description="Weekly digest" />);
    const checkbox = screen.getByLabelText('Newsletter');
    const desc = screen.getByText('Weekly digest');
    expect(desc).toHaveClass('tcn-checkbox-description');
    expect(checkbox).toHaveAttribute('aria-describedby', desc.id);
  });

  it('renders error text with aria-invalid and aria-describedby', () => {
    render(<Checkbox label="Terms" error="Must accept" />);
    const checkbox = screen.getByLabelText('Terms');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    const errorMsg = screen.getByRole('alert');
    expect(errorMsg).toHaveTextContent('Must accept');
    expect(checkbox).toHaveAttribute('aria-describedby', expect.stringContaining(errorMsg.id));
  });

  it('has error container always in DOM', () => {
    const { container } = render(<Checkbox label="Field" />);
    const errorEl = container.querySelector('.tcn-checkbox-error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveAttribute('role', 'alert');
    expect(errorEl).toHaveAttribute('aria-atomic', 'true');
    expect(errorEl).toHaveTextContent('');
  });

  it('lists description before error in aria-describedby', () => {
    render(<Checkbox label="Field" id="test" description="Help text" error="Error text" />);
    const checkbox = screen.getByLabelText('Field');
    expect(checkbox).toHaveAttribute('aria-describedby', 'test-description test-error');
  });

  it('sets aria-required and native required', () => {
    render(<Checkbox label="Terms" required />);
    const checkbox = screen.getByLabelText('Terms');
    expect(checkbox).toHaveAttribute('aria-required', 'true');
    expect(checkbox).toHaveAttribute('required');
  });

  // Data attributes on wrapper
  it('sets data-error on wrapper when error present', () => {
    const { container } = render(<Checkbox label="Field" error="Error" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-error');
  });

  it('sets data-disabled on wrapper when disabled', () => {
    const { container } = render(<Checkbox label="Field" disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-disabled');
  });

  it('sets data-required on wrapper when required', () => {
    const { container } = render(<Checkbox label="Field" required />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-required');
  });

  // Hide label
  it('visually hides label content when hideLabel is true', () => {
    const { container } = render(<Checkbox label="Hidden" hideLabel />);
    const content = container.querySelector('.tcn-checkbox-content');
    expect(content).toHaveAttribute('data-visually-hidden');
  });

  it('label is still in DOM and linked when hidden', () => {
    render(<Checkbox label="Hidden" hideLabel />);
    const checkbox = screen.getByLabelText('Hidden');
    expect(checkbox).toBeInTheDocument();
  });

  it('sets disabled attribute', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  // Indeterminate
  it('sets indeterminate DOM property', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByLabelText('Select all') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('sets aria-checked to mixed when indeterminate', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByLabelText('Select all');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('sets data-indeterminate on indicator when indeterminate', () => {
    const { container } = render(<Checkbox label="Select all" indeterminate />);
    const indicator = container.querySelector('.tcn-checkbox-indicator');
    expect(indicator).toHaveAttribute('data-indeterminate');
    expect(indicator).not.toHaveAttribute('data-checked');
  });

  // Uncontrolled mode
  it('toggles checked in uncontrolled mode', async () => {
    const user = userEvent.setup();
    const { container } = render(<Checkbox label="Toggle me" />);
    const checkbox = screen.getByLabelText('Toggle me');
    const indicator = container.querySelector('.tcn-checkbox-indicator');

    expect(indicator).not.toHaveAttribute('data-checked');
    await user.click(checkbox);
    expect(indicator).toHaveAttribute('data-checked');
    await user.click(checkbox);
    expect(indicator).not.toHaveAttribute('data-checked');
  });

  it('respects defaultChecked in uncontrolled mode', () => {
    const { container } = render(<Checkbox label="Pre-checked" defaultChecked />);
    const indicator = container.querySelector('.tcn-checkbox-indicator');
    expect(indicator).toHaveAttribute('data-checked');
  });

  // Controlled mode
  it('reflects controlled checked state on indicator', () => {
    const { container } = render(<Checkbox label="Controlled" checked onChange={() => {}} />);
    const indicator = container.querySelector('.tcn-checkbox-indicator');
    expect(indicator).toHaveAttribute('data-checked');
  });

  it('does not show data-checked when controlled and unchecked', () => {
    const { container } = render(
      <Checkbox label="Controlled" checked={false} onChange={() => {}} />,
    );
    const indicator = container.querySelector('.tcn-checkbox-indicator');
    expect(indicator).not.toHaveAttribute('data-checked');
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Click me" onChange={handleChange} />);
    await user.click(screen.getByLabelText('Click me'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Indicator aria-hidden
  it('has aria-hidden on indicator', () => {
    const { container } = render(<Checkbox label="Field" />);
    const indicator = container.querySelector('.tcn-checkbox-indicator');
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
  });

  // Axe
  it('passes axe accessibility checks', async () => {
    const { container } = render(<Checkbox label="Accessible Checkbox" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with error state', async () => {
    const { container } = render(<Checkbox label="Terms" error="You must accept" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with hidden label', async () => {
    const { container } = render(<Checkbox label="Select row" hideLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks when checked', async () => {
    const { container } = render(<Checkbox label="Checked" defaultChecked />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
