import { useEffect, useState, useRef } from 'react';

const Experience = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      id: 1,
      role: 'Full Stack Developer & UI/UX Designer',
      company: 'Concept Crashers',
      period: '2023 - Present',
      description: 'Leading development of web applications using MERN stack. Designing user interfaces and creating seamless user experiences for various client projects.',
      skills: ['React', 'Node.js', 'MongoDB', 'Figma'],
      current: true,
    },
    {
      id: 2,
      role: 'Project Manager',
      company: 'Concept Crashers',
      period: '2024 - 2025',
      description: 'A secure and transparent online voting system designed for campus elections, featurng real-time results.',
      skills: ['MongoDB', 'React', 'Node', 'Express'],
      current: false,
    },
    {
      id: 3,
      role: 'Junior Developer',
      company: 'Peculiar Technologies',
      period: '2025 - 2027',
      description: 'Started my professional journey working on backend development. Learned industry best practices and agile methodologies.',
      skills: ['HTML/CSS', 'Java', 'Springboot', 'Git'],
      current: false,
    },
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-16 md:py-24 safe-px">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Experience Timeline</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            My professional journey and career progression
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 transform md:-translate-x-1/2"></div>

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative mb-12 last:mb-0 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 ${
                exp.current 
                  ? 'bg-primary shadow-lg shadow-primary/50 animate-pulse' 
                  : 'bg-accent'
              }`}></div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                  {/* Current Badge */}
                  {exp.current && (
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-3">
                      Current
                    </span>
                  )}
                  
                  {/* Period */}
                  <p className="text-sm text-primary font-medium mb-2">{exp.period}</p>
                  
                  {/* Role */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                  
                  {/* Company */}
                  <p className="text-accent font-medium mb-3">{exp.company}</p>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{exp.description}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
