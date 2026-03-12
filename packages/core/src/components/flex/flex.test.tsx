import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Flex } from './flex.js';

describe('Flex', () => {
  it('renders a div with tcn-flex class', () => {
    render(<Flex data-testid="f">content</Flex>);
    const el = screen.getByTestId('f');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('tcn-flex');
  });

  it('defaults to column (no data-row)', () => {
    render(<Flex data-testid="f" />);
    expect(screen.getByTestId('f')).not.toHaveAttribute('data-row');
  });

  it('sets data-row="true" when row is true', () => {
    render(<Flex data-testid="f" row />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-row', 'true');
  });

  it.each(['sm', 'md', 'lg', 'xl'] as const)('sets data-row="%s" when row="%s"', (bp) => {
    render(<Flex data-testid="f" row={bp} />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-row', bp);
  });

  it('sets data-wrap="true" when wrap is true', () => {
    render(<Flex data-testid="f" wrap />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-wrap', 'true');
  });

  it('does not set data-wrap when wrap is not provided', () => {
    render(<Flex data-testid="f" />);
    expect(screen.getByTestId('f')).not.toHaveAttribute('data-wrap');
  });

  it('sets data-gap when gap is provided', () => {
    render(<Flex data-testid="f" gap={4} />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-gap', '4');
  });

  it('supports gap=0', () => {
    render(<Flex data-testid="f" gap={0} />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-gap', '0');
  });

  it('does not set data-gap when gap is not provided', () => {
    render(<Flex data-testid="f" />);
    expect(screen.getByTestId('f')).not.toHaveAttribute('data-gap');
  });

  it('sets data-align for static string value', () => {
    render(<Flex data-testid="f" align="center" />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-align', 'center');
  });

  it('sets responsive align attributes', () => {
    render(<Flex data-testid="f" align={{ base: 'start', md: 'center' }} />);
    const el = screen.getByTestId('f');
    expect(el).toHaveAttribute('data-align', 'start');
    expect(el).toHaveAttribute('data-align-md', 'center');
  });

  it('sets data-justify for static string value', () => {
    render(<Flex data-testid="f" justify="between" />);
    expect(screen.getByTestId('f')).toHaveAttribute('data-justify', 'between');
  });

  it('sets responsive justify attributes', () => {
    render(<Flex data-testid="f" justify={{ base: 'start', lg: 'end' }} />);
    const el = screen.getByTestId('f');
    expect(el).toHaveAttribute('data-justify', 'start');
    expect(el).toHaveAttribute('data-justify-lg', 'end');
  });

  it('merges custom className', () => {
    render(<Flex data-testid="f" className="custom" />);
    const el = screen.getByTestId('f');
    expect(el).toHaveClass('tcn-flex');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes children through', () => {
    render(
      <Flex data-testid="f">
        <span>child</span>
      </Flex>,
    );
    expect(screen.getByTestId('f').textContent).toBe('child');
  });
});
