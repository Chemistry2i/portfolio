import { useEffect, useState, useRef } from 'react';

const Certifications = () => {
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

  const certifications = [
    {
      id: 1,
      name: 'Meta Front-End Developer',
      issuer: 'Meta (Coursera)',
      date: '2023',
      icon: 'fab fa-react',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      name: 'MongoDB Developer',
      issuer: 'MongoDB University',
      date: '2023',
      icon: 'fas fa-database',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      name: 'UI/UX Design Specialization',
      issuer: 'Google (Coursera)',
      date: '2022',
      icon: 'fab fa-figma',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      name: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      date: '2022',
      icon: 'fab fa-js-square',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Information Technology',
      institution: 'Makerere University',
      period: '2020 - 2024',
      icon: 'fas fa-graduation-cap',
    },
  ];

  return (
    <section ref={sectionRef} id="certifications" className="py-16 md:py-24 safe-px bg-secondary/20">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certifications */}
          <div className="lg:col-span-2">
            <h3 className={`text-xl font-bold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <i className="fas fa-certificate text-primary mr-2"></i>
              Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`glass-card p-5 rounded-xl hover:scale-105 transition-all duration-500 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <i className={`${cert.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm md:text-base">{cert.name}</h4>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-primary mt-1">{cert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className={`text-xl font-bold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <i className="fas fa-university text-accent mr-2"></i>
              Education
            </h3>
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`glass-card p-6 rounded-xl transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 5) * 100}ms` }}
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
      </div>
    </section>
  );
};

export default Certifications;
