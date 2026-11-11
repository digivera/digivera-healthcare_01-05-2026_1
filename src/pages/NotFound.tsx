import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Ratio, Stack } from 'react-bootstrap';


/** Sets the tab title and a noindex robots tag while the page is mounted. */
function usePageMeta(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => {
      document.title = previousTitle;
      meta.remove();
    };
  }, [title]);
}

/** True when the user asks the OS to reduce motion. */
function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  usePageMeta('Page not found');
  
  const handleBack = () => {
    const canGoBack = (window.history.state?.idx ?? 0) > 0;
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Container as="main" className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center py-5" >
      <div className="display-1 fw-bold text-color d-flex align-items-center justify-content-center gap-2 lh-1 user-select-none" style={{ fontSize: 'calc(4.625rem + 4.5vw)' }} aria-hidden="true" >
        <span>4</span>
        <div style={{ width: '0.8em' }}>
          <Ratio aspectRatio="1x1" className="rounded-circle overflow-hidden border border-primary border-4 bg-body-secondary" >
            {reducedMotion ? (<img src="/assets/img/hero-poster.webp" alt="" className="object-fit-cover" />) : 
            (
              <video className="object-fit-cover" autoPlay loop muted playsInline preload="metadata" tabIndex={-1} >
                <source src="/assets/img/404.webm" type="video/webm" />
                <source src="/assets/img/404.mp4" type="video/mp4" />
              </video>
            )}
          </Ratio>
        </div>
        <span>4</span>
      </div>

      <h1 className="h2 fw-semibold mt-4 mb-2">We can't find that page</h1>

      <p className="text-body-secondary mb-4 mw-100" style={{ maxWidth: '46ch' }}>
        Nothing exists at{' '}
        <code className="bg-body-secondary px-2 py-1 rounded text-break">{pathname}</code>. Check
        the address for typos, or use one of the links below.
      </p>

      <Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
        <Link to="/" className="btn btn-primary px-4">Go to home page</Link>
        <Button variant="outline-secondary" className="px-4" onClick={handleBack}>Go back</Button>
      </Stack>
    </Container>
  );
}