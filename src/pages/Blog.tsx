import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <i className="fas fa-arrow-left" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog & Articles</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Technical write-ups, lessons learned, and insights from my development journey.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid gap-6 md:gap-8">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="glass-card rounded-2xl p-6 md:p-8 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <i className={`${article.icon} text-primary text-lg`} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <span className="text-xs text-muted-foreground">· {article.readTime}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <i className="fas fa-arrow-right text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all hidden md:block mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
