import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

/* ---------- Google reCAPTCHA v2 typings ---------- */

interface GReCaptcha {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: {
    sitekey: string;
    theme?: 'light' | 'dark';
    size?: 'normal' | 'compact';
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
  }) => number;
  reset: (id?: number) => void;
}
declare global {
  interface Window { grecaptcha?: GReCaptcha }
}

/* ---------- Script loader (shared by all instances, loads once) ---------- */

let loader: Promise<void> | null = null;
const loadRecaptcha = (): Promise<void> => {
  if (window.grecaptcha?.render) return Promise.resolve();
  loader ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    s.async = true;
    s.defer = true;
    s.onload = () => window.grecaptcha!.ready(resolve);
    s.onerror = () => {
      loader = null; // allow a retry on the next mount
      s.remove();
      reject(new Error('reCAPTCHA failed to load.'));
    };
    document.head.appendChild(s);
  });
  return loader;
};

/* ---------- Component ---------- */

export interface RecaptchaHandle {
  /** Clears the checkbox and notifies the parent with onChange(null). */
  reset: () => void;
}

export interface RecaptchaProps {
  siteKey: string;
  /** Called with a token when solved, or null when it expires, errors or is reset. */
  onChange: (token: string | null) => void;
  /** Validation message to show under the widget. */
  error?: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  className?: string;
}

const Recaptcha = forwardRef<RecaptchaHandle, RecaptchaProps>(function Recaptcha(
  { siteKey, onChange, error, theme = 'light', size = 'normal', className = 'my-4' },
  ref,
) {
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange; // always call the latest handler without re-rendering the widget
  const [loadFailed, setLoadFailed] = useState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetRef.current !== null) window.grecaptcha?.reset(widgetRef.current);
      onChangeRef.current(null); // grecaptcha.reset() does not fire any callback
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    loadRecaptcha()
      .then(() => {
        if (cancelled || !boxRef.current || widgetRef.current !== null) return;
        widgetRef.current = window.grecaptcha!.render(boxRef.current, {
          sitekey: siteKey,
          theme,
          size,
          callback: (t) => onChangeRef.current(t),
          'expired-callback': () => onChangeRef.current(null),
          'error-callback': () => onChangeRef.current(null),
        });
      })
      .catch(() => { if (!cancelled) setLoadFailed(true); });
    return () => { cancelled = true; };
  }, [siteKey, theme, size]);

  return (
    <div className={className}>
      <div ref={boxRef} className={error ? 'border border-danger rounded d-inline-block' : undefined} />
      {loadFailed && (
        <div className="text-danger small d-flex align-items-center gap-1 mt-1" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          Couldn’t load the security check. Disable any blockers and refresh the page.
        </div>
      )}
      {error && (
        <div className="text-danger small d-flex align-items-center gap-1 mt-1" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  );
});

export default Recaptcha;