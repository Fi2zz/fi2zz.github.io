import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    num: '01',
    title: '极致精确',
    desc: '无论是前端像素的级联还是杠铃的平衡，追求 0 误差的控制。',
  },
  {
    num: '02',
    title: '原生性能',
    desc: '拒绝臃肿。代码如公路骑行，保持轻量、快速响应。',
  },
  {
    num: '03',
    title: '状态管理',
    desc: '代码有 Redux，生活有秩序。在 chaos 中构建属于自己的 predictable state。',
  },
  {
    num: '04',
    title: '迭代与恢复',
    desc: '尊重生理和代码的极限。高强度的输出需要科学的休息（Rest Days）。',
  },
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    itemsRef.current.forEach((item, i) => {
      if (!item) return;

      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { y: 20, opacity: 0, filter: 'blur(8px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power2.out',
              delay: i * 0.1,
            }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

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
            MANIFESTO
          </span>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {ITEMS.map((item, i) => (
            <div
              key={item.num}
              ref={(el) => { itemsRef.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              <span
                className="font-mono text-sm font-medium block mb-4"
                style={{ color: '#333333' }}
              >
                {item.num}
              </span>
              <h3
                className="text-xl font-medium mb-3"
                style={{ color: '#ffffff' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#666666' }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
