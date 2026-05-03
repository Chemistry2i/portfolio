import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight =
        document.documentElement.scrollHeight - viewport;

      // Show only when user has scrolled past one full viewport (100vh)
      setVisible(scrolled > viewport);

      // Track scroll progress for the ring around the button
      const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return createPortal(
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
      className={`group fixed bottom-6 right-6 z-[90] h-12 w-12 sm:h-14 sm:w-14 rounded-full p-[2px] shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${progress}%, hsl(var(--secondary)) ${progress}%)`,
      }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-background/90 backdrop-blur-md transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent">
        <i className="fas fa-arrow-up text-primary text-base sm:text-lg transition-all duration-300 group-hover:text-primary-foreground group-hover:-translate-y-0.5" />
      </span>
    </button>,
    document.body
  );
};

export default ScrollToTop;
