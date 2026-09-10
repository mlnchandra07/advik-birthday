import { motion } from 'framer-motion';

export default function Location() {
  return (
    <section
      id="location"
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 100%)',
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
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
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            ✦ Venue ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 text-white">
            Find{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Us Here
            </span>
          </h2>
          <p className="font-body text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
            📍 Park Hyatt, Hyderabad
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }}>✦</span>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden"
            style={{
              border: '2px solid rgba(212,175,55,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <iframe
              title="Park Hyatt Hyderabad Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1698982938!2d78.4388!3d17.4283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a3bbb46ef7%3A0x93b2f74f89ceef40!2sPark%20Hyatt%20Hyderabad!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Venue info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Address card */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(212,175,55,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-3xl mb-3">🏨</div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Park Hyatt</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Road No. 2, Banjara Hills,<br />
                Hyderabad, Telangana 500034<br />
                India
              </p>
            </div>

            {/* Event details reminder */}
            <div
              className="rounded-3xl p-6 space-y-3"
              style={{
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.25)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color: '#D4AF37' }}>DATE</p>
                  <p className="font-body text-sm text-white">September 15, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🕖</span>
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color: '#D4AF37' }}>TIME</p>
                  <p className="font-body text-sm text-white">7:00 PM Onwards</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🚗</span>
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color: '#D4AF37' }}>PARKING</p>
                  <p className="font-body text-sm text-white">Valet available</p>
                </div>
              </div>
            </div>

            {/* Directions button */}
            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=Park+Hyatt+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 p-4 rounded-2xl font-body font-semibold text-black transition-all"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
