import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  AlertCircle, Building2, CalendarDays, ClipboardList, FileText, HeartPulse, Hash, Mail, MapPin, MapPinned,
  Phone, Send, Stethoscope, User, UserRound, Users, type LucideIcon
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

// Button variables must be set on the button itself: .btn-primary redeclares them.
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

const ICON_BOX: CSSProperties = { width: 52, height: 52 };
const HEADER_ICON_BOX: CSSProperties = { width: 44, height: 44 };
const CAPTCHA_SLOT: CSSProperties = { minHeight: 78 }; // reserved so the widget never shifts layout
const HONEYPOT: CSSProperties = { position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' };

/** Anchor id of the inline form. Link to it with href={`#${REQUEST_FORM_ID}`}. */
export const REQUEST_FORM_ID = 'request-staff';

/* ---------- Config ---------- */

const SHEETS_URL = import.meta.env.VITE_SHEETS_URL as string | undefined;
const SHEETS_SECRET = import.meta.env.VITE_SHEETS_SECRET as string | undefined;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
const REQUEST_TIMEOUT_MS = 15000;

// Evaluated once. reCAPTCHA is mandatory: without a site key the form refuses to submit.
const CONFIG_ERROR = !SHEETS_URL
  ? 'Request service is not configured (VITE_SHEETS_URL missing).'
  : !RECAPTCHA_SITE_KEY
    ? 'Security check is not configured (VITE_RECAPTCHA_SITE_KEY missing).'
    : null;

/* ---------- Data ---------- */

const SERVICE_CARDS = [
  { id: 1, title: 'Nursing Staff', text: 'Qualified nurses for all departments: general wards, OPD, and speciality care.', anim: 'fadeInLeft', delay: '0.1s' },
  { id: 2, title: 'ICU & Emergency', text: 'Trained critical care staff for ICU, CCU, NICU, and emergency departments.', anim: 'fadeInDown', delay: '0.1s' },
  { id: 3, title: 'Medical Coordinators', text: 'Patient care coordinators and medical operations support staff.', anim: 'fadeInRight', delay: '0.1s' },
  { id: 4, title: 'Medical Equipment', text: 'Supply of essential medical equipment and consumables to hospitals.', anim: 'fadeInLeft', delay: '0.2s' },
  { id: 5, title: 'Ward Boys & Attendants', text: 'Reliable ward boys, patient attendants, and hospital support staff.', anim: 'fadeInUp', delay: '0.2s' },
  { id: 6, title: 'Manpower Outsourcing', text: 'End-to-end hospital manpower outsourcing and managed staffing solutions.', anim: 'fadeInRight', delay: '0.2s' },
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

// Apps Script cannot return real HTTP status codes, so the backend sends a `code` in the JSON.
interface ServerResponse { ok?: boolean; code?: string; error?: string; fields?: Errors }

class ApiError extends Error {
  public code: string;
  public fields?: Errors;

  constructor(code: string, message: string, fields?: Errors) {
    super(message);
    this.code = code;
    this.fields = fields;
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  CAPTCHA_FAILED: 'The security check expired or failed. Please tick the box again.',
  RATE_LIMITED: 'We already received a request from this number. Please wait a minute before sending another.',
  SERVER: 'Something went wrong on our side. Please try again shortly.',
};
const CAPTCHA_REQUIRED_MSG = 'Please confirm you are not a robot.';

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

const MOBILE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^\d{6}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keys are added in on-screen order so the first error receives focus
const validate = (v: FormValues): Errors => {
  const e: Errors = {};
  if (!v.patientName.trim()) e.patientName = 'Enter the patient’s full name.';
  if (!v.gender) e.gender = 'Select a gender.';
  if (!v.mobile) e.mobile = 'Enter a mobile number.';
  else if (!MOBILE_RE.test(v.mobile)) e.mobile = 'Enter a valid 10-digit mobile number.';
  if (v.email && !EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.';
  if (!v.address.trim()) e.address = 'Enter the house / flat number and street.';
  if (!v.locality.trim()) e.locality = 'Enter the area / locality.';
  if (!v.city.trim()) e.city = 'Enter the city.';
  if (!v.pincode) e.pincode = 'Enter the PIN code.';
  else if (!PIN_RE.test(v.pincode)) e.pincode = 'Enter a valid 6-digit PIN code.';
  if (!v.service) e.service = 'Select the service you need.';
  if (!v.staffCount) e.staffCount = 'Select how many staff you need.';
  if (v.startDate && v.startDate < todayISO()) e.startDate = 'Choose today or a later date.';
  return e;
};

const focusField = (name: string) => document.getElementById(fieldId(name as keyof FormValues))?.focus();

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
  const abortRef = useRef<AbortController | null>(null); // non-null while a request is in flight
  const captchaRef = useRef<RecaptchaHandle>(null);
  const captchaSlotRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState('');

  // Cancel any in-flight request if the component unmounts
  useEffect(() => () => abortRef.current?.abort(), []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = DIGIT_FIELDS.has(name) ? value.replace(/\D/g, '') : value;
    setValues((p) => ({ ...p, [name]: next }));
    setErrors((p) => (p[name as keyof FormValues] ? { ...p, [name]: undefined } : p));
  }, []);

  // Called with a token on success and with null when the token expires or the widget resets
  const handleCaptcha = useCallback((token: string | null) => {
    setCaptchaToken(token);
    if (token) setCaptchaError('');
  }, []);

  const closeModal = useCallback(() => {
    setStatus('idle');
    setErrorMsg('');
  }, []);

  const bind = (name: keyof FormValues, required = false) => ({
    id: fieldId(name), name, value: values[name], onChange: handleChange,
    'aria-required': required || undefined,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  });
  const cls = (name: keyof FormValues, base = 'form-control') => `${base}${errors[name] ? ' is-invalid' : ''}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (abortRef.current) return; // a request is already running (guards against double submit)

    // Bot filled the hidden field: pretend success and send nothing
    if (honeypotRef.current?.value) {
      setValues(INITIAL_VALUES);
      setStatus('success');
      return;
    }

    if (CONFIG_ERROR) {
      setErrorMsg(CONFIG_ERROR);
      setStatus('error');
      return;
    }

    // Validate fields AND captcha together so the user sees every problem at once
    const found = validate(values);
    const captchaMissing = !captchaToken;
    setErrors(found);
    setCaptchaError(captchaMissing ? CAPTCHA_REQUIRED_MSG : '');

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }
    if (captchaMissing) {
      captchaSlotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const controller = new AbortController();
    abortRef.current = controller;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(SHEETS_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...values, secret: SHEETS_SECRET, captcha: captchaToken, company_url: '' }),
        signal: controller.signal,
      });

      let data: ServerResponse;
      try {
        data = JSON.parse(await res.text());
      } catch {
        throw new ApiError('SERVER', ERROR_MESSAGES.SERVER);
      }
      if (!data.ok) {
        throw new ApiError(
          data.code ?? 'UNKNOWN',
          ERROR_MESSAGES[data.code ?? ''] ?? data.error ?? 'Request failed.',
          data.fields
        );
      }

      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus('success');
    } catch (err) {
      // Aborted by unmount, not by the timeout: the component is gone, nothing to update
      if (controller.signal.aborted && !timedOut) return;

      if (err instanceof ApiError) {
        if (err.code === 'CAPTCHA_FAILED') {
          setCaptchaError(err.message);
          setStatus('idle');
          return;
        }
        if (err.code === 'INVALID_FIELDS' && err.fields) {
          setErrors(err.fields);
          setStatus('idle');
          const first = Object.keys(err.fields)[0];
          if (first) focusField(first);
          return;
        }
      }
      setErrorMsg(
        timedOut ? 'The request timed out. Check your connection and try again.'
          : err instanceof Error ? err.message : 'Unknown error'
      );
      setStatus('error'); // values are kept so the user can retry without retyping
    } finally {
      clearTimeout(timeout);
      abortRef.current = null;
      captchaRef.current?.reset(); // tokens are single-use, so the user must tick again
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
                  <h2 className="h4 mb-1 text-white" id={`${REQUEST_FORM_ID}-title`}>Request home care staff</h2>
                  <p className="mb-0 small opacity-75">Tell us what you need. Our care team will call you to confirm.</p>
                </div>
              </div>

              <form id={REQUEST_FORM_ID} className="card-body p-4" onSubmit={handleSubmit} noValidate>
                <fieldset className="mb-4" disabled={isSubmitting}>
                  <SectionTitle icon={UserRound}>Patient and contact</SectionTitle>
                  <div className="row g-3">
                    <Field name="patientName" label="Patient full name" icon={User} required error={errors.patientName} className="col-12">
                      <input type="text" className={cls('patientName')} autoComplete="off" {...bind('patientName', true)} />
                    </Field>
                    <Field name="gender" label="Gender" icon={Users} required error={errors.gender}>
                      <select className={cls('gender', 'form-select')} {...bind('gender', true)}>
                        <option value="">Select</option>
                        {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </Field>
                    <Field name="mobile" label="Mobile / WhatsApp" icon={Phone} required error={errors.mobile}>
                      <input type="tel" inputMode="numeric" maxLength={10} className={cls('mobile')} autoComplete="tel-national" placeholder="10-digit number" {...bind('mobile', true)} />
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
                      <input type="text" className={cls('address')} autoComplete="address-line1" {...bind('address', true)} />
                    </Field>
                    <Field name="locality" label="Area / locality" icon={MapPinned} required error={errors.locality} className="col-12">
                      <input type="text" className={cls('locality')} autoComplete="address-line2" {...bind('locality', true)} />
                    </Field>
                    <Field name="city" label="City" icon={Building2} required error={errors.city}>
                      <input type="text" className={cls('city')} autoComplete="address-level2" {...bind('city', true)} />
                    </Field>
                    <Field name="pincode" label="PIN code" icon={Hash} required error={errors.pincode}>
                      <input type="text" inputMode="numeric" maxLength={6} className={cls('pincode')} autoComplete="postal-code" {...bind('pincode', true)} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="mb-4" disabled={isSubmitting}>
                  <SectionTitle icon={Stethoscope}>Service required</SectionTitle>
                  <div className="row g-3">
                    <Field name="service" label="Service" icon={ClipboardList} required error={errors.service}>
                      <select className={cls('service', 'form-select')} {...bind('service', true)}>
                        <option value="">Select</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field name="staffCount" label="Number of staff" icon={Users} required error={errors.staffCount}>
                      <select className={cls('staffCount', 'form-select')} {...bind('staffCount', true)}>
                        <option value="">Select</option>
                        {STAFF_COUNTS.map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </Field>
                    <Field name="startDate" label="Preferred start date" icon={CalendarDays} error={errors.startDate} className="col-12">
                      <input type="date" min={todayISO()} className={cls('startDate')} {...bind('startDate')} />
                    </Field>
                    <Field name="condition" label="Reason for care" icon={HeartPulse} error={errors.condition} className="col-12">
                      <textarea rows={3} maxLength={500} className={cls('condition')} placeholder="For example: recovering from hip surgery, needs help walking and bathing" {...bind('condition')} />
                    </Field>
                    <Field name="notes" label="Additional notes" icon={FileText} error={errors.notes} className="col-12">
                      <textarea rows={2} maxLength={500} className={cls('notes')} {...bind('notes')} />
                    </Field>
                  </div>
                </fieldset>

                {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
                <div style={HONEYPOT} aria-hidden="true">
                  <label htmlFor="rs-company_url">Company website</label>
                  <input type="text" id="rs-company_url" name="company_url" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
                </div>

                {/* reCAPTCHA is mandatory: if the key is missing we say so instead of silently hiding it */}
                <div style={CAPTCHA_SLOT} ref={captchaSlotRef} className="mb-3">
                  {RECAPTCHA_SITE_KEY ? (
                    <Recaptcha ref={captchaRef} siteKey={RECAPTCHA_SITE_KEY} onChange={handleCaptcha} error={captchaError} />
                  ) : (
                    <div className="alert alert-warning small mb-0" role="alert">
                      Security check is unavailable, so requests cannot be sent right now.
                    </div>
                  )}
                </div>

                <div className="d-grid d-sm-flex justify-content-sm-end">
                  <button
                    type="submit"
                    className="btn text-white d-inline-flex align-items-center justify-content-center gap-2"
                    style={BTN_THEME}
                    disabled={isSubmitting || !RECAPTCHA_SITE_KEY}
                  >
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
                    <img src={`/assets/img/c_${c.id}.webp`} alt="" width={32} height={32} loading="lazy" decoding="async" className="object-fit-contain" />
                  </div>
                  <div>
                    <h3 className="h5 card-title text-primary-emphasis">{c.title}</h3>
                    <p className="card-text text-body-secondary mb-0">{c.text}</p>
                  </div>
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