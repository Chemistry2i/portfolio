import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import ImageLightbox from './ImageLightbox';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
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
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: project.image, alt: project.title })}
                    aria-label={`View ${project.title} fullscreen`}
                    className="block w-full cursor-zoom-in focus:outline-none"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </button>
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
                    {/* Outcome-led headline */}
                    <p className="text-sm md:text-base font-medium text-accent mb-2 leading-snug">
                      <i className="fas fa-bolt text-xs mr-1.5" />
                      {project.impact}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                  </div>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="glass-card rounded-lg px-2 py-2 text-center"
                      >
                        <div className="text-sm md:text-base font-bold gradient-text leading-none">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-4">
                      <a 
                        href={project.liveUrl}
                        className="flex items-center text-primary hover:text-primary-glow transition-colors"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        <span className="text-xs font-medium">Live Demo</span>
                      </a>
                      <a 
                        href={project.githubUrl}
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <i className="fab fa-github mr-2"></i>
                        <span className="text-xs font-medium">View Code</span>
                      </a>
                    </div>
                    <Link
                      to={`/project/${project.slug}`}
                      className="text-xs font-medium text-accent hover:text-primary transition-colors flex items-center gap-1"
                    >
                      Case Study
                      <i className="fas fa-arrow-right text-xs" />
                    </Link>
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

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
};

export default Projects;
