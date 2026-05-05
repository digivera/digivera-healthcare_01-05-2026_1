import { useState } from 'react';

type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const CONTACT_API_URL =
  ((import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.trim() ||
    '/api');

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: ContactFormData) => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!/^[0-9+()\-\s]{10,15}$/.test(data.phone.trim())) {
      nextErrors.phone = 'Please enter a valid mobile number.';
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name.trim(),
          Company: formData.company.trim(),
          Email: formData.email.trim(),
          Phone: formData.phone.trim(),
          Message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSubmitMessage({ type: 'success', text: 'Thanks! Your message has been sent successfully.' });
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({});
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Unable to submit right now. Please check API URL/CORS settings and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <p className="ct-text">
                Fill out the form below to schedule an appointment or inquire about our services.
              </p>
              <div className="ct-info">
                <p className="call_ct">
                  <i className="bi bi-telephone"></i> <strong>+91 9958795117</strong>
                </p>
                <hr />
                <p><i className="bi bi-envelope"></i> customersupport@digivera.co.in</p>
                <hr />
                <p><i className="bi bi-geo-alt"></i> Noida, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
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

        </div>
      </div>
    </section>
  );
};

export default Contact;
