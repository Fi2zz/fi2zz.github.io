import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    id: 'geist-ui',
    title: 'Geist UI Kit',
    category: 'Flutter',
    image: '/images/work-hardware.jpg',
  },
  {
    id: 'terminal-portfolio',
    title: 'Terminal Portfolio',
    category: 'Web',
    image: '/images/work-dashboard.jpg',
  },
  {
    id: 'liftlog-pro',
    title: 'LiftLog Pro',
    category: 'App',
    image: '/images/work-lifting.jpg',
  },
  {
    id: 'aero-dashboard',
    title: 'Aero Dashboard',
    category: 'Web',
    image: '/images/work-cycling.jpg',
  },
];

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Section entrance
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          listRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(st);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);

    const img = imageRefs.current[index];
    const container = imageContainerRef.current;
    if (!img || !container) return;

    // Show the specific image
    imageRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.display = i === index ? 'block' : 'none';
      }
    });

    // Animate container clip-path
    gsap.fromTo(
      container,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power2.out' }
    );

    // Animate image scale
    gsap.fromTo(
      img,
      { scale: 1.2 },
      { scale: 1, duration: 0.8, ease: 'power2.out' }
    );
  };

  const handleMouseLeave = () => {
    // Don't hide immediately for smoother experience
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: '#000000',
        padding: '160px 0',
        zIndex: 10,
      }}
    >
      <div className="px-10 md:px-16 lg:px-20">
        {/* Section header */}
        <div className="mb-20">
          <span
            className="font-mono text-xs font-medium uppercase tracking-widest"
            style={{ color: '#666666' }}
          >
            SELECTED WORK
          </span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: List */}
          <div ref={listRef} className="w-full lg:w-1/2" style={{ opacity: 0 }}>
            {WORKS.map((work, i) => (
              <div
                key={work.id}
                className="group py-8 transition-all duration-300"
                style={{
                  borderBottom: '1px solid #333333',
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                data-hover
              >
                <div className="flex items-baseline justify-between">
                  <h3
                    className="text-2xl md:text-3xl font-medium transition-colors duration-300 group-hover:text-white"
                    style={{
                      color: activeIndex === i ? '#ffffff' : '#666666',
                    }}
                  >
                    {work.title}
                  </h3>
                  <span
                    className="font-mono text-xs uppercase tracking-widest ml-4 shrink-0"
                    style={{ color: '#333333' }}
                  >
                    {work.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image container */}
          <div className="w-full lg:w-1/2 relative hidden lg:block">
            <div
              ref={imageContainerRef}
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4/3',
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              {WORKS.map((work, i) => (
                <img
                  key={work.id}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  src={work.image}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    display: i === 0 ? 'block' : 'none',
                    willChange: 'transform',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
