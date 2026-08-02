import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Once the entrance animation settles we strip transform/filter from the
   * wrapper. Any lingering transform or filter creates a containing block,
   * which breaks `position: fixed` children (e.g. the sticky navbar).
   */
  const clearContainingBlock = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'none';
    el.style.filter = 'none';
    el.style.willChange = 'auto';
  };

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
    >
      <motion.div
        ref={ref}
        key={location.pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={clearContainingBlock}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
