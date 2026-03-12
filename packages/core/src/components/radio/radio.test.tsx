import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, Radio } from './radio.js';

function renderGroup(props?: Partial<React.ComponentProps<typeof RadioGroup>>) {
  return render(
    <RadioGroup label="Favourite color" {...props}>
      <Radio value="red" label="Red" />
      <Radio value="green" label="Green" />
      <Radio value="blue" label="Blue" />
    </RadioGroup>,
  );
}

describe('RadioGroup', () => {
  it('renders with role radiogroup', () => {
    renderGroup();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('labels the group via aria-labelledby', () => {
    renderGroup();
    const group = screen.getByRole('radiogroup');
    const labelId = group.getAttribute('aria-labelledby');
    const label = document.getElementById(labelId!);
    expect(label).toHaveTextContent('Favourite color');
  });

  it('renders description with aria-describedby', () => {
    renderGroup({ description: 'Pick one' });
    const group = screen.getByRole('radiogroup');
    const desc = screen.getByText('Pick one');
    expect(group.getAttribute('aria-describedby')).toContain(desc.id);
  });

  it('renders error with role alert', () => {
    renderGroup({ error: 'Selection required' });
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Selection required');
  });

  it('sets data-error on group when error present', () => {
    renderGroup({ error: 'Required' });
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('data-error');
  });

  it('has error container always in DOM', () => {
    const { container } = renderGroup();
    const errorEl = container.querySelector('.tcn-radio-group-error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveAttribute('role', 'alert');
    expect(errorEl).toHaveTextContent('');
  });

  it('sets aria-required on group', () => {
    renderGroup({ required: true });
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-required', 'true');
  });

  it('sets data-required on group', () => {
    renderGroup({ required: true });
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('data-required');
  });

  it('sets data-disabled on group', () => {
    renderGroup({ disabled: true });
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('data-disabled');
  });

  it('visually hides label when hideLabel is true', () => {
    const { container } = renderGroup({ hideLabel: true });
    const label = container.querySelector('.tcn-radio-group-label');
    expect(label).toHaveAttribute('data-visually-hidden');
  });

  it('label is still accessible when hidden', () => {
    renderGroup({ hideLabel: true });
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-labelledby');
  });
});

describe('Radio', () => {
  it('renders radio inputs with correct type', () => {
    renderGroup();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    radios.forEach((r) => expect(r).toHaveAttribute('type', 'radio'));
  });

  it('shares the same name across all radios', () => {
    renderGroup();
    const radios = screen.getAllByRole('radio');
    const name = radios[0].getAttribute('name');
    expect(name).toBeTruthy();
    radios.forEach((r) => expect(r).toHaveAttribute('name', name));
  });

  it('links label to input via htmlFor', () => {
    renderGroup();
    const radio = screen.getByLabelText('Red');
    expect(radio).toHaveAttribute('type', 'radio');
  });

  it('selects radio in uncontrolled mode', async () => {
    const user = userEvent.setup();
    renderGroup();
    const red = screen.getByLabelText('Red');
    const green = screen.getByLabelText('Green');

    expect(red).not.toBeChecked();
    await user.click(red);
    expect(red).toBeChecked();
    expect(green).not.toBeChecked();

    await user.click(green);
    expect(green).toBeChecked();
    expect(red).not.toBeChecked();
  });

  it('respects defaultValue', () => {
    renderGroup({ defaultValue: 'green' });
    expect(screen.getByLabelText('Green')).toBeChecked();
    expect(screen.getByLabelText('Red')).not.toBeChecked();
  });

  it('works in controlled mode with value and onChange', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { rerender } = render(
      <RadioGroup label="Color" value="red" onChange={handleChange}>
        <Radio value="red" label="Red" />
        <Radio value="green" label="Green" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText('Red')).toBeChecked();
    await user.click(screen.getByLabelText('Green'));
    expect(handleChange).toHaveBeenCalledWith('green');

    // Simulate parent re-rendering with new value
    rerender(
      <RadioGroup label="Color" value="green" onChange={handleChange}>
        <Radio value="red" label="Red" />
        <Radio value="green" label="Green" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText('Green')).toBeChecked();
  });

  it('disables all radios when group is disabled', () => {
    renderGroup({ disabled: true });
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled());
  });

  it('disables individual radio', () => {
    render(
      <RadioGroup label="Color">
        <Radio value="red" label="Red" />
        <Radio value="green" label="Green" disabled />
      </RadioGroup>,
    );
    expect(screen.getByLabelText('Red')).not.toBeDisabled();
    expect(screen.getByLabelText('Green')).toBeDisabled();
  });

  it('renders item description with aria-describedby', () => {
    render(
      <RadioGroup label="Color">
        <Radio value="red" label="Red" description="Warm color" />
      </RadioGroup>,
    );
    const radio = screen.getByLabelText('Red');
    const desc = screen.getByText('Warm color');
    expect(radio).toHaveAttribute('aria-describedby', desc.id);
  });

  it('sets data-checked on indicator', async () => {
    const user = userEvent.setup();
    const { container } = renderGroup();
    const indicators = container.querySelectorAll('.tcn-radio-indicator');

    expect(indicators[0]).not.toHaveAttribute('data-checked');
    await user.click(screen.getByLabelText('Red'));
    expect(indicators[0]).toHaveAttribute('data-checked');
    expect(indicators[1]).not.toHaveAttribute('data-checked');
  });

  it('sets data-orientation on items container', () => {
    const { container } = renderGroup({ orientation: 'horizontal' });
    const items = container.querySelector('.tcn-radio-group-items');
    expect(items).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('defaults to vertical orientation', () => {
    const { container } = renderGroup();
    const items = container.querySelector('.tcn-radio-group-items');
    expect(items).toHaveAttribute('data-orientation', 'vertical');
  });
});

describe('Radio accessibility', () => {
  it('passes axe checks', async () => {
    const { container } = renderGroup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with error', async () => {
    const { container } = renderGroup({ error: 'Required' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with hidden label', async () => {
    const { container } = renderGroup({ hideLabel: true });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with selection', async () => {
    const { container } = renderGroup({ defaultValue: 'red' });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
