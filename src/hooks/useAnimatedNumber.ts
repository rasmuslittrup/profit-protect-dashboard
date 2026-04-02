import { useState, useEffect, useRef } from "react";

export function useAnimatedNumber(target: number, duration = 600): number {
  const [current, setCurrent] = useState(target);
  const animationRef = useRef<number>();
  const startRef = useRef<number>();
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;

    const startTime = performance.now();
    startRef.current = startTime;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = from + (target - from) * eased;
      setCurrent(value);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = target;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [target, duration]);

  return current;
}
