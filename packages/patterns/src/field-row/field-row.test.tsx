import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FieldRow } from './field-row.js';

describe('FieldRow', () => {
  it('renders label and value', () => {
    render(<FieldRow label="Email" value="jane@example.com" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('applies mono class when mono is true', () => {
    const { container } = render(<FieldRow label="ID" value="CRM-12345" mono />);
    const value = container.querySelector('.tcn-field-row-value');
    expect(value).toHaveClass('tcn-mono');
  });

  it('renders label with label class', () => {
    const { container } = render(<FieldRow label="Email" value="jane@example.com" />);
    const label = container.querySelector('.tcn-field-row-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Email');
  });
});
