import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface ResultModalProps {
  type: 'success' | 'error';
  /** Optional detail shown under the error text. */
  message?: string;
  onClose: () => void;
  /** Override the default copy if needed. */
  successTitle?: string;
  successText?: string;
  errorTitle?: string;
  errorText?: string;
}

const ResultModal = ({
  type,
  message,
  onClose,
  successTitle = 'Request received',
  successText = 'Thank you. Our care team will contact you shortly to confirm.',
  errorTitle = 'Something went wrong',
  errorText = 'We couldn’t send your request. Please try again.',
}: ResultModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const isSuccess = type === 'success';

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Mount-only: focus, Escape key, scroll lock, and focus restore
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    closeRef.current?.focus();
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
      else if (e.key === 'Tab') e.preventDefault(); // single focusable element: keep focus inside
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return createPortal(
    <>
      <div className="modal d-block" tabIndex={-1} role="alertdialog" aria-modal="true" aria-labelledby="rs-modal-title" aria-describedby="rs-modal-desc" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow text-center">
            <div className="modal-body p-4 p-md-5">
              <span className={`d-inline-flex align-items-center justify-content-center rounded-circle mb-3 ${isSuccess ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ width: 72, height: 72 }} >
                {isSuccess ? <CheckCircle2 size={40} aria-hidden="true" /> : <AlertCircle size={40} aria-hidden="true" />}
              </span>
              <h2 className="h4 mb-2" id="rs-modal-title">
                {isSuccess ? successTitle : errorTitle}
              </h2>
              <p className="text-body-secondary mb-4" id="rs-modal-desc">
                {isSuccess ? successText : errorText}
                {!isSuccess && message && <small className="d-block mt-2 text-break">{message}</small>}
              </p>
              <button ref={closeRef} type="button" className={`btn px-4 ${isSuccess ? 'btn-success' : 'btn-danger'}`} onClick={onClose} >
                {isSuccess ? 'Done' : 'Try again'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>,
    document.body
  );
};

export default ResultModal;