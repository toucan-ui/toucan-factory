import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@toucan-ui/core';
import { Form } from './form.js';
import { FormField } from '../form-field/form-field';

describe('Form', () => {
  it('renders as a <form> element', () => {
    const { container } = render(
      <Form>
        <Input label="Name" />
      </Form>,
    );
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders with tcn-form class', () => {
    const { container } = render(
      <Form>
        <Input label="Name" />
      </Form>,
    );
    expect(container.querySelector('.tcn-form')).toBeInTheDocument();
  });

  it('renders children inside Grid', () => {
    const { container } = render(
      <Form>
        <Input label="Name" />
      </Form>,
    );
    expect(container.querySelector('.tcn-grid')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('calls onValidSubmit when all fields pass', async () => {
    const user = userEvent.setup();
    const onValidSubmit = vi.fn();
    render(
      <Form onValidSubmit={onValidSubmit}>
        <FormField name="name" rules={[{ type: 'required' }]}>
          <Input label="Name" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.type(screen.getByLabelText('Name'), 'Alice');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onValidSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onInvalidSubmit when any field fails', async () => {
    const user = userEvent.setup();
    const onInvalidSubmit = vi.fn();
    const onValidSubmit = vi.fn();
    render(
      <Form onValidSubmit={onValidSubmit} onInvalidSubmit={onInvalidSubmit}>
        <FormField name="name" rules={[{ type: 'required' }]}>
          <Input label="Name" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onInvalidSubmit).toHaveBeenCalledTimes(1);
    expect(onValidSubmit).not.toHaveBeenCalled();
  });

  it('shows errors on all fields at submit time', async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <FormField name="email" rules={[{ type: 'required', message: 'Email required' }]}>
          <Input label="Email" />
        </FormField>
        <FormField name="password" rules={[{ type: 'required', message: 'Password required' }]}>
          <Input label="Password" type="password" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    const alerts = screen.getAllByRole('alert');
    const alertTexts = alerts.map((a) => a.textContent).filter(Boolean);
    expect(alertTexts).toContain('Email required');
    expect(alertTexts).toContain('Password required');
  });

  it('does not call onValidSubmit when invalid', async () => {
    const user = userEvent.setup();
    const onValidSubmit = vi.fn();
    render(
      <Form onValidSubmit={onValidSubmit}>
        <FormField name="name" rules={[{ type: 'required' }]}>
          <Input label="Name" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onValidSubmit).not.toHaveBeenCalled();
  });

  it('re-submit works after fixing errors', async () => {
    const user = userEvent.setup();
    const onValidSubmit = vi.fn();
    render(
      <Form onValidSubmit={onValidSubmit}>
        <FormField name="name" rules={[{ type: 'required' }]}>
          <Input label="Name" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>,
    );

    // First submit — invalid
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onValidSubmit).not.toHaveBeenCalled();

    // Fix the field
    await user.type(screen.getByLabelText('Name'), 'Alice');

    // Second submit — valid
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onValidSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit callback', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('unnamed FormField children are not registered (validate independently)', async () => {
    const user = userEvent.setup();
    const onValidSubmit = vi.fn();
    render(
      <Form onValidSubmit={onValidSubmit}>
        <FormField rules={[{ type: 'required' }]}>
          <Input label="Unnamed" />
        </FormField>
        <button type="submit">Submit</button>
      </Form>,
    );

    // Unnamed field not registered, so form considers all registered fields valid
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onValidSubmit).toHaveBeenCalledTimes(1);
  });

  it('prevents default form submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e: React.FormEvent) => {
      // If preventDefault was called, this should work
      expect(e.defaultPrevented).toBe(true);
    });

    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
  });
});
