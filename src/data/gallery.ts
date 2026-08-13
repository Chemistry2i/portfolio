import cyber1 from '@/assets/gallery/cyber-1.jpeg.asset.json';
import cyber2 from '@/assets/gallery/cyber-2.jpeg.asset.json';
import steam2026 from '@/assets/gallery/steam-2026.jpeg.asset.json';
import gaime from '@/assets/gallery/gaime.jpg.asset.json';

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
export const galleryItems: GalleryItem[] = [];
