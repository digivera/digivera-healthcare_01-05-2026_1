import { memo, useState } from 'react';

/* ----------------------------- Types ----------------------------- */

type InfoCardData = {
  icon: string;
  title: string;
  text: string;
  animation?: 'fadeInLeft' | 'fadeInRight';
};

type Founder = {
  id: string;
  name: string;
  image: string;
  summary: string;
  details: string;
};

/* ----------------------------- Data ------------------------------ */

const FOUNDATION: InfoCardData = {
  icon: '/assets/img/img_7.png',
  title: 'Our Foundation',
  text: 'Our foundation is built on reliability, quality, scalability, and trust, making us a dependable partner in the healthcare ecosystem.',
};

const VISION_MISSION: InfoCardData[] = [
  {
    icon: '/assets/img/img_8.png',
    title: 'Our Vision',
    text: 'To be a trusted leader in healthcare support services, delivering innovative workforce and technology solutions that elevate patient care and operational excellence.',
    animation: 'fadeInLeft',
  },
  {
    icon: '/assets/img/img_9.png',
    title: 'Our Mission',
    text: 'To empower healthcare providers with reliable manpower and smart solutions, enabling them to focus on delivering exceptional patient outcomes.',
    animation: 'fadeInRight',
  },
];

const FOUNDERS: Founder[] = [
  {
    id: 'gourav',
    name: 'Gourav Sharma',
    image: '/assets/img/3.jpg',
    summary:
      'Gourav Sharma is the Co-Founder and Managing Director of DigiVera Group and DigiVera Healthcare Services LLP, established in March 2026. With 23+ years of experience in the IT industry, he has led large-scale global technology programs specializing in cloud transformation, operational resilience, automation, and compliance management. Having worked closely with global healthcare clients, Gourav gained valuable insights into healthcare industry challenges and workforce gaps.',
    details:
      'What began as a discussion to start an IT business evolved into the establishment of DigiVera Healthcare Services LLP with two fellow IT professionals. The name “DigiVera” represents “Digital Trust”. The organization focuses on bridging healthcare workforce gaps by providing skilled nurses, GDAs, physiotherapists, medical support professionals, and critical medical equipment support services. Gourav combines strong technology leadership with healthcare industry understanding and collaboration with domain experts to deliver scalable, reliable, and high-impact healthcare solutions.',
  },
  {
    id: 'shailender',
    name: 'Shailender Chauhan',
    image: '/assets/img/1.jpg',
    summary:
      'Driving Digital Health through Technology, Shailender Chauhan is the Managing Director & Co-Founder of DigiVera Healthcare LLP, bringing over 20 years of enterprise technology leadership across BFSI, Healthcare, Fintech, and IT Services. A seasoned strategist with deep expertise in Digital Transformation Programs, PMO Governance, SaaS & Cloud Transformation (AWS, Azure), Data Engineering, and Gen AI Analytics, he has successfully delivered large-scale digital programmes for global organisations',
    details:
      'and the Ministry of Urban Government of India. His leadership at DigiVera is anchored in making quality healthcare accessible through smart, scalable technology, integrating AI-driven insights, modern data platforms, and agile delivery to transform how healthcare organisations operate and serve patients across India.',
  },
];

/* --------------------------- Components -------------------------- */

const InfoCard = memo(({ icon, title, text, animation }: InfoCardData) => (
  <div
    className={`ab-card h-100 ${animation ? `mt-0 wow ${animation}` : ''}`}
    {...(animation && { 'data-wow-delay': '0.1s' })}
  >
    <div className="ab-icon">
      <img src={icon} className="why_ico" alt="" width={48} height={48} loading="lazy" />
    </div>
    <div className="abt-text">
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  </div>
));
InfoCard.displayName = 'InfoCard';

const FounderCard = memo(({ id, name, image, summary, details }: Founder) => {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `founder-details-${id}`;

  return (
    <div className="ts-box orange h-100">
      <div className="ts-img-wrap">
        <img src={image} alt={name} loading="lazy" />
      </div>

      <div className="ts-content">
        <h5>{name}</h5>
        <p className="short-text">{summary}</p>

        <p id={detailsId} className={`full-text ${expanded ? '' : 'd-none'}`}>
          {details}
        </p>

        <button
          type="button"
          className="ts-btn read-btn"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
});
FounderCard.displayName = 'FounderCard';

/* ------------------------------ Page ----------------------------- */

const About = () => (
  <>
    {/* ABOUT */}
    <section className="ab-section content-sec py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Image + experience badge */}
          <div className="col-12 col-md-6 position-relative">
            <img
              src="/assets/img/about_img.jpg"
              className="img-fluid ab-img wow fadeInLeft"
              data-wow-delay="0.1s"
              alt="DigiVera healthcare professionals at work"
              loading="lazy"
            />
            <div className="ab-exp-box wow fadeInLeft" data-wow-delay="0.7s">
              <h2>7+</h2>
              <p>Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div className="col-12 col-md-6 wow fadeInDown" data-wow-delay="0.1s">
            <p>
              <span className="lb-tag">ABOUT US</span>
            </p>
            <h2 className="main-title">Modern Healthcare Support for a Digital Age</h2>

            <p className="ab-text">
              DigiVera Healthcare Services LLP is a modern healthcare support organization
              committed to delivering skilled manpower and smart operational solutions to
              hospitals, clinics, and healthcare institutions.
            </p>
            <p className="ab-text">
              By combining trained professionals with technology-driven systems, we help
              healthcare providers streamline operations, maintain compliance, and focus on
              delivering high-quality patient care.
            </p>

            <InfoCard {...FOUNDATION} />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="row mt-4 g-4">
          {VISION_MISSION.map((card) => (
            <div className="col-12 col-md-6" key={card.title}>
              <InfoCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FOUNDERS */}
    <section className="founder-section py-5">
      <div className="container">
        <div className="title_sec wow fadeInDown text-center" data-wow-delay="0.1s">
          <h2 className="main-title">Visionaries Behind Our Success</h2>
          <p className="subtitle">
            The visionaries who laid the foundation and continue to drive our growth and
            innovation.
          </p>
        </div>

        <div className="row g-4 mt-4 mt-md-5 justify-content-center">
          {FOUNDERS.map((founder) => (
            <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3" key={founder.id}>
              <FounderCard {...founder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;