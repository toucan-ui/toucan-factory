import { forwardRef, useCallback, useEffect, useRef, useState, Children } from 'react';
import { cn, Button } from '@toucan-ui/core';

// --- CarouselSlide ---

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(function CarouselSlide(
  { label, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      className={cn('tcn-carousel-slide', className)}
      {...props}
    >
      {children}
    </div>
  );
});

// --- Carousel ---

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  showArrows?: boolean;
  showDots?: boolean;
  label?: string;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { showArrows = true, showDots = true, label = 'Carousel', className, children, ...props },
  ref,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = Children.count(children);

  // Track current slide via IntersectionObserver
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slides = Array.from(viewport.children) as HTMLElement[];
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slides.indexOf(entry.target as HTMLElement);
            if (index !== -1) setCurrentSlide(index);
          }
        }
      },
      { root: viewport, threshold: 0.5 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [slideCount]);

  const scrollTo = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slides = Array.from(viewport.children) as HTMLElement[];
    slides[index]?.scrollIntoView({ block: 'nearest', inline: 'start' });
  }, []);

  const scrollPrev = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: -viewport.clientWidth, behavior: 'auto' });
  }, []);

  const scrollNext = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: viewport.clientWidth, behavior: 'auto' });
  }, []);

  // Add aria-label with index to each slide child
  const slides = Children.map(children, (child, index) => {
    if (!child || typeof child !== 'object' || !('props' in child)) return child;
    const childProps = (child as React.ReactElement<{ label?: string }>).props;
    const slideLabel = childProps.label || `Slide ${index + 1} of ${slideCount}`;
    return { ...child, props: { ...childProps, 'aria-label': slideLabel } };
  });

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('tcn-carousel', className)}
      {...props}
    >
      <div ref={viewportRef} className="tcn-carousel-viewport">
        {slides}
      </div>

      {showArrows && slideCount > 1 && (
        <div className="tcn-carousel-arrows">
          <Button
            variant="secondary"
            size="sm"
            aria-label="Previous slide"
            disabled={currentSlide === 0}
            onClick={scrollPrev}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            aria-label="Next slide"
            disabled={currentSlide === slideCount - 1}
            onClick={scrollNext}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </Button>
        </div>
      )}

      {showDots && slideCount > 1 && (
        <div className="tcn-carousel-dots" role="tablist">
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className="tcn-carousel-dot"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === currentSlide}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
