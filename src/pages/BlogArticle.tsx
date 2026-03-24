import { useParams, Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const BlogArticle = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-foreground">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-lg md:text-xl font-semibold mt-6 mb-3 text-foreground">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- **')) {
        elements.push(
          <li key={i} className="text-muted-foreground ml-4 mb-1 list-disc">
            <span dangerouslySetInnerHTML={{
              __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-secondary rounded text-primary text-sm">$1</code>')
            }} />
          </li>
        );
      } else if (line.startsWith('1. ') || line.startsWith(/\d/.test(line[0] || '') ? line[0] : '')) {
        const match = line.match(/^(\d+)\. (.*)$/);
        if (match) {
          elements.push(
            <li key={i} className="text-muted-foreground ml-4 mb-1 list-decimal">
              <span dangerouslySetInnerHTML={{
                __html: match[2].replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-secondary rounded text-primary text-sm">$1</code>')
              }} />
            </li>
          );
        }
      } else if (line.startsWith('| ')) {
        // Simple table rendering
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        i--; // Back up one since the loop will increment

        const headers = tableLines[0].split('|').filter(Boolean).map(s => s.trim());
        const rows = tableLines.slice(2).map(row => row.split('|').filter(Boolean).map(s => s.trim()));

        elements.push(
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-secondary">
                  {headers.map((h, j) => (
                    <th key={j} className="px-4 py-2 text-left text-foreground font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, j) => (
                  <tr key={j} className="border-t border-border">
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-2 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (line.trim() === '') {
        // skip
      } else {
        elements.push(
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">
            <span dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-secondary rounded text-primary text-sm">$1</code>')
            }} />
          </p>
        );
      }
      i++;
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <article className="pt-24 pb-16 md:pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <i className="fas fa-arrow-left" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">{article.date}</span>
            <span className="text-xs text-muted-foreground">· {article.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8 border-b border-border pb-8">
            {article.excerpt}
          </p>

          <div className="prose-custom">
            {renderContent(article.content)}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogArticle;
