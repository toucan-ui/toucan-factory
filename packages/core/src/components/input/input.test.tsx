import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Input } from './input.js';

describe('Input', () => {
  it('renders an input with associated label', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveClass('tcn-input');
  });

  it('auto-generates id for label linkage', () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('id');
    const label = screen.getByText('Name');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('uses provided id over generated one', () => {
    render(<Input label="Custom" id="custom-id" />);
    const input = screen.getByLabelText('Custom');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  // Description (renamed from helperText)
  it('renders description with aria-describedby', () => {
    render(<Input label="Password" description="Min 8 characters" />);
    const input = screen.getByLabelText('Password');
    const desc = screen.getByText('Min 8 characters');
    expect(desc).toHaveClass('tcn-input-description');
    expect(input).toHaveAttribute('aria-describedby', desc.id);
  });

  // Error
  it('renders error text with aria-invalid and aria-describedby', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const errorMsg = screen.getByRole('alert');
    expect(errorMsg).toHaveTextContent('Invalid email');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(errorMsg.id));
  });

  // Always-in-DOM error container
  it('has error container always in DOM', () => {
    const { container } = render(<Input label="Field" />);
    const errorEl = container.querySelector('.tcn-input-error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveAttribute('role', 'alert');
    expect(errorEl).toHaveAttribute('aria-atomic', 'true');
    expect(errorEl).toHaveTextContent('');
  });

  // Description + error both visible
  it('shows description and error simultaneously', () => {
    render(<Input label="Field" description="Some help" error="Something wrong" />);
    expect(screen.getByText('Some help')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Something wrong');
  });

  // aria-describedby order: description first, error second
  it('lists description before error in aria-describedby', () => {
    render(<Input label="Field" id="test" description="Help text" error="Error text" />);
    const input = screen.getByLabelText('Field');
    expect(input).toHaveAttribute('aria-describedby', 'test-description test-error');
  });

  // Required
  it('sets aria-required and native required', () => {
    render(<Input label="Name" required />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('required');
  });

  // Data attributes on wrapper
  it('sets data-error on wrapper when error present', () => {
    const { container } = render(<Input label="Field" error="Error" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-error');
  });

  it('sets data-disabled on wrapper when disabled', () => {
    const { container } = render(<Input label="Field" disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-disabled');
  });

  it('sets data-required on wrapper when required', () => {
    const { container } = render(<Input label="Field" required />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-required');
  });

  // hideLabel
  it('visually hides label via data attribute for atom CSS', () => {
    render(<Input label="Search" hideLabel />);
    const label = screen.getByText('Search');
    expect(label).toHaveAttribute('data-visually-hidden');
  });

  it('label is still in DOM and linked to input when hidden', () => {
    render(<Input label="Search" hideLabel />);
    const input = screen.getByLabelText('Search');
    expect(input).toBeInTheDocument();
  });

  it('sets disabled attribute', () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  // Axe
  it('passes axe accessibility checks', async () => {
    const { container } = render(<Input label="Accessible Input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with error state', async () => {
    const { container } = render(<Input label="Email" error="Required field" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with hidden label', async () => {
    const { container } = render(<Input label="Search" hideLabel placeholder="Search..." />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with description and error', async () => {
    const { container } = render(
      <Input label="Username" description="3-20 characters" error="Too short" defaultValue="ab" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
