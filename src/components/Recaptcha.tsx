import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

/* ---------- Google reCAPTCHA v2 (checkbox) typings ---------- */

interface RenderOptions {
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

interface GReCaptcha {
  render: (container: HTMLElement, options: RenderOptions) => number;
  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: GReCaptcha;
    __recaptchaOnLoad?: () => void;
  }
}

/* ---------- Script loader (one script tag for the whole app) ---------- */

const SCRIPT_ID = 'google-recaptcha-api';
const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit';

let loadPromise: Promise<GReCaptcha> | null = null;

const loadRecaptcha = (): Promise<GReCaptcha> => {
  // Already fully loaded
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<GReCaptcha>((resolve, reject) => {
    // Google calls this once the render API is ready
    window.__recaptchaOnLoad = () => {
      if (window.grecaptcha?.render) resolve(window.grecaptcha);
      else reject(new Error('reCAPTCHA API unavailable.'));
    };

    // Remove a stale/failed tag from an earlier attempt before adding a new one
    document.getElementById(SCRIPT_ID)?.remove();

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      loadPromise = null; // allow a retry on the next mount
      script.remove();
      reject(new Error('reCAPTCHA failed to load.'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
};

/* ---------- Component ---------- */

export interface RecaptchaHandle {
  /** Clears the checkbox and calls onChange(null). */
  reset: () => void;
}

export interface RecaptchaProps {
  siteKey: string;
  /** Token when solved; null when it expires, errors or is reset. */
  onChange: (token: string | null) => void;
  /** Validation message shown under the widget. */
  error?: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  className?: string;
}

const Recaptcha = forwardRef<RecaptchaHandle, RecaptchaProps>(function Recaptcha(
  { siteKey, onChange, error, theme = 'light', size = 'normal', className = 'my-4' },
  ref,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const [loadFailed, setLoadFailed] = useState(false);

  // Always call the latest handler without re-rendering the widget
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        if (widgetIdRef.current !== null) window.grecaptcha?.reset(widgetIdRef.current);
        onChangeRef.current(null); // grecaptcha.reset() fires no callback
      },
    }),
    [],
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    setLoadFailed(false);
    
    const mountNode = document.createElement('div');
    host.appendChild(mountNode);

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled) return;
        widgetIdRef.current = grecaptcha.render(mountNode, {
          sitekey: siteKey,
          theme,
          size,
          callback: (token) => onChangeRef.current(token),
          'expired-callback': () => onChangeRef.current(null),
          'error-callback': () => onChangeRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
      widgetIdRef.current = null;
      mountNode.remove();
    };
  }, [siteKey, theme, size]);

  return (
    <div className={className}>
      <div
        ref={hostRef}
        className={error ? 'border border-danger rounded d-inline-block' : undefined}
      />
      {loadFailed && (
        <div className="text-danger small d-flex align-items-center gap-1 mt-1" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          Couldn’t load the security check. Turn off any ad blocker and refresh the page.
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