import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Contact Us', to: '/contact-us' },
];

// Replace "#" with your real profile URLs
const socials = [
  { label: 'Instagram', href: 'javascript:void(0)', icon: 'bi-instagram' },
  { label: 'Facebook', href: 'javascript:void(0)', icon: 'bi-facebook' },
  { label: 'YouTube', href: 'javascript:void(0)', icon: 'bi-youtube' },
  { label: 'LinkedIn', href: 'javascript:void(0)', icon: 'bi-linkedin' },
];

// Replace with your real contact details
const contacts = [
  { icon: 'bi-telephone-fill', text: ['+91 87962 94441', '+91 87962 94442'], href: ['tel:+918796294441', 'tel:+918796294442'] },
  { icon: 'bi-envelope-fill', text: 'Healthcareservices@digivera.co.in', href: 'mailto:Healthcareservices@digivera.co.in' },
  { icon: 'bi-geo-alt-fill', text: 'Sector 8, Noida, Uttar Pradesh 201012' },
];

const Footer = () => {
  return (
    <footer className="text-light border-top border-info border-3" style={{ backgroundColor: '#1c398e' }}>
      <div className="container">
        <div className="row g-5 py-5">

          {/* BRAND */}
          <div className="col-lg-4 text-center text-lg-start">
            <img src="/assets/img/logo.webp" alt="Digivera Healthcare Services"  width={1352} height={385} className="mb-3" loading="lazy" style={{ height: 56, width: 'auto' }} />
            <p className="text-light text-opacity-75 mx-auto mx-lg-0" style={{ maxWidth: 360 }}>
              Reliable healthcare support services that help providers spend less time on
              paperwork and more time on patients.
            </p>
            <div className="d-flex gap-2 my-3 justify-content-center justify-content-lg-start">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="btn btn-outline-light rounded-circle d-inline-flex align-items-center justify-content-center p-0" style={{ width: 40, height: 40 }} >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-6 col-lg-4 text-center text-md-start ps-lg-5">
            <h2 className="fw-bold h5 mb-4 text-light">Quick links</h2>
            <ul className="list-unstyled mb-0">
              {quickLinks.map(({ label, to }) => (
                <li key={to} className="mb-2">
                  <Link to={to} className="link-light link-opacity-75 link-opacity-100-hover link-underline-opacity-0 link-underline-opacity-100-hover" >
                    <i className="bi bi-chevron-right text-info small me-2"></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-6 col-lg-4 text-center text-md-start">
            <h2 className="fw-bold h5 mb-4 text-light">Get in touch</h2>
            <ul className="list-unstyled mb-0">
              {contacts.map(({ icon, text, href }) => (
                <li key={icon} className="d-flex align-items-start gap-3 mb-3 justify-content-center justify-content-md-start">
                  <span className="bg-info bg-opacity-10 text-info rounded-3 d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 36, height: 36 }} >
                    <i className={`bi ${icon}`}></i>
                  </span>
                  {Array.isArray(text) ? (
                    text.map((t, i) => (
                      <div key={i} className="d-flex align-items-center justify-content-center h-100" >
                        {href && href[i] ? (
                          <a href={href[i]} className="link-light link-opacity-75 link-opacity-100-hover link-underline-opacity-0 text-center" >
                            {t}
                          </a>
                        ) : (
                          <span className="text-light text-opacity-75 text-center">{t}</span>
                        )}
                      </div>
                    ))
                  ) : typeof href === 'string' ? (
                    <a href={href} className="link-light link-opacity-75 link-opacity-100-hover link-underline-opacity-0 align-self-center">
                      {text}
                    </a>
                  ) : (
                    <span className="text-light text-opacity-75 text-start align-self-center">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-top border-secondary border-opacity-50 bg-black bg-opacity-25">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 py-3 small">
          <span className="text-light text-opacity-75">
            &copy; {new Date().getFullYear()} Digivera Healthcare Services LLP. All rights reserved.
          </span>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" >
            <i className="bi bi-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;