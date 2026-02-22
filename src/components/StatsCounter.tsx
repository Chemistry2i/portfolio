import { useEffect, useRef, useState } from 'react';
import { Code, Briefcase, Users, Coffee } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 5, suffix: '+', label: 'Projects Delivered' },
  { icon: Code, value: 3, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 10, suffix: '+', label: 'Happy Clients' },
  { icon: Coffee, value: 1000, suffix: '+', label: 'Cups of Coffee' },
];

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, i) => {
      const duration = 1500;
      const steps = 40;
      const increment = stat.value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        setCounts(prev => {
          const next = [...prev];
          next[i] = Math.floor(current);
          return next;
        });
      }, duration / steps);
    });
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 safe-px">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-2xl p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`text-center space-y-2 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary mx-auto" />
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                    {counts[i]}{stat.suffix}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
