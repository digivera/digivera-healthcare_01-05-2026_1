import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    bg: "/img/hero_1.jpg",
    title: "Reliable Healthcare Staff, When You Need Them Most",
  },
  {
    bg: "/img/hero_2.jpg",
    title: "Professional Medical Support Services",
  },
  {
    bg: "/img/hero_3.jpg",
    title: "Reliable Healthcare Medical Support Services",
  },
];

const INTERVAL = 4000;

function HeroCarousel() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div id="hxCarousel" className="carousel slide">
      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div key={i} className={`carousel-item${active === i ? " active" : ""}`}>
            <div className="hx-carousel-item" style={{ backgroundImage: `url('${slide.bg}')` }}>
              <div className="hx-overlay"></div>

              <div className="container">
                <div className="hx-caption hx-animate">
                  <h1>{slide.title}</h1>
                  <p>
                    DigiVera Healthcare Services provides qualified nurses, medical support staff,
                    and equipment to hospitals and healthcare institutions across India.
                  </p>
                  <p><a href="#" className="hx-btn">Request Staff</a></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={() => goTo(active - 1)}
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        onClick={() => goTo(active + 1)}
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default HeroCarousel;
