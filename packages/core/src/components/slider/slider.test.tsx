import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './slider.js';

function renderSlider(props: Partial<React.ComponentProps<typeof Slider>> = {}) {
  return render(<Slider aria-label="Test slider" {...props} />);
}

describe('Slider', () => {
  // --- Rendering ---

  it('renders with role=slider', () => {
    renderSlider();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('applies tcn-slider class', () => {
    const { container } = renderSlider();
    expect(container.firstChild).toHaveClass('tcn-slider');
  });

  it('sets data-orientation', () => {
    const { container } = renderSlider({ orientation: 'vertical' });
    expect(container.firstChild).toHaveAttribute('data-orientation', 'vertical');
  });

  // --- ARIA attributes ---

  it('sets aria-valuenow', () => {
    renderSlider({ defaultValue: 50 });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    renderSlider({ min: 10, max: 90 });
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '90');
  });

  it('sets aria-orientation', () => {
    renderSlider({ orientation: 'vertical' });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('sets aria-label from label prop', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Volume');
  });

  it('sets aria-disabled when disabled', () => {
    renderSlider({ disabled: true });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  // --- Keyboard ---

  it('increases value on ArrowRight', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('decreases value on ArrowLeft', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('increases value on ArrowUp', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowUp}');
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('decreases value on ArrowDown', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('goes to min on Home', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, min: 10, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('goes to max on End', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, max: 90, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith(90);
  });

  it('increases by largeStep on PageUp', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, step: 1, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{PageUp}');
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('decreases by largeStep on PageDown', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, step: 1, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{PageDown}');
    expect(onChange).toHaveBeenCalledWith(40);
  });

  // --- Value clamping ---

  it('clamps value at max', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 100, max: 100, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('clamps value at min', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 0, min: 0, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  // --- Controlled ---

  it('respects controlled value', () => {
    renderSlider({ value: 75 });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  // --- Uncontrolled ---

  it('updates uncontrolled value on keyboard', async () => {
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50 });
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(slider).toHaveAttribute('aria-valuenow', '51');
  });

  // --- Disabled ---

  it('does not respond to keyboard when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderSlider({ defaultValue: 50, disabled: true, onChange });
    screen.getByRole('slider').focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets data-disabled on root', () => {
    const { container } = renderSlider({ disabled: true });
    expect(container.firstChild).toHaveAttribute('data-disabled', '');
  });

  // --- Dev warning ---

  it('warns when no accessible label in dev mode', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Slider />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('[tcn-slider]'));
    warn.mockRestore();
  });

  // --- Accessibility ---

  it('passes axe checks', async () => {
    const { container } = renderSlider({ defaultValue: 50 });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe checks (vertical)', async () => {
    const { container } = renderSlider({ orientation: 'vertical', defaultValue: 50 });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
