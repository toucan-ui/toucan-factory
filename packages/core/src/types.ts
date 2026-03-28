// ── Scale vocabulary ──
// The canonical set of scale step names. All size/padding/radius types
// pick from this vocabulary so we never get drift (xs vs xsm, md vs med).
type ScaleStep = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ── Component sizes ──
export type Size = Extract<ScaleStep, 'sm' | 'md' | 'lg'>;
export type ToggleSize = Extract<ScaleStep, 'sm' | 'md'>;
export type DisplaySize = Extract<ScaleStep, 'sm' | 'md' | 'lg'>;
export type DrawerSize = Extract<ScaleStep, 'sm' | 'md' | 'lg'>;
export type WrapperSize = ScaleStep | 'full';

// ── Text sizes (include 'base' which maps to font-size-base, not a scale step) ──
export type TextSize = 'xs' | 'sm' | 'base' | 'lg';
export type LinkSize = 'sm' | 'base' | 'lg';

// ── Spacing / padding ──
export type BoxPadding = 'none' | Extract<ScaleStep, 'sm' | 'md' | 'lg'>;
export type WrapperPadding = 'none' | ScaleStep;
export type SectionPadding = 'none' | ScaleStep;

// ── Shape ──
export type Radius = 'none' | Extract<ScaleStep, 'sm' | 'md' | 'lg'>;
export type Elevation = 0 | 1 | 2 | 3;

// ── Typography ──
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right';

// ── Breakpoints & responsive ──
export type Breakpoint = Extract<ScaleStep, 'sm' | 'md' | 'lg' | 'xl'>;
export type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

// ── Component variants ──
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
export type AvatarVariant = 'neutral' | 'primary';
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'custom';
export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';
export type LinkVariant = 'inline' | 'standalone';
export type TextVariant = 'default' | 'muted';
export type SectionBackground = 'default' | 'muted' | 'primary';
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

// ── Layout ──
export type Orientation = 'horizontal' | 'vertical';
export type GridColumns = number | 'auto';
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type BoxOverflow = 'auto' | 'hidden' | 'visible' | 'scroll';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between';

// ── Positioning ──
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
export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// ── Misc ──
export type SortDirection = 'ascending' | 'descending' | 'none';
export type AccordionType = 'single' | 'multiple';
