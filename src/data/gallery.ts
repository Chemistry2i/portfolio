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
