import { useEffect, useState } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const mernSkills = [
    { name: 'MongoDB', level: 80, icon: 'fas fa-database' },
    { name: 'Express.js', level: 85, icon: 'fas fa-server' },
    { name: 'React.js', level: 70, icon: 'fab fa-react' },
    { name: 'Node.js', level: 88, icon: 'fab fa-node-js' },
    { name: 'JavaScript', level: 92, icon: 'fab fa-js-square' },
  ];

  const uiuxSkills = [
    { name: 'Figma', level: 90, icon: 'fas fa-pen-nib' },
    { name: 'Adobe XD', level: 85, icon: 'fas fa-palette' },
    { name: 'Prototyping', level: 88, icon: 'fas fa-drafting-compass' },
    { name: 'Wireframing', level: 92, icon: 'fas fa-project-diagram' },
    { name: 'User Research', level: 80, icon: 'fas fa-search' },
    { name: 'Design Systems', level: 85, icon: 'fas fa-th-large' },
  ];

  const SkillCard = ({ title, skills, delay = 0 }: { title: string; skills: typeof mernSkills; delay?: number }) => (
    <div 
      className={`glass-card p-8 rounded-2xl transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-2xl font-semibold mb-8 text-center">
        <span className="gradient-text">{title}</span>
      </h3>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <i className={`${skill.icon} text-primary text-lg`}></i>
                <span className="font-medium text-foreground">{skill.name}</span>
              </div>
              <span className="text-muted-foreground text-sm">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <div 
                className={`skill-progress transition-all duration-1000 ${
                  isVisible ? 'w-full' : 'w-0'
                }`}
                style={{ 
                  width: isVisible ? `${skill.level}%` : '0%',
                  transitionDelay: `${delay + (index * 200)}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Skills & Expertise</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              A comprehensive toolkit for building modern web applications and user experiences
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <SkillCard title="MERN Stack Development" skills={mernSkills} delay={200} />
            <SkillCard title="UI/UX Design" skills={uiuxSkills} delay={400} />
          </div>

          {/* Additional Technologies */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-center mb-8">
              <span className="gradient-text">Additional Technologies</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Git', icon: 'fab fa-git-alt' },
                { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
                { name: 'GitHub', icon: 'fab fa-github' },
                { name: 'REST API', icon: 'fas fa-server' },
                { name: 'WebSockets', icon: 'fas fa-plug' },
                { name: 'Vercel', icon: 'fas fa-cloud' },
              ].map((tech, index) => (
                <div 
                  key={tech.name}
                  className={`glass-card p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${800 + (index * 100)}ms` }}
                >
                  <i className={`${tech.icon} text-primary text-3xl mb-3`}></i>
                  <p className="text-foreground font-medium text-sm">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
