import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder gallery items — replace src with actual photo URLs
const galleryItems = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&q=60',
    caption: 'Little Star ⭐',
    category: 'baby',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=300&q=60',
    caption: 'Family Love 💕',
    category: 'family',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&q=60',
    caption: 'Pure Joy 🌟',
    category: 'baby',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=300&q=60',
    caption: 'Happy Moments 🎈',
    category: 'family',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1509741102003-ca64bfe5a069?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1509741102003-ca64bfe5a069?w=300&q=60',
    caption: 'Precious Days 🌸',
    category: 'baby',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=300&q=60',
    caption: 'Advik Grows 🌱',
    category: 'baby',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=300&q=60',
    caption: 'Together 👨‍👩‍👦',
    category: 'family',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1533113354171-97d26c00e2f8?w=600&q=80',
    thumb: 'https://images.unsplash.com/photo-1533113354171-97d26c00e2f8?w=300&q=60',
    caption: 'First Steps 👶',
    category: 'baby',
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'baby' | 'family'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevSlide = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const nextSlide = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % Math.ceil(filtered.length / 3));
    }, 4000);
    return () => clearInterval(t);
  }, [filtered.length]);

  return (
    <section
      id="gallery"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#1a0a2e' }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: '#D4AF37',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Fairy lights at top */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full animate-twinkle"
            style={{
              background: ['#D4AF37', '#C62828', '#1F4BA5', '#FF6B35'][i % 4],
              animationDelay: `${i * 0.2}s`,
              boxShadow: `0 0 8px ${['#D4AF37', '#C62828', '#1F4BA5', '#FF6B35'][i % 4]}`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(212,175,55,0.15)', color: '#F0D060' }}
          >
            ✦ Photo Gallery ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 text-white">
            Precious{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Memories
            </span>
          </h2>
          <p className="font-body text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
            One year of pure magic ✨
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }}>✦</span>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {(['all', 'baby', 'family'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab)}
              className="px-6 py-2.5 rounded-full font-body font-semibold text-sm capitalize transition-all"
              style={{
                background: filter === tab
                  ? 'linear-gradient(135deg, #D4AF37, #F0D060)'
                  : 'rgba(255,255,255,0.08)',
                color: filter === tab ? '#3B2F2F' : 'rgba(255,255,255,0.7)',
                border: filter === tab ? 'none' : '1px solid rgba(255,255,255,0.15)',
                boxShadow: filter === tab ? '0 4px 20px rgba(212,175,55,0.4)' : 'none',
              }}
            >
              {tab === 'all' ? '✨ All' : tab === 'baby' ? '👶 Baby' : '👨‍👩‍👦 Family'}
            </motion.button>
          ))}
        </div>

        {/* Masonry-like grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  aspectRatio: i % 5 === 0 ? '3/4' : '1/1',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.thumb}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
                >
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <p className="font-body text-xs font-medium text-white">{item.caption}</p>
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.8)' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white z-10"
              style={{ background: 'rgba(255,255,255,0.2)' }}
              onClick={closeLightbox}
            >
              ✕
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white z-10"
              style={{ background: 'rgba(212,175,55,0.4)' }}
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="w-full h-full object-contain rounded-2xl"
                style={{ maxHeight: '80vh' }}
              />
              <div
                className="mt-4 text-center py-3 px-6 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <p className="font-body text-white font-medium">{filtered[lightboxIndex].caption}</p>
                <p className="font-body text-white/50 text-sm mt-1">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white z-10"
              style={{ background: 'rgba(212,175,55,0.4)' }}
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            >
              ›
            </button>

            {/* Dot navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i === lightboxIndex ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                    transform: i === lightboxIndex ? 'scale(1.4)' : 'scale(1)',
                  }}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
