import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const details = [
  {
    icon: '📅',
    title: 'Date',
    value: 'Tuesday',
    highlight: '15 September, 2026',
    color: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.08)',
  },
  {
    icon: '🕖',
    title: 'Time',
    value: '7:00 PM',
    highlight: 'Onwards',
    color: '#C62828',
    bg: 'rgba(198, 40, 40, 0.08)',
  },
  {
    icon: '📍',
    title: 'Venue',
    value: 'Park Hyatt',
    highlight: 'Hyderabad',
    color: '#1F4BA5',
    bg: 'rgba(31, 75, 165, 0.08)',
  },
];

export default function EventDetails() {
  const openMaps = () => {
    window.open(
      'https://www.google.com/maps/search/Park+Hyatt+Hyderabad',
      '_blank'
    );
  };

  return (
    <section
      id="details"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#FFF9F2' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
        <div
          className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C62828, transparent)' }}
        />
        {/* Circus stripe accents */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: 'repeating-linear-gradient(90deg, #C62828 0px, #C62828 20px, #FFF9F2 20px, #FFF9F2 40px, #D4AF37 40px, #D4AF37 60px, #FFF9F2 60px, #FFF9F2 80px)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#A68B2A' }}
          >
            ✦ Event Information ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3B2F2F' }}>
            Join Us for the{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Magic
            </span>
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: '#6B4F4F' }}>
            "A Day of Fun, Laughter &amp; Magic Awaits!"
          </p>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Detail cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {details.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(59,47,47,0.12)' }}
              className="relative rounded-3xl p-8 text-center overflow-hidden"
              style={{
                background: 'rgba(255,249,242,0.8)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${item.color}30`,
                boxShadow: '0 8px 32px rgba(59,47,47,0.08)',
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: item.bg }}
              />
              <div className="relative z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: item.bg, border: `2px solid ${item.color}40` }}
                >
                  {item.icon}
                </div>
                <p className="font-body text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: item.color }}>
                  {item.title}
                </p>
                <p className="font-display text-2xl font-bold mb-1" style={{ color: '#3B2F2F' }}>
                  {item.value}
                </p>
                <p className="font-body text-base font-medium" style={{ color: '#6B4F4F' }}>
                  {item.highlight}
                </p>
              </div>
              {/* Decorative corner */}
              <div
                className="absolute top-3 right-3 text-lg opacity-30"
                style={{ color: item.color }}
              >
                ✦
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(31,75,165,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={openMaps}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-body font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #1F4BA5, #4272C4)',
              boxShadow: '0 4px 20px rgba(31,75,165,0.25)',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Open in Google Maps
          </motion.button>
        </motion.div>

        {/* Families section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Parents card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(255,249,242,0.9) 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 8px 32px rgba(212,175,55,0.1)',
            }}
          >
            <div className="text-3xl mb-3">👨‍👩‍👦</div>
            <p
              className="font-body text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#A68B2A' }}
            >
              ✦ Parents ✦
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div>
                <p className="font-display text-lg sm:text-xl font-bold" style={{ color: '#3B2F2F' }}>
                  Chris
                </p>
              </div>
              <span className="text-2xl">❤️</span>
              <div>
                <p className="font-display text-lg sm:text-xl font-bold" style={{ color: '#3B2F2F' }}>
                  Priyanka
                </p>
              </div>
            </div>
            {/* Gold corner ornaments */}
            <span className="absolute top-3 left-3 text-xl" style={{ color: '#D4AF37', opacity: 0.4 }}>✦</span>
            <span className="absolute top-3 right-3 text-xl" style={{ color: '#D4AF37', opacity: 0.4 }}>✦</span>
            <span className="absolute bottom-3 left-3 text-xl" style={{ color: '#D4AF37', opacity: 0.4 }}>✦</span>
            <span className="absolute bottom-3 right-3 text-xl" style={{ color: '#D4AF37', opacity: 0.4 }}>✦</span>
          </motion.div>

          {/* Invited by card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(198,40,40,0.06) 0%, rgba(255,249,242,0.9) 100%)',
              border: '1px solid rgba(198,40,40,0.2)',
              boxShadow: '0 8px 32px rgba(198,40,40,0.08)',
            }}
          >
            <div className="text-3xl mb-3">🎊</div>
            <p
              className="font-body text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#C62828' }}
            >
              ✦ Invited By ✦
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div>
                <p className="font-display text-lg sm:text-xl font-bold" style={{ color: '#3B2F2F' }}>
                  Narasimha Rao
                </p>
              </div>
              <span className="text-2xl">❤️</span>
              <div>
                <p className="font-display text-lg sm:text-xl font-bold" style={{ color: '#3B2F2F' }}>
                  Vijaya Lakshmi
                </p>
              </div>
            </div>
            <span className="absolute top-3 left-3 text-xl" style={{ color: '#C62828', opacity: 0.3 }}>✦</span>
            <span className="absolute top-3 right-3 text-xl" style={{ color: '#C62828', opacity: 0.3 }}>✦</span>
            <span className="absolute bottom-3 left-3 text-xl" style={{ color: '#C62828', opacity: 0.3 }}>✦</span>
            <span className="absolute bottom-3 right-3 text-xl" style={{ color: '#C62828', opacity: 0.3 }}>✦</span>
          </motion.div>
        </div>

        {/* Message banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center py-10 px-8 rounded-3xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #C62828 0%, #8B0000 50%, #C62828 100%)',
            boxShadow: '0 10px 40px rgba(198,40,40,0.3)',
          }}
        >
          {/* Decorative circus pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 20px)',
            }}
          />
          <div className="relative z-10">
            <div className="text-3xl mb-3">🎪</div>
            <p
              className="font-display text-2xl md:text-3xl font-bold italic text-white"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              "A Day of Fun, Laughter &amp; Magic Awaits!"
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-white/40" />
              <span className="text-gold-DEFAULT text-xl" style={{ color: '#F0D060' }}>✦</span>
              <div className="h-px w-16 bg-white/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
