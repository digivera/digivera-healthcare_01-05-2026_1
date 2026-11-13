import { memo, useId, useState } from 'react';

/* Bootstrap 5.3 only: no custom CSS file, no inline styles, no animation library.
   Bootstrap Icons (bi-*) is used for the chevron, as in your original code. */

/* ----------------------------- Types ----------------------------- */

type Pillar = { label: string; note: string };

type Principle = {
  icon: string;
  title: string;
  text: string;
};

type Founder = {
  id: string;
  name: string;
  role?: string;
  image: string;
  summary: string;
  details: string;
};

/* ----------------------------- Data ------------------------------ */

const FOUNDATION_TEXT =
  'Our foundation is built on reliability, quality, scalability, and trust, making us a dependable partner in the healthcare ecosystem.';

const PILLARS: Pillar[] = [
  { label: 'Reliability', note: 'Shifts covered, every time' },
  { label: 'Quality', note: 'Trained, vetted professionals' },
  { label: 'Scalability', note: 'From one clinic to a hospital network' },
  { label: 'Trust', note: 'Compliance and clear systems' },
];

const PRINCIPLES: Principle[] = [
  {
    icon: '/assets/img/img_8.png',
    title: 'Our Vision',
    text: 'To be a trusted leader in healthcare support services, delivering innovative workforce and technology solutions that elevate patient care and operational excellence.',
  },
  {
    icon: '/assets/img/img_9.png',
    title: 'Our Mission',
    text: 'To empower healthcare providers with reliable manpower and smart solutions, enabling them to focus on delivering exceptional patient outcomes.',
  },
];

const FOUNDERS: Founder[] = [
  {
    id: 'gourav',
    name: 'Gourav Sharma',
    image: '/assets/img/3.jpg',
    summary:
      'To be a trusted global leader in healthcare workforce solutions, where digital trust meets human care. DigiVera bridges critical talent gaps by delivering skilled medical professionals and reliable equipment support, powered by technology leadership and deep healthcare insight to create scalable, high-impact outcomes for patients and providers alike.',
    details:
      'What began as a discussion to start an IT business evolved into the establishment of DigiVera Healthcare Services LLP with two fellow IT professionals. The name “DigiVera” represents “Digital Trust”. The organization focuses on bridging healthcare workforce gaps by providing skilled nurses, GDAs, physiotherapists, medical support professionals, and critical medical equipment support services. Gourav combines strong technology leadership with healthcare industry understanding and collaboration with domain experts to deliver scalable, reliable, and high-impact healthcare solutions.',
  },
  {
    id: 'shailender',
    name: 'Shailender Chauhan',
    image: '/assets/img/1.jpg',
    summary:
      'Driving Digital Health through Technology, Shailender Chauhan is the Managing Director & Co-Founder of DigiVera Healthcare LLP, bringing over 20 years of enterprise technology leadership across BFSI, Healthcare, Fintech, and IT Services. A seasoned strategist with deep expertise in Digital Transformation Programs, PMO Governance, SaaS & Cloud Transformation (AWS, Azure), Data Engineering, and Gen AI Analytics, he has successfully delivered large-scale digital programmes for global organisations',
    details: '',
  },
];

/* --------------------------- Components -------------------------- */

const PillarList = memo(() => (
  <ul className="row row-cols-1 row-cols-sm-2 g-3 list-unstyled mb-0">
    {PILLARS.map(({ label, note }) => (
      <li className="col" key={label}>
        <div className="h-100 bg-body border-start border-dark border-4 rounded-end-3 shadow-sm p-3">
          <strong className="d-block h5 mb-1">{label}</strong>
          <span className="small text-body-secondary">{note}</span>
        </div>
      </li>
    ))}
  </ul>
));
PillarList.displayName = 'PillarList';

const PrincipleCard = memo(({ icon, title, text }: Principle) => (
  <article className="h-100 border-top border-warning border-3 pt-4">
    <span className="d-inline-flex bg-custom rounded-circle p-2 mb-3">
      <img src={icon} alt="" width={40} height={40} loading="lazy" decoding="async" />
    </span>
    <h3 className="text-white fw-bold">{title}</h3>
    <p className="mb-0 opacity-75">{text}</p>
  </article>
));
PrincipleCard.displayName = 'PrincipleCard';

const FounderCard = memo(
  ({ name, role, image, summary, details, reverse }: Founder & { reverse: boolean }) => {
    const [open, setOpen] = useState(false);
    const uid = useId();
    const detailsId = `${uid}-details`;
    const nameId = `${uid}-name`;

    return (
      <article
        className={`row g-4 g-lg-5 align-items-center ${reverse ? 'flex-md-row-reverse' : ''}`}
        aria-labelledby={nameId}
      >
        {/* Photo */}
        <div className="col-12 col-sm-8 col-md-5 col-lg-4 mx-auto">
          <div className="ratio ratio-1x1 bg-body-secondary rounded-4 overflow-hidden border border-warning border-4 shadow">
            <img
              src={image}
              alt={name}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="object-fit-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="col-12 col-md-7 col-lg-8">
          <h3 id={nameId} className="h2 fw-bold mb-1 text-break">
            {name}
          </h3>
          {role && <p className="fw-semibold text-success mb-3">{role}</p>}

          <p className="text-body-secondary mt-2">{summary}</p>

          {details && (
            <>
              <div id={detailsId} className={`collapse ${open ? 'show' : ''}`}>
                <p className="bg-warning-subtle border-start border-warning border-4 rounded-end-3 p-3 mb-3 small">
                  {details}
                </p>
              </div>

              <button
                type="button"
                className="btn btn-outline-dark rounded-pill px-4 fw-semibold"
                aria-expanded={open}
                aria-controls={detailsId}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? 'Read less' : 'Read their story'}
                <i
                  className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}
                  aria-hidden="true"
                />
              </button>
            </>
          )}
        </div>
      </article>
    );
  },
);
FounderCard.displayName = 'FounderCard';

/* ------------------------------ Page ----------------------------- */

const About = () => (
  <main className="overflow-x-hidden">
    {/* HERO */}
    <section className="py-5 border-bottom border-warning border-5" aria-labelledby="about-title">
      <div className="container py-lg-4">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-7 order-2 order-lg-1">
            <p className="fw-semibold text-success mb-2">
              About DigiVera Healthcare Services LLP
            </p>
            <h1 id="about-title" className="display-4 fw-bold lh-1 mb-4">
              Modern healthcare support for a digital age
            </h1>
            <p className="lead fw-medium mb-3">
              We are a healthcare support organization delivering skilled manpower and smart
              operational solutions to hospitals, clinics, and healthcare institutions.
            </p>
            <p className="text-body-secondary mb-0">
              By combining trained professionals with technology-driven systems, we help
              healthcare providers streamline operations, maintain compliance, and focus on
              delivering high-quality patient care.
            </p>
          </div>

          {/* Arch-shaped photo with experience badge */}
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 order-1 order-lg-2 mx-auto">
            <div className="position-relative">
              <div className="ratio ratio-1x1 bg-body-secondary rounded-top-pill rounded-bottom-4 overflow-hidden border border-warning border-4">
                <img
                  src="/assets/img/about_img.jpg"
                  alt="DigiVera healthcare professionals at work"
                  width={640}
                  height={640}
                  fetchPriority="high"
                  decoding="async"
                  className="object-fit-cover"
                />
              </div>
              <div
                className="position-absolute bottom-0 start-0 m-3 bg-dark text-white rounded-4 shadow px-4 py-3 text-center lh-sm"
                role="img"
                aria-label="Over 7 years of experience"
              >
                <b className="d-block display-5 fw-bold text-warning">7+</b>
                <span className="small">years in care support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FOUNDATION */}
    <section className="bg-warning-subtle py-5" aria-labelledby="foundation-title">
      <div className="container py-lg-4">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-lg-5">
            <h2 id="foundation-title" className="display-6 fw-bold mb-3">
              Our Foundation
            </h2>
            <p className="fs-5 text-body-secondary mb-0">{FOUNDATION_TEXT}</p>
          </div>
          <div className="col-12 col-lg-7">
            <PillarList />
          </div>
        </div>
      </div>
    </section>

    {/* VISION & MISSION */}
    <section className="bg-dark text-white py-5" aria-label="Vision and mission">
      <div className="container py-lg-4">
        <div className="row g-4 g-lg-5">
          {PRINCIPLES.map((p) => (
            <div className="col-12 col-md-6" key={p.title}>
              <PrincipleCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FOUNDERS */}
    <section className="bg-body-tertiary py-5" aria-labelledby="founders-title">
      <div className="container py-lg-4">
        <header className="row justify-content-center text-center mb-5">
          <div className="col-12 col-md-10 col-lg-7">
            <h2 id="founders-title" className="display-6 fw-bold mb-3">
              Visionaries behind our success
            </h2>
            <hr className="border-warning border-3 opacity-100 rounded-pill w-25 mx-auto mt-0 mb-3" />
            <p className="lead text-body-secondary mb-0">
              The people who laid the foundation and continue to drive our growth and innovation.
            </p>
          </div>
        </header>

        <ul className="d-flex flex-column gap-5 list-unstyled mb-0">
          {FOUNDERS.map((f, i) => (
            <li key={f.id}>
              <FounderCard {...f} reverse={i % 2 === 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  </main>
);

export default About;