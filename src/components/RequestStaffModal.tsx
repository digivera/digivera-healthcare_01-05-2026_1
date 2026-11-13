import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertCircle, Building2, ClipboardList, FileText, HeartPulse, Hash, Loader2, Mail, MapPin, MapPinned, Phone,
  Send, Stethoscope, User, UserRound, Users, type LucideIcon
} from 'lucide-react';
import ResultModal from '../components/Resultmodal';
import Recaptcha, { type RecaptchaHandle } from '../components/Recaptcha';


/* ---------- Config ---------- */
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

declare global {
  interface Window {
    bootstrap?: {
      Modal: {
        getInstance: (el: Element) => { hide: () => void } | null;
      };
    };
  }
}

export const REQUEST_STAFF_MODAL_ID = 'requestStaffModal';

const BRAND = '#0e5e60';

/* ---------- Types & constants ---------- */

interface FormValues {
  patientName: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  locality: string;
  city: string;
  pincode: string;
  service: string;
  staffCount: string;
  condition: string;
  startDate: string;
  notes: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_VALUES: FormValues = { patientName: '', gender: '', mobile: '', email: '', address: '', locality: '', city: '',
  pincode: '', service: '', staffCount: '', condition: '', startDate: '', notes: '' };

const GENDERS = ['Male', 'Female', 'Other'];
const SERVICES = [
  'Nurses(ANM, GNM, BSc)',
  'GDAs(General Duty Assistants)',
  'Physiotherapists'
];
const STAFF_COUNTS = ['1', '2', '3', '4', '5'];

// Fields that should only ever contain digits
const DIGIT_FIELDS: ReadonlySet<string> = new Set(['mobile', 'pincode']);

const fieldId = (name: keyof FormValues) => `rs-${name}`;

/* ---------- Validation ---------- */

const validate = (v: FormValues): Errors => {
  const errors: Errors = {};

  // Keys are added in on-screen order so the first error can receive focus
  if (!v.patientName.trim()) errors.patientName = 'Enter the patient’s full name.';
  if (!v.gender) errors.gender = 'Select a gender.';
  if (!v.mobile) errors.mobile = 'Enter a mobile number.';
  else if (!/^[6-9]\d{9}$/.test(v.mobile)) errors.mobile = 'Enter a valid 10-digit mobile number.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = 'Enter a valid email address.';
  if (!v.address.trim()) errors.address = 'Enter the house / flat number and street.';
  if (!v.locality.trim()) errors.locality = 'Enter the area / locality.';
  if (!v.city.trim()) errors.city = 'Enter the city.';
  if (!v.pincode) errors.pincode = 'Enter the PIN code.';
  else if (!/^\d{6}$/.test(v.pincode)) errors.pincode = 'Enter a valid 6-digit PIN code.';
  if (!v.service) errors.service = 'Select the service you need.';
  if (!v.staffCount) errors.staffCount = 'Select how many staff you need.';

  return errors;
};

/* ---------- Small presentational helpers ---------- */

interface FieldProps {
  name: keyof FormValues;
  label: string;
  icon?: LucideIcon;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

const Field = ({ name, label, icon: Icon, required, error, className = 'col-12 col-md-6', children }: FieldProps) => (
  <div className={className}>
    <label htmlFor={fieldId(name)} className="form-label d-flex align-items-center gap-2">
      {Icon && <Icon size={16} strokeWidth={2} color={BRAND} aria-hidden="true" />}
      <span>
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            {' '}*
          </span>
        )}
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

const SectionTitle = ({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode; }) => (
  <legend className="h6 mb-3 d-flex align-items-center gap-2 py-2 px-3 rounded-3" style={{ color: BRAND, background: '#dff9fb' }} >
    <span className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: 28, height: 28, background: '#e3f1f1' }} >
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
    </span>
    {children}
  </legend>
);

/* ---------- Component ---------- */

const RequestStaffModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState('');

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus('idle');
    setErrorMsg('');
  }, []);

  // Reset the form each time the Bootstrap modal is closed
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    el.addEventListener('hidden.bs.modal', resetForm);
    return () => el.removeEventListener('hidden.bs.modal', resetForm);
  }, [resetForm]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const next = DIGIT_FIELDS.has(name) ? value.replace(/\D/g, '') : value;

      setValues((prev) => ({ ...prev, [name]: next }));
      setErrors((prev) => (prev[name as keyof FormValues] ? { ...prev, [name]: undefined } : prev));
    },
    []
  );
  
   const handleCaptcha = useCallback((token: string | null) => {
    setCaptchaToken(token);
    if (token) setCaptchaError('');
  }, []);

  const closeResult = useCallback(() => {
    if (status === 'success') {
      const instance = modalRef.current ? window.bootstrap?.Modal.getInstance(modalRef.current) : null;
      if (instance) {
        setStatus('idle');
        instance.hide();
      } else {
        resetForm(); // Bootstrap JS not on window: fall back to a manual reset
      }
    } else {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [status, resetForm]);

  // Shared props for every input so each field stays a one-liner
  const bind = (name: keyof FormValues) => ({
    id: fieldId(name),
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  const inputClass = (name: keyof FormValues, base = 'form-control') => `${base}${errors[name] ? ' is-invalid' : ''}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const found = validate(values);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`rs-${firstInvalid}`)?.focus();
      return;
    }

    const url = import.meta.env.VITE_SHEETS_URL as string | undefined;
    if (!url) {
      setErrorMsg('VITE_SHEETS_URL is not defined.');
      setStatus('error');
      return;
    }
    if (!captchaToken) {
      setCaptchaError('Please confirm you are not a robot.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      const secret = import.meta.env.VITE_SHEETS_SECRET as string | undefined;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...values, secret }),
      });

      const text = await res.text();

      let data: { ok?: boolean; error?: string };
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned an unexpected response.');
      }
      if (!data.ok) throw new Error(data.error || 'Request failed');

      setStatus('success');
    } catch (err) {
      console.error('Request failed:', err);
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  return createPortal(
    <div ref={modalRef} className="modal fade" id={REQUEST_STAFF_MODAL_ID} tabIndex={-1} aria-labelledby={`${REQUEST_STAFF_MODAL_ID}Label`} aria-hidden="true" >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <form className="modal-content" onSubmit={handleSubmit} noValidate>
          {/* HEADER */}
          <div className="modal-header text-white" style={{ background: BRAND }}>
            <div className="d-flex align-items-start gap-3">
              <span className="d-inline-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)' }} >
                <HeartPulse size={24} aria-hidden="true" />
              </span>
              <div>
                <p className="mb-1 small">DigiVera Healthcare Services</p>
                <h2 className="modal-title h4 mb-1" id={`${REQUEST_STAFF_MODAL_ID}Label`}>
                  Home Care Service Request
                </h2>
                <p className="mb-0 small">
                  Fill in the details below and our care team will contact you to confirm.
                </p>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white align-self-start" data-bs-dismiss="modal" aria-label="Close request form" />
          </div>

          <div className="modal-body">
            {/* PATIENT AND CONTACT DETAILS */}
            <fieldset className="mb-4" disabled={isSubmitting}>
              <SectionTitle icon={UserRound}>Patient and contact details</SectionTitle>

              <div className="row g-3">
                <Field name="patientName" label="Patient full name" icon={User} required error={errors.patientName} className="col-12">
                  <input type="text" className={inputClass('patientName')} autoComplete="off" {...bind('patientName')} />
                </Field>

                <Field name="gender" label="Gender" icon={Users} required error={errors.gender}>
                  <select className={inputClass('gender', 'form-select')} {...bind('gender')}>
                    <option value="">Select</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>

                <Field name="mobile" label="Mobile / WhatsApp" icon={Phone} required error={errors.mobile}>
                  <input type="tel" inputMode="numeric" maxLength={10} className={inputClass('mobile')} autoComplete="tel-national" {...bind('mobile')} />
                </Field>

                <Field name="email" label="Email" icon={Mail} error={errors.email}>
                  <input type="email" className={inputClass('email')} autoComplete="email" {...bind('email')} />
                </Field>
              </div>
            </fieldset>

            {/* ADDRESS */}
            <fieldset className="mb-4" disabled={isSubmitting}>
              <SectionTitle icon={MapPin}>Address where care is needed</SectionTitle>

              <div className="row g-3">
                <Field name="address" label="House / flat number and street" icon={Building2} required error={errors.address} className="col-12">
                  <input type="text" className={inputClass('address')} autoComplete="address-line1" {...bind('address')} />
                </Field>

                <Field name="locality" label="Area / locality" icon={MapPinned} required error={errors.locality} className="col-12">
                  <input type="text" className={inputClass('locality')} autoComplete="address-line2" {...bind('locality')} />
                </Field>

                <Field name="city" label="City" icon={Building2} required error={errors.city}>
                  <input type="text" className={inputClass('city')} autoComplete="address-level2" {...bind('city')} />
                </Field>

                <Field name="pincode" label="PIN code" icon={Hash} required error={errors.pincode}>
                  <input type="text" inputMode="numeric" maxLength={6} className={inputClass('pincode')} autoComplete="postal-code" {...bind('pincode')} />
                </Field>
              </div>
            </fieldset>

            {/* SERVICE REQUIRED */}
            <fieldset disabled={isSubmitting}>
              <SectionTitle icon={Stethoscope}>Service required</SectionTitle>

              <div className="row g-3">
                <Field name="service" label="Service" icon={ClipboardList} required error={errors.service}>
                  <select className={inputClass('service', 'form-select')} {...bind('service')}>
                    <option value="">Select</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field name="staffCount" label="Number of staff needed" icon={Users} required error={errors.staffCount}>
                  <select className={inputClass('staffCount', 'form-select')} {...bind('staffCount')}>
                    <option value="">Select</option>
                    {STAFF_COUNTS.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Field>

                <Field name="condition" label="Patient condition or reason for care" icon={HeartPulse} className="col-12" error={errors.condition}>
                  <textarea rows={3} className={inputClass('condition')} placeholder="For example: recovering from hip surgery, needs help walking and bathing"
                    {...bind('condition')}
                  />
                </Field>

                <Field name="notes" label="Additional notes" icon={FileText} className="col-12" error={errors.notes}>
                  <textarea rows={2} className={inputClass('notes')} {...bind('notes')} />
                </Field>
              </div>
            </fieldset>
            {RECAPTCHA_SITE_KEY && (
                  <Recaptcha ref={captchaRef} siteKey={RECAPTCHA_SITE_KEY} onChange={handleCaptcha} error={captchaError} />
                )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn text-white d-inline-flex align-items-center gap-2" style={{ background: BRAND }} disabled={isSubmitting} >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spin" aria-hidden="true" />
                  Requesting...
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  Submit request
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Rendered inside this modal so Bootstrap's focus trap keeps working */}
      {(status === 'success' || status === 'error') && (
        <ResultModal type={status} message={errorMsg} onClose={closeResult} />
      )}
    </div>,
    document.body
  );
};

export default RequestStaffModal;