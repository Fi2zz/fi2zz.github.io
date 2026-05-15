import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LiquidGlassOrb from '../components/LiquidGlassOrb';

const TAGS = [
  'SYS.INIT',
  'FLUTTER_V3.19',
  'REACT_19',
  'WEIGHTLIFTING',
  'DISTANCE_CYCLING',
  'BIRD_KEEPER',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.8 }
      );

      // Tags stagger animation
      if (tagsRef.current) {
        const tags = tagsRef.current.querySelectorAll('.tag-item');
        gsap.fromTo(
          tags,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 1.2 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.15, zIndex: 1 }}
      >
        <source src="/videos/bg-grid.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(20,20,20,0.4) 0%, rgba(0,0,0,0.95) 70%)',
          zIndex: 2,
        }}
      />

      {/* Liquid Glass Orb - positioned on the left */}
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2" style={{ zIndex: 5 }}>
        <LiquidGlassOrb videoSrc="/videos/bg-grid.mp4" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-10 md:px-16 lg:px-20">
        <div className="ml-auto w-full md:w-[60%] lg:w-[55%]">
          <h1
            ref={titleRef}
            className="text-white font-medium leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              opacity: 0,
            }}
          >
            Flutter &amp; Web.
            <br />
            <span style={{ color: '#666666' }}>Code &amp; Fitness.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 max-w-xl leading-relaxed"
            style={{
              fontSize: '16px',
              color: '#666666',
              opacity: 0,
            }}
          >
            Developer specializing in cross-platform engineering.
            Currently building digital experiences and pushing personal limits.
            When not writing code, you will find me on the open road,
            under a barbell, or tending to my birds.
          </p>
        </div>
      </div>

      {/* Bottom tags bar */}
      <div
        ref={tagsRef}
        className="absolute bottom-0 left-0 right-0 px-10 md:px-16 lg:px-20 pb-10"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-full mb-6"
          style={{ height: '1px', backgroundColor: '#333333' }}
        />
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="tag-item font-mono text-xs font-medium uppercase tracking-widest"
              style={{ color: '#666666', opacity: 0 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
