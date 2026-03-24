import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Banner */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <i className="fas fa-arrow-left" />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>

          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">{project.description}</p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <i className="fas fa-clock text-primary" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <i className="fas fa-user text-primary" />
              <span>{project.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Case Study Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-10">
            {/* Problem */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-destructive text-sm" />
                </span>
                The Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-lightbulb text-primary text-sm" />
                </span>
                The Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <i className="fas fa-star text-accent text-sm" />
                </span>
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <i className="fas fa-check-circle text-primary mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <i className="fas fa-chart-line text-accent text-sm" />
                </span>
                Results & Impact
              </h2>
              <p className="text-muted-foreground leading-relaxed">{project.results}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs rounded-full border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="glass-card rounded-xl p-6 space-y-3">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Links</h3>
              {project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary hover:underline text-sm"
                >
                  <i className="fas fa-external-link-alt" />
                  Live Demo
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm"
              >
                <i className="fab fa-github" />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
