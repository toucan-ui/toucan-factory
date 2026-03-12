import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useRef } from 'react';
import { Input } from '@toucanui/core';
import { FormField, runRules } from './form-field.js';
import type { FormFieldHandle, ValidationRule } from './form-field.js';

describe('runRules', () => {
  it('returns undefined when no rules', () => {
    expect(runRules('hello', [])).toBeUndefined();
  });

  it('returns first failing message', () => {
    const rules: ValidationRule[] = [{ type: 'required' }, { type: 'minLength', value: 5 }];
    expect(runRules('', rules)).toBe('This field is required');
  });

  it('required passes with non-empty value', () => {
    expect(runRules('hi', [{ type: 'required' }])).toBeUndefined();
  });

  it('minLength fails when too short', () => {
    expect(runRules('ab', [{ type: 'minLength', value: 3 }])).toBe('Must be at least 3 characters');
  });

  it('maxLength fails when too long', () => {
    expect(runRules('abcdef', [{ type: 'maxLength', value: 3 }])).toBe(
      'Must be at most 3 characters',
    );
  });

  it('pattern fails on mismatch', () => {
    expect(runRules('abc', [{ type: 'pattern', value: /^\d+$/ }])).toBe('Invalid format');
  });

  it('pattern passes on match', () => {
    expect(runRules('123', [{ type: 'pattern', value: /^\d+$/ }])).toBeUndefined();
  });

  it('custom rule returns custom message', () => {
    const rule: ValidationRule = {
      type: 'custom',
      validate: (v) => (v !== 'valid' ? 'Must be "valid"' : undefined),
    };
    expect(runRules('nope', [rule])).toBe('Must be "valid"');
    expect(runRules('valid', [rule])).toBeUndefined();
  });

  it('uses custom message when provided', () => {
    expect(runRules('', [{ type: 'required', message: 'Fill this in' }])).toBe('Fill this in');
  });
});

describe('FormField', () => {
  it('renders child unchanged when no rules', () => {
    render(
      <FormField>
        <Input label="Name" />
      </FormField>,
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('shows error after blur for required rule', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'required' }]}>
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.tab();

    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('shows error after blur for minLength rule', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'minLength', value: 5 }]}>
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.type(input, 'ab');
    await user.tab();

    expect(screen.getByRole('alert')).toHaveTextContent('Must be at least 5 characters');
  });

  it('shows error after blur for maxLength rule', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'maxLength', value: 3 }]}>
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.type(input, 'abcdef');
    await user.tab();

    expect(screen.getByRole('alert')).toHaveTextContent('Must be at most 3 characters');
  });

  it('shows error after blur for pattern rule', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'pattern', value: /^[a-z]+$/ }]}>
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.type(input, '123');
    await user.tab();

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid format');
  });

  it('shows error after blur for custom rule', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'custom', validate: (v) => (v !== 'ok' ? 'Say ok' : undefined) }]}>
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.type(input, 'nope');
    await user.tab();

    expect(screen.getByRole('alert')).toHaveTextContent('Say ok');
  });

  it('clears error when value becomes valid', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'required' }]}>
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    // Trigger blur with empty = error
    await user.click(input);
    await user.tab();
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');

    // Type valid value — after touched, validates on change
    await user.click(input);
    await user.type(input, 'hello');
    expect(screen.getByRole('alert')).toHaveTextContent('');
  });

  it('runs rules in order — first fail wins', async () => {
    const user = userEvent.setup();
    render(
      <FormField
        rules={[
          { type: 'required', message: 'Required!' },
          { type: 'minLength', value: 5, message: 'Too short!' },
        ]}
      >
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.tab();

    // Empty triggers required first, not minLength
    expect(screen.getByRole('alert')).toHaveTextContent('Required!');
  });

  it('validateOn="change" shows error immediately on typing', async () => {
    const user = userEvent.setup();
    render(
      <FormField rules={[{ type: 'minLength', value: 5 }]} validateOn="change">
        <Input label="Name" />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.type(input, 'ab');

    expect(screen.getByRole('alert')).toHaveTextContent('Must be at least 5 characters');
  });

  it('forwards original onChange to child', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FormField rules={[{ type: 'required' }]}>
        <Input label="Name" onChange={onChange} />
      </FormField>,
    );

    await user.type(screen.getByLabelText('Name'), 'a');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('forwards original onBlur to child', async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();
    render(
      <FormField rules={[{ type: 'required' }]}>
        <Input label="Name" onBlur={onBlur} />
      </FormField>,
    );

    const input = screen.getByLabelText('Name');
    await user.click(input);
    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});

describe('FormFieldHandle (imperative)', () => {
  function TestHarness({ rules }: { rules: ValidationRule[] }) {
    const ref = useRef<FormFieldHandle>(null);
    return (
      <div>
        <FormField ref={ref} rules={rules}>
          <Input label="Name" />
        </FormField>
        <button
          data-testid="validate"
          onClick={() => {
            const valid = ref.current?.validate();
            (document.getElementById('result') as HTMLElement).textContent = String(valid);
          }}
        />
        <button data-testid="reset" onClick={() => ref.current?.reset()} />
        <span id="result" data-testid="result" />
      </div>
    );
  }

  it('validate() returns false and sets error when invalid', async () => {
    const user = userEvent.setup();
    render(<TestHarness rules={[{ type: 'required' }]} />);

    await user.click(screen.getByTestId('validate'));
    expect(screen.getByTestId('result')).toHaveTextContent('false');
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('validate() returns true when valid', async () => {
    const user = userEvent.setup();
    render(<TestHarness rules={[{ type: 'minLength', value: 2 }]} />);

    await user.type(screen.getByLabelText('Name'), 'hello');
    await user.click(screen.getByTestId('validate'));
    expect(screen.getByTestId('result')).toHaveTextContent('true');
  });

  it('reset() clears state', async () => {
    const user = userEvent.setup();
    render(<TestHarness rules={[{ type: 'required' }]} />);

    // Trigger error
    await user.click(screen.getByTestId('validate'));
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');

    // Reset
    await user.click(screen.getByTestId('reset'));
    expect(screen.getByRole('alert')).toHaveTextContent('');
  });
});
