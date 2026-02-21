import { useState, useEffect } from 'react';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center space-y-6">
        {/* Icon above name */}
        <div className="flex justify-center mb-2">
          <span className="relative flex items-center justify-center">
            <span className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/40 blur-[32px] animate-pulse"></span>
            <i className="fas fa-lightbulb text-primary text-4xl md:text-5xl animate-scale relative z-10" />
          </span>
        </div>
        {/* Logo/Name */}
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Welcome !</h1>
        
        {/* Loading bar */}
        <div className="w-48 md:w-64 h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
