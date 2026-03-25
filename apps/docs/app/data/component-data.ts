import type { PropDefinition } from '../_shared/prop-table';

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: 'layout' | 'form' | 'data' | 'feedback' | 'overlay' | 'navigation' | 'utility';
  categoryLabel: string;
  props: PropDefinition[];
  accessibility: string[];
  relatedTokens: string[];
}

export const CATEGORIES = [
  { key: 'layout' as const, label: 'Layout' },
  { key: 'form' as const, label: 'Form Controls' },
  { key: 'data' as const, label: 'Data Display' },
  { key: 'feedback' as const, label: 'Feedback' },
  { key: 'overlay' as const, label: 'Overlay' },
  { key: 'navigation' as const, label: 'Navigation' },
  { key: 'utility' as const, label: 'Utility' },
];

export const COMPONENTS: ComponentDoc[] = [
  // --- Layout (alphabetical) ---
  {
    slug: 'flex',
    name: 'Flex',
    description:
      'Single-axis flex layout. Column by default (mobile-first), with optional row direction at a breakpoint, wrap, alignment, and justification.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [
      {
        name: 'row',
        type: "boolean | 'sm' | 'md' | 'lg' | 'xl'",
        description:
          'Switch to row direction. A breakpoint value makes it row only at that width and above.',
      },
      {
        name: 'wrap',
        type: 'boolean',
        default: 'false',
        description: 'Allow items to wrap to new lines',
      },
      {
        name: 'gap',
        type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16',
        description: 'Gap between items',
      },
      {
        name: 'align',
        type: "Responsive<'start' | 'center' | 'end' | 'stretch' | 'baseline'>",
        description: 'Cross-axis alignment. Accepts a string or { base, sm, md, lg, xl } object.',
      },
      {
        name: 'justify',
        type: "Responsive<'start' | 'center' | 'end' | 'between'>",
        description:
          'Main-axis justification. Accepts a string or { base, sm, md, lg, xl } object.',
      },
    ],
    accessibility: [
      'Renders a plain <div> — no ARIA roles needed',
      'Flex layout is purely visual and does not affect accessibility tree',
    ],
    relatedTokens: [],
  },
  {
    slug: 'flex-item',
    name: 'FlexItem',
    description: 'Child of Flex that controls grow and shrink behavior.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [
      {
        name: 'grow',
        type: 'boolean',
        default: 'false',
        description: 'Allows the item to grow and fill available space (flex: 1)',
      },
      {
        name: 'shrink',
        type: 'boolean',
        default: 'true',
        description: 'Set to false to prevent the item from shrinking below its content size',
      },
    ],
    accessibility: ['Renders a plain <div> — no ARIA roles needed'],
    relatedTokens: [],
  },
  {
    slug: 'grid',
    name: 'Grid',
    description:
      'Responsive grid layout with fixed or auto-fit columns, gap control, and container queries.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [
      {
        name: 'columns',
        type: "Responsive<number | 'auto'>",
        default: '1',
        description:
          'Number of columns, or "auto" for responsive auto-fit. Accepts a responsive object for breakpoint-specific values.',
      },
      {
        name: 'gap',
        type: 'Responsive<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16>',
        description:
          'Gap between grid items. Accepts a responsive object for breakpoint-specific values.',
      },
      {
        name: 'minItemSize',
        type: 'string',
        description: 'Minimum item width for auto-fit columns (CSS value, e.g. "var(--layout-60)")',
      },
    ],
    accessibility: [
      'Renders a plain <div> — no ARIA roles needed',
      'Grid layout is purely visual and does not affect accessibility tree',
    ],
    relatedTokens: ['grid.columns-default', 'grid.gap-default', 'grid.min-item-size'],
  },
  {
    slug: 'grid-item',
    name: 'GridItem',
    description: 'Child of Grid that can span multiple columns.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [
      {
        name: 'span',
        type: 'Responsive<number>',
        description:
          'Number of columns to span. Accepts a responsive object for breakpoint-specific values.',
      },
    ],
    accessibility: ['Renders a plain <div> — no ARIA roles needed'],
    relatedTokens: [],
  },
  {
    slug: 'page',
    name: 'Page',
    description:
      'Full-viewport wrapper with themed background and text colour. The outermost layout container for an application.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [],
    accessibility: [
      'Renders a plain <div> — consumers should add landmarks (<main>, <header>, etc.) as children',
    ],
    relatedTokens: ['page.surface', 'page.on-surface'],
  },
  {
    slug: 'section',
    name: 'Section',
    description:
      'Full-width page band with optional background, vertical padding, and gap. Compose with Wrapper for centered content.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [
      {
        name: 'gap',
        type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16',
        description: 'Vertical gap between children',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'none'",
        description: 'Block (top/bottom) padding',
      },
      {
        name: 'background',
        type: "'default' | 'muted' | 'primary'",
        description: 'Background color',
      },
    ],
    accessibility: ['Renders semantic <section> element for document outline'],
    relatedTokens: ['section.padding'],
  },
  {
    slug: 'wrapper',
    name: 'Wrapper',
    description:
      'Centered max-width container with horizontal padding. Controls content width and provides edge breathing room on small viewports.',
    category: 'layout',
    categoryLabel: 'Layout',
    props: [
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'lg'",
        description: 'Max-width constraint',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'lg'",
        description: 'Horizontal (inline) padding tier',
      },
    ],
    accessibility: ['Renders a plain <div> — no ARIA roles needed'],
    relatedTokens: [
      'wrapper.padding-x.sm',
      'wrapper.padding-x.md',
      'wrapper.padding-x.lg',
      'wrapper.padding-x.xl',
      'wrapper.xs.max-width',
      'wrapper.sm.max-width',
      'wrapper.md.max-width',
      'wrapper.lg.max-width',
      'wrapper.xl.max-width',
    ],
  },

  // --- Form Controls (alphabetical) ---
  {
    slug: 'button',
    name: 'Button',
    description:
      'Triggers actions. Supports primary, secondary, ghost, and danger variants with three sizes.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost'",
        default: "'primary'",
        description: 'Visual style variant',
      },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Shows loading state and disables interaction',
      },
      {
        name: 'toggle',
        type: 'boolean',
        default: 'false',
        description: 'Enables toggle button behavior',
      },
      {
        name: 'pressed',
        type: 'boolean',
        description: 'Controlled pressed state for toggle buttons',
      },
      {
        name: 'iconOnly',
        type: 'boolean',
        default: 'false',
        description: 'Compact padding for icon-only buttons',
      },
    ],
    accessibility: [
      'Uses native <button> element for keyboard and screen reader support',
      'aria-disabled set when loading or disabled',
      'aria-pressed for toggle buttons',
      'aria-busy when loading',
    ],
    relatedTokens: [
      'button.primary',
      'button.secondary',
      'button.ghost',
      'button.sm',
      'button.md',
      'button.lg',
      'button.gap',
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox with label, description, error state, and indeterminate support.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible label text' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'error', type: 'string', description: 'Error message' },
      { name: 'required', type: 'boolean', description: 'Marks as required' },
      { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Visually hides label' },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Shows indeterminate state',
      },
    ],
    accessibility: [
      'Uses native <input type="checkbox"> for full screen reader support',
      'aria-checked="mixed" for indeterminate state',
      'aria-invalid when error is present',
    ],
    relatedTokens: [
      'checkbox.surface',
      'checkbox.on-surface',
      'checkbox.border',
      'checkbox.checked',
      'checkbox.gap',
      'checkbox.label-font-weight',
    ],
  },
  {
    slug: 'input',
    name: 'Input',
    description: 'Text input with built-in label, description, error state, and ARIA wiring.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible label text' },
      { name: 'description', type: 'string', description: 'Helper text below the input' },
      { name: 'error', type: 'string', description: 'Error message (triggers error state)' },
      { name: 'required', type: 'boolean', description: 'Marks the field as required' },
      {
        name: 'hideLabel',
        type: 'boolean',
        default: 'false',
        description: 'Visually hides label (still accessible)',
      },
    ],
    accessibility: [
      'Auto-generated IDs link label, description, and error via aria-labelledby/aria-describedby',
      'aria-invalid set when error is present',
      'aria-required when required',
    ],
    relatedTokens: [
      'input.surface',
      'input.on-surface',
      'input.border',
      'input.focus',
      'input.gap',
      'input.label-font-weight',
    ],
  },
  {
    slug: 'radio',
    name: 'RadioGroup',
    description: 'Radio button group with managed selection, label, and keyboard navigation.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Group label text' },
      { name: 'description', type: 'string', description: 'Helper text for the group' },
      { name: 'error', type: 'string', description: 'Error message' },
      { name: 'required', type: 'boolean', description: 'Marks as required' },
      {
        name: 'hideLabel',
        type: 'boolean',
        default: 'false',
        description: 'Visually hides group label',
      },
      { name: 'name', type: 'string', description: 'Input name (auto-generated if omitted)' },
      { name: 'value', type: 'string', description: 'Controlled selected value' },
      { name: 'defaultValue', type: 'string', description: 'Initial value (uncontrolled)' },
      {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Called when selection changes',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all radios' },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'vertical'",
        description: 'Layout direction',
      },
    ],
    accessibility: [
      'role="radiogroup" with aria-labelledby',
      'Arrow key navigation between options',
      'Tab focuses group, arrows move selection',
      'aria-invalid when error is present',
    ],
    relatedTokens: [
      'radio.surface',
      'radio.on-surface',
      'radio.border',
      'radio.checked',
      'radio.gap',
      'radio.group-label-font-weight',
      'radio.label-font-weight',
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'Custom select dropdown with keyboard navigation, label, and error support.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible label text' },
      {
        name: 'options',
        type: 'SelectOption[]',
        required: true,
        description: 'Array of { value, label, disabled? }',
      },
      { name: 'value', type: 'string', description: 'Controlled selected value' },
      { name: 'defaultValue', type: 'string', description: 'Initial value (uncontrolled)' },
      {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Called when selection changes',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Select an option'",
        description: 'Placeholder text',
      },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'error', type: 'string', description: 'Error message' },
      { name: 'required', type: 'boolean', description: 'Marks as required' },
      { name: 'disabled', type: 'boolean', description: 'Disables the select' },
      { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Visually hides label' },
    ],
    accessibility: [
      'role="combobox" on trigger with aria-expanded, aria-haspopup',
      'role="listbox" on dropdown with aria-activedescendant',
      'Full keyboard support: Arrow keys, Enter, Escape, Home, End',
      'Type-ahead character matching',
    ],
    relatedTokens: [
      'select.surface',
      'select.on-surface',
      'select.border',
      'select.gap',
      'select.trigger-gap',
      'select.label-font-weight',
      'select.listbox-margin-top',
      'select.option-margin-x',
    ],
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input with label, description, error state, and resize control.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible label text' },
      { name: 'description', type: 'string', description: 'Helper text below the textarea' },
      { name: 'error', type: 'string', description: 'Error message (triggers error state)' },
      { name: 'required', type: 'boolean', description: 'Marks the field as required' },
      {
        name: 'hideLabel',
        type: 'boolean',
        default: 'false',
        description: 'Visually hides label (still accessible)',
      },
      {
        name: 'resize',
        type: "'none' | 'vertical' | 'horizontal' | 'both'",
        default: "'vertical'",
        description: 'Resize behavior',
      },
    ],
    accessibility: [
      'Auto-generated IDs link label, description, and error via ARIA attributes',
      'aria-invalid set when error is present',
      'aria-required when required',
    ],
    relatedTokens: [
      'textarea.surface',
      'textarea.on-surface',
      'textarea.border',
      'textarea.gap',
      'textarea.label-font-weight',
    ],
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'On/off switch with label, description, and two sizes.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible label text' },
      { name: 'description', type: 'string', description: 'Helper text' },
      { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
      {
        name: 'defaultChecked',
        type: 'boolean',
        default: 'false',
        description: 'Initial state (uncontrolled)',
      },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when toggled' },
      { name: 'disabled', type: 'boolean', description: 'Disables the toggle' },
      { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Visually hides label' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Toggle size' },
    ],
    accessibility: [
      'role="switch" with aria-checked',
      'Keyboard: Space to toggle',
      'Label linked via aria-labelledby',
    ],
    relatedTokens: [
      'toggle.surface',
      'toggle.on-surface',
      'toggle.checked',
      'toggle.gap',
      'toggle.label-font-weight',
    ],
  },

  // --- Data Display (alphabetical) ---
  {
    slug: 'avatar',
    name: 'Avatar',
    description: 'User or entity avatar with image, initials fallback, and size variants.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      { name: 'src', type: 'string', description: 'Image URL' },
      { name: 'alt', type: 'string', description: 'Image alt text' },
      { name: 'initials', type: 'string', description: 'Fallback initials when no image' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Avatar size' },
      {
        name: 'variant',
        type: "'neutral' | 'primary'",
        default: "'neutral'",
        description: 'Background color variant for initials',
      },
    ],
    accessibility: [
      'Uses role="img" with aria-label for initials fallback',
      'Image alt text passed through to <img>',
    ],
    relatedTokens: ['avatar.surface', 'avatar.on-surface', 'avatar.sm', 'avatar.md', 'avatar.lg'],
  },
  {
    slug: 'badge',
    name: 'Badge',
    description: 'Inline label for status, category, or count. Five variants, three sizes.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      {
        name: 'variant',
        type: "'neutral' | 'success' | 'warning' | 'danger' | 'info'",
        default: "'neutral'",
        description: 'Color variant',
      },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Badge size' },
      {
        name: 'live',
        type: 'boolean',
        default: 'false',
        description: 'Announces content changes to screen readers via aria-live',
      },
    ],
    accessibility: [
      'Uses <span> with appropriate role when needed',
      'aria-live="polite" when live prop is true',
    ],
    relatedTokens: [
      'badge.neutral',
      'badge.info',
      'badge.success',
      'badge.warning',
      'badge.danger',
    ],
  },
  {
    slug: 'box',
    name: 'Box',
    description:
      'Presentational container with elevation, radius, and padding. For backgrounds, borders, and visual grouping.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      { name: 'elevation', type: '0 | 1 | 2 | 3', default: '1', description: 'Shadow depth level' },
      {
        name: 'radius',
        type: "'none' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Border radius',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Inner padding',
      },
    ],
    accessibility: ['Renders a plain <div> — consumers add roles as needed'],
    relatedTokens: [
      'box.surface',
      'box.border',
      'box.border-width',
      'box.elevation',
      'box.radius',
      'box.padding',
    ],
  },
  {
    slug: 'rating',
    name: 'Rating',
    description:
      'Read-only star rating display. Renders filled, half-filled, and empty stars with token-driven colors and three sizes.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      { name: 'value', type: 'number', required: true, description: 'Rating score (e.g. 3, 4.5)' },
      { name: 'max', type: 'number', default: '5', description: 'Total number of stars' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size' },
      {
        name: 'label',
        type: 'string',
        description: 'Custom aria-label (defaults to "{value} out of {max}")',
      },
    ],
    accessibility: [
      'role="img" with auto-generated aria-label',
      'Individual stars are aria-hidden — the container conveys meaning',
    ],
    relatedTokens: [
      'rating.color.filled',
      'rating.color.empty',
      'rating.gap',
      'rating.sm.size',
      'rating.md.size',
      'rating.lg.size',
    ],
  },
  {
    slug: 'heading',
    name: 'Heading',
    description: 'Heading levels 1–6 with optional display sizes for visual hierarchy.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      {
        name: 'level',
        type: '1 | 2 | 3 | 4 | 5 | 6',
        required: true,
        description: 'Semantic heading level (h1–h6)',
      },
      {
        name: 'as',
        type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
        description: 'Override the rendered HTML tag',
      },
      {
        name: 'display',
        type: "boolean | 'sm' | 'md' | 'lg'",
        description: 'Display font size override',
      },
    ],
    accessibility: [
      'Renders correct <h1>–<h6> element for document outline',
      'Visual size can be decoupled from semantic level via as prop',
    ],
    relatedTokens: ['heading.font-weight', 'heading.letter-spacing', 'display.font-family'],
  },
  {
    slug: 'separator',
    name: 'Separator',
    description: 'Horizontal or vertical line to divide content sections.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Line direction',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'false',
        description: 'When true, hides from screen readers',
      },
    ],
    accessibility: ['role="separator" with aria-orientation', 'aria-hidden when decorative'],
    relatedTokens: ['separator.color', 'separator.width'],
  },
  {
    slug: 'table',
    name: 'Table',
    description:
      'Compound table component with caption, sortable headers, striped rows, and dense mode.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      { name: 'striped', type: 'boolean', description: 'Enables alternating row backgrounds' },
      {
        name: 'dense',
        type: 'boolean',
        description: 'Reduces cell padding for data-dense layouts',
      },
    ],
    accessibility: [
      'Semantic <table>, <thead>, <tbody>, <tr>, <th>, <td> elements',
      'aria-sort on sortable headers',
      'scope="col" on <th> elements',
    ],
    relatedTokens: ['table.surface', 'table.on-surface', 'table.border', 'table.header'],
  },
  {
    slug: 'text',
    name: 'Text',
    description: 'Body text primitive. Renders paragraphs, spans, labels, and other inline text.',
    category: 'data',
    categoryLabel: 'Data Display',
    props: [
      {
        name: 'as',
        type: "'p' | 'span' | 'label' | 'small' | 'strong' | 'em' | 'div'",
        default: "'p'",
        description: 'HTML element to render',
      },
      { name: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Font size' },
      { name: 'muted', type: 'boolean', default: 'false', description: 'Uses muted text color' },
    ],
    accessibility: [
      'Renders semantic HTML elements',
      'Muted text maintains WCAG AA contrast ratio',
    ],
    relatedTokens: [
      'text.font-family',
      'text.font-size-sm',
      'text.font-size-base',
      'text.font-size-lg',
    ],
  },

  // --- Form Controls (continued) ---
  {
    slug: 'slider',
    name: 'Slider',
    description:
      'Range slider with keyboard, pointer drag, and full ARIA support. Horizontal or vertical orientation.',
    category: 'form',
    categoryLabel: 'Form Controls',
    props: [
      { name: 'value', type: 'number', description: 'Controlled value' },
      {
        name: 'defaultValue',
        type: 'number',
        default: '0',
        description: 'Initial value (uncontrolled)',
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        description: 'Called when value changes',
      },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Slider direction',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider' },
      { name: 'label', type: 'string', description: 'Accessible label for the slider thumb' },
    ],
    accessibility: [
      'role="slider" on thumb element',
      'aria-valuenow, aria-valuemin, aria-valuemax',
      'Arrow keys for step changes, PageUp/PageDown for large steps, Home/End for min/max',
      'aria-orientation for vertical sliders',
    ],
    relatedTokens: ['slider.track', 'slider.fill', 'slider.thumb'],
  },

  // --- Feedback (alphabetical) ---
  {
    slug: 'alert',
    name: 'Alert',
    description:
      'Thin accessibility wrapper with role="alert", variant colours, and custom colour support. Layout is composed freely via children.',
    category: 'feedback',
    categoryLabel: 'Feedback',
    props: [
      {
        name: 'variant',
        type: "'info' | 'success' | 'warning' | 'danger'",
        description: 'Alert style variant',
      },
      {
        name: 'surface',
        type: 'string',
        description: 'Custom background colour (sets variant to custom)',
      },
      {
        name: 'onSurface',
        type: 'string',
        description: 'Custom text colour (sets variant to custom)',
      },
      {
        name: 'border',
        type: 'string',
        description: 'Custom border colour (sets variant to custom)',
      },
    ],
    accessibility: ['role="alert" for screen reader announcement'],
    relatedTokens: ['alert.info', 'alert.success', 'alert.warning', 'alert.danger'],
  },
  {
    slug: 'progress',
    name: 'Progress',
    description: 'Determinate or indeterminate progress bar with label and three sizes.',
    category: 'feedback',
    categoryLabel: 'Feedback',
    props: [
      { name: 'value', type: 'number', description: 'Current progress (omit for indeterminate)' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar height' },
      { name: 'label', type: 'string', description: 'Accessible label for the progress bar' },
    ],
    accessibility: [
      'role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax',
      'aria-label from label prop',
      'Indeterminate when value is undefined',
    ],
    relatedTokens: ['progress.surface', 'progress.on-surface', 'progress.indicator'],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Loading placeholder in text, heading, circular, or rectangular shapes.',
    category: 'feedback',
    categoryLabel: 'Feedback',
    props: [
      {
        name: 'variant',
        type: "'text' | 'circular' | 'rectangular'",
        default: "'text'",
        description: 'Shape variant',
      },
      { name: 'width', type: 'string | number', description: 'Custom width (number = px)' },
      { name: 'height', type: 'string | number', description: 'Custom height (number = px)' },
    ],
    accessibility: ['aria-hidden="true" — content is decorative', 'role="presentation"'],
    relatedTokens: ['skeleton.surface'],
  },

  {
    slug: 'toast',
    name: 'Toast',
    description:
      'Notification toast system with stacking, auto-dismiss, pause on hover, and variant-based roles.',
    category: 'feedback',
    categoryLabel: 'Feedback',
    props: [
      {
        name: 'position',
        type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        default: "'top-right'",
        description: 'Container position (on ToastProvider)',
      },
      {
        name: 'maxToasts',
        type: 'number',
        default: '5',
        description: 'Maximum visible toasts (on ToastProvider)',
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: 'Toast message (in toast() options)',
      },
      { name: 'description', type: 'string', description: 'Secondary text (in toast() options)' },
      {
        name: 'variant',
        type: "'info' | 'success' | 'warning' | 'danger'",
        default: "'info'",
        description: 'Toast color variant (in toast() options)',
      },
      {
        name: 'duration',
        type: 'number',
        default: '5000',
        description: 'Auto-dismiss delay in ms. 0 = persistent (in toast() options)',
      },
    ],
    accessibility: [
      'Container: role="region" with aria-label="Notifications" and aria-live="polite"',
      'Info/success toasts: role="status"',
      'Warning/danger toasts: role="alert"',
      'Dismiss button: aria-label="Dismiss notification"',
      'Timers pause on hover for reading time',
    ],
    relatedTokens: [
      'toast.z-index',
      'toast.radius',
      'toast.shadow',
      'toast.info',
      'toast.success',
      'toast.warning',
      'toast.danger',
    ],
  },

  // --- Overlay (alphabetical) ---
  {
    slug: 'dialog',
    name: 'Dialog',
    description: 'Modal dialog with backdrop, focus trapping, and escape-to-close.',
    category: 'overlay',
    categoryLabel: 'Overlay',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controls dialog visibility' },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Called when dialog should close',
      },
      {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        default: 'true',
        description: 'Close when clicking outside',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Close when pressing Escape',
      },
    ],
    accessibility: [
      'role="dialog" with aria-modal="true"',
      'Focus trap keeps focus within dialog',
      'Body scroll lock while open',
      'Returns focus to trigger on close',
      'Renders via portal to escape stacking contexts',
    ],
    relatedTokens: ['dialog.surface', 'dialog.border', 'dialog.backdrop'],
  },
  {
    slug: 'dropdown-menu',
    name: 'DropdownMenu',
    description:
      'Action menu with items, labels, separators, and keyboard navigation. Compound component.',
    category: 'overlay',
    categoryLabel: 'Overlay',
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state' },
      {
        name: 'defaultOpen',
        type: 'boolean',
        default: 'false',
        description: 'Initial state (uncontrolled)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Called when open state changes',
      },
      {
        name: 'anchor',
        type: 'Anchor',
        default: "'bottom'",
        description: 'Position and alignment relative to trigger (e.g. bottom-right)',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description:
          'On DropdownMenuTrigger — merges trigger props onto the child element. On DropdownMenuItem — merges menuitem props onto the child (e.g. <a> for navigation links)',
      },
      {
        name: 'onSelect',
        type: '() => void',
        description: 'On DropdownMenuItem — called when the item is selected',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'On DropdownMenuItem — disables the item and skips it in keyboard navigation',
      },
    ],
    accessibility: [
      'role="menu" with role="menuitem" on items',
      'Arrow key navigation through items',
      'Enter/Space to select, Escape to close',
      'aria-expanded on trigger',
    ],
    relatedTokens: [
      'dropdown.surface',
      'dropdown.on-surface',
      'dropdown.border',
      'dropdown.item-margin-x',
    ],
  },
  {
    slug: 'popover',
    name: 'Popover',
    description:
      'Floating content panel triggered by a button. Compound component with Trigger and Content.',
    category: 'overlay',
    categoryLabel: 'Overlay',
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state' },
      {
        name: 'defaultOpen',
        type: 'boolean',
        default: 'false',
        description: 'Initial state (uncontrolled)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Called when open state changes',
      },
      {
        name: 'anchor',
        type: 'Anchor',
        default: "'bottom'",
        description: 'Position and alignment relative to trigger (e.g. bottom-center)',
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description:
          'On PopoverTrigger — merges trigger props onto the child element instead of rendering a wrapping <button>',
      },
      {
        name: 'maxWidth',
        type: 'string',
        description:
          'On PopoverContent — overrides the default max-width (CSS value, e.g. "var(--layout-80)")',
      },
    ],
    accessibility: [
      'Trigger gets aria-expanded and aria-haspopup',
      'Content has role and aria-labelledby',
      'Escape closes the popover',
      'Click outside dismisses',
    ],
    relatedTokens: ['popover.surface', 'popover.on-surface', 'popover.border'],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'Floating label that appears on hover or focus. Multiple anchor options.',
    category: 'overlay',
    categoryLabel: 'Overlay',
    props: [
      { name: 'content', type: 'ReactNode', required: true, description: 'Tooltip content' },
      {
        name: 'anchor',
        type: 'Anchor',
        default: "'top'",
        description: 'Position and alignment relative to trigger (e.g. top-center)',
      },
      { name: 'open', type: 'boolean', description: 'Controlled open state' },
      {
        name: 'maxWidth',
        type: 'string',
        description: 'Overrides the default max-width (CSS value, e.g. "256px")',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Called when open state changes',
      },
    ],
    accessibility: [
      'role="tooltip" with unique ID',
      'Trigger gets aria-describedby pointing to tooltip',
      'Shows on focus and hover, hides on Escape',
    ],
    relatedTokens: ['tooltip.surface', 'tooltip.on-surface', 'tooltip.border'],
  },

  {
    slug: 'drawer',
    name: 'Drawer',
    description:
      'Slide-out panel from any edge. Focus trap, scroll lock, and backdrop. Uses the dialog machine internally.',
    category: 'overlay',
    categoryLabel: 'Overlay',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controls drawer visibility' },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Called when drawer should close',
      },
      {
        name: 'anchor',
        type: "'left' | 'right' | 'top' | 'bottom'",
        default: "'right'",
        description: 'Edge the drawer slides from',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Width (horizontal anchors) or height (vertical anchors)',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Close when pressing Escape',
      },
      {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        default: 'true',
        description: 'Close when clicking backdrop',
      },
    ],
    accessibility: [
      'role="dialog" with aria-modal="true"',
      'Focus trap keeps focus within drawer',
      'Body scroll lock while open',
      'Returns focus to trigger on close',
      'Renders via portal with sibling backdrop',
    ],
    relatedTokens: [
      'drawer.backdrop',
      'drawer.surface',
      'drawer.shadow',
      'drawer.width',
      'drawer.height',
    ],
  },

  // --- Navigation (alphabetical) ---
  {
    slug: 'accordion',
    name: 'Accordion',
    description:
      'Collapsible content sections. Single or multiple mode. Compound component with Item, Trigger, and Panel.',
    category: 'navigation',
    categoryLabel: 'Navigation',
    props: [
      {
        name: 'type',
        type: "'single' | 'multiple'",
        default: "'single'",
        description: 'Allow one or many items open at once',
      },
      { name: 'value', type: 'string | string[]', description: 'Controlled expanded value(s)' },
      {
        name: 'defaultValue',
        type: 'string | string[]',
        description: 'Initial expanded value(s) (uncontrolled)',
      },
      {
        name: 'onChange',
        type: '(value: string | string[]) => void',
        description: 'Called when expansion changes',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'true',
        description: 'Allow collapsing the last open item in single mode',
      },
    ],
    accessibility: [
      'Trigger: <button> with aria-expanded and aria-controls',
      'Panel: role="region" with aria-labelledby',
      'Enter/Space toggle (native button behavior)',
      'data-state="open"|"closed" on items',
    ],
    relatedTokens: [
      'accordion.border-color',
      'accordion.trigger',
      'accordion.panel',
      'accordion.indicator',
    ],
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation breadcrumb trail with customizable separator.',
    category: 'navigation',
    categoryLabel: 'Navigation',
    props: [
      {
        name: 'label',
        type: 'string',
        default: "'Breadcrumb'",
        description: 'aria-label for the nav element',
      },
      {
        name: 'separator',
        type: 'ReactNode',
        default: "'/'",
        description: 'Separator between items',
      },
    ],
    accessibility: [
      'Wraps in <nav> with aria-label',
      'Current page item gets aria-current="page"',
      'Separator is aria-hidden',
    ],
    relatedTokens: ['breadcrumb.on-surface', 'breadcrumb.separator'],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Page navigation with prev/next, page buttons, and ellipsis. Purely controlled.',
    category: 'navigation',
    categoryLabel: 'Navigation',
    props: [
      { name: 'page', type: 'number', required: true, description: 'Current page number' },
      { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages' },
      {
        name: 'onPageChange',
        type: '(page: number) => void',
        required: true,
        description: 'Called when page changes',
      },
      {
        name: 'siblingCount',
        type: 'number',
        default: '1',
        description: 'Number of sibling pages around current',
      },
      {
        name: 'boundaryCount',
        type: 'number',
        default: '1',
        description: 'Number of pages at start/end',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Pagination'",
        description: 'aria-label for the nav element',
      },
    ],
    accessibility: [
      '<nav> landmark with aria-label',
      'aria-current="page" on current page button',
      'aria-label on all page buttons ("Go to page N")',
      'Prev/next disabled at boundaries',
      'Ellipsis hidden from screen readers (aria-hidden)',
    ],
    relatedTokens: [
      'pagination.gap',
      'pagination.item',
      'pagination.surface',
      'pagination.on-surface',
      'pagination.border',
    ],
  },
  {
    slug: 'link',
    name: 'Link',
    description:
      'Anchor element with inline and standalone variants, size options, and external link support.',
    category: 'navigation',
    categoryLabel: 'Navigation',
    props: [
      {
        name: 'variant',
        type: "'inline' | 'standalone'",
        default: "'inline'",
        description: 'Visual style — inline has underline, standalone does not',
      },
      { name: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Font size' },
      {
        name: 'external',
        type: 'boolean',
        default: 'false',
        description: 'Adds target="_blank" and rel="noopener noreferrer"',
      },
    ],
    accessibility: [
      'Renders native <a> element for full screen reader and keyboard support',
      'Focus ring on :focus-visible',
      'External links open in new tab with noopener noreferrer',
    ],
    relatedTokens: [
      'link.color.default',
      'link.color.hover',
      'link.color.active',
      'link.font-weight',
    ],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    description:
      'Tabbed interface with keyboard navigation. Compound component with TabList, Tab, and TabPanel.',
    category: 'navigation',
    categoryLabel: 'Navigation',
    props: [
      { name: 'value', type: 'string', description: 'Controlled active tab value' },
      { name: 'defaultValue', type: 'string', description: 'Initial active tab (uncontrolled)' },
      {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Called when active tab changes',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Tab layout direction',
      },
    ],
    accessibility: [
      'role="tablist", role="tab", role="tabpanel"',
      'aria-selected on active tab',
      'Arrow key navigation between tabs',
      'Tab panels linked via aria-labelledby',
    ],
    relatedTokens: ['tabs.surface', 'tabs.on-surface', 'tabs.border', 'tabs.indicator'],
  },

  // --- Utility (alphabetical) ---
  {
    slug: 'icon',
    name: 'Icon',
    description: 'Wrapper for SVG icons with standardized sizing and accessibility attributes.',
    category: 'utility',
    categoryLabel: 'Utility',
    props: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Icon size (16px, 20px, 24px)',
      },
      {
        name: 'label',
        type: 'string',
        description:
          'Accessible label — sets role="img" and aria-label. If absent, icon is aria-hidden.',
      },
    ],
    accessibility: [
      'aria-hidden="true" when no label (decorative icon)',
      'role="img" with aria-label when label provided (meaningful icon)',
      'Child SVG inherits size from wrapper',
    ],
    relatedTokens: ['icon.size.sm', 'icon.size.md', 'icon.size.lg'],
  },
  {
    slug: 'visually-hidden',
    name: 'VisuallyHidden',
    description: 'Hides content visually while keeping it accessible to screen readers.',
    category: 'utility',
    categoryLabel: 'Utility',
    props: [
      { name: 'as', type: 'string', default: "'span'", description: 'HTML element to render' },
    ],
    accessibility: [
      'Content remains in the accessibility tree',
      'Uses CSS clip technique for reliable hiding',
      'Essential for skip links, icon-only button labels, and live regions',
    ],
    relatedTokens: [],
  },
];

export const COMPONENT_SLUGS = COMPONENTS.map((c) => c.slug);
