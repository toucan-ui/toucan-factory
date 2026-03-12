export type Size = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonElement = 'button' | 'a';

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'custom';

export type Elevation = 0 | 1 | 2 | 3;

export type Radius = 'none' | 'sm' | 'md' | 'lg';

export type Orientation = 'horizontal' | 'vertical';

export type AvatarVariant = 'neutral' | 'primary';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'custom';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type LinkVariant = 'inline' | 'standalone';

export type Anchor =
  | 'top'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export type WrapperSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type WrapperPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type GridColumns = number | 'auto';

export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type SectionBackground = 'default' | 'muted' | 'primary';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

export type BoxOverflow = 'auto' | 'hidden' | 'visible' | 'scroll';

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';

export type AccordionType = 'single' | 'multiple';

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

export type DrawerSize = 'sm' | 'md' | 'lg';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
