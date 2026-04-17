import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<'in' | 'out'>('in');

  useEffect(() => {
    setStage('out');
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setStage('in');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        stage === 'in'
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2'
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
