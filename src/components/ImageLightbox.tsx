import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageLightbox = ({ src, alt, onClose }: ImageLightboxProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 animate-fade-in cursor-zoom-out"
    >
      <button
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary text-foreground flex items-center justify-center transition-colors"
      >
        <i className="fas fa-times text-lg" />
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl shadow-2xl animate-scale-in cursor-default"
      />
    </div>,
    document.body
  );
};

export default ImageLightbox;
