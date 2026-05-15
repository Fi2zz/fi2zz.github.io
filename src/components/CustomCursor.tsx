import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      isHoveringRef.current = true;
    };
    const onMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x - 2}px, ${targetRef.current.y - 2}px)`;
      }
      if (circleRef.current) {
        const scale = isHoveringRef.current ? 6 : 1;
        circleRef.current.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-hover]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    // Initial setup + observer for dynamically added elements
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={circleRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid #ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
          transition: 'transform 0.3s ease-out',
          opacity: 0.6,
        }}
      />
    </>
  );
}
