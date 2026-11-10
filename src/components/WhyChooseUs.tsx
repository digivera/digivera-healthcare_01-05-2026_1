interface Feature {
  icon: string;
  title: string;
  text: string;
  animation: string;
  delay: string;
}

const TOP_FEATURES: Feature[] = [
  {
    icon: '/assets/img/img_1.png',
    title: 'Verified Professionals',
    text: 'All staff undergo thorough background checks and credential verification.',
    animation: 'fadeInLeft',
    delay: '0.1s',
  },
  {
    icon: '/assets/img/img_2.png',
    title: '24/7 Availability',
    text: 'Round-the-clock staffing support for emergency and regular requirements.',
    animation: 'fadeInRight',
    delay: '0.1s',
  },
];

const BOTTOM_FEATURES: Feature[] = [
  {
    icon: '/assets/img/img_3.png',
    title: 'Industry Compliance',
    text: 'Fully compliant with healthcare regulations and labour laws.',
    animation: 'fadeInLeft',
    delay: '0.1s',
  },
  {
    icon: '/assets/img/img_4.png',
    title: 'Quick Deployment',
    text: 'Rapid deployment of trained staff within 24 to 48 hours.',
    animation: 'fadeInUp',
    delay: '0.1s',
  },
  {
    icon: '/assets/img/img_5.png',
    title: 'Quality Assurance',
    text: 'Continuous performance monitoring and quality reviews.',
    animation: 'fadeInUp',
    delay: '0.2s',
  },
  {
    icon: '/assets/img/img_6.png',
    title: 'Pan-India Reach',
    text: 'Serving hospitals and healthcare facilities across major Indian cities.',
    animation: 'fadeInRight',
    delay: '0.1s',
  },
];

const FeatureCard = ({ icon, title, text, animation, delay }: Feature) => (
  <div className={`zx-card h-100 wow ${animation}`} data-wow-delay={delay}>
    <div className="zx-icon rounded-circle">
      <img src={icon} className="why_ico" alt="" width={64} height={64} loading="lazy" />
    </div>
    <h3 className="h5 mt-2">{title}</h3>
    <p>{text}</p>
  </div>
);

const WhyChooseUs = () => {
  const [left, right] = TOP_FEATURES;

  return (
    <section className="zx-why-section py-5">
      <div className="container text-center">
        {/* Heading */}
        <div className="title_sec wow fadeInDown" data-wow-delay="0.1s">
          <h2 className="main-title">Why People Choose Us!</h2>
          <p className="subtitle mx-auto">
            Trusted by 120+ hospitals, we bring reliability, speed, and quality to healthcare
            staffing in India. DigiVera Healthcare Services provides qualified nurses, medical
            support staff, and equipment to hospitals and healthcare institutions across India.
          </p>
        </div>

        <div className="row align-items-center mt-4 g-4">
          <div className="col-12 col-lg-6 order-first order-lg-1">
            <div className="zx-image-box wow fadeInDown" data-wow-delay="0.1s">
              <img src="/assets/img/why.jpg" className="img-fluid" alt="Healthcare professionals at work" loading="lazy" />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 order-lg-0">
            <FeatureCard {...left} />
          </div>

          <div className="col-12 col-sm-6 col-lg-3 order-lg-2">
            <FeatureCard {...right} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="row mt-2 g-4">
          {BOTTOM_FEATURES.map((feature) => (
            <div key={feature.title} className="col-12 col-sm-6 col-lg-3">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;