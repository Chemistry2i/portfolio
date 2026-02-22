import { useEffect, useRef, useState } from 'react';
import { BookOpen, Rocket } from 'lucide-react';

const learningItems = [
  {
    name: 'Java',
    icon: 'fab fa-java',
    description: 'Building enterprise-grade applications with core Java',
    progress: 60,
  },
  {
    name: 'Spring Boot',
    icon: 'fas fa-leaf',
    description: 'Creating robust REST APIs and microservices',
    progress: 40,
  },
  {
    name: 'PostgreSQL',
    icon: 'fas fa-database',
    description: 'Advanced relational database design & queries',
    progress: 50,
  },
  {
    name: 'Docker',
    icon: 'fab fa-docker',
    description: 'Containerizing apps for consistent deployments',
    progress: 30,
  },
];

const CurrentlyLearning = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="learning" className="py-12 md:py-20 safe-px">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Growth Mindset</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Currently Exploring</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Always evolving — here's what I'm currently diving into
          </p>
        </div>

        {/* Learning Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {learningItems.map((item, i) => (
            <div
              key={item.name}
              className={`glass-card p-5 md:p-6 rounded-2xl transition-all duration-700 hover:scale-[1.03] group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(i + 1) * 120}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <i className={`${item.icon} text-xl text-primary`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs text-primary font-medium">{item.progress}%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: isVisible ? `${item.progress}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className={`text-center mt-8 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground glass-card px-4 py-2 rounded-full">
            <BookOpen className="w-4 h-4 text-accent" />
            <span>Lifelong learner — always expanding my toolkit</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;
