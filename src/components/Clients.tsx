import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Swiper?: new (container: Element, options: Record<string, unknown>) => {
      destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
    };
  }
}

const Clients = () => {
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<{ destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void } | null>(null);

  const clientLogos = [
    '/assets/img/client1.png',
    '/assets/img/client2.png',
    '/assets/img/client3.png',
    '/assets/img/client4.png',
    '/assets/img/client5.png',
  ];

  useEffect(() => {
    if (!window.Swiper || !swiperContainerRef.current || !prevRef.current || !nextRef.current) {
      return;
    }

    swiperRef.current = new window.Swiper(swiperContainerRef.current, {
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    });

    return () => {
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, []);

  return (
    <section className="cl-section">
      <div className="container text-center">

        <div className="w-100 title_sec wow fadeInDown" data-wow-delay="0.1s">
          <h2 className="main-title">Take a Look at Our Clients</h2>
          <p className="subtitle">
            Trusted by 120+ hospitals, we bring reliability, speed, and quality to healthcare
            staffing in India.
          </p>
        </div>

        <div className="cl-wrapper wow fadeInUp" data-wow-delay="0.1s">

          {/* LEFT BUTTON */}
          <button className="cl-btn cl-prev" ref={prevRef} aria-label="Previous clients" type="button">
            &#10094;
          </button>

          {/* SLIDER */}
          <div className="swiper cl-slider" id="clientSlider" ref={swiperContainerRef}>
            <div className="swiper-wrapper">
              {clientLogos.map((logo, index) => (
                <div className="swiper-slide cl-item" key={logo}>
                  <img src={logo} alt={`client ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button className="cl-btn cl-next" ref={nextRef} aria-label="Next clients" type="button">
            &#10095;
          </button>

        </div>
      </div>
    </section>
  );
};

export default Clients;
