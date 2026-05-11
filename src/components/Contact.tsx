const Contact = () => {
  return (
    <section className="ct-section py-5">
      <div className="container">

        {/* TOP TITLE */}
        <div className="w-100 title_sec wow fadeInDown" data-wow-delay="0.1s">
          <div className="text-center mb-5">
            <h2 className="main-title">
              We Ensure You Will Always<br />Get Best Results
            </h2>
            <p className="subtitle">
              Trusted by 120+ hospitals, we bring reliability, speed, and quality to healthcare
              staffing in India.
            </p>
          </div>
        </div>

        <div className="row align-items-start">

          {/* LEFT SIDE */}
          <div className="col-lg-5 mb-4">
            <div className="w-100 wow fadeInLeft" data-wow-delay="0.1s">
              <h4 className="ct-heading">
                Have any query?<br />Feel Free to Contact Us
              </h4>
             
              <div className="ct-info">
                <p className="call_ct">
                  <i className="bi bi-telephone"></i> <strong>+91 87962 94441</strong>
                  
                </p>
                 <hr />
                 <p className="call_ct">
                  <i className="bi bi-telephone"></i> <strong>+91 87962 94442</strong>
               
                </p>
                 <hr />
                 <p className="call_ct">
                  <i className="bi bi-telephone"></i> <strong>+91 87962 94443</strong>
                 

                </p>
                 <hr />
                <p><i className="bi bi-envelope"></i> Healthcareservices@digivera.co.in</p>
                  <hr />
               
                <p><i className="bi bi-geo-alt"></i> Noida, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3500.869429370953!2d77.3648963!3d28.663628!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbe7f2a1e783%3A0x1824eadd2cf48d44!2sDigiVera%20Technologies!5e0!3m2!1sen!2sin!4v1778048257946!5m2!1sen!2sin"
              style={{ border: 0,height: '400px', width: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* RIGHT FORM — hidden
          <div className="col-lg-7">
            <form className="ct-form wow fadeInRight" data-wow-delay="0.1s" onSubmit={handleSubmit} noValidate>
              {submitMessage && (
                <div className={`alert ${submitMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {submitMessage.text}
                </div>
              )}
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Name.."
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Company / Organization.."
                    className="form-control"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    placeholder="Email.."
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Mobile Number.."
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="col-12">
                  <textarea
                    rows={5}
                    placeholder="Message.."
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
                <div className="col-12">
                  <button className="ct-btn w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          */}

        </div>
      </div>
    </section>
  );
};

export default Contact;
