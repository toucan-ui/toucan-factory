import { forwardRef } from 'react';
import { cn, Wrapper, FlexItem } from '@toucan-ui/core';
import type { WrapperSize } from '@toucan-ui/core';

type NavBarGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  logo: React.ReactNode;
  /** Desktop navigation links. Hidden on mobile. */
  links?: React.ReactNode;
  /** Desktop trailing actions (e.g. theme toggle). Hidden on mobile. */
  actions?: React.ReactNode;
  /** Mobile-only actions (e.g. burger menu). Hidden on desktop. */
  mobileActions?: React.ReactNode;
  size?: WrapperSize;
  /** Gap between navigation link items. Maps to the spacing scale. */
  gap?: NavBarGap;
}

export const NavBar = forwardRef<HTMLElement, NavBarProps>(function NavBar(
  { logo, links, actions, mobileActions, size = 'lg', gap, className, style, ...props },
  ref,
) {
  const navStyle =
    gap != null
      ? ({ ...style, '--tcn-nav-bar-link-gap': `var(--scale-${gap})` } as React.CSSProperties)
      : style;

  return (
    <header ref={ref} className={cn('tcn-nav-bar', className)} style={navStyle} {...props}>
      <Wrapper size={size}>
        <nav className="tcn-nav-bar-inner" aria-label="Main">
          <FlexItem grow className="tcn-nav-bar-start">
            <div className="tcn-nav-bar-logo">{logo}</div>
            {links && <div className="tcn-nav-bar-links tcn-nav-bar-desktop">{links}</div>}
          </FlexItem>
          <FlexItem shrink={false} className="tcn-nav-bar-end">
            {actions && <div className="tcn-nav-bar-actions tcn-nav-bar-desktop">{actions}</div>}
            {mobileActions && (
              <div className="tcn-nav-bar-actions tcn-nav-bar-mobile">{mobileActions}</div>
            )}
          </FlexItem>
        </nav>
      </Wrapper>
    </header>
  );
});
