import { useEffect, useState, useRef } from 'react';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  const certifications = [
    {
      id: 1,
      name: 'Frontend Developer',
      issuer: 'Frontend Masters',
      date: '2025',
      icon: 'fab fa-react',
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', 'TypeScript', 'CSS'],
    },
    {
      id: 2,
      name: 'MongoDB Developer',
      issuer: 'MongoDB University',
      date: '2026',
      icon: 'fas fa-database',
      color: 'from-green-500 to-emerald-500',
      skills: ['MongoDB', 'Aggregation', 'Atlas'],
    },
    {
      id: 3,
      name: 'Git & Github',
      issuer: 'Frontend Masters',
      date: '2025',
      icon: 'fab fa-github',
      color: 'from-purple-500 to-pink-500',
      skills: ['Version Control', 'CI/CD', 'Collaboration'],
    },
    {
      id: 4,
      name: 'Node & Express',
      issuer: 'Scrimba',
      date: '2025',
      icon: 'fab fa-node-js',
      color: 'from-yellow-500 to-orange-500',
      skills: ['REST APIs', 'Middleware', 'Authentication'],
    },
  ];

  // Duplicate for seamless loop
  const duplicated = [...certifications, ...certifications];

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Information Systems',
      institution: 'Kyambogo University',
      period: '2024 - 2027',
      icon: 'fas fa-graduation-cap',
    },
  ];

  return (
    <section ref={sectionRef} id="certifications" className="py-16 md:py-24 bg-secondary/20">
      <div className="max-w-6xl mx-auto safe-px">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Certifications & Education</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Continuous learning and professional development
          </p>
        </div>
      </div>

      {/* Marquee Certifications - Full width */}
      <div className={`mb-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h3 className="text-xl font-bold text-foreground mb-6 max-w-6xl mx-auto safe-px">
          <i className="fas fa-certificate text-primary mr-2"></i>
          Certifications
        </h3>

          <div
            className="overflow-hidden relative md:mx-16 lg:mx-24 xl:mx-32"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-secondary/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-secondary/80 to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-6"
              style={{
                animation: `marquee-scroll 25s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                width: 'max-content',
              }}
            >
              {duplicated.map((cert, index) => (
                <div
                  key={`${cert.id}-${index}`}
                  className="glass-card rounded-2xl overflow-hidden flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] group hover:scale-[1.02] transition-transform duration-300"
                >
                  {/* Certificate header with gradient */}
                  <div className={`h-28 sm:h-32 bg-gradient-to-br ${cert.color} relative flex items-center justify-center`}>
                    <i className={`${cert.icon} text-white text-4xl sm:text-5xl opacity-90 group-hover:scale-110 transition-transform duration-300`}></i>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-semibold">{cert.date}</span>
                    </div>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 left-2 w-8 h-8 border border-white/40 rounded-full" />
                      <div className="absolute bottom-4 right-6 w-12 h-12 border border-white/30 rounded-full" />
                      <div className="absolute top-6 right-14 w-4 h-4 border border-white/50 rounded-full" />
                    </div>
                  </div>

                  {/* Certificate body */}
                  <div className="p-4 sm:p-5">
                    <h4 className="font-bold text-foreground text-sm sm:text-base mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">Issued by {cert.issuer}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Education */}
      <div className="max-w-6xl mx-auto safe-px">
        <div className={`max-w-md transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '300ms' }}>
          <h3 className="text-xl font-bold text-foreground mb-6">
            <i className="fas fa-university text-accent mr-2"></i>
            Education
          </h3>
          {education.map((edu) => (
            <div
              key={edu.id}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <i className={`${edu.icon} text-white text-2xl`}></i>
                </div>
              </div>
              <h4 className="font-bold text-foreground text-lg mb-1">{edu.degree}</h4>
              <p className="text-accent font-medium">{edu.institution}</p>
              <p className="text-sm text-muted-foreground mt-2">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Certifications;
