import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
  summary?: string;
  className?: string;
}

const ShareButtons = ({ url, title, summary = '', className = '' }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const e = encodeURIComponent;
  const targets = [
    {
      name: 'X',
      icon: 'fab fa-x-twitter',
      href: `https://twitter.com/intent/tweet?text=${e(title)}&url=${e(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      href: `https://wa.me/?text=${e(`${title} — ${url}`)}`,
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      href: `mailto:?subject=${e(title)}&body=${e(`${summary}\n\n${url}`)}`,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: summary, url });
        return;
      } catch {
        /* user dismissed */
      }
    }
    handleCopy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: 'Link copied', description: 'Share it anywhere you like.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Could not copy the link', variant: 'destructive' });
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 no-print ${className}`}>
      {targets.map((t) => (
        <a
          key={t.name}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${t.name}`}
          title={`Share on ${t.name}`}
          className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          <i className={`${t.icon} text-sm`} />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        title="Copy link"
        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      >
        <i className={`fas ${copied ? 'fa-check' : 'fa-link'} text-sm`} />
      </button>
      <button
        type="button"
        onClick={handleNativeShare}
        className="sm:hidden inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-border text-muted-foreground text-sm hover:text-primary hover:border-primary/50 transition-colors"
      >
        <i className="fas fa-share-nodes text-sm" />
        Share
      </button>
    </div>
  );
};

export default ShareButtons;
