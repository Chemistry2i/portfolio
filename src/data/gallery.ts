import cyber1 from '@/assets/gallery/cyber-1.jpeg';
import cyber2 from '@/assets/gallery/cyber-2.jpeg';
import steam2026 from '@/assets/gallery/steam-2026.jpeg';
import gaime from '@/assets/gallery/gaime.jpg';
import gaimeFriends from '@/assets/gallery/gaime-friends.jpg';
import campusChill from '@/assets/gallery/campus-chill.jpg';
import binanceEvent from '@/assets/gallery/binance-event.jpeg';
import wpSession from '@/assets/gallery/wordpress-connect-session.jpg';
import wpLogo from '@/assets/gallery/wordpress-connect-logo.jpg';
import wpTeam from '@/assets/gallery/wordpress-connect-team.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: GalleryCategory;
  /** Image URL — asset pointer url, imported asset, or remote https URL. */
  src: string;
  /** Optional: 'wide' | 'tall' | 'square' controls the masonry footprint. */
  shape?: 'wide' | 'tall' | 'square';
  date?: string;
}

export type GalleryCategory = 'Events' | 'Workshops' | 'Team' | 'Awards' | 'Behind the scenes';

export const galleryCategories: ('All' | GalleryCategory)[] = [
  'All',
  'Events',
  'Workshops',
  'Team',
  'Awards',
  'Behind the scenes',
];

/**
 * Gallery images. Add entries here as images become available.
 * Upload images with lovable-assets and reference the pointer url.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'wordpress-campus-connect-session',
    title: 'WordPress Campus Connect — Hands-on Session',
    caption: 'Students diving into WordPress during our Campus Connect workshop at Kyambogo University',
    category: 'Workshops',
    src: wpSession,
    shape: 'wide',
    date: 'September 2026',
  },
  {
    id: 'wordpress-campus-connect-logo',
    title: 'WordPress Campus Connect — With the Community',
    caption: 'KYUCSA WordPress & CMS community leads showcasing the WordPress brand at Kyambogo University',
    category: 'Events',
    src: wpLogo,
    shape: 'tall',
    date: 'September 2026',
  },
  {
    id: 'wordpress-campus-connect-team',
    title: 'WordPress Campus Connect — Coordination Desk',
    caption: 'Coordinating the event with the School of Computing & Information Science team',
    category: 'Behind the scenes',
    src: wpTeam,
    shape: 'square',
    date: 'September 2026',
  },
  {
    id: 'binance-university-tour-2026',
    title: 'Binance University Tour — Kyambogo University',
    caption: 'Organized with Binance & Amplify Growth Africa — blockchain education for students',
    category: 'Events',
    src: binanceEvent,
    shape: 'wide',
    date: 'September 2026',
  },
  {
    id: 'ucc-cybersecurity-2026-1',
    title: 'Inaugural National Cyber Security Conference',
    caption: 'UCC / UgCERT — Securing Uganda: Culture, Collaboration, Resilience & Trust',
    category: 'Events',
    src: cyber1,
    shape: 'tall',
    date: 'August 2026',
  },
  {
    id: 'ucc-cybersecurity-2026-2',
    title: 'Kyambogo University Exhibition Stand',
    caption: 'School of Computing & Information Science at the National Cyber Security Conference',
    category: 'Events',
    src: cyber2,
    shape: 'wide',
    date: 'August 2026',
  },
  {
    id: 'kyu-steam-2026',
    title: 'Kyambogo University 5th STEAM Festival 2026 — Winners',
    caption: 'Our team emerged overall winners at the 2026 STEAM Festival',
    category: 'Awards',
    src: steam2026,
    shape: 'wide',
    date: '2026',
  },
  {
    id: 'gaime-conference',
    title: 'GAIME Conference — Speke Resort Munyonyo',
    caption: 'Global Artificial Intelligence Innovation & Model Evolution Conference',
    category: 'Events',
    src: gaime,
    shape: 'wide',
  },
  {
    id: 'gaime-friends',
    title: 'With friends at the GAIME Conference',
    caption: 'Speke Resort Munyonyo — before the sessions kicked off',
    category: 'Events',
    src: gaimeFriends,
    shape: 'wide',
  },
  {
    id: 'campus-chill',
    title: 'Chilling at campus',
    caption: 'Just unwinding with the crew at Kyambogo University',
    category: 'Behind the scenes',
    src: campusChill,
    shape: 'tall',
  },
];
