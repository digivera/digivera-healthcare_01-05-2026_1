import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Swiper?: new (container: Element, options: Record<string, unknown>) => {
      destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
    };
  }
}

const Testimonials = () => {
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<{ destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void } | null>(null);

  useEffect(() => {
    if (!window.Swiper || !swiperContainerRef.current) {
      return;
    }

    swiperRef.current = new window.Swiper(swiperContainerRef.current, {
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      speed: 800,
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
    <section className="ts-section">
      <div className="container">
        <div className="quoteout">"</div>
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-4 mb-4">
            <div className="w-100 title_sec wow fadeInLeft" data-wow-delay="0.1s">
              <p className="lb-tag">TESTIMONIALS</p>
              <h2 className="main-title">What Our Customers Say</h2>
              <p className="subtitle">
                Real experiences and honest feedback from people who trust us, reflecting
                genuine satisfaction, meaningful results, and lasting relationships built
                over time.
              </p>
            
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="col-lg-8">
            <div className="swiper wow fadeInUp" data-wow-delay="0.1s" ref={swiperContainerRef}>
              <div className="swiper-wrapper">

                {/* CARD 1 */}
               <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test1.jpg" className="ts-img" alt="Rahul" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Excellent service and professional team.</p>
                      <h6>Rahul</h6>
                      <p><span>Hospital Admin</span></p>
                    </div>
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test2.jpg" className="ts-img" alt="Pooja" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Fill out the form below to schedule an appointment or inquire about our services.</p>
                      <h6>Pooja</h6>
                      <p><span>Experienced Customer</span></p>
                    </div>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test3.jpg" className="ts-img" alt="Alisone" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Fill out the form below to schedule an appointment or inquire about our services.</p>
                      <h6>Alisone</h6>
                      <p><span>Grand Party rental</span></p>
                    </div>
                  </div>
                </div>

                {/* CARD 4 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/rohan.png" className="ts-img" width={700} alt="Rahul" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Excellent service and professional team.</p>
                      <h6>Rohan</h6>
                      <p><span>Hospital Admin</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
