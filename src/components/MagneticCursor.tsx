import { useEffect, useRef, useState } from 'react';

/**
 * Playful interactive overlay for the hero:
 * - A glowing dot that follows the cursor with a delayed trailing ring.
 * - Spawns particles on movement that fade out.
 * - Pointer-events-none, so it never blocks UI.
 * - Disabled on touch devices.
 */
const MagneticCursor = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    let lastSpawn = 0;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const resize = () => {
      const r = container.getBoundingClientRect();
      canvas.width = r.width * window.devicePixelRatio;
      canvas.height = r.height * window.devicePixelRatio;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number };
    const particles: Particle[] = [];

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }

      const now = performance.now();
      if (now - lastSpawn > 18) {
        lastSpawn = now;
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          life: 0,
          max: 60 + Math.random() * 30,
          hue: Math.random() > 0.5 ? 217 : 187, // primary blue / accent cyan
        });
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('mouseenter', onEnter);

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = 1 - p.life / p.max;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha * 0.55})`;
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled, containerRef]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[5]"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-10 h-10 rounded-full border border-primary/40 pointer-events-none z-[6] transition-opacity duration-300"
        style={{ opacity: 0, willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))] pointer-events-none z-[6] transition-opacity duration-300"
        style={{ opacity: 0, willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
};

export default MagneticCursor;
