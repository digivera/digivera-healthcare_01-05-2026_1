import { memo, useEffect, useRef } from 'react';

interface SwiperInstance {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
}

declare global {
  interface Window {
    Swiper?: new (container: Element, options: Record<string, unknown>) => SwiperInstance;
  }
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul',
    role: 'Hospital Admin',
    text: 'Excellent service and professional team.',
    image: '/assets/img/test1.jpg',
  },
  {
    id: 2,
    name: 'Pooja',
    role: 'Experienced Customer',
    text: 'Fill out the form below to schedule an appointment or inquire about our services.',
    image: '/assets/img/test2.jpg',
  },
  {
    id: 3,
    name: 'Alisone',
    role: 'Grand Party Rental',
    text: 'Fill out the form below to schedule an appointment or inquire about our services.',
    image: '/assets/img/test3.jpg',
  },
  {
    id: 4,
    name: 'Rohan',
    role: 'Hospital Admin',
    text: 'Excellent service and professional team.',
    image: '/assets/img/rohan.png',
  },
];

// Defined once, outside the component, so it isn't recreated on every render.
const SWIPER_OPTIONS = {
  slidesPerView: 1,
  spaceBetween: 25,
  rewind: true,
  speed: 800,
  watchOverflow: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
};

const TestimonialCard = memo(({ name, role, text, image }: Testimonial) => (
  <div className="ts-card">
    <img src={image} className="ts-img" alt={`${name}, ${role}`} width={120} height={120} loading="lazy" decoding="async" />
    <div className="quote" aria-hidden="true">&ldquo;</div>
    <div className="ts-content">
      <p>{text}</p>
      <p>{name}</p>
      <p><span>{role}</span></p>
    </div>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let swiper: SwiperInstance | null = null;

    const init = () => {
      if (swiper || !window.Swiper) return;
      swiper = new window.Swiper(container, SWIPER_OPTIONS);
    };

    // If the CDN script is still loading (e.g. deferred), wait for the window load event.
    if (window.Swiper) {
      init();
    } else {
      window.addEventListener('load', init, { once: true });
    }

    return () => {
      window.removeEventListener('load', init);
      swiper?.destroy(true, true);
      swiper = null;
    };
  }, []);

  return (
    <section className="ts-section" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="quoteout" aria-hidden="true">&ldquo;</div>

        <div className="row align-items-center">
          {/* Left content */}
          <div className="col-lg-4 mb-4">
            <div className="w-100 title_sec wow fadeInLeft" data-wow-delay="0.1s">
              <p className="lb-tag">TESTIMONIALS</p>
              <h2 id="testimonials-title" className="main-title">
                What Our Customers Say
              </h2>
              <p className="subtitle">
                Real experiences and honest feedback from people who trust us, reflecting
                genuine satisfaction, meaningful results, and lasting relationships built
                over time.
              </p>
            </div>
          </div>

          {/* Right slider */}
          <div className="col-lg-8">
            <div className="swiper wow fadeInUp" data-wow-delay="0.1s" ref={containerRef}>
              <div className="swiper-wrapper">
                {TESTIMONIALS.map((item) => (
                  <div className="swiper-slide" key={item.id}>
                    <TestimonialCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;