import { SITE_URL } from '@/components/SEO';
import type { Article } from '@/data/articles';
import type { ProjectData } from '@/data/projects';

const PERSON_ID = `${SITE_URL}/#person`;

export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Wambogo Hassan Sadat',
  url: SITE_URL,
  jobTitle: 'MERN Stack Developer & UI/UX Designer',
  knowsAbout: ['MERN Stack', 'React', 'Node.js', 'MySQL', 'UI/UX Design'],
};

export const authorRef = { '@id': PERSON_ID };

/** Absolute URL for a bundled asset or an already-absolute URL. */
export const absoluteUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const isoDuration = (readTime: string) => {
  const minutes = parseInt(readTime, 10);
  return Number.isFinite(minutes) ? `PT${minutes}M` : undefined;
};

const breadcrumb = (items: { name: string; item: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((entry, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: entry.name,
    item: entry.item,
  })),
});

export const articleJsonLd = (article: Article): Record<string, unknown>[] => {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const wordCount = article.content.trim().split(/\s+/).length;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      headline: article.title,
      description: article.excerpt,
      articleSection: article.category,
      keywords: article.tags.join(', '),
      datePublished: article.date,
      dateModified: article.date,
      wordCount,
      timeRequired: isoDuration(article.readTime),
      inLanguage: 'en',
      image: `${SITE_URL}/og-image.jpg`,
      author: person,
      publisher: person,
      isPartOf: {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'Wambogo Hassan Sadat — Blog',
        url: `${SITE_URL}/blog`,
      },
    },
    breadcrumb([
      { name: 'Home', item: SITE_URL },
      { name: 'Blog', item: `${SITE_URL}/blog` },
      { name: article.title, item: url },
    ]),
  ];
};

export const projectJsonLd = (project: ProjectData): Record<string, unknown>[] => {
  const url = `${SITE_URL}/project/${project.slug}`;

  const blocks: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': ['CreativeWork', 'SoftwareApplication'],
      '@id': `${url}#project`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      name: project.title,
      headline: project.title,
      description: project.description,
      abstract: project.problem,
      about: project.category,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web browser',
      keywords: project.tech.join(', '),
      image: absoluteUrl(project.image),
      inLanguage: 'en',
      creator: person,
      author: person,
      publisher: person,
      genre: project.category,
      timeRequired: project.duration,
      featureList: project.features,
      ...(project.liveUrl !== '#' ? { sameAs: project.liveUrl } : {}),
      codeRepository: project.githubUrl,
    },
    breadcrumb([
      { name: 'Home', item: SITE_URL },
      { name: 'Projects', item: `${SITE_URL}/#projects` },
      { name: project.title, item: url },
    ]),
  ];

  if (project.testimonial) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: { '@id': `${url}#project` },
      reviewBody: project.testimonial.quote,
      author: { '@type': 'Person', name: project.testimonial.name, jobTitle: project.testimonial.role },
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
    });
  }

  return blocks;
};
