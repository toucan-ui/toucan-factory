'use client';

import { useState } from 'react';
import {
  Avatar,
  Heading,
  Text,
  Badge,
  Box,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Input,
  Link,
  Section,
  Wrapper,
  Separator,
  Pagination,
} from '@toucan-ui/core';
import { Footer } from '../../../_shared/patterns';
import { CssDisclaimer } from '../../../_shared/css-disclaimer';
import { BackToDocs } from '../../../_shared/back-to-docs';
import { ExampleControls } from '../../../_shared/example-controls';
import './theme.css';
import './blog.css';

const navLinks = ['World', 'Markets', 'Opinion', 'Tech', 'Climate'];

const featuredPost = {
  title: 'Central Banks Signal Coordinated Pause as Inflation Cools Across Major Economies',
  excerpt:
    'After two years of aggressive tightening, the Federal Reserve, ECB, and Bank of England are converging on a wait-and-see stance. Markets are pricing in cuts by Q3, but policymakers urge caution amid persistent services inflation.',
  author: 'Rebecca Langford',
  date: 'March 11, 2026',
  category: 'Markets',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
};

const secondaryPosts = [
  {
    title: 'AI Regulation: Brussels and Washington Chart Divergent Paths',
    excerpt:
      'The EU\'s AI Act enters enforcement while Congress remains gridlocked, creating a two-speed regulatory landscape for tech companies operating globally.',
    author: 'Marcus Chen',
    date: 'March 10, 2026',
    category: 'Tech',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  },
  {
    title: 'Green Bond Issuance Hits Record $900bn as ESG Momentum Builds',
    excerpt:
      'Sovereign and corporate green bond issuance surged in the first quarter, driven by stricter disclosure rules and growing investor appetite for sustainable assets.',
    author: 'Priya Sharma',
    date: 'March 9, 2026',
    category: 'Markets',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80',
  },
  {
    title: 'Tokyo Wages Rise at Fastest Pace in Three Decades',
    excerpt:
      'Spring wage negotiations deliver a 5.2% average increase, bolstering the case for the Bank of Japan to continue normalising monetary policy.',
    author: 'Haruki Sato',
    date: 'March 8, 2026',
    category: 'World',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80',
  },
];

const mostRead = [
  'Wall Street Banks Post Record Q1 Trading Revenue',
  'Why the Dollar\'s Dominance May Finally Be Waning',
  'Inside the Race to Build Europe\'s First AI Gigafactory',
  'Copper Hits All-Time High on Data Centre Demand Surge',
  'The Quiet Crisis in Commercial Real Estate Deepens',
];

const latestPosts = [
  {
    title: 'Supply Chain Rewiring Accelerates as Companies Diversify from China',
    author: 'James Whitfield',
    date: 'March 8, 2026',
    category: 'World',
    readTime: '7 min read',
  },
  {
    title: 'Private Credit Boom Raises Systemic Risk Concerns at IMF',
    author: 'Sofia Andersson',
    date: 'March 7, 2026',
    category: 'Markets',
    readTime: '5 min read',
  },
  {
    title: 'The Case for Patience: Why This Cycle Is Different',
    author: 'David Okonkwo',
    date: 'March 6, 2026',
    category: 'Opinion',
    readTime: '4 min read',
  },
  {
    title: 'Semiconductor Stocks Rally on Fresh US-Japan Subsidy Commitments',
    author: 'Yuki Tanaka',
    date: 'March 5, 2026',
    category: 'Tech',
    readTime: '3 min read',
  },
  {
    title: 'Carbon Border Tax: Early Data Shows Mixed Impact on Trade Flows',
    author: 'Elena Petrova',
    date: 'March 4, 2026',
    category: 'Climate',
    readTime: '6 min read',
  },
];

const highlightedRead = {
  title: 'The Overnight Index Swap Tells a Story Most Traders Are Ignoring',
  excerpt:
    'While equity markets fixate on earnings season, the OIS curve is quietly repricing rate expectations for the second half. The divergence between fed funds futures and swap spreads hasn\'t been this wide since 2019 — and last time, it preceded a sharp correction in credit markets. What makes this moment particularly striking is the speed of the repricing. In just three weeks, the implied probability of a September cut has swollen from 35% to nearly 70%, yet the long end of the curve remains stubbornly flat. That tension is creating dislocations across rates-sensitive sectors that few portfolio managers seem prepared for.',
  author: 'Catherine Ashworth',
  date: 'March 10, 2026',
  category: 'Markets',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
};

const opinionPosts = [
  {
    title: 'The End of Easy Money Was Always Going to Hurt',
    excerpt:
      'A decade of zero rates papered over structural weaknesses. Now comes the reckoning — and it will reshape which companies survive.',
    author: 'Martin Wolf',
    date: 'March 10, 2026',
    readTime: '5 min read',
  },
  {
    title: 'Europe Must Not Sleepwalk Into an AI Winter',
    excerpt:
      'Over-regulation risks pushing talent and capital to jurisdictions with lighter-touch regimes. The EU needs a growth strategy, not just guardrails.',
    author: 'Janan Ganesh',
    date: 'March 9, 2026',
    readTime: '4 min read',
  },
];

function categoryVariant(category: string) {
  switch (category) {
    case 'Markets':
      return 'info' as const;
    case 'Tech':
      return 'success' as const;
    case 'Opinion':
      return 'warning' as const;
    case 'Climate':
      return 'success' as const;
    case 'World':
      return 'neutral' as const;
    default:
      return 'neutral' as const;
  }
}

export default function BlogPage() {
  const [page, setPage] = useState(1);
  return (
    <>
      <ExampleControls>
        <BackToDocs />
        <CssDisclaimer lines={88} />
      </ExampleControls>
      {/* ── Editorial masthead — links left, logo centre, actions right ── */}
      <Section padding="md">
        <Wrapper size="xl">
          <Flex row align="center">
            <FlexItem grow>
              <Flex row align="center" gap={3} className="examples-masthead-desktop">
                {navLinks.map((link) => (
                  <Link key={link} href="#" variant="standalone" size="sm">
                    {link}
                  </Link>
                ))}
              </Flex>
              <div className="examples-masthead-mobile">
                <DropdownMenu anchor="bottom-left">
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" iconOnly aria-label="Menu">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    {navLinks.map((link) => (
                      <DropdownMenuItem key={link}>{link}</DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuItem>Subscribe</DropdownMenuItem>
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </FlexItem>
            <FlexItem shrink={false}>
              <Heading level={1} className="examples-masthead-logo">Factory Times</Heading>
            </FlexItem>
            <FlexItem grow>
              <Flex row align="center" justify="end" gap={2} className="examples-masthead-desktop">
                <Button variant="ghost" size="sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Subscribe
                </Button>
                <Button variant="secondary" size="sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Sign In
                </Button>
              </Flex>
            </FlexItem>
          </Flex>
        </Wrapper>
      </Section>

      <Separator />

      <Section padding="lg">
      <Wrapper size="xl">
        <Flex gap={8}>
          {/* ── Featured story ── */}
          <Grid columns={2} gap={6}>
            <div className="examples-blog-image">
              <img src={featuredPost.image} alt="" />
            </div>
            <Flex gap={3} justify="center">
              <Flex row align="center" gap={2}>
                <Badge variant={categoryVariant(featuredPost.category)} size="sm">
                  {featuredPost.category}
                </Badge>
                <Text size="sm" muted>
                  {featuredPost.readTime}
                </Text>
              </Flex>
              <Heading level={1}>{featuredPost.title}</Heading>
              <Text muted>{featuredPost.excerpt}</Text>
              <Flex row align="center" gap={2}>
                <Text size="sm" as="strong">
                  {featuredPost.author}
                </Text>
                <Text size="sm" muted>
                  {featuredPost.date}
                </Text>
              </Flex>
            </Flex>
          </Grid>

          <Separator />

          {/* ── Secondary stories + Most Read sidebar ── */}
          <Grid columns={4} gap={6}>
            {secondaryPosts.map((post) => (
              <Flex key={post.title} gap={3}>
                <div className="examples-article-image">
                  <img src={post.image} alt="" />
                </div>
                <Flex row align="center" gap={2}>
                  <Badge variant={categoryVariant(post.category)} size="sm">
                    {post.category}
                  </Badge>
                  <Text size="sm" muted>
                    {post.readTime}
                  </Text>
                </Flex>
                <Heading level={4}>{post.title}</Heading>
                <Text size="sm" muted>
                  {post.excerpt}
                </Text>
                <Flex row align="center" gap={2}>
                  <Text size="sm" as="strong">
                    {post.author}
                  </Text>
                  <Text size="sm" muted>
                    {post.date}
                  </Text>
                </Flex>
              </Flex>
            ))}

            {/* Most Read today */}
            <Flex gap={3}>
              <Heading level={4}>Most Read Today</Heading>
              <Flex gap={0}>
                {mostRead.map((title, i) => (
                  <Flex key={title} gap={0}>
                    {i > 0 && <Separator />}
                    <Flex row align="center" gap={4}>
                      <Text as="strong" className="examples-most-read-number">{i + 1}</Text>
                      <Link href="#" variant="standalone" size="sm">
                        {title}
                      </Link>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Grid>
        </Flex>
      </Wrapper>
      </Section>

      {/* ── FT Audio — full-width muted section ── */}
      <Section background="muted" padding="xl">
        <Wrapper size="xl">
          <Grid columns={2} gap={8}>
            <Flex gap={3} justify="center">
              <Heading level={2}>Get It in Audio</Heading>
              <Text>
                Listen to the stories that matter. Our daily podcast delivers the top headlines in under 20 minutes, and our weekly deep-dives explore the forces shaping global markets.
              </Text>
            </Flex>
            <Grid columns={2} gap={4}>
              <Box radius="md" padding="md">
                <Flex gap={2}>
                  <Heading level={4}>Daily Briefing</Heading>
                  <Text size="sm">
                    Every weekday at 6am. The essential stories, read by our editors.
                  </Text>
                  <Flex row gap={2}>
                    <Link href="#" variant="standalone" size="sm">Apple Podcasts</Link>
                    <Link href="#" variant="standalone" size="sm">Spotify</Link>
                  </Flex>
                </Flex>
              </Box>
              <Box radius="md" padding="md">
                <Flex gap={2}>
                  <Heading level={4}>Markets Weekly</Heading>
                  <Text size="sm">
                    Every Friday. Deep analysis of the week in global finance.
                  </Text>
                  <Flex row gap={2}>
                    <Link href="#" variant="standalone" size="sm">Apple Podcasts</Link>
                    <Link href="#" variant="standalone" size="sm">Spotify</Link>
                  </Flex>
                </Flex>
              </Box>
              <Box radius="md" padding="md">
                <Flex gap={2}>
                  <Heading level={4}>Tech Tonic</Heading>
                  <Text size="sm">
                    Tuesdays. How technology is reshaping business and society.
                  </Text>
                  <Flex row gap={2}>
                    <Link href="#" variant="standalone" size="sm">Apple Podcasts</Link>
                    <Link href="#" variant="standalone" size="sm">Spotify</Link>
                  </Flex>
                </Flex>
              </Box>
              <Box radius="md" padding="md">
                <Flex gap={2}>
                  <Heading level={4}>Climate Capital</Heading>
                  <Text size="sm">
                    Thursdays. The economics of the energy transition.
                  </Text>
                  <Flex row gap={2}>
                    <Link href="#" variant="standalone" size="sm">Apple Podcasts</Link>
                    <Link href="#" variant="standalone" size="sm">Spotify</Link>
                  </Flex>
                </Flex>
              </Box>
            </Grid>
          </Grid>
        </Wrapper>
      </Section>

      <Section padding="lg">
      <Wrapper size="xl">
        <Flex gap={8}>

          {/* ── Highlighted read + Latest headlines ── */}
          <Grid columns={{ base: 1, md: 2, lg: 12 }} gap={6}>
            {/* Left — key read */}
            <GridItem span={{ base: 1, md: 2, lg: 4 }}>
            <Box radius="md" padding="lg" elevation={1}>
              <Flex gap={4}>
                <Flex align="center" gap={2}>
                  <Avatar
                    src={highlightedRead.avatar}
                    alt={highlightedRead.author}
                    size="lg"
                  />
                  <Text as="strong">{highlightedRead.author}</Text>
                </Flex>
                <Badge variant={categoryVariant(highlightedRead.category)} size="sm">
                  {highlightedRead.category}
                </Badge>
                <Heading level={3}>{highlightedRead.title}</Heading>
                <Text size="sm" muted>{highlightedRead.excerpt}</Text>
              </Flex>
            </Box>
            </GridItem>

            {/* Vertical divider — hidden on mobile/tablet */}
            <div className="examples-vertical-divider">
              <Separator orientation="vertical" decorative />
            </div>

            {/* Right — latest headlines ruled list */}
            <GridItem span={{ base: 1, md: 2, lg: 7 }}>
            <Flex gap={4}>
              <Heading level={2}>Latest News</Heading>
              <Flex gap={0}>
                {latestPosts.map((post, i) => (
                  <Flex key={post.title} gap={0}>
                    {i > 0 && <Separator />}
                    <Flex gap={1}>
                      <Flex row align="center" gap={2}>
                        <Badge variant={categoryVariant(post.category)} size="sm">
                          {post.category}
                        </Badge>
                        <Text size="sm" muted>
                          {post.readTime}
                        </Text>
                      </Flex>
                      <Heading level={4}>{post.title}</Heading>
                      <Flex row align="center" gap={2}>
                        <Text size="sm" as="strong">{post.author}</Text>
                        <Text size="sm" muted>{post.date}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            </GridItem>
          </Grid>

          <Separator />

          {/* ── Opinion & Analysis ── */}
          <Flex gap={4}>
            <Heading level={2}>Opinion & Analysis</Heading>
            <Grid columns={2} gap={6}>
              {opinionPosts.map((post) => (
                <div key={post.title} className="examples-testimonial">
                  <Flex gap={2}>
                    <Heading level={4}>{post.title}</Heading>
                    <Text size="sm" muted>
                      {post.excerpt}
                    </Text>
                    <Flex row align="center" gap={2}>
                      <Text size="sm" as="strong">
                        {post.author}
                      </Text>
                      <Text size="sm" muted>
                        {post.date}
                      </Text>
                    </Flex>
                  </Flex>
                </div>
              ))}
            </Grid>
          </Flex>

          <Separator />

          <Flex align="center">
            <Pagination totalPages={4} page={page} onPageChange={setPage} />
          </Flex>
        </Flex>
      </Wrapper>
      </Section>

      {/* ── Newsletter sign-up — full-width muted section ── */}
      <Section background="muted" padding="xl">
        <Wrapper size="xl">
          <Flex align="center" gap={4}>
            <Heading level={2}>Stay Informed</Heading>
            <Text>
              Get the best of Factory Times delivered to your inbox every morning. Free for 30 days.
            </Text>
            <Flex row gap={2} align="end">
              <Input placeholder="Enter your email address" />
              <Button variant="secondary">Sign Up</Button>
            </Flex>
            <Text size="sm" muted>
              By signing up, you agree to our Terms & Conditions and Privacy Policy.
            </Text>
          </Flex>
        </Wrapper>
      </Section>

      <Footer
        size="xl"
        columns={[
          {
            heading: 'Sections',
            links: [
              { label: 'World', href: '#world' },
              { label: 'Markets', href: '#markets' },
              { label: 'Opinion', href: '#opinion' },
              { label: 'Tech', href: '#tech' },
              { label: 'Climate', href: '#climate' },
            ],
          },
          {
            heading: 'Services',
            links: [
              { label: 'Subscribe', href: '#subscribe' },
              { label: 'Newsletters', href: '#newsletters' },
              { label: 'Group Licences', href: '#licences' },
              { label: 'Republishing', href: '#republishing' },
            ],
          },
          {
            heading: 'About',
            links: [
              { label: 'About Us', href: '#about' },
              { label: 'Contact', href: '#contact' },
              { label: 'Careers', href: '#careers' },
              { label: 'Advertise', href: '#advertise' },
            ],
          },
          {
            heading: 'Legal',
            links: [
              { label: 'Terms & Conditions', href: '#terms' },
              { label: 'Privacy Policy', href: '#privacy' },
              { label: 'Cookie Policy', href: '#cookies' },
              { label: 'Accessibility', href: '#accessibility' },
            ],
          },
        ]}
        logo={<Text as="strong" size="lg" className="examples-masthead-logo">Factory Times</Text>}
        legal="© Factory Times 2026. All rights reserved."
      />
    </>
  );
}
