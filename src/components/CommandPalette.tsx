import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  Mail,
  FileText,
  Images,
  Newspaper,
  Sun,
  Moon,
  Github,
  Linkedin,
  Phone,
  Command as CommandIcon,
  CalendarClock,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { articles } from '@/data/articles';
import { useTheme } from '@/components/ThemeProvider';

const sections = [
  { label: 'Home', hash: '#home', icon: Home },
  { label: 'About', hash: '#about', icon: User },
  { label: 'Experience', hash: '#experience', icon: Briefcase },
  { label: 'Projects', hash: '#projects', icon: FolderKanban },
  { label: 'Services', hash: '#services', icon: CommandIcon },
  { label: 'Contact', hash: '#contact', icon: Mail },
];

const pages = [
  { label: 'Resume', to: '/resume', icon: FileText },
  { label: 'Blog', to: '/blog', icon: Newspaper },
  { label: 'Photo Gallery', to: '/gallery', icon: Images },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test((e.target as HTMLElement)?.tagName ?? '')) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // let the dialog close before scrolling / navigating
    window.setTimeout(fn, 80);
  };

  const goToHash = (hash: string) => {
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', hash);
  };

  return (
    <>
      {/* Floating hint / trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="no-print glass-card fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground md:flex"
      >
        <CommandIcon className="h-3.5 w-3.5 text-primary" />
        <span>Quick nav</span>
        <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, project, article or action…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Sections">
            {sections.map(({ label, hash, icon: Icon }) => (
              <CommandItem key={hash} value={`section ${label}`} onSelect={() => run(() => goToHash(hash))}>
                <Icon className="mr-2 h-4 w-4 text-primary" />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Pages">
            {pages.map(({ label, to, icon: Icon }) => (
              <CommandItem key={to} value={`page ${label}`} onSelect={() => run(() => navigate(to))}>
                <Icon className="mr-2 h-4 w-4 text-primary" />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Case studies">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                value={`project ${p.title}`}
                onSelect={() => run(() => navigate(`/project/${p.slug}`))}
              >
                <FolderKanban className="mr-2 h-4 w-4 text-accent" />
                <span className="truncate">{p.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Articles">
            {articles.map((a) => (
              <CommandItem
                key={a.slug}
                value={`article ${a.title}`}
                onSelect={() => run(() => navigate(`/blog/${a.slug}`))}
              >
                <Newspaper className="mr-2 h-4 w-4 text-accent" />
                <span className="truncate">{a.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem value="toggle theme dark light mode" onSelect={() => run(toggleTheme)}>
              {theme === 'dark' ? (
                <Sun className="mr-2 h-4 w-4 text-primary" />
              ) : (
                <Moon className="mr-2 h-4 w-4 text-primary" />
              )}
              Switch to {theme === 'dark' ? 'light' : 'dark'} mode
            </CommandItem>
            <CommandItem
              value="book a call calendly meeting"
              onSelect={() =>
                run(() => window.open('https://calendly.com/wambogohassansadat/15min', '_blank', 'noopener'))
              }
            >
              <CalendarClock className="mr-2 h-4 w-4 text-primary" />
              Book a 15-min call
            </CommandItem>
            <CommandItem
              value="email contact"
              onSelect={() => run(() => (window.location.href = 'mailto:wambogohassan63@gmail.com'))}
            >
              <Mail className="mr-2 h-4 w-4 text-primary" />
              Send me an email
            </CommandItem>
            <CommandItem
              value="whatsapp phone call"
              onSelect={() => run(() => window.open('https://wa.me/256786021431', '_blank', 'noopener'))}
            >
              <Phone className="mr-2 h-4 w-4 text-primary" />
              WhatsApp me
            </CommandItem>
            <CommandItem
              value="github profile"
              onSelect={() => run(() => window.open('https://github.com/Chemistry2i', '_blank', 'noopener'))}
            >
              <Github className="mr-2 h-4 w-4 text-primary" />
              GitHub profile
            </CommandItem>
            <CommandItem
              value="linkedin profile"
              onSelect={() =>
                run(() => window.open('https://www.linkedin.com/in/wambogo-hassan-sadat-895544376', '_blank', 'noopener'))
              }
            >
              <Linkedin className="mr-2 h-4 w-4 text-primary" />
              LinkedIn profile
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
