/* Grid responsive — mobile-first progressive column collapse */
/* Generated from grid.responsive.css.tpl at build time */

/* Base: fixed-column grids (3+) collapse to single column on small screens.
   2-column grids are already mobile-friendly and keep their columns. */
.tcn-grid[data-columns='3'],
.tcn-grid[data-columns='4'],
.tcn-grid[data-columns='5'],
.tcn-grid[data-columns='6'],
.tcn-grid[data-columns='7'],
.tcn-grid[data-columns='8'],
.tcn-grid[data-columns='9'],
.tcn-grid[data-columns='10'],
.tcn-grid[data-columns='11'],
.tcn-grid[data-columns='12'] {
  grid-template-columns: 1fr;
}

/* sm: 3+ columns get 2-col layout (2-col already has 2 from base) */
@media (min-width: @[breakpoint.sm]) {
  .tcn-grid[data-columns='3'],
  .tcn-grid[data-columns='4'],
  .tcn-grid[data-columns='5'],
  .tcn-grid[data-columns='6'],
  .tcn-grid[data-columns='7'],
  .tcn-grid[data-columns='8'],
  .tcn-grid[data-columns='9'],
  .tcn-grid[data-columns='10'],
  .tcn-grid[data-columns='11'],
  .tcn-grid[data-columns='12'] {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* md: 3+ columns get up to 4-col layout */
@media (min-width: @[breakpoint.md]) {
  .tcn-grid[data-columns='3'] {
    grid-template-columns: repeat(3, 1fr);
  }

  .tcn-grid[data-columns='4'],
  .tcn-grid[data-columns='5'],
  .tcn-grid[data-columns='6'],
  .tcn-grid[data-columns='7'],
  .tcn-grid[data-columns='8'],
  .tcn-grid[data-columns='9'],
  .tcn-grid[data-columns='10'],
  .tcn-grid[data-columns='11'],
  .tcn-grid[data-columns='12'] {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* lg: all grids get their full column count */
@media (min-width: @[breakpoint.lg]) {
  .tcn-grid[data-columns='4'] {
    grid-template-columns: repeat(4, 1fr);
  }

  .tcn-grid[data-columns='5'] {
    grid-template-columns: repeat(5, 1fr);
  }

  .tcn-grid[data-columns='6'] {
    grid-template-columns: repeat(6, 1fr);
  }

  .tcn-grid[data-columns='7'] {
    grid-template-columns: repeat(7, 1fr);
  }

  .tcn-grid[data-columns='8'] {
    grid-template-columns: repeat(8, 1fr);
  }

  .tcn-grid[data-columns='9'] {
    grid-template-columns: repeat(9, 1fr);
  }

  .tcn-grid[data-columns='10'] {
    grid-template-columns: repeat(10, 1fr);
  }

  .tcn-grid[data-columns='11'] {
    grid-template-columns: repeat(11, 1fr);
  }

  .tcn-grid[data-columns='12'] {
    grid-template-columns: repeat(12, 1fr);
  }
}

/* ============================================================
   Explicit responsive overrides (data-columns-{bp}, data-gap-{bp})
   These come AFTER the auto-collapse rules so they win at same specificity.
   ============================================================ */

/* --- sm --- */
@media (min-width: @[breakpoint.sm]) {
  .tcn-grid[data-columns-sm='1']    { grid-template-columns: 1fr; }
  .tcn-grid[data-columns-sm='2']    { grid-template-columns: repeat(2, 1fr); }
  .tcn-grid[data-columns-sm='3']    { grid-template-columns: repeat(3, 1fr); }
  .tcn-grid[data-columns-sm='4']    { grid-template-columns: repeat(4, 1fr); }
  .tcn-grid[data-columns-sm='5']    { grid-template-columns: repeat(5, 1fr); }
  .tcn-grid[data-columns-sm='6']    { grid-template-columns: repeat(6, 1fr); }
  .tcn-grid[data-columns-sm='7']    { grid-template-columns: repeat(7, 1fr); }
  .tcn-grid[data-columns-sm='8']    { grid-template-columns: repeat(8, 1fr); }
  .tcn-grid[data-columns-sm='9']    { grid-template-columns: repeat(9, 1fr); }
  .tcn-grid[data-columns-sm='10']   { grid-template-columns: repeat(10, 1fr); }
  .tcn-grid[data-columns-sm='11']   { grid-template-columns: repeat(11, 1fr); }
  .tcn-grid[data-columns-sm='12']   { grid-template-columns: repeat(12, 1fr); }
  .tcn-grid[data-columns-sm='auto'] {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--tcn-grid-min-item-size, var(--grid-min-item-size)), 100%), 1fr));
  }

  .tcn-grid[data-gap-sm='0']  { gap: var(--scale-0); }
  .tcn-grid[data-gap-sm='1']  { gap: var(--scale-1); }
  .tcn-grid[data-gap-sm='2']  { gap: var(--scale-2); }
  .tcn-grid[data-gap-sm='3']  { gap: var(--scale-3); }
  .tcn-grid[data-gap-sm='4']  { gap: var(--scale-4); }
  .tcn-grid[data-gap-sm='5']  { gap: var(--scale-5); }
  .tcn-grid[data-gap-sm='6']  { gap: var(--scale-6); }
  .tcn-grid[data-gap-sm='8']  { gap: var(--scale-8); }
  .tcn-grid[data-gap-sm='10'] { gap: var(--scale-10); }
  .tcn-grid[data-gap-sm='12'] { gap: var(--scale-12); }
  .tcn-grid[data-gap-sm='16'] { gap: var(--scale-16); }

  .tcn-grid[data-align-sm='start'] { align-items: start; }
  .tcn-grid[data-align-sm='center'] { align-items: center; }
  .tcn-grid[data-align-sm='end'] { align-items: end; }
  .tcn-grid[data-align-sm='stretch'] { align-items: stretch; }
  .tcn-grid[data-align-sm='baseline'] { align-items: baseline; }
}

/* --- md --- */
@media (min-width: @[breakpoint.md]) {
  .tcn-grid[data-columns-md='1']    { grid-template-columns: 1fr; }
  .tcn-grid[data-columns-md='2']    { grid-template-columns: repeat(2, 1fr); }
  .tcn-grid[data-columns-md='3']    { grid-template-columns: repeat(3, 1fr); }
  .tcn-grid[data-columns-md='4']    { grid-template-columns: repeat(4, 1fr); }
  .tcn-grid[data-columns-md='5']    { grid-template-columns: repeat(5, 1fr); }
  .tcn-grid[data-columns-md='6']    { grid-template-columns: repeat(6, 1fr); }
  .tcn-grid[data-columns-md='7']    { grid-template-columns: repeat(7, 1fr); }
  .tcn-grid[data-columns-md='8']    { grid-template-columns: repeat(8, 1fr); }
  .tcn-grid[data-columns-md='9']    { grid-template-columns: repeat(9, 1fr); }
  .tcn-grid[data-columns-md='10']   { grid-template-columns: repeat(10, 1fr); }
  .tcn-grid[data-columns-md='11']   { grid-template-columns: repeat(11, 1fr); }
  .tcn-grid[data-columns-md='12']   { grid-template-columns: repeat(12, 1fr); }
  .tcn-grid[data-columns-md='auto'] {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--tcn-grid-min-item-size, var(--grid-min-item-size)), 100%), 1fr));
  }

  .tcn-grid[data-gap-md='0']  { gap: var(--scale-0); }
  .tcn-grid[data-gap-md='1']  { gap: var(--scale-1); }
  .tcn-grid[data-gap-md='2']  { gap: var(--scale-2); }
  .tcn-grid[data-gap-md='3']  { gap: var(--scale-3); }
  .tcn-grid[data-gap-md='4']  { gap: var(--scale-4); }
  .tcn-grid[data-gap-md='5']  { gap: var(--scale-5); }
  .tcn-grid[data-gap-md='6']  { gap: var(--scale-6); }
  .tcn-grid[data-gap-md='8']  { gap: var(--scale-8); }
  .tcn-grid[data-gap-md='10'] { gap: var(--scale-10); }
  .tcn-grid[data-gap-md='12'] { gap: var(--scale-12); }
  .tcn-grid[data-gap-md='16'] { gap: var(--scale-16); }

  .tcn-grid[data-align-md='start'] { align-items: start; }
  .tcn-grid[data-align-md='center'] { align-items: center; }
  .tcn-grid[data-align-md='end'] { align-items: end; }
  .tcn-grid[data-align-md='stretch'] { align-items: stretch; }
  .tcn-grid[data-align-md='baseline'] { align-items: baseline; }
}

/* --- lg --- */
@media (min-width: @[breakpoint.lg]) {
  .tcn-grid[data-columns-lg='1']    { grid-template-columns: 1fr; }
  .tcn-grid[data-columns-lg='2']    { grid-template-columns: repeat(2, 1fr); }
  .tcn-grid[data-columns-lg='3']    { grid-template-columns: repeat(3, 1fr); }
  .tcn-grid[data-columns-lg='4']    { grid-template-columns: repeat(4, 1fr); }
  .tcn-grid[data-columns-lg='5']    { grid-template-columns: repeat(5, 1fr); }
  .tcn-grid[data-columns-lg='6']    { grid-template-columns: repeat(6, 1fr); }
  .tcn-grid[data-columns-lg='7']    { grid-template-columns: repeat(7, 1fr); }
  .tcn-grid[data-columns-lg='8']    { grid-template-columns: repeat(8, 1fr); }
  .tcn-grid[data-columns-lg='9']    { grid-template-columns: repeat(9, 1fr); }
  .tcn-grid[data-columns-lg='10']   { grid-template-columns: repeat(10, 1fr); }
  .tcn-grid[data-columns-lg='11']   { grid-template-columns: repeat(11, 1fr); }
  .tcn-grid[data-columns-lg='12']   { grid-template-columns: repeat(12, 1fr); }
  .tcn-grid[data-columns-lg='auto'] {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--tcn-grid-min-item-size, var(--grid-min-item-size)), 100%), 1fr));
  }

  .tcn-grid[data-gap-lg='0']  { gap: var(--scale-0); }
  .tcn-grid[data-gap-lg='1']  { gap: var(--scale-1); }
  .tcn-grid[data-gap-lg='2']  { gap: var(--scale-2); }
  .tcn-grid[data-gap-lg='3']  { gap: var(--scale-3); }
  .tcn-grid[data-gap-lg='4']  { gap: var(--scale-4); }
  .tcn-grid[data-gap-lg='5']  { gap: var(--scale-5); }
  .tcn-grid[data-gap-lg='6']  { gap: var(--scale-6); }
  .tcn-grid[data-gap-lg='8']  { gap: var(--scale-8); }
  .tcn-grid[data-gap-lg='10'] { gap: var(--scale-10); }
  .tcn-grid[data-gap-lg='12'] { gap: var(--scale-12); }
  .tcn-grid[data-gap-lg='16'] { gap: var(--scale-16); }

  .tcn-grid[data-align-lg='start'] { align-items: start; }
  .tcn-grid[data-align-lg='center'] { align-items: center; }
  .tcn-grid[data-align-lg='end'] { align-items: end; }
  .tcn-grid[data-align-lg='stretch'] { align-items: stretch; }
  .tcn-grid[data-align-lg='baseline'] { align-items: baseline; }
}

/* --- xl --- */
@media (min-width: @[breakpoint.xl]) {
  .tcn-grid[data-columns-xl='1']    { grid-template-columns: 1fr; }
  .tcn-grid[data-columns-xl='2']    { grid-template-columns: repeat(2, 1fr); }
  .tcn-grid[data-columns-xl='3']    { grid-template-columns: repeat(3, 1fr); }
  .tcn-grid[data-columns-xl='4']    { grid-template-columns: repeat(4, 1fr); }
  .tcn-grid[data-columns-xl='5']    { grid-template-columns: repeat(5, 1fr); }
  .tcn-grid[data-columns-xl='6']    { grid-template-columns: repeat(6, 1fr); }
  .tcn-grid[data-columns-xl='7']    { grid-template-columns: repeat(7, 1fr); }
  .tcn-grid[data-columns-xl='8']    { grid-template-columns: repeat(8, 1fr); }
  .tcn-grid[data-columns-xl='9']    { grid-template-columns: repeat(9, 1fr); }
  .tcn-grid[data-columns-xl='10']   { grid-template-columns: repeat(10, 1fr); }
  .tcn-grid[data-columns-xl='11']   { grid-template-columns: repeat(11, 1fr); }
  .tcn-grid[data-columns-xl='12']   { grid-template-columns: repeat(12, 1fr); }
  .tcn-grid[data-columns-xl='auto'] {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--tcn-grid-min-item-size, var(--grid-min-item-size)), 100%), 1fr));
  }

  .tcn-grid[data-gap-xl='0']  { gap: var(--scale-0); }
  .tcn-grid[data-gap-xl='1']  { gap: var(--scale-1); }
  .tcn-grid[data-gap-xl='2']  { gap: var(--scale-2); }
  .tcn-grid[data-gap-xl='3']  { gap: var(--scale-3); }
  .tcn-grid[data-gap-xl='4']  { gap: var(--scale-4); }
  .tcn-grid[data-gap-xl='5']  { gap: var(--scale-5); }
  .tcn-grid[data-gap-xl='6']  { gap: var(--scale-6); }
  .tcn-grid[data-gap-xl='8']  { gap: var(--scale-8); }
  .tcn-grid[data-gap-xl='10'] { gap: var(--scale-10); }
  .tcn-grid[data-gap-xl='12'] { gap: var(--scale-12); }
  .tcn-grid[data-gap-xl='16'] { gap: var(--scale-16); }

  .tcn-grid[data-align-xl='start'] { align-items: start; }
  .tcn-grid[data-align-xl='center'] { align-items: center; }
  .tcn-grid[data-align-xl='end'] { align-items: end; }
  .tcn-grid[data-align-xl='stretch'] { align-items: stretch; }
  .tcn-grid[data-align-xl='baseline'] { align-items: baseline; }
}
