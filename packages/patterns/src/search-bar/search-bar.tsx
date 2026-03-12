import { forwardRef } from 'react';
import { cn, Input, Button, FlexItem } from '@toucan-ui/core';

export interface SearchBarProps extends React.HTMLAttributes<HTMLFormElement> {
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSearch?: (e: React.FormEvent) => void;
  filters?: React.ReactNode;
}

export const SearchBar = forwardRef<HTMLFormElement, SearchBarProps>(function SearchBar(
  {
    label = 'Search',
    placeholder = 'Search…',
    buttonLabel = 'Search',
    onSearch,
    filters,
    className,
    ...props
  },
  ref,
) {
  return (
    <form
      ref={ref}
      className={cn('tcn-search-bar', className)}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(e);
      }}
      {...props}
    >
      <FlexItem grow className="tcn-search-bar-input">
        <Input label={label} placeholder={placeholder} />
      </FlexItem>
      {filters && (
        <FlexItem shrink={false} className="tcn-search-bar-filters">
          {filters}
        </FlexItem>
      )}
      <Button type="submit" variant="primary">
        {buttonLabel}
      </Button>
    </form>
  );
});
