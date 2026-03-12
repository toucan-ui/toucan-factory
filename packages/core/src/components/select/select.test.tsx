import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './select.js';
import type { SelectOption } from './select.js';

const defaultOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

describe('Select', () => {
  // --- Rendering ---
  it('renders a combobox trigger with label', () => {
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('tcn-select-trigger');
  });

  it('uses span for label linked via aria-labelledby', () => {
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    const labelId = trigger.getAttribute('aria-labelledby');
    const label = document.getElementById(labelId!);
    expect(label?.tagName).toBe('SPAN');
    expect(label).toHaveTextContent('Fruit');
  });

  it('shows placeholder text by default', () => {
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Select an option');
    expect(trigger).toHaveAttribute('data-placeholder');
  });

  it('shows custom placeholder', () => {
    render(<Select label="Fruit" options={defaultOptions} placeholder="Pick one" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Pick one');
  });

  it('renders description with aria-describedby', () => {
    render(<Select label="Fruit" options={defaultOptions} description="Choose your favorite" />);
    const trigger = screen.getByRole('combobox');
    const desc = screen.getByText('Choose your favorite');
    expect(desc).toHaveClass('tcn-select-description');
    expect(trigger).toHaveAttribute('aria-describedby', desc.id);
  });

  it('renders error with aria-invalid', () => {
    render(<Select label="Fruit" options={defaultOptions} error="Required" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    const errorMsg = screen.getByRole('alert');
    expect(errorMsg).toHaveTextContent('Required');
  });

  it('has error container always in DOM', () => {
    const { container } = render(<Select label="Fruit" options={defaultOptions} />);
    const errorEl = container.querySelector('.tcn-select-error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl).toHaveAttribute('role', 'alert');
    expect(errorEl).toHaveTextContent('');
  });

  it('sets required attributes', () => {
    render(<Select label="Fruit" options={defaultOptions} required />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-required', 'true');
  });

  it('sets disabled state', () => {
    render(<Select label="Fruit" options={defaultOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('sets data-error on wrapper', () => {
    const { container } = render(<Select label="Fruit" options={defaultOptions} error="Err" />);
    expect(container.firstElementChild).toHaveAttribute('data-error');
  });

  it('sets data-disabled on wrapper', () => {
    const { container } = render(<Select label="Fruit" options={defaultOptions} disabled />);
    expect(container.firstElementChild).toHaveAttribute('data-disabled');
  });

  it('visually hides label when hideLabel is true', () => {
    render(<Select label="Fruit" options={defaultOptions} hideLabel />);
    const label = screen.getByText('Fruit');
    expect(label).toHaveAttribute('data-visually-hidden');
  });

  // --- Open/Close ---
  it('opens listbox on click', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes listbox on second click', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('sets data-open on wrapper when open', async () => {
    const user = userEvent.setup();
    const { container } = render(<Select label="Fruit" options={defaultOptions} />);
    await user.click(screen.getByRole('combobox'));
    expect(container.firstElementChild).toHaveAttribute('data-open');
  });

  it('renders all options when open', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    await user.click(screen.getByRole('combobox'));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Apple');
    expect(options[1]).toHaveTextContent('Banana');
    expect(options[2]).toHaveTextContent('Cherry');
  });

  it('sets aria-controls when open', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} id="test" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).not.toHaveAttribute('aria-controls');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-controls', 'test-listbox');
  });

  // --- Selection ---
  it('selects an option on click', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Banana' }));

    expect(trigger).toHaveTextContent('Banana');
    expect(trigger).not.toHaveAttribute('data-placeholder');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks selected option with aria-selected', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} defaultValue="banana" />);
    await user.click(screen.getByRole('combobox'));

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('shows defaultValue label on initial render', () => {
    render(<Select label="Fruit" options={defaultOptions} defaultValue="cherry" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Cherry');
  });

  // --- Controlled ---
  it('reflects controlled value', () => {
    render(<Select label="Fruit" options={defaultOptions} value="banana" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana');
  });

  it('calls onChange with selected value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select label="Fruit" options={defaultOptions} value="" onChange={handleChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(handleChange).toHaveBeenCalledWith('cherry');
  });

  // --- Disabled options ---
  it('marks disabled options', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={optionsWithDisabled} />);
    await user.click(screen.getByRole('combobox'));

    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('aria-disabled', 'true');
    expect(options[1]).toHaveAttribute('data-disabled');
  });

  it('does not select disabled options on click', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select label="Fruit" options={optionsWithDisabled} onChange={handleChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(handleChange).not.toHaveBeenCalled();
  });

  // --- Keyboard: closed ---
  it('opens on Enter key', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens on Space key', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard(' ');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens on ArrowDown key', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens on ArrowUp key and focuses last option', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveAttribute('data-active');
  });

  // --- Keyboard: open ---
  it('navigates options with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}');
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('data-active');

    await user.keyboard('{ArrowDown}');
    expect(options[1]).toHaveAttribute('data-active');
    expect(options[0]).not.toHaveAttribute('data-active');
  });

  it('navigates options with ArrowUp', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown}{ArrowDown}{ArrowUp}');
    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('data-active');
  });

  it('selects with Enter and closes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select label="Fruit" options={defaultOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown}{Enter}');
    expect(handleChange).toHaveBeenCalledWith('banana');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects with Space and closes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select label="Fruit" options={defaultOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown} ');
    expect(handleChange).toHaveBeenCalledWith('banana');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape without selecting', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select label="Fruit" options={defaultOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown}{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('Home key moves to first enabled option', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown}{ArrowDown}{Home}');
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('data-active');
  });

  it('End key moves to last enabled option', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{End}');
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveAttribute('data-active');
  });

  it('skips disabled options during keyboard nav', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={optionsWithDisabled} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown}');
    const options = screen.getAllByRole('option');
    // Should skip Banana (disabled) and land on Cherry
    expect(options[2]).toHaveAttribute('data-active');
  });

  it('does not go past last option with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveAttribute('data-active');
  });

  it('does not go past first option with ArrowUp', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}{ArrowUp}');
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('data-active');
  });

  // --- Click outside ---
  it('closes on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select label="Fruit" options={defaultOptions} />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(screen.getByText('Outside'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // --- aria-activedescendant ---
  it('sets aria-activedescendant when open with active option', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} id="test" />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();

    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-activedescendant', 'test-option-0');

    await user.keyboard('{ArrowDown}');
    expect(trigger).toHaveAttribute('aria-activedescendant', 'test-option-1');
  });

  it('clears aria-activedescendant when closed', () => {
    render(<Select label="Fruit" options={defaultOptions} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).not.toHaveAttribute('aria-activedescendant');
  });

  // --- Does not open when disabled ---
  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select label="Fruit" options={defaultOptions} disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // --- Axe ---
  it('passes axe accessibility checks (closed)', async () => {
    const { container } = render(<Select label="Fruit" options={defaultOptions} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks (open)', async () => {
    const user = userEvent.setup();
    const { container } = render(<Select label="Fruit" options={defaultOptions} />);
    await user.click(screen.getByRole('combobox'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with error', async () => {
    const { container } = render(
      <Select label="Fruit" options={defaultOptions} error="Required" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with hidden label', async () => {
    const { container } = render(<Select label="Fruit" options={defaultOptions} hideLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks with selection', async () => {
    const { container } = render(
      <Select label="Fruit" options={defaultOptions} defaultValue="banana" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
