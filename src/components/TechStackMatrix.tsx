import { useEffect, useRef, useState } from 'react';

type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Working';

interface StackItem {
  name: string;
  icon: string;
  years: number;
  proficiency: Proficiency;
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
      { name: 'React.js', icon: 'fab fa-react', years: 3, proficiency: 'Advanced' },
      { name: 'TypeScript', icon: 'fas fa-code', years: 2, proficiency: 'Proficient' },
      { name: 'JavaScript (ES6+)', icon: 'fab fa-js-square', years: 4, proficiency: 'Expert' },
      { name: 'Tailwind CSS', icon: 'fas fa-wind', years: 3, proficiency: 'Advanced' },
      { name: 'HTML5 / CSS3', icon: 'fab fa-html5', years: 4, proficiency: 'Expert' },
    ],
  },
  {
    title: 'Backend',
    icon: 'fas fa-server',
    items: [
      { name: 'Node.js', icon: 'fab fa-node-js', years: 3, proficiency: 'Advanced' },
      { name: 'Express.js', icon: 'fas fa-bolt', years: 3, proficiency: 'Advanced' },
      { name: 'MongoDB', icon: 'fas fa-database', years: 3, proficiency: 'Advanced' },
      { name: 'REST APIs', icon: 'fas fa-plug', years: 3, proficiency: 'Advanced' },
      { name: 'Supabase / Postgres', icon: 'fas fa-leaf', years: 1, proficiency: 'Proficient' },
    ],
  },
  {
    title: 'Design & Tooling',
    icon: 'fas fa-pen-nib',
    items: [
      { name: 'Figma', icon: 'fab fa-figma', years: 3, proficiency: 'Advanced' },
      { name: 'Adobe XD', icon: 'fas fa-palette', years: 2, proficiency: 'Proficient' },
      { name: 'Git / GitHub', icon: 'fab fa-git-alt', years: 4, proficiency: 'Advanced' },
      { name: 'Vercel / Netlify', icon: 'fas fa-cloud-upload-alt', years: 2, proficiency: 'Proficient' },
      { name: 'Vite', icon: 'fas fa-bolt', years: 2, proficiency: 'Proficient' },
    ],
  },
];

const proficiencyColor: Record<Proficiency, string> = {
  Expert: 'bg-primary text-primary-foreground border-primary',
  Advanced: 'bg-primary/15 text-primary border-primary/40',
  Proficient: 'bg-accent/15 text-accent border-accent/40',
  Working: 'bg-secondary text-secondary-foreground border-border',
};

const TechStackMatrix = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
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

                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <i className={`${item.icon} text-primary text-base w-5 text-center shrink-0`} />
                        <span className="font-medium text-foreground truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {item.years}+ yr{item.years === 1 ? '' : 's'}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${proficiencyColor[item.proficiency]}`}
                        >
                          {item.proficiency}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-xs text-muted-foreground">
            <span className="font-medium">Proficiency:</span>
            {(['Expert', 'Advanced', 'Proficient', 'Working'] as Proficiency[]).map((p) => (
              <span
                key={p}
                className={`px-2 py-0.5 rounded-full border ${proficiencyColor[p]}`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackMatrix;
