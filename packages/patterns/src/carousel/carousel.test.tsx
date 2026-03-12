import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Carousel, CarouselSlide } from './carousel.js';

// Mock IntersectionObserver
beforeEach(() => {
  const mockObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  vi.stubGlobal('IntersectionObserver', mockObserver);
});

function renderCarousel(props: Partial<React.ComponentProps<typeof Carousel>> = {}) {
  return render(
    <Carousel {...props}>
      <CarouselSlide>Slide 1 Content</CarouselSlide>
      <CarouselSlide>Slide 2 Content</CarouselSlide>
      <CarouselSlide>Slide 3 Content</CarouselSlide>
    </Carousel>,
  );
}

describe('Carousel', () => {
  // --- ARIA on root ---

  it('renders with role=region', () => {
    renderCarousel();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('sets aria-roledescription=carousel', () => {
    renderCarousel();
    expect(screen.getByRole('region')).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('sets aria-label on root', () => {
    renderCarousel({ label: 'Image gallery' });
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Image gallery');
  });

  it('defaults aria-label to Carousel', () => {
    renderCarousel();
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Carousel');
  });

  // --- ARIA on slides ---

  it('renders slides with role=group', () => {
    renderCarousel();
    expect(screen.getAllByRole('group')).toHaveLength(3);
  });

  it('sets aria-roledescription=slide on slides', () => {
    renderCarousel();
    const slides = screen.getAllByRole('group');
    slides.forEach((slide) => {
      expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    });
  });

  it('sets aria-label with index on slides', () => {
    renderCarousel();
    const slides = screen.getAllByRole('group');
    expect(slides[0]).toHaveAttribute('aria-label', 'Slide 1 of 3');
    expect(slides[1]).toHaveAttribute('aria-label', 'Slide 2 of 3');
  });

  // --- Arrows ---

  it('shows arrows by default', () => {
    renderCarousel();
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('hides arrows when showArrows is false', () => {
    renderCarousel({ showArrows: false });
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('does not show arrows for single slide', () => {
    render(
      <Carousel>
        <CarouselSlide>Only slide</CarouselSlide>
      </Carousel>,
    );
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
  });

  // --- Dots ---

  it('shows dots by default', () => {
    renderCarousel();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('hides dots when showDots is false', () => {
    renderCarousel({ showDots: false });
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('does not show dots for single slide', () => {
    render(
      <Carousel>
        <CarouselSlide>Only slide</CarouselSlide>
      </Carousel>,
    );
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  // --- Dot aria-labels ---

  it('sets aria-label on dots', () => {
    renderCarousel();
    const dots = screen.getAllByRole('tab');
    expect(dots[0]).toHaveAttribute('aria-label', 'Go to slide 1');
    expect(dots[2]).toHaveAttribute('aria-label', 'Go to slide 3');
  });

  // --- aria-selected on first dot by default ---

  it('sets aria-selected on first dot by default', () => {
    renderCarousel();
    const dots = screen.getAllByRole('tab');
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
  });

  // --- Classes ---

  it('applies tcn-carousel class', () => {
    renderCarousel();
    expect(screen.getByRole('region')).toHaveClass('tcn-carousel');
  });

  it('applies tcn-carousel-slide class on slides', () => {
    renderCarousel();
    const slides = screen.getAllByRole('group');
    slides.forEach((slide) => {
      expect(slide).toHaveClass('tcn-carousel-slide');
    });
  });

  // --- Accessibility ---

  it('passes axe checks', async () => {
    const { container } = renderCarousel();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
