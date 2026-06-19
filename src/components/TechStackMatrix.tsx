import { useEffect, useRef, useState } from 'react';

interface StackItem {
  name: string;
  icon: string;
  years: number;
  level: number; // percentage
}

interface StackGroup {
  title: string;
  icon: string;
  items: StackItem[];
}

const GROUPS: StackGroup[] = [
  {
    title: 'Frontend',
    icon: 'fas fa-laptop-code',
    items: [
      { name: 'React.js', icon: 'fab fa-react', years: 3, level: 80 },
      { name: 'JavaScript (ES6+)', icon: 'fab fa-js-square', years: 3, level: 80 },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', years: 3, level: 78 },
      { name: 'HTML5 / CSS3', icon: 'fab fa-html5', years: 3, level: 80 },
    ],
  },
  {
    title: 'Backend',
    icon: 'fas fa-server',
    items: [
      { name: 'Node.js', icon: 'fab fa-node-js', years: 3, level: 78 },
      { name: 'Express.js', icon: 'fas fa-bolt', years: 3, level: 78 },
      { name: 'MongoDB', icon: 'fas fa-database', years: 3, level: 75 },
      { name: 'MySQL', icon: 'fas fa-database', years: 2, level: 72 },
      { name: 'REST APIs', icon: 'fas fa-plug', years: 3, level: 80 },
    ],
  },
  {
    title: 'Design & Tooling',
    icon: 'fas fa-pen-nib',
    items: [
      { name: 'Figma', icon: 'fab fa-figma', years: 3, level: 70 },
      { name: 'Adobe XD', icon: 'fas fa-palette', years: 2, level: 70 },
      { name: 'Git / GitHub', icon: 'fab fa-git-alt', years: 3, level: 70 },
      { name: 'Render', icon: 'fas fa-cloud', years: 2, level: 70 },
      { name: 'Vercel / Netlify', icon: 'fas fa-cloud-upload-alt', years: 2, level: 70 },
      { name: 'Vite', icon: 'fas fa-bolt', years: 2, level: 70 },
    ],
  },
];

const proficiencyFor = (level: number) => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  return 'Proficient';
};

const TechStackMatrix = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="tech-stack" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Tech Stack at a Glance</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Recruiter-friendly snapshot — technology, hands-on years, and current proficiency level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GROUPS.map((group, gi) => (
              <div
                key={group.title}
                className={`glass-card rounded-2xl p-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${gi * 120}ms` }}
              >
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <i className={`${group.icon} text-primary-foreground`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                </div>

                <ul className="space-y-4">
                  {group.items.map((item, idx) => (
                    <li key={item.name} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <i className={`${item.icon} text-primary text-base w-5 text-center shrink-0`} />
                          <span className="font-medium text-foreground truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-muted-foreground tabular-nums">
                            {item.years}+ yr{item.years === 1 ? '' : 's'}
                          </span>
                          <span className="text-[11px] font-semibold text-primary tabular-nums">
                            {item.level}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary/60 overflow-hidden border border-border/60">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-[1200ms] ease-out"
                          style={{
                            width: isVisible ? `${item.level}%` : '0%',
                            transitionDelay: `${gi * 120 + idx * 100}ms`,
                          }}
                          aria-label={`${item.name} ${proficiencyFor(item.level)} ${item.level}%`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackMatrix;
