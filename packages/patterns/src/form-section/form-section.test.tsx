import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormSection } from './form-section.js';

describe('FormSection', () => {
  it('renders the title in a legend', () => {
    render(
      <FormSection title="Personal info">
        <input />
      </FormSection>,
    );
    expect(screen.getByText('Personal info')).toBeInTheDocument();
  });

  it('renders as a fieldset', () => {
    const { container } = render(
      <FormSection title="Info">
        <input />
      </FormSection>,
    );
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <FormSection title="Info" description="Fill in your details">
        <input />
      </FormSection>,
    );
    expect(screen.getByText('Fill in your details')).toBeInTheDocument();
  });

  it('renders children in fields container', () => {
    render(
      <FormSection title="Info">
        <input data-testid="field-1" />
        <input data-testid="field-2" />
      </FormSection>,
    );
    expect(screen.getByTestId('field-1')).toBeInTheDocument();
    expect(screen.getByTestId('field-2')).toBeInTheDocument();
  });

  it('renders a separator', () => {
    const { container } = render(
      <FormSection title="Info">
        <input />
      </FormSection>,
    );
    expect(container.querySelector('.tcn-separator')).toBeInTheDocument();
  });
});
