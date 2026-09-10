import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative overflow-hidden py-16 px-6"
      style={{
        background: 'linear-gradient(180deg, #1a0a2e 0%, #0d0620 100%)',
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: '#D4AF37',
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              fontStyle: 'italic',
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Advik Baragada
          </span>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
          <span className="text-2xl">👑</span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
        </div>

        {/* Event reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 p-6 rounded-3xl inline-block"
          style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            🎪 Luxury Circus Carnival Birthday Celebration
          </p>
          <p className="font-display text-lg font-bold text-white mt-1">
            September 15, 2026 • 7:00 PM • Park Hyatt
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p
            className="font-body text-sm"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="inline-block text-red-400"
            >
              ❤️
            </motion.span>
            {' '}for{' '}
            <span style={{ color: '#D4AF37' }}>Advik's First Birthday</span>
          </p>
        </motion.div>

        <p
          className="font-body text-xs"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          © 2026 Advik Baragada's Birthday • All rights reserved
        </p>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-8 w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-all"
          style={{
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37',
          }}
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
