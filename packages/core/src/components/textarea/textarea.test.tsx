import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Textarea } from './textarea.js';

describe('Textarea', () => {
  it('renders a textarea with associated label', () => {
    render(<Textarea label="Comments" />);
    const textarea = screen.getByLabelText('Comments');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveClass('tcn-textarea');
  });

  it('auto-generates id for label linkage', () => {
    render(<Textarea label="Notes" />);
    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toHaveAttribute('id');
    const label = screen.getByText('Notes');
    expect(label).toHaveAttribute('for', textarea.getAttribute('id'));
  });

  it('uses provided id over generated one', () => {
    render(<Textarea label="Custom" id="custom-id" />);
    const textarea = screen.getByLabelText('Custom');
    expect(textarea).toHaveAttribute('id', 'custom-id');
  });

  it('renders description with aria-describedby', () => {
    render(<Textarea label="Bio" description="Max 500 characters" />);
    const textarea = screen.getByLabelText('Bio');
    const desc = screen.getByText('Max 500 characters');
    expect(desc).toHaveClass('tcn-textarea-description');
    expect(textarea).toHaveAttribute('aria-describedby', desc.id);
  });

  it('renders error text with aria-invalid and aria-describedby', () => {
    render(<Textarea label="Bio" error="Too long" />);
    const textarea = screen.getByLabelText('Bio');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    const errorMsg = screen.getByRole('alert');
    expect(errorMsg).toHaveTextContent('Too long');
    expect(textarea).toHaveAttribute('aria-describedby', expect.stringContaining(errorMsg.id));
  });

  it('has error container always in DOM', () => {
    const { container } = render(<Textarea label="Field" />);
    const errorEl = container.querySelector('.tcn-textarea-error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveAttribute('role', 'alert');
    expect(errorEl).toHaveAttribute('aria-atomic', 'true');
    expect(errorEl).toHaveTextContent('');
  });

  it('shows description and error simultaneously', () => {
    render(<Textarea label="Field" description="Some help" error="Something wrong" />);
    expect(screen.getByText('Some help')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Something wrong');
  });

  it('lists description before error in aria-describedby', () => {
    render(<Textarea label="Field" id="test" description="Help text" error="Error text" />);
    const textarea = screen.getByLabelText('Field');
    expect(textarea).toHaveAttribute('aria-describedby', 'test-description test-error');
  });

  it('sets aria-required and native required', () => {
    render(<Textarea label="Name" required />);
    const textarea = screen.getByLabelText('Name');
    expect(textarea).toHaveAttribute('aria-required', 'true');
    expect(textarea).toHaveAttribute('required');
  });

  it('sets data-error on wrapper when error present', () => {
    const { container } = render(<Textarea label="Field" error="Error" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-error');
  });

  it('sets data-disabled on wrapper when disabled', () => {
    const { container } = render(<Textarea label="Field" disabled />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-disabled');
  });

  it('sets data-required on wrapper when required', () => {
    const { container } = render(<Textarea label="Field" required />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-required');
  });

  it('visually hides label via data attribute for atom CSS', () => {
    render(<Textarea label="Search" hideLabel />);
    const label = screen.getByText('Search');
    expect(label).toHaveAttribute('data-visually-hidden');
  });

  it('label is still in DOM and linked to textarea when hidden', () => {
    render(<Textarea label="Search" hideLabel />);
    const textarea = screen.getByLabelText('Search');
    expect(textarea).toBeInTheDocument();
  });

  it('sets disabled attribute', () => {
    render(<Textarea label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  // Resize
  it("defaults to data-resize='vertical'", () => {
    render(<Textarea label="Notes" />);
    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toHaveAttribute('data-resize', 'vertical');
  });

  it('sets data-resize to none when specified', () => {
    render(<Textarea label="Notes" resize="none" />);
    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toHaveAttribute('data-resize', 'none');
  });

  // Axe
  it('passes axe accessibility checks', async () => {
    const { container } = render(<Textarea label="Accessible Textarea" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with error state', async () => {
    const { container } = render(<Textarea label="Bio" error="Required field" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with hidden label', async () => {
    const { container } = render(
      <Textarea label="Comments" hideLabel placeholder="Add a comment..." />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with description and error', async () => {
    const { container } = render(
      <Textarea
        label="Message"
        description="Max 1000 characters"
        error="Too long"
        defaultValue={'a'.repeat(1001)}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
