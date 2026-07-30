import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { SITE_URL } from '@/components/SEO';
import ShareButtons from '@/components/ShareButtons';
import { downloadCaseStudyPdf } from '@/lib/caseStudyPdf';
import { trackPdfDownload } from '@/lib/trackDownload';
import { toast } from '@/hooks/use-toast';


const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!project) return;
    setDownloading(true);
    try {
      await downloadCaseStudyPdf(project);
      void trackPdfDownload(project.slug, project.title);
    } catch {
      toast({
        title: 'Could not generate the PDF',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setDownloading(false);
    }
  };



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
      <SEO
        title={`${project.title} — Case Study | Wambogo Hassan Sadat`}
        description={`${project.problem.slice(0, 150)}`}
        path={`/project/${project.slug}`}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            about: project.category,
            keywords: project.tech.join(', '),
            url: `${SITE_URL}/project/${project.slug}`,
            creator: { '@type': 'Person', name: 'Wambogo Hassan Sadat', url: SITE_URL },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
              { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/project/${project.slug}` },
            ],
          },
        ]}
      />
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
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="no-print inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <i className={downloading ? 'fas fa-circle-notch fa-spin' : 'fas fa-file-pdf'} />
              {downloading ? 'Preparing PDF…' : 'Download PDF'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
            >
              <i className="fas fa-print" />
              Print
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Share</span>
            <ShareButtons
              url={`${SITE_URL}/project/${project.slug}`}
              title={`${project.title} — Case Study`}
              summary={project.description}
            />
          </div>

        </div>
      </section>

      {/* Project Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 md:mb-14">
        <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
          <img
            src={project.image}
            alt={`${project.title} interface screenshot`}
            className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Outcome Metrics */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-bold mb-4">Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass-card rounded-xl p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text leading-none">{m.value}</div>
              <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
            >
              {t}
            </span>
          ))}
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

            {/* Timeline */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-stream text-primary text-sm" />
                </span>
                Project Timeline
              </h2>
              <ol className="relative border-l border-border ml-4 space-y-8">
                {project.timeline.map((step) => (
                  <li key={step.phase} className="pl-6">
                    <span className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-semibold text-foreground">{step.phase}</h3>
                      <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                        {step.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{step.detail}</p>
                  </li>
                ))}
              </ol>
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

            {/* PDF download */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Take it with you</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get this full case study — outcomes, stack and timeline — as a one-page PDF.
              </p>
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                <i className={downloading ? 'fas fa-circle-notch fa-spin' : 'fas fa-download'} />
                {downloading ? 'Preparing…' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
