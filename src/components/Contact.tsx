import { Link } from "react-router-dom";

const contacts = [
  {
    icon: "bi-telephone",
    label: "Call us",
    value: "+91 87962 94441",
    href: "tel:+918796294441",
  },
  {
    icon: "bi-telephone-forward",
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
    value: "Noida, Ghaziabad, Uttar Pradesh 201012",
    href: "https://www.google.com/maps/search/?api=1&query=DigiVera+Technologies+Vasundhara+Ghaziabad",
  },
];

const Contact = () => {
  return (
    <section className="py-5">
      <div className="container py-lg-4">
        {/* TOP TITLE */}
        <div className="text-center mx-auto mb-5" data-wow-delay="0.1s" style={{ maxWidth: 680 }} >
          <span className="badge rounded-pill text-bg-primary-subtle text-primary-emphasis border border-primary-subtle px-3 py-2 mb-3">
            <i className="bi bi-hospital me-2"></i>
            Trusted by 120+ hospitals
          </span>
          <h2 className="display-5 fw-bold text-body-emphasis mb-3">
            We ensure you will always
            <br />
            get the best results
          </h2>
          <p className="lead fw-normal text-body-secondary mb-0">
            We bring reliability, speed and quality to healthcare staffing in
            India.
          </p>
        </div>

        <div className="card border-0 rounded-4 shadow overflow-hidden wow fadeInUp" data-wow-delay="0.15s" >
          <div className="row g-0">
            {/* LEFT: contact details */}
            <div className="col-lg-5 d-flex flex-column">
              <div className="p-4 p-md-5 pb-3 pb-md-4">
                <h3 className="h4 fw-bold text-body-emphasis mb-2">
                  Have a query? Feel free to contact us
                </h3>
                <p className="text-secondary mb-0">
                  Tell us what your hospital needs. We'll get back to you
                  quickly.
                </p>
              </div>

              <div className="list-group list-group-flush border-top flex-grow-1">
                {contacts.map((c) => (
                  <Link key={c.value} to={c.href} className="list-group-item list-group-item-action d-flex align-items-center gap-3 px-4 px-md-5 py-3"
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="flex-shrink-0 d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle fs-5" style={{ width: 48, height: 48 }} >
                      <i className={`bi ${c.icon}`}></i>
                    </span>
                    <span className="d-flex flex-column flex-grow-1">
                      <small className="text-secondary fw-semibold">
                        {c.label}
                      </small>
                      <span className="fw-semibold text-body-emphasis text-break">
                        {c.value}
                      </span>
                    </span>
                    <i className="bi bi-chevron-right text-secondary small d-none d-sm-inline"></i>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: map */}
            <div className="col-lg-7">
              <div className="position-relative h-100" style={{ minHeight: 420 }} >
                <iframe title="DigiVera Technologies location" className="position-absolute top-0 start-0 w-100 h-100 border-0" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3500.869429370953!2d77.3648963!3d28.663628!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbe7f2a1e783%3A0x1824eadd2cf48d44!2sDigiVera%20Technologies!5e0!3m2!1sen!2sin!4v1778048257946!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="position-absolute bottom-0 start-0 end-0 m-3">
                  <div className="bg-white rounded-3 shadow p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle flex-shrink-0" style={{ width: 40, height: 40 }} >
                        <i className="bi bi-geo-alt-fill"></i>
                      </span>
                      <div className="lh-sm">
                        <div className="fw-bold text-body-emphasis">
                          DigiVera Technologies
                        </div>
                        <small className="text-secondary">
                          Vasundhara, Ghaziabad
                        </small>
                      </div>
                    </div>
                    <Link className="btn btn-primary rounded-pill px-4 d-inline-flex align-items-center gap-2" to="https://www.google.com/maps/dir/?api=1&destination=DigiVera+Technologies+Vasundhara+Ghaziabad" target="_blank" rel="noopener noreferrer" >
                      <i className="bi bi-signpost-split"></i>
                      Get directions
                    </Link>
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

export default Contact;