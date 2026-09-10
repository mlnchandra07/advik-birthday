import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#details', label: 'Details' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#location', label: 'Location' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'glass shadow-glass-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('#home')}
            whileHover={{ scale: 1.05 }}
            className="font-script text-2xl text-gold-DEFAULT leading-none"
            style={{ color: '#D4AF37' }}
          >
            🎪 Advik's 1st
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`font-body text-sm font-medium transition-all duration-300 hover:text-gold-DEFAULT relative ${
                  activeSection === href.slice(1)
                    ? 'text-gold-DEFAULT'
                    : scrolled
                    ? 'text-circus-brown'
                    : 'text-white'
                }`}
                style={{
                  color: activeSection === href.slice(1)
                    ? '#D4AF37'
                    : scrolled
                    ? '#3B2F2F'
                    : 'white',
                }}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: '#D4AF37' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Music toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMusicOn(!musicOn)}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm transition-colors"
              title={musicOn ? 'Mute music' : 'Play music'}
            >
              {musicOn ? '🎵' : '🔇'}
            </motion.button>

            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm"
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-full glass flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                style={{ backgroundColor: '#D4AF37' }}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
                style={{ backgroundColor: '#D4AF37' }}
              />
              <span
                className={`block w-5 h-0.5 transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                style={{ backgroundColor: '#D4AF37' }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-4 right-4 z-[99] glass rounded-2xl p-6 shadow-glass-lg"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(({ href, label }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(href)}
                  className={`text-left font-body font-medium py-2 px-4 rounded-xl transition-all ${
                    activeSection === href.slice(1)
                      ? 'bg-gold-DEFAULT text-white'
                      : 'hover:bg-gold-DEFAULT/10'
                  }`}
                  style={{
                    backgroundColor: activeSection === href.slice(1) ? '#D4AF37' : undefined,
                    color: activeSection === href.slice(1) ? 'white' : '#3B2F2F',
                  }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
