import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 8 + 4,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
  color: ['#D4AF37', '#F0D060', '#FFD700', '#FF6B35', '#ffffff', '#C62828'][
    Math.floor(Math.random() * 6)
  ],
}));

const LIGHTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i / 19) * 100,
  color: ['#D4AF37', '#C62828', '#1F4BA5', '#FF6B35'][i % 4],
}));

export default function Hero() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Open curtain after short delay
    const t1 = setTimeout(() => setCurtainOpen(true), 800);
    const t2 = setTimeout(() => setShowContent(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d0620 0%, #1a0a2e 15%, #2d1b4e 35%, #7B1E2E 60%, #C4522A 80%, #E8903A 95%, #FFB347 100%)',
      }}
    >
      {/* Animated carnival light string at top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center overflow-hidden">
        <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="xMidYMid meet">
          <path
            d="M0,20 Q150,60 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="rgba(212,175,55,0.6)"
            strokeWidth="2"
          />
          {LIGHTS.map((light) => (
            <g key={light.id}>
              <circle
                cx={`${light.x}%`}
                cy="20"
                r="6"
                fill={light.color}
                className="animate-twinkle"
                style={{ animationDelay: `${light.id * 0.15}s` }}
              />
              <circle
                cx={`${light.x}%`}
                cy="20"
                r="12"
                fill={light.color}
                opacity="0.2"
                className="animate-twinkle"
                style={{ animationDelay: `${light.id * 0.15}s` }}
              />
              {/* Bulb shape */}
              <rect
                x={`calc(${light.x}% - 4px)`}
                y="26"
                width="8"
                height="14"
                rx="2"
                fill={light.color}
                opacity="0.8"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Stars background */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 24 24" fill={p.color} width={p.size} height={p.size}>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
        </motion.div>
      ))}

      {/* Clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20 pointer-events-none"
          style={{
            top: `${20 + i * 15}%`,
            fontSize: `${4 + i * 2}rem`,
          }}
          animate={{
            x: i % 2 === 0 ? ['-10%', '110%'] : ['110%', '-10%'],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 8,
          }}
        >
          ☁️
        </motion.div>
      ))}

      {/* Entrance curtain */}
      <AnimatePresence>
        {!curtainOpen && (
          <>
            {/* Left curtain */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 z-30 overflow-hidden"
              exit={{ x: '-105%' }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #C62828 40%, #8B0000 70%, #6B0000 100%)',
              }}
            >
              {/* Curtain fabric folds */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-y-0"
                  style={{
                    left: `${i * 17}%`,
                    width: '20%',
                    background: `linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)`,
                  }}
                />
              ))}
              {/* Gold trim */}
              <div
                className="absolute right-0 inset-y-0 w-3"
                style={{ background: 'linear-gradient(90deg, #A68B2A, #F0D060, #A68B2A)' }}
              />
              {/* Curtain top fringe */}
              <div className="absolute top-0 left-0 right-0 h-8 flex">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-b-full"
                    style={{ background: 'linear-gradient(180deg, #F0D060, #A68B2A)' }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right curtain */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 z-30 overflow-hidden"
              exit={{ x: '105%' }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
              style={{
                background: 'linear-gradient(225deg, #8B0000 0%, #C62828 40%, #8B0000 70%, #6B0000 100%)',
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-y-0"
                  style={{
                    right: `${i * 17}%`,
                    width: '20%',
                    background: `linear-gradient(270deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)`,
                  }}
                />
              ))}
              <div
                className="absolute left-0 inset-y-0 w-3"
                style={{ background: 'linear-gradient(90deg, #A68B2A, #F0D060, #A68B2A)' }}
              />
              <div className="absolute top-0 left-0 right-0 h-8 flex">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-b-full"
                    style={{ background: 'linear-gradient(180deg, #F0D060, #A68B2A)' }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Ferris wheel decoration - top right */}
      <motion.div
        className="absolute top-20 right-8 opacity-30 pointer-events-none hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="55" fill="none" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="60" cy="60" r="10" fill="#D4AF37" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 60 + 45 * Math.cos(angle);
            const y = 60 + 45 * Math.sin(angle);
            return (
              <g key={i}>
                <line x1="60" y1="60" x2={x} y2={y} stroke="#D4AF37" strokeWidth="1.5" />
                <rect
                  x={x - 8}
                  y={y - 6}
                  width="16"
                  height="12"
                  rx="3"
                  fill={['#C62828', '#1F4BA5', '#D4AF37', '#FF6B35'][i % 4]}
                  stroke="#D4AF37"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Carousel horse - bottom left */}
      <motion.div
        className="absolute bottom-24 left-8 text-5xl opacity-30 pointer-events-none hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎠
      </motion.div>

      {/* Popcorn - bottom right */}
      <motion.div
        className="absolute bottom-24 right-16 text-4xl opacity-40 pointer-events-none hidden lg:block"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🍿
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <AnimatePresence>
          {showContent && (
            <>
              {/* Top label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-5"
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-body font-medium border"
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    borderColor: 'rgba(212, 175, 55, 0.4)',
                    color: '#F0D060',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  ✨ A Grand Celebration Awaits ✨
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-4"
              >
                <h1
                  className="font-display font-bold text-white leading-tight"
                  style={{
                    fontSize: 'clamp(1.6rem, 6vw, 3rem)',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  🎪 Our Little Star is
                </h1>
                <h1
                  className="font-display font-black leading-tight mt-1"
                  style={{
                    fontSize: 'clamp(2rem, 8vw, 3.75rem)',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 40%, #D4AF37 60%, #A68B2A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Turning One
                </h1>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
                <span style={{ color: '#D4AF37' }}>✦</span>
                <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
              </motion.div>

              {/* Crown */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                className="text-3xl sm:text-4xl mb-1"
              >
                👑
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                className="mb-6"
              >
                <h2
                  className="leading-tight"
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    fontSize: 'clamp(2.2rem, 9vw, 6rem)',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 30%, #FFD700 50%, #D4AF37 70%, #A68B2A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.4))',
                    letterSpacing: '0.02em',
                  }}
                >
                  Advik Baragada
                </h2>
              </motion.div>

              {/* Date / Time / Venue badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
              >
                {[
                  { icon: '📅', text: 'Sep 15, 2026' },
                  { icon: '🕖', text: '7:00 PM Onwards' },
                  { icon: '📍', text: 'Park Hyatt' },
                ].map((b) => (
                  <div
                    key={b.text}
                    className="px-4 py-2.5 rounded-2xl text-white font-body font-semibold"
                    style={{
                      fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(212,175,55,0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {b.icon} {b.text}
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <motion.a
                  href="#rsvp"
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(212,175,55,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-body font-bold text-base text-black inline-block text-center"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
                    boxShadow: '0 4px 25px rgba(212,175,55,0.4)',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  🎟️ RSVP Now
                </motion.a>
                <motion.a
                  href="#details"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-body font-semibold text-base text-white border-2 inline-block text-center"
                  style={{ borderColor: 'rgba(212,175,55,0.6)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#details')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Details
                </motion.a>
              </motion.div>


            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#FFF9F2" />
        </svg>
      </div>

      {/* Scroll indicator — fixed at bottom center of hero */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-1.5 text-white/60"
            >
              <span className="text-xs font-body tracking-widest uppercase">Scroll to explore</span>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
