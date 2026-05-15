import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TerminalInput() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0, filter: 'blur(12px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: '#000000',
        padding: '160px 0 120px',
        zIndex: 10,
      }}
    >
      <div className="px-10 md:px-16 lg:px-20">
        <div ref={textRef} className="flex items-start gap-4" style={{ opacity: 0 }}>
          {/* Blinking cursor */}
          <span
            className="blink-cursor shrink-0 mt-2"
            style={{
              width: '16px',
              height: '3px',
              backgroundColor: '#ffffff',
              display: 'inline-block',
            }}
          />

          {/* Terminal text */}
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
            style={{ color: '#ffffff' }}
          >
            Where code meets discipline. Available for projects.
          </p>
        </div>
      </div>
    </section>
  );
}
