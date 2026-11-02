interface Industry {
  icon: string;
  label: string;
  delay: string;
}

const INDUSTRIES: Industry[] = [
  { icon: '/assets/img/ind_1.png', label: 'Hospitals', delay: '0.1s' },
  { icon: '/assets/img/ind_2.png', label: 'Nursing Homes', delay: '0.3s' },
  { icon: '/assets/img/ind_3.png', label: 'Corporate Healthcare', delay: '0.5s' },
  { icon: '/assets/img/ind_4.png', label: 'Clinics', delay: '0.7s' },
  { icon: '/assets/img/ind_5.png', label: 'Home Healthcare', delay: '0.8s' },
  { icon: '/assets/img/ind_6.png', label: 'Pharma Companies', delay: '0.9s' },
];

const Industries = () => (
  <section className="ind-section">
    <div className="container-fluid">
      <div className="row align-items-stretch">
        {/* Left: content */}
        <div className="col-12 col-lg-6 ind-left d-flex flex-column justify-content-center">
          <div className="title_sec wow fadeInDown" data-wow-delay="0.1s">
            <h2 className="main-title">Industries We Serve</h2>
            <p className="subtitle">
              We partner with healthcare institutions of all sizes across India, delivering
              reliable support, tailored solutions, and a commitment to improving care at
              every level.
            </p>
          </div>

          <ul className="row g-3 mt-3 list-unstyled">
            {INDUSTRIES.map(({ icon, label, delay }, index) => (
              <li key={label} className="col-6">
                <div className={`ind-box h-100 wow ${index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}`} data-wow-delay={delay} >
                  <div className="ind-icon">
                    <img src={icon} alt="" width={48} height={48} loading="lazy" />
                  </div>
                  <span className="text-uppercase">{label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: image */}
        <div className="col-12 col-lg-6 ind-right p-0">
          <img src="/assets/img/health-tech.jpg" className="w-100 h-100 object-fit-cover wow fadeInRight" data-wow-delay="0.1s" alt="Healthcare technology in use" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);

export default Industries;