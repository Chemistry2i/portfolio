import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from '@/components/SEO';
import ImageLightbox from '@/components/ImageLightbox';
import { galleryItems, galleryCategories, type GalleryCategory } from '@/data/gallery';
import { staggerContainer, revealProps, fadeUp } from '@/lib/motion';

const shapeClass = (shape?: string) => {
  if (shape === 'wide') return 'sm:col-span-2 aspect-[16/9]';
  if (shape === 'tall') return 'row-span-2 aspect-[3/4]';
  return 'aspect-square';
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(6px)',
    transition: { duration: 0.25 },
  },
};

const Gallery = () => {
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const items = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen">
      <SEO
        title="Gallery — Wambogo Hassan Sadat"
        description="A visual gallery of events, workshops, team moments and awards from the journey of Wambogo Hassan Sadat — MERN developer and UI/UX designer in Kampala, Uganda."
        path="/gallery"
      />
      <Navigation />

      {/* Scroll progress ribbon */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-primary to-accent z-50"
      />

      <main id="main-content" className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.header
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
            className="mb-12 md:mb-16 text-center"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/#about"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <i className="fas fa-arrow-left" aria-hidden="true" />
                Back to About
              </Link>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="gradient-text">Gallery</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto">
              Moments from the journey — events, workshops, team sessions and the little wins in
              between.
            </motion.p>
          </motion.header>

          {/* Filters */}
          <motion.div
            variants={staggerContainer(0.05, 0.15)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {galleryCategories.map((c) => (
              <motion.button
                key={c}
                variants={fadeUp}
                onClick={() => setFilter(c)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={filter === c}
                className={`relative text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors ${
                  filter === c
                    ? 'text-primary-foreground border-primary'
                    : 'bg-secondary/40 text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          {items.length > 0 ? (
            <motion.div
              key={filter}
              variants={staggerContainer(0.08)}
              {...revealProps}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-auto"
            >
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.button
                    key={item.id}
                    layout
                    variants={cardVariants}
                    exit="exit"
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    onClick={() => setLightbox({ src: item.src, alt: item.title })}
                    className={`group relative overflow-hidden rounded-2xl glass-card p-0 text-left ${shapeClass(
                      item.shape
                    )}`}
                    aria-label={`View ${item.title}`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Shine sweep */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent skew-x-12 transition-transform duration-[900ms] group-hover:translate-x-full" />
                    {/* Caption overlay */}
                    <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="block text-xs sm:text-sm font-semibold text-foreground">
                        {item.title}
                      </span>
                      {item.caption && (
                        <span className="block text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                          {item.caption}
                        </span>
                      )}
                    </span>
                    <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {item.category}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="glass-card rounded-2xl p-10 md:p-16 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              >
                <i className="fas fa-images text-primary-foreground text-2xl" aria-hidden="true" />
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">Photos coming soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
                {filter === 'All'
                  ? 'The gallery is set up and waiting for images — send them over and they will appear here.'
                  : `No photos in "${filter}" yet.`}
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            {...revealProps}
            className="mt-16 text-center glass-card p-8 rounded-2xl"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2">Want the full story?</h3>
            <p className="text-muted-foreground mb-5">
              Browse the resume and credentials behind these moments.
            </p>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:scale-105 transition-transform"
            >
              <i className="fas fa-file-alt" aria-hidden="true" />
              View resume
            </Link>
          </motion.div>
        </div>
      </main>

      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;
