import { useEffect, useRef, useState } from 'react';

type CountUpNumberProps = {
  target: number;
  duration?: number;
  className?: string;
};

const CountUpNumber = ({ target, duration = 1500, className }: CountUpNumberProps) => {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let animationFrameId = 0;
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setValue(Math.floor(progress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(updateValue);
      } else {
        setValue(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(updateValue);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [duration, hasStarted, target]);

  return (
    <span ref={elementRef} className={className}>
      {value}
    </span>
  );
};

export default CountUpNumber;