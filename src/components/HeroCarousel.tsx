import { useEffect } from 'react';

const HeroCarousel = () => {
  useEffect(() => {
    // Bootstrap JS is loaded via index.html script tags; initialize after React mounts
    if (typeof (window as any).bootstrap !== 'undefined') {
      const el = document.getElementById('hxCarousel');
      if (el) {
        new (window as any).bootstrap.Carousel(el, { interval: 3000, ride: 'carousel' });
      }
    }
  }, []);

  return (
    <div id="hxCarousel" className="carousel slide">
      <div className="carousel-inner">

        {/* SLIDE 1 */}
        <div className="carousel-item active">
          <div
            className="hx-carousel-item"
            style={{ backgroundImage: "url('/assets/img/hero_1.jpg')" }}
          >
            <div className="hx-overlay"></div>
            <div className="container">
              <div className="hx-caption hx-animate">
                <h1>Reliable Healthcare Staff, When You Need Them Most</h1>
                <p>
                  DigiVera Healthcare Services provides qualified nurses, medical support staff,
                  and equipment to hospitals and healthcare institutions across India.
                </p>
                <p>
                  <a href="tel:+919958795117" className="hx-btn">Request Staff</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="carousel-item">
          <div
            className="hx-carousel-item"
            style={{ backgroundImage: "url('/assets/img/hero_2.jpg')" }}
          >
            <div className="hx-overlay"></div>
            <div className="container">
              <div className="hx-caption hx-animate">
                <h1>Professional Medical Support Services</h1>
                <p>
                  DigiVera Healthcare Services provides qualified nurses, medical support staff,
                  and equipment to hospitals and healthcare institutions across India.
                </p>
                <p>
                  <a href="tel:+919958795117" className="hx-btn">Request Staff</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="carousel-item">
          <div
            className="hx-carousel-item"
            style={{ backgroundImage: "url('/assets/img/hero_3.jpg')" }}
          >
            <div className="hx-overlay"></div>
            <div className="container">
              <div className="hx-caption hx-animate">
                <h1>Reliable Healthcare Medical Support Services</h1>
                <p>
                  DigiVera Healthcare Services provides qualified nurses, medical support staff,
                  and equipment to hospitals and healthcare institutions across India.
                </p>
                <p>
                  <a href="tel:+919958795117" className="hx-btn">Request Staff</a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CONTROLS */}
      <button className="carousel-control-prev" data-bs-target="#hxCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" data-bs-target="#hxCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default HeroCarousel;
