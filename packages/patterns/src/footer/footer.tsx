import { forwardRef } from 'react';
import { cn, Heading, Text, Separator, Section, Wrapper, Grid } from '@toucanui/core';
import type { WrapperSize, SectionBackground, SectionPadding } from '@toucanui/core';

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns: FooterColumn[];
  logo?: React.ReactNode;
  legal?: string;
  size?: WrapperSize;
  background?: SectionBackground;
  padding?: SectionPadding;
}

export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { columns, logo, legal, size = 'lg', background = 'muted', padding = 'lg', className, ...props },
  ref,
) {
  return (
    <footer ref={ref} className={cn('tcn-footer', className)} {...props}>
      <Section background={background} padding={padding}>
        <Wrapper size={size}>
          <Grid
            columns={{ base: 2, md: columns.length + (logo ? 1 : 0) }}
            gap={6}
            role="navigation"
            aria-label="Footer"
            className="tcn-footer-content"
          >
            {logo && <div className="tcn-footer-brand">{logo}</div>}
            {columns.map((col) => (
              <div key={col.heading} className="tcn-footer-column">
                <Heading level={4}>{col.heading}</Heading>
                <ul className="tcn-footer-links">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="tcn-footer-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Grid>
          {legal && (
            <>
              <Separator decorative />
              <Text as="small" size="sm" muted className="tcn-footer-legal">
                {legal}
              </Text>
            </>
          )}
        </Wrapper>
      </Section>
    </footer>
  );
});
