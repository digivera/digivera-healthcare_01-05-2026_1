const contacts = [
  {
    icon: "bi-telephone",
    label: "Call us",
    value: "+91 87962 94441",
    href: "tel:+918796294441",
  },
  {
    icon: "bi-telephone",
    label: "Call us (alternate)",
    value: "+91 87962 94442",
    href: "tel:+918796294442",
  },
  {
    icon: "bi-envelope",
    label: "Email us",
    value: "Healthcareservices@digivera.co.in",
    href: "mailto:Healthcareservices@digivera.co.in",
  },
  {
    icon: "bi-geo-alt",
    label: "Visit us",
    value: "Sector 8, Vasundhara, Noida, Ghaziabad, Uttar Pradesh 201012",
    href: "https://www.google.com/maps/search/?api=1&query=DigiVera+Technologies+Vasundhara+Ghaziabad",
  },
];

const Contact = () => {
  return (
    <section className="py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        {/* TOP TITLE */}
        <div className="text-center mx-auto mb-5 wow fadeInDown" data-wow-delay="0.1s" style={{ maxWidth: 640 }}>
          <h2 className="display-5 fw-bold mb-3">
            We ensure you will always
            <br />
            get the best results
          </h2>
          <p className="lead text-secondary mb-0">
            Trusted by 120+ hospitals, we bring reliability, speed and quality
            to healthcare staffing in India.
          </p>
        </div>

        <div className="row g-0 rounded-4 overflow-hidden shadow-lg bg-white wow fadeInUp" data-wow-delay="0.15s">
          {/* LEFT: contact details */}
          <div className="col-lg-5">
            <div className="h-100 p-4 p-md-5 text-bg-primary">
              <h4 className="fw-bold mb-2">Have a query? Feel free to contact us</h4>
              <p className="text-white-50 mb-4">
                Tell us what your hospital needs. We'll get back to you quickly.
              </p>

              <ul className="list-unstyled mb-0 d-flex flex-column gap-4">
                {contacts.map((c) => (
                  <li key={c.value}>
                    <a href={c.href} className="d-flex align-items-center gap-3 text-white text-decoration-none"
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="flex-shrink-0 d-inline-flex align-items-center justify-content-center bg-white text-primary rounded-3 p-3 fs-5">
                        <i className={`bi ${c.icon}`}></i>
                      </span>
                      <span className="d-flex flex-column">
                        <small className="text-white-50">{c.label}</small>
                        <strong className="text-break">{c.value}</strong>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: map */}
          <div className="col-lg-7">
            <div className="position-relative h-100" style={{ minHeight: 380 }}>
              <iframe title="DigiVera Technologies location" className="position-absolute top-0 start-0 w-100 h-100 border-0"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3500.869429370953!2d77.3648963!3d28.663628!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbe7f2a1e783%3A0x1824eadd2cf48d44!2sDigiVera%20Technologies!5e0!3m2!1sen!2sin!4v1778048257946!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              <a className="btn btn-light rounded-pill shadow fw-semibold position-absolute bottom-0 start-0 m-3 px-4" href="https://www.google.com/maps/dir/?api=1&destination=DigiVera+Technologies+Vasundhara+Ghaziabad" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-signpost-split me-2 text-primary"></i>
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;