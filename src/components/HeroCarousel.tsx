type Slide = {
  image: string;
  alt: string;
  title: string;
  text: string;
  cta?: { label: string; href: string };
};

const PHONE = 'tel:+919958795117';
const INTRO =
  'DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to hospitals and healthcare institutions across India.';

const SLIDES: Slide[] = [
  {
    image: '/assets/img/hero_1.jpg',
    alt: 'Nurses attending to a patient in a hospital ward',
    title: 'Reliable Healthcare Staff, When You Need Them Most',
    text: INTRO,
    cta: { label: 'Request Staff', href: PHONE },
  },
  {
    image: '/assets/img/hero_2.jpg',
    alt: 'Medical support team working together',
    title: 'Professional Medical Support Services',
    text: INTRO,
    cta: { label: 'Request Staff', href: PHONE },
  },
  {
    image: '/assets/img/hero_3.jpg',
    alt: 'Healthcare professional using medical equipment',
    title: 'Reliable Healthcare Medical Support Services',
    text: INTRO,
    cta: { label: 'Request Staff', href: PHONE },
  },
];

const HeroCarousel = () => (
  // Bootstrap's data API handles init, so no useEffect is needed.
  <section id="hxCarousel" className="carousel slide carousel-fade hx-carousel" data-bs-ride="carousel" data-bs-interval="4000" data-bs-pause="hover" data-bs-touch="true" aria-roledescription="carousel" aria-label="DigiVera Healthcare highlights" >
    <div className="carousel-indicators">
      {SLIDES.map((s, i) => (
        <button
          key={s.image}
          type="button"
          data-bs-target="#hxCarousel"
          data-bs-slide-to={i}
          className={i === 0 ? 'active' : undefined}
          aria-current={i === 0 ? 'true' : undefined}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>

    <div className="carousel-inner">
      {SLIDES.map((s, i) => (
        <div key={s.image} className={`carousel-item${i === 0 ? ' active' : ''}`}>
          <div className="hx-slide">
            {/* <img> instead of background-image: lazy loading, priority hints, alt text */}
            <img
              className="hx-slide-img"
              src={s.image}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
            />
            <div className="hx-overlay" aria-hidden="true" />
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                  <div className="hx-caption">
                    {i === 0 ? <h1>{s.title}</h1> : <h2 className="hx-title">{s.title}</h2>}
                    <p>{s.text}</p>
                    {s.cta && (
                      <a href={s.cta.href} className="hx-btn">
                        {s.cta.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#hxCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#hxCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
    </button>
  </section>
);

export default HeroCarousel;