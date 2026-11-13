import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  AlertCircle, Building2, ClipboardList, FileText, HeartPulse, Hash, Mail, MapPin, MapPinned, Phone, Send, Stethoscope, User, UserRound, Users, type LucideIcon
} from 'lucide-react';
import ResultModal from '../components/Resultmodal';
import Recaptcha, { type RecaptchaHandle } from '../components/Recaptcha';

const BRAND = '#1C398E';

// Section-level theme: recolours primary text/background utilities inside the section.
const THEME = {
  '--bs-primary': BRAND,
  '--bs-primary-rgb': '28, 57, 142',
  '--bs-primary-bg-subtle': '#e0e7f7',
  '--bs-primary-border-subtle': '#b9c7ea',
  '--bs-primary-text-emphasis': '#122660',
} as CSSProperties;

// Button variables must be set on the button itself: .btn-primary redeclares them,
// so values set on a parent section are ignored.
const BTN_THEME = {
  '--bs-btn-bg': BRAND,
  '--bs-btn-border-color': BRAND,
  '--bs-btn-hover-bg': '#162e73',
  '--bs-btn-hover-border-color': '#162e73',
  '--bs-btn-active-bg': '#12265c',
  '--bs-btn-active-border-color': '#12265c',
  '--bs-btn-disabled-bg': BRAND,
  '--bs-btn-disabled-border-color': BRAND,
} as CSSProperties;

// Bootstrap has no ratio-3x2 class, so set the ratio through its CSS variable.
const RATIO_3X2 = { '--bs-aspect-ratio': '66.6667%' } as CSSProperties;

const ICON_BOX: CSSProperties = { width: 52, height: 52 };
const HEADER_ICON_BOX: CSSProperties = { width: 44, height: 44 };
// Height of the reCAPTCHA checkbox. Reserved up front so it never shifts the layout.
const CAPTCHA_SLOT: CSSProperties = { minHeight: 78 };

/** Anchor id of the inline form. Link to it with href={`#${REQUEST_FORM_ID}`} from anywhere on the page. */
export const REQUEST_FORM_ID = 'request-staff';

/* ---------- Config ---------- */

const SHEETS_URL = import.meta.env.VITE_SHEETS_URL as string | undefined;
const SHEETS_SECRET = import.meta.env.VITE_SHEETS_SECRET as string | undefined;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
const REQUEST_TIMEOUT_MS = 15000;

/* ---------- Data ---------- */

const SERVICE_CARDS = [
  { id: 1, title: 'Nursing Staff', text: 'Qualified nurses for all departments: general wards, OPD, and speciality care.', alt: 'Nurse attending to a patient', anim: 'fadeInLeft', delay: '0.1s' },
  { id: 2, title: 'ICU & Emergency', text: 'Trained critical care staff for ICU, CCU, NICU, and emergency departments.', alt: 'Critical care team in an ICU', anim: 'fadeInDown', delay: '0.1s' },
  { id: 3, title: 'Medical Coordinators', text: 'Patient care coordinators and medical operations support staff.', alt: 'Medical coordinator at a hospital desk', anim: 'fadeInRight', delay: '0.1s' },
  { id: 4, title: 'Medical Equipment', text: 'Supply of essential medical equipment and consumables to hospitals.', alt: 'Medical equipment', anim: 'fadeInLeft', delay: '0.2s' },
  { id: 5, title: 'Ward Boys & Attendants', text: 'Reliable ward boys, patient attendants, and hospital support staff.', alt: 'Hospital attendants with a patient', anim: 'fadeInUp', delay: '0.2s' },
  { id: 6, title: 'Manpower Outsourcing', text: 'End-to-end hospital manpower outsourcing and managed staffing solutions.', alt: 'Hospital staffing team', anim: 'fadeInRight', delay: '0.2s' },
] as const;

const GENDERS = ['Male', 'Female', 'Other'] as const;
const SERVICES = ['Nurses (ANM, GNM, BSc)', 'GDAs (General Duty Assistants)', 'Physiotherapists'] as const;
const STAFF_COUNTS = ['1', '2', '3', '4', '5'] as const;
const DIGIT_FIELDS: ReadonlySet<string> = new Set(['mobile', 'pincode']);

/* ---------- Form types, state, validation ---------- */

interface FormValues {
  patientName: string; gender: string; mobile: string; email: string;
  address: string; locality: string; city: string; pincode: string;
  service: string; staffCount: string; startDate: string; condition: string; notes: string;
}
type Errors = Partial<Record<keyof FormValues, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_VALUES: FormValues = {
  patientName: '', gender: '', mobile: '', email: '', address: '', locality: '', city: '',
  pincode: '', service: '', staffCount: '', startDate: '', condition: '', notes: '',
};

const fieldId = (name: keyof FormValues) => `rs-${name}`;

// Local date (YYYY-MM-DD). toISOString() uses UTC and is wrong around midnight in IST.
const todayISO = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Keys are added in on-screen order so the first error receives focus
const validate = (v: FormValues): Errors => {
  const e: Errors = {};
  if (!v.patientName.trim()) e.patientName = 'Enter the patient’s full name.';
  if (!v.gender) e.gender = 'Select a gender.';
  if (!v.mobile) e.mobile = 'Enter a mobile number.';
  else if (!/^[6-9]\d{9}$/.test(v.mobile)) e.mobile = 'Enter a valid 10-digit mobile number.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.';
  if (!v.address.trim()) e.address = 'Enter the house / flat number and street.';
  if (!v.locality.trim()) e.locality = 'Enter the area / locality.';
  if (!v.city.trim()) e.city = 'Enter the city.';
  if (!v.pincode) e.pincode = 'Enter the PIN code.';
  else if (!/^\d{6}$/.test(v.pincode)) e.pincode = 'Enter a valid 6-digit PIN code.';
  if (!v.service) e.service = 'Select the service you need.';
  if (!v.staffCount) e.staffCount = 'Select how many staff you need.';
  if (v.startDate && v.startDate < todayISO()) e.startDate = 'Choose today or a later date.';
  return e;
};

/* ---------- Presentational helpers (Bootstrap classes only) ---------- */

interface FieldProps {
  name: keyof FormValues; label: string; icon?: LucideIcon; required?: boolean;
  error?: string; className?: string; children: ReactNode;
}

const Field = ({ name, label, icon: Icon, required, error, className = 'col-12 col-md-6', children }: FieldProps) => (
  <div className={className}>
    <label htmlFor={fieldId(name)} className="form-label d-flex align-items-center gap-2 fw-medium small mb-1">
      {Icon && <Icon size={15} strokeWidth={2} className="text-primary flex-shrink-0" aria-hidden="true" />}
      <span>
        {label}
        {required ? <span className="text-danger" aria-hidden="true"> *</span> : <span className="text-body-secondary fw-normal"> (optional)</span>}
      </span>
    </label>
    {children}
    {error && (
      <div id={`${fieldId(name)}-error`} className="invalid-feedback d-flex align-items-center gap-1">
        <AlertCircle size={14} aria-hidden="true" />
        {error}
      </div>
    )}
  </div>
);

const SectionTitle = ({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) => (
  <legend className="float-none w-100 h6 mb-3 d-flex align-items-center gap-2 py-2 px-3 rounded-3 bg-primary-subtle text-primary-emphasis">
    <Icon size={16} strokeWidth={2} aria-hidden="true" />
    {children}
  </legend>
);

/* ---------- Inline request form ---------- */

const RequestStaffForm = () => {
  const abortRef = useRef<AbortController | null>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState('');
  // reCAPTCHA is heavy, so it only loads once the visitor starts using the form
  const [captchaReady, setCaptchaReady] = useState(false);

  // Cancel any in-flight request if the component unmounts
  useEffect(() => () => abortRef.current?.abort(), []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = DIGIT_FIELDS.has(name) ? value.replace(/\D/g, '') : value;
    setValues((p) => ({ ...p, [name]: next }));
    setErrors((p) => (p[name as keyof FormValues] ? { ...p, [name]: undefined } : p));
  }, []);

  const handleCaptcha = useCallback((token: string | null) => {
    setCaptchaToken(token);
    if (token) setCaptchaError('');
  }, []);

  const closeModal = useCallback(() => {
    setStatus('idle');
    setErrorMsg('');
  }, []);

  const bind = (name: keyof FormValues) => ({
    id: fieldId(name), name, value: values[name], onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  });
  const cls = (name: keyof FormValues, base = 'form-control') => `${base}${errors[name] ? ' is-invalid' : ''}`;

  const fail = (message: string) => {
    setErrorMsg(message);
    setStatus('error');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setCaptchaReady(true);

    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid as keyof FormValues))?.focus();
      return;
    }

    if (!SHEETS_URL) return fail('Request service is not configured (VITE_SHEETS_URL missing).');
    if (!RECAPTCHA_SITE_KEY) return fail('Security check is not configured (VITE_RECAPTCHA_SITE_KEY missing).');
    if (!captchaToken) {
      setCaptchaError('Please confirm you are not a robot.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...values, secret: SHEETS_SECRET, captcha: captchaToken }),
        signal: controller.signal,
      });

      let data: { ok?: boolean; error?: string };
      try {
        data = JSON.parse(await res.text());
      } catch {
        throw new Error('Server returned an unexpected response.');
      }
      if (!data.ok) throw new Error(data.error || 'Request failed.');

      // Success: reset the form and show the modal
      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus('success');
    } catch (err) {
      setErrorMsg(
        controller.signal.aborted ? 'The request timed out. Check your connection and try again.'
          : err instanceof Error ? err.message : 'Unknown error'
      );
      setStatus('error'); // values are kept so the user can retry without retyping
    } finally {
      clearTimeout(timeout);
      captchaRef.current?.reset(); // tokens are single-use
      setCaptchaToken(null);
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section className="py-5 bg-body-tertiary" style={THEME} aria-labelledby={`${REQUEST_FORM_ID}-title`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-10">
            <div className="card border-0 shadow-sm overflow-hidden text-start">
              <div className="card-header bg-primary text-white border-0 p-4 d-flex align-items-start gap-3">
                <span className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0 bg-white bg-opacity-25" style={HEADER_ICON_BOX}>
                  <HeartPulse size={24} aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-1 small opacity-75">DigiVera Healthcare Services</p>
                  <h2 className="h4 mb-1" id={`${REQUEST_FORM_ID}-title`}>Request home care staff</h2>
                  <p className="mb-0 small opacity-75">Tell us what you need. Our care team will call you to confirm.</p>
                </div>
              </div>

              <form id={REQUEST_FORM_ID} className="card-body p-4" onSubmit={handleSubmit} onFocus={() => setCaptchaReady(true)} noValidate>
                <fieldset className="mb-4" disabled={isSubmitting}>
                  <SectionTitle icon={UserRound}>Patient and contact</SectionTitle>
                  <div className="row g-3">
                    <Field name="patientName" label="Patient full name" icon={User} required error={errors.patientName} className="col-12">
                      <input type="text" className={cls('patientName')} autoComplete="off" {...bind('patientName')} />
                    </Field>
                    <Field name="gender" label="Gender" icon={Users} required error={errors.gender}>
                      <select className={cls('gender', 'form-select')} {...bind('gender')}>
                        <option value="">Select</option>
                        {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </Field>
                    <Field name="mobile" label="Mobile / WhatsApp" icon={Phone} required error={errors.mobile}>
                      <input type="tel" inputMode="numeric" maxLength={10} className={cls('mobile')} autoComplete="tel-national" placeholder="10-digit number" {...bind('mobile')} />
                    </Field>
                    <Field name="email" label="Email" icon={Mail} error={errors.email} className="col-12">
                      <input type="email" className={cls('email')} autoComplete="email" {...bind('email')} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="mb-4" disabled={isSubmitting}>
                  <SectionTitle icon={MapPin}>Where care is needed</SectionTitle>
                  <div className="row g-3">
                    <Field name="address" label="House / flat number and street" icon={Building2} required error={errors.address} className="col-12">
                      <input type="text" className={cls('address')} autoComplete="address-line1" {...bind('address')} />
                    </Field>
                    <Field name="locality" label="Area / locality" icon={MapPinned} required error={errors.locality} className="col-12">
                      <input type="text" className={cls('locality')} autoComplete="address-line2" {...bind('locality')} />
                    </Field>
                    <Field name="city" label="City" icon={Building2} required error={errors.city}>
                      <input type="text" className={cls('city')} autoComplete="address-level2" {...bind('city')} />
                    </Field>
                    <Field name="pincode" label="PIN code" icon={Hash} required error={errors.pincode}>
                      <input type="text" inputMode="numeric" maxLength={6} className={cls('pincode')} autoComplete="postal-code" {...bind('pincode')} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="mb-4" disabled={isSubmitting}>
                  <SectionTitle icon={Stethoscope}>Service required</SectionTitle>
                  <div className="row g-3">
                    <Field name="service" label="Service" icon={ClipboardList} required error={errors.service}>
                      <select className={cls('service', 'form-select')} {...bind('service')}>
                        <option value="">Select</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field name="staffCount" label="Number of staff" icon={Users} required error={errors.staffCount}>
                      <select className={cls('staffCount', 'form-select')} {...bind('staffCount')}>
                        <option value="">Select</option>
                        {STAFF_COUNTS.map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </Field>
                    <Field name="condition" label="Reason for care" icon={HeartPulse} className="col-12">
                      <textarea rows={3} maxLength={500} className="form-control" placeholder="For example: recovering from hip surgery, needs help walking and bathing" {...bind('condition')} />
                    </Field>
                    <Field name="notes" label="Additional notes" icon={FileText} className="col-12">
                      <textarea rows={2} maxLength={500} className="form-control" {...bind('notes')} />
                    </Field>
                  </div>
                </fieldset>

                {RECAPTCHA_SITE_KEY && (
                  <div style={CAPTCHA_SLOT}>
                    {captchaReady && (
                      <Recaptcha ref={captchaRef} siteKey={RECAPTCHA_SITE_KEY} onChange={handleCaptcha} error={captchaError} />
                    )}
                  </div>
                )}

                <div className="d-grid d-sm-flex justify-content-sm-end">
                  <button type="submit" className="btn text-white d-inline-flex align-items-center justify-content-center gap-2" style={BTN_THEME} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        Send request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {(status === 'success' || status === 'error') && (
        <ResultModal type={status} message={errorMsg} onClose={closeModal} />
      )}
    </section>
  );
};

/* ---------- Services section ---------- */

interface ServicesProps { showTitle?: boolean }

const Services = ({ showTitle = true }: ServicesProps) => (
  <>
    <section className="sv-section py-5" style={THEME}>
      <div className="container text-center">
        {showTitle ? (
          // No wow animation here: this heading is usually the largest paint above the fold,
          // and WOW keeps it hidden until its script runs, which delays LCP.
          <div className="w-100 title_sec">
            <h2 className="main-title">Our Core Services</h2>
            <p className="subtitle">
              DigiVera Healthcare Services provides qualified nurses, medical support staff, and
              equipment to hospitals and healthcare institutions across India.
            </p>
          </div>
        ) : (
          // Keeps heading order valid (h2 before the h3 cards) when the visible title is hidden
          <h2 className="visually-hidden">Our Core Services</h2>
        )}

        <div className={`row g-4${showTitle ? ' mt-5' : ''}`}>
          {SERVICE_CARDS.map((c) => (
            <div className="col-12 col-md-6 col-lg-4" key={c.id}>
              <article className={`card h-100 text-start border shadow-sm overflow-hidden wow ${c.anim}`} data-wow-delay={c.delay}>
                <div className="card-body d-flex gap-3">
                  <div className="bg-primary-subtle rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={ICON_BOX}>
                    <img src={`/assets/img/c_${c.id}.png`} alt="" width={32} height={32} loading="lazy" decoding="async" className="object-fit-contain" />
                  </div>
                  <div>
                    <h3 className="h5 card-title text-primary-emphasis">{c.title}</h3>
                    <p className="card-text text-body-secondary mb-0">{c.text}</p>
                  </div>
                </div>
                <div className="ratio" style={RATIO_3X2}>
                  <img src={`/assets/img/c_${c.id}.jpg`} alt={c.alt} width={600} height={400} loading="lazy" decoding="async" className="card-img-bottom object-fit-cover" />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>

    <RequestStaffForm />
  </>
);

export default Services;