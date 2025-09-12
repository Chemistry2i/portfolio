import { useEffect, useRef, useState } from 'react';
import projectMernApp from '@/assets/project-mern-app.jpg';
import projectUiuxDesign from '@/assets/project-uiux-design.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const projects = [
    {
      id: 1,
      title: 'TaskFlow - Project Management App',
      description: 'A comprehensive project management application built with the MERN stack, featuring real-time collaboration, task tracking, and team analytics.',
      image: projectMernApp,
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Full Stack Development'
    },
    {
      id: 2,
      title: 'FinanceTracker Mobile App UI',
      description: 'Modern mobile app interface design for personal finance tracking with intuitive navigation and data visualization components.',
      image: projectUiuxDesign,
      tech: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'UI/UX Design'
    },
    {
      id: 3,
      title: 'EcoShop E-commerce Platform',
      description: 'Sustainable e-commerce platform with eco-friendly product focus, featuring advanced filtering, payment integration, and inventory management.',
      image: projectEcommerce,
      tech: ['React', 'Express', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Full Stack Development'
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-12 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
              A showcase of my recent work, demonstrating expertise in both development and design
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={project.liveUrl}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Live Demo
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="px-3 md:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors text-sm"
                    >
                      <i className="fab fa-github mr-2"></i>
                      Code
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary text-sm font-medium">{project.category}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{project.description}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center space-x-4 pt-4">
                    <a 
                      href={project.liveUrl}
                      className="flex items-center text-primary hover:text-primary-glow transition-colors"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <i className="fab fa-github mr-2"></i>
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-medium transition-colors">
              <i className="fas fa-plus mr-2"></i>
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;