'use client';

import { useState } from 'react';
import {
  Section,
  Wrapper,
  Flex,
  Grid,
  Box,
  Heading,
  Text,
  Button,
  Badge,
  Rating,
  Avatar,
  Link,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@toucan-ui/core';
import {
  NavBar,
  Footer,
  SectionHeader,
  TestimonialCard,
  FeatureCard,
} from '../../../_shared/patterns';
import type { FooterColumn } from '../../../_shared/patterns';
import { CssDisclaimer } from '../../../_shared/css-disclaimer';
import { BackToDocs } from '../../../_shared/back-to-docs';
import { ExampleControls } from '../../../_shared/example-controls';
import './theme.css';
import './ecommerce.css';

/* ---------- Data ---------- */

const footerColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Daily Greens Powder', href: '#' },
      { label: 'Travel Packs', href: '#' },
      { label: 'Starter Kit', href: '#' },
      { label: 'Subscribe & Save', href: '#' },
    ],
  },
  {
    heading: 'Science',
    links: [
      { label: 'Research', href: '#' },
      { label: 'Ingredients', href: '#' },
      { label: 'Third-Party Testing', href: '#' },
      { label: 'Advisory Board', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

const faqItems = [
  {
    q: 'What is Greens Daily and what does it do?',
    a: 'Greens Daily is a foundational nutrition supplement that delivers comprehensive support for your body\u2019s nutritional needs in one convenient serving. It contains 75 vitamins, minerals, and whole-food sourced nutrients.',
  },
  {
    q: 'How do I take it?',
    a: 'Mix one scoop with 150\u2013250ml of cold water. We recommend taking it first thing in the morning on an empty stomach for optimal absorption.',
  },
  {
    q: 'Is it third-party tested?',
    a: 'Yes. Every single batch is NSF Certified for Sport, meaning it is independently tested for quality, purity, and banned substance compliance.',
  },
  {
    q: 'Can I take it with other supplements?',
    a: 'Greens Daily is designed to be your foundational supplement, replacing the need for multiple individual products. However, you can still take specific supplements as recommended by your healthcare provider.',
  },
  {
    q: 'What is the subscription model?',
    a: 'Subscribe and receive Greens Daily delivered to your door every 30 days. Subscribers save 20% on every order and can pause, skip, or cancel anytime with no commitment.',
  },
];

/* ---------- Page ---------- */

export default function EcommercePage() {
  const [nutritionOpen, setNutritionOpen] = useState(false);

  return (
    <>
      <ExampleControls>
        <BackToDocs />
        <CssDisclaimer lines={72} />
      </ExampleControls>
      {/* 1 — NavBar */}
      <NavBar
        logo={
          <Text as="span" size="lg" weight="bold">
            Greens Daily
          </Text>
        }
        actions={
          <Flex row gap={6} align="center">
            <Link href="#benefits" variant="standalone">
              Benefits
            </Link>
            <Link href="#science" variant="standalone">
              Science
            </Link>
            <Link href="#reviews" variant="standalone">
              Reviews
            </Link>
            <Link href="#faq" variant="standalone">
              FAQ
            </Link>
            <Button size="sm">Shop Now</Button>
          </Flex>
        }
        mobileActions={
          <DropdownMenu anchor="bottom-right">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" iconOnly aria-label="Menu">
                ☰
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Benefits</DropdownMenuItem>
              <DropdownMenuItem>Science</DropdownMenuItem>
              <DropdownMenuItem>Reviews</DropdownMenuItem>
              <DropdownMenuItem>FAQ</DropdownMenuItem>
              <DropdownMenuItem>Shop Now</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      {/* 2 — Hero */}
      <Section background="default" padding="xl">
        <Wrapper>
          <Grid columns={{ base: 1, md: 2 }} gap={8} align="start">
            <Flex gap={6}>
              <Flex row gap={3} align="center">
                <Rating value={5} size="sm" label="5 out of 5 stars" />
                <Text as="span" size="sm">
                  35,000+ verified 5-star reviews*
                </Text>
              </Flex>
              <Heading level={1} display="lg">
                The foundation of daily health
              </Heading>
              <Text size="lg">
                Just one scoop covers your daily nutritional bases with 75 vitamins, minerals, and
                whole-food sourced nutrients.
              </Text>
              <Tabs defaultValue="subscribe">
                <TabList>
                  <Tab value="one-time">One-Time Purchase</Tab>
                  <Tab value="subscribe">Subscribe</Tab>
                </TabList>
                <TabPanel value="one-time">
                  <Flex gap={4}>
                    <Flex row gap={3} align="baseline">
                      <Heading level={3} display="sm">
                        $89
                      </Heading>
                      <Text muted as="span">
                        ($2.97/serving)
                      </Text>
                    </Flex>
                    <Text size="sm">30 servings, shipped once. No commitment.</Text>
                    <Button size="lg">Buy Now</Button>
                    <Text muted size="xs">
                      90-day money-back guarantee. No commitment.
                    </Text>
                  </Flex>
                </TabPanel>
                <TabPanel value="subscribe">
                  <Flex gap={4}>
                    <Flex row gap={3} align="baseline">
                      <Text as="span" muted style={{ textDecoration: 'line-through' }}>
                        $89
                      </Text>
                      <Heading level={3} display="sm">
                        $79
                      </Heading>
                      <Text muted as="span">
                        ($2.63/serving)
                      </Text>
                    </Flex>
                    <Badge variant="success" size="sm">
                      Save 10% for your first 3 months
                    </Badge>
                    <Flex gap={2}>
                      <Text size="sm">
                        30 servings, delivered monthly. Cancel or pause anytime.
                      </Text>
                      <Text size="sm">Free tote bag with your first order.</Text>
                    </Flex>
                    <Button size="lg">Subscribe & Save</Button>
                    <Text muted size="xs">
                      90-day money-back guarantee. No commitment.
                    </Text>
                  </Flex>
                </TabPanel>
              </Tabs>
            </Flex>
            <Flex align="center" justify="center">
              <img
                className="examples-ecom-hero-image"
                src="https://images.unsplash.com/photo-1610622930110-3c076902312a?w=600&h=600&fit=crop"
                alt="Person holding a glass of green liquid"
              />
            </Flex>
          </Grid>
        </Wrapper>
      </Section>

      {/* 2b — Accreditations strip */}
      <Section padding="xl">
        <Wrapper>
          <Flex row gap={8} align="center" justify="center" wrap>
            {[
              {
                name: 'Living Wage Employer',
                icon: (
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" aria-hidden="true">
                    <path
                      d="M7 12L11.9497 16.9497L22.5572 6.34326M2.0498 12.0503L6.99955 17M17.606 6.39355L12.3027 11.6969"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                name: 'NSF Certified',
                icon: (
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" aria-hidden="true">
                    <path
                      d="M15 10L11 14L9 12M4 5V12.0557C4 15.0859 5.71202 17.856 8.42229 19.2111L12 21L15.5777 19.2111C18.288 17.856 20 15.0859 20 12.0557V5L19.303 5.07744C16.8542 5.34953 14.3912 4.70802 12.3863 3.27594L12 3L11.6137 3.27594C9.60878 4.70802 7.14576 5.34953 4.69699 5.07744L4 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                name: 'USDA Organic',
                icon: (
                  <svg
                    viewBox="0 0 32 32"
                    width="40"
                    height="40"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M28,17v-2H17v-2.052C23.289,12.418,25,6.96,25,4V3h-1c-4.416,0-6.814,2.266-8,4.729 C14.814,5.266,12.416,3,8,3H7v1c0,2.96,1.711,8.418,8,8.948V15H4v2h11v3.285c-1.474,0.78-3,3.009-3,4.715c0,2.206,1.794,4,4,4 s4-1.794,4-4c0-1.706-1.526-3.935-3-4.715V17H28z M22.898,5.062c-0.291,1.821-1.42,5.367-5.797,5.877 C17.393,9.118,18.521,5.572,22.898,5.062z M9.101,5.062c4.377,0.51,5.507,4.056,5.798,5.877C10.521,10.428,9.392,6.881,9.101,5.062z M16,27c-1.103,0-2-0.897-2-2c0-1.124,1.484-2.873,1.953-3.004C16.516,22.127,18,23.876,18,25C18,26.103,17.103,27,16,27z" />
                  </svg>
                ),
              },
              {
                name: '1% for the Planet',
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6ZM4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8ZM17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15ZM13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17ZM19.7071 6.70711C20.0976 6.31658 20.0976 5.68342 19.7071 5.29289C19.3166 4.90237 18.6834 4.90237 18.2929 5.29289L5.29289 18.2929C4.90237 18.6834 4.90237 19.3166 5.29289 19.7071C5.68342 20.0976 6.31658 20.0976 6.70711 19.7071L19.7071 6.70711Z"
                    />
                  </svg>
                ),
              },
            ].map((badge) => (
              <Flex key={badge.name} row gap={3} align="center">
                <div className="examples-ecom-accreditation-logo">{badge.icon}</div>
                <Text size="xs" muted>
                  {badge.name}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Wrapper>
      </Section>

      {/* 3 — Benefits carousel */}
      <Section background="muted" padding="lg" id="benefits">
        <Flex gap={16}>
          <div className="examples-ecom-benefits-track">
            {[
              {
                title: 'Gut Health',
                desc: 'Pre and probiotics for digestive wellness',
                image:
                  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=530&fit=crop',
                alt: 'Healthy bowl of whole foods',
              },
              {
                title: 'Energy',
                desc: 'Sustained energy without the crash',
                image:
                  'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400&h=530&fit=crop',
                alt: 'Person running at sunrise',
              },
              {
                title: 'Immunity',
                desc: 'Strengthen your body\u2019s natural defenses',
                image:
                  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=530&fit=crop',
                alt: 'Citrus fruits rich in vitamin C',
              },
              {
                title: 'Recovery',
                desc: 'Reduce inflammation and support muscle repair',
                image:
                  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=530&fit=crop',
                alt: 'Person stretching after exercise',
              },
              {
                title: 'Brain Health',
                desc: 'Support focus, clarity, and cognitive function',
                image:
                  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=530&fit=crop',
                alt: 'Person meditating in nature',
              },
              {
                title: 'Heart Health',
                desc: 'Support cardiovascular function and circulation',
                image:
                  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=530&fit=crop',
                alt: 'Fresh berries and healthy foods',
              },
            ].map((card) => (
              <div key={card.title} className="examples-ecom-benefit-card">
                <img src={card.image} alt={card.alt} />
                <div className="examples-ecom-benefit-card-overlay">
                  <Heading level={4}>{card.title}</Heading>
                  <Text size="sm">{card.desc}</Text>
                </div>
              </div>
            ))}
          </div>
          <Wrapper>
            <Flex align="center" gap={4}>
              <Button variant="secondary" onClick={() => setNutritionOpen(true)}>
                View Full Nutrition Breakdown
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </Button>
            </Flex>
          </Wrapper>
        </Flex>
        <Dialog
          open={nutritionOpen}
          onClose={() => setNutritionOpen(false)}
          aria-label="Nutrition facts"
        >
          <Flex gap={6}>
            <Flex row align="center" justify="between">
              <Heading level={3}>Nutrition Facts</Heading>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="Close"
                onClick={() => setNutritionOpen(false)}
              >
                ✕
              </Button>
            </Flex>
            <Text muted size="sm">
              Per serving (12g scoop). % Daily Value based on a 2,000 calorie diet.
            </Text>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Nutrient</TableHeader>
                  <TableHeader>Amount</TableHeader>
                  <TableHeader>% DV</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { nutrient: 'Vitamin A', amount: '900 mcg', dv: '100%' },
                  { nutrient: 'Vitamin C', amount: '90 mg', dv: '100%' },
                  { nutrient: 'Vitamin D3', amount: '50 mcg', dv: '250%' },
                  { nutrient: 'Vitamin E', amount: '15 mg', dv: '100%' },
                  { nutrient: 'Vitamin K2', amount: '80 mcg', dv: '67%' },
                  { nutrient: 'Thiamin (B1)', amount: '1.2 mg', dv: '100%' },
                  { nutrient: 'Riboflavin (B2)', amount: '1.3 mg', dv: '100%' },
                  { nutrient: 'Niacin (B3)', amount: '16 mg', dv: '100%' },
                  { nutrient: 'Vitamin B6', amount: '1.7 mg', dv: '100%' },
                  { nutrient: 'Folate (B9)', amount: '400 mcg DFE', dv: '100%' },
                  { nutrient: 'Vitamin B12', amount: '2.4 mcg', dv: '100%' },
                  { nutrient: 'Biotin (B7)', amount: '30 mcg', dv: '100%' },
                  { nutrient: 'Zinc', amount: '11 mg', dv: '100%' },
                  { nutrient: 'Magnesium', amount: '420 mg', dv: '100%' },
                  { nutrient: 'Iron', amount: '8 mg', dv: '44%' },
                  { nutrient: 'Selenium', amount: '55 mcg', dv: '100%' },
                  { nutrient: 'Chromium', amount: '35 mcg', dv: '100%' },
                  { nutrient: 'Ashwagandha Extract', amount: '300 mg', dv: '†' },
                  { nutrient: 'Rhodiola Rosea', amount: '200 mg', dv: '†' },
                  { nutrient: 'Spirulina Powder', amount: '500 mg', dv: '†' },
                  { nutrient: 'Probiotic Blend', amount: '10B CFU', dv: '†' },
                ].map((row) => (
                  <TableRow key={row.nutrient}>
                    <TableCell>{row.nutrient}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.dv}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Text muted size="xs">
              † Daily Value not established.
            </Text>
          </Flex>
        </Dialog>
      </Section>

      {/* 4 — Science / Research */}
      <Section padding="xl" id="science">
        <Wrapper>
          <Flex gap={10}>
            <SectionHeader
              eyebrow="Backed by Science"
              title="Rigorous research, real results"
              subtitle="Our formula is developed with input from leading scientists and undergoes continuous improvement based on the latest nutritional research."
            />
            <Grid columns={{ base: 1, md: 3 }} gap={6}>
              <FeatureCard
                title="75 Nutrients"
                description="Vitamins, minerals, and whole-food sourced ingredients in every serving — formulated for synergistic absorption."
                icon={
                  <img
                    className="examples-ecom-feature-image"
                    src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=400&fit=crop"
                    alt="Assortment of vitamins and supplements"
                  />
                }
              />
              <FeatureCard
                title="Third-Party Tested"
                description="Every batch is NSF Certified for Sport, ensuring the highest standards of quality and purity."
                icon={
                  <img
                    className="examples-ecom-feature-image"
                    src="https://images.unsplash.com/photo-1650660149368-95e712f12ef0?w=600&h=400&fit=crop"
                    alt="Laboratory testing equipment"
                  />
                }
              />
              <FeatureCard
                title="10+ Years of R&D"
                description="Over a decade of iterative development with 52 formula updates driven by emerging nutritional science."
                icon={
                  <img
                    className="examples-ecom-feature-image"
                    src="https://images.unsplash.com/flagged/photo-1557753478-b9fb74f39eb5?w=600&h=400&fit=crop"
                    alt="Research and development laboratory"
                  />
                }
              />
            </Grid>
          </Flex>
        </Wrapper>
      </Section>

      {/* 4b — Endorsed by */}
      <Section padding="xl">
        <Wrapper>
          <Flex gap={10}>
            <SectionHeader eyebrow="Trusted by Experts" title="Approved by those who know best" />
            <Grid columns={{ base: 2, md: 3, lg: 6 }} gap={6}>
              {[
                {
                  name: 'Dr. Sarah Chen',
                  role: 'PhD Researcher, Nutrition Science',
                  image:
                    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
                },
                {
                  name: 'Marcus Williams',
                  role: 'Professional Triathlete',
                  image:
                    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face',
                },
                {
                  name: 'Dr. James Park',
                  role: 'Chief Medical Officer',
                  image:
                    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
                },
                {
                  name: 'Elena Rodriguez',
                  role: 'Olympic Coach',
                  image:
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
                },
                {
                  name: 'David Foster',
                  role: 'CEO, Vitality Labs',
                  image:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
                },
                {
                  name: 'Dr. Aisha Patel',
                  role: 'Sports Dietitian',
                  image:
                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
                },
              ].map((person) => (
                <Flex key={person.name} gap={3} align="center">
                  <Avatar src={person.image} alt={person.name} size="lg" />
                  <Text size="sm" weight="semibold" align="center">
                    {person.name}
                  </Text>
                  <Text size="xs" muted align="center">
                    {person.role}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Wrapper>
      </Section>

      {/* 5 — Testimonials */}
      <Section background="muted" padding="xl" id="reviews">
        <Wrapper>
          <Flex gap={10}>
            <SectionHeader
              eyebrow="Real Stories"
              title="What our customers say"
              subtitle="Join over 1 million daily users who trust us as their foundational nutrition."
            />
            <Grid columns={{ base: 1, md: 3 }} gap={6}>
              <TestimonialCard
                quote="This simplified my morning routine. One scoop and I know I've covered my nutritional bases for the day."
                name="Sarah K."
                role="Fitness Coach"
                initials="SK"
              />
              <TestimonialCard
                quote="I noticed a real difference in my energy levels within the first two weeks. No more afternoon slumps."
                name="James R."
                role="Software Engineer"
                initials="JR"
              />
              <TestimonialCard
                quote="As a doctor, I appreciate the transparency in ingredient sourcing and third-party testing."
                name="Dr. Lisa M."
                role="Physician"
                initials="LM"
              />
            </Grid>
          </Flex>
        </Wrapper>
      </Section>

      {/* 6 — Product / Pricing CTA */}
      <Section background="primary" padding="xl">
        <Wrapper>
          <Grid columns={{ base: 1, md: 2 }} gap={8} align="stretch">
            <Flex align="center" justify="center">
              <img
                className="examples-ecom-hero-image"
                src="https://images.unsplash.com/photo-1591089398845-0dbbbdba1f75?w=500&h=500&fit=crop"
                alt="Green smoothie drink"
              />
            </Flex>
            <Box padding="lg" radius="md" elevation={1}>
              <Flex gap={5}>
                <Badge variant="neutral" size="sm">
                  Most Popular
                </Badge>
                <Heading level={2} display="md">
                  Start your journey today
                </Heading>
                <Tabs defaultValue="subscribe">
                  <TabList>
                    <Tab value="one-time">One-Time Purchase</Tab>
                    <Tab value="subscribe">Subscribe</Tab>
                  </TabList>
                  <TabPanel value="one-time">
                    <Flex gap={4}>
                      <Flex row gap={3} align="baseline">
                        <Heading level={3} display="sm">
                          $89
                        </Heading>
                        <Text muted as="span">
                          ($2.97/serving)
                        </Text>
                      </Flex>
                      <Text size="sm">30 servings, shipped once. No commitment.</Text>
                      <Button size="lg">Buy Now</Button>
                    </Flex>
                  </TabPanel>
                  <TabPanel value="subscribe">
                    <Flex gap={4}>
                      <Flex row gap={3} align="baseline">
                        <Text as="span" muted style={{ textDecoration: 'line-through' }}>
                          $89
                        </Text>
                        <Heading level={3} display="sm">
                          $79
                        </Heading>
                        <Text muted as="span">
                          ($2.63/serving)
                        </Text>
                      </Flex>
                      <Badge variant="success" size="sm">
                        Save 10% for your first 3 months
                      </Badge>
                      <Flex gap={2}>
                        <Text size="sm">
                          30 servings, delivered monthly. Cancel or pause anytime.
                        </Text>
                        <Text size="sm">Free tote bag with your first order.</Text>
                      </Flex>
                      <Button size="lg">Subscribe & Save</Button>
                    </Flex>
                  </TabPanel>
                </Tabs>
                <Text muted size="xs">
                  90-day money-back guarantee. No commitment.
                </Text>
              </Flex>
            </Box>
          </Grid>
        </Wrapper>
      </Section>

      {/* 7 — FAQ */}
      <Section padding="xl" id="faq">
        <Wrapper size="md">
          <Flex gap={10}>
            <SectionHeader
              eyebrow="FAQ"
              title="Frequently asked questions"
              subtitle="Everything you need to know about Greens Daily and your subscription."
            />
            <Accordion type="single" collapsible>
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionPanel>
                    <Text>{item.a}</Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Flex>
        </Wrapper>
      </Section>

      {/* 8 — Other Bestsellers */}
      <Section padding="xl">
        <Wrapper>
          <Flex gap={10}>
            <SectionHeader eyebrow="More to Explore" title="Our other bestsellers" />
            <Grid columns={{ base: 2, md: 4 }} gap={6}>
              {[
                {
                  title: 'Running Retreat',
                  price: '$249',
                  rating: 4.9,
                  reviews: 1240,
                  image:
                    'https://images.unsplash.com/photo-1597892657493-6847b9640bac?w=400&h=400&fit=crop',
                  alt: 'Person running outdoors',
                },
                {
                  title: 'On the Go Nut Mix',
                  price: '$12',
                  rating: 4.7,
                  reviews: 3890,
                  image:
                    'https://images.unsplash.com/photo-1543158181-1274e5362710?w=400&h=400&fit=crop',
                  alt: 'Assorted nuts in a bowl',
                  soldOut: true,
                },
                {
                  title: 'Naughty Nut Bar',
                  price: '$8',
                  rating: 4.8,
                  reviews: 2120,
                  image:
                    'https://images.unsplash.com/photo-1691200435618-2cda2edbd10c?w=400&h=400&fit=crop',
                  alt: 'Nut bar snack',
                },
                {
                  title: 'Guilt Free Cocktail Pack',
                  price: '$35',
                  rating: 4.6,
                  reviews: 1560,
                  image:
                    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop',
                  alt: 'Colourful cocktail drinks',
                },
                {
                  title: 'Morning Berry Mix',
                  price: '$15',
                  rating: 4.8,
                  reviews: 2780,
                  image:
                    'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400&h=400&fit=crop',
                  alt: 'Fresh mixed berries',
                  soldOut: true,
                },
                {
                  title: 'Go Get It Granola',
                  price: '$14',
                  rating: 4.5,
                  reviews: 980,
                  image:
                    'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=400&h=400&fit=crop',
                  alt: 'Bowl of granola',
                },
                {
                  title: 'Solo Meditation Retreat',
                  price: '$199',
                  rating: 4.9,
                  reviews: 870,
                  image:
                    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
                  alt: 'Person meditating peacefully',
                  soldOut: true,
                },
                {
                  title: 'Detox Done Right',
                  price: '$29',
                  rating: 4.7,
                  reviews: 1640,
                  image:
                    'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=400&h=400&fit=crop',
                  alt: 'Fresh detox juice drinks',
                },
              ].map((product) => (
                <Box key={product.title} padding="md" radius="md" elevation={1} fill>
                  <Flex gap={3} justify="between">
                    <Flex gap={3}>
                      <img
                        className="examples-ecom-feature-image"
                        src={product.image}
                        alt={product.alt}
                      />
                      <Heading level={5}>{product.title}</Heading>
                      <Flex row gap={2} align="center">
                        <Rating
                          value={product.rating}
                          size="sm"
                          label={`${product.rating} out of 5`}
                        />
                        <Text size="xs" muted>
                          ({product.reviews.toLocaleString()})
                        </Text>
                      </Flex>
                      <Text weight="semibold">{product.price}</Text>
                    </Flex>
                    {product.soldOut ? (
                      <Button size="sm" disabled>
                        Sold Out
                      </Button>
                    ) : (
                      <Button size="sm">Add to Cart</Button>
                    )}
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Flex>
        </Wrapper>
      </Section>

      {/* 9 — Footer */}
      <Footer
        columns={footerColumns}
        logo={
          <Text as="span" size="lg" weight="bold">
            Greens Daily
          </Text>
        }
        legal="© 2026 Greens Daily Inc. All rights reserved."
        background="muted"
      />
    </>
  );
}
