import { useEffect, useRef } from 'react';

interface LiquidGlassOrbProps {
  videoSrc?: string;
}

export default function LiquidGlassOrb({ videoSrc }: LiquidGlassOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current.x = ((e.clientX - centerX) / centerX) * 15;
      mouseRef.current.y = ((e.clientY - centerY) / centerY) * 15;
    };

    const animate = () => {
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.05;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="glass-orb"
      style={{ willChange: 'transform' }}
    >
      <div className="layer">
        {videoSrc && (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.3,
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="highlight" />
      <div className="bottom-glow" />
      <div className="top-shine" />
      <div className="caustic" />
    </div>
  );
}
