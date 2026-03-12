import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './search-bar.js';

describe('SearchBar', () => {
  it('renders an input with label', () => {
    render(<SearchBar />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<SearchBar />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('uses custom label and button text', () => {
    render(<SearchBar label="Find" buttonLabel="Go" />);
    expect(screen.getByLabelText('Find')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('renders as a search form', () => {
    render(<SearchBar />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('fires onSearch when submitted', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('renders filters when provided', () => {
    render(<SearchBar filters={<button data-testid="filter">Filter</button>} />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });
});
