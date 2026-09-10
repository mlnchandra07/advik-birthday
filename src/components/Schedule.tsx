import { motion } from 'framer-motion';

const schedule = [
  {
    time: '7:00 PM',
    event: 'Welcome',
    description: 'Guests arrive and enjoy a grand carnival welcome with live music and carnival acts',
    icon: '🎪',
    color: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.1)',
  },
  {
    time: '7:30 PM',
    event: 'Games & Fun',
    description: 'Exciting carnival games, activities for kids and adults, photo booth, and entertainment',
    icon: '🎡',
    color: '#C62828',
    bg: 'rgba(198, 40, 40, 0.08)',
  },
  {
    time: '8:15 PM',
    event: 'Cake Cutting',
    description: "The magical moment — Advik's grand first birthday cake cutting ceremony with fireworks",
    icon: '🎂',
    color: '#1F4BA5',
    bg: 'rgba(31, 75, 165, 0.08)',
  },
  {
    time: '9:00 PM',
    event: 'Dinner',
    description: 'Indulge in a lavish dinner spread with a variety of delicacies for all to enjoy',
    icon: '🍽️',
    color: '#FF6B35',
    bg: 'rgba(255, 107, 53, 0.08)',
  },
];

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: '#FFF9F2' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circus stripe background */}
        <div
          className="absolute top-0 right-0 w-72 h-72 opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, #C62828, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
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
            ✦ Event Programme ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: '#3B2F2F' }}>
            The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Schedule
            </span>
          </h2>
          <p className="font-body text-base max-w-sm mx-auto" style={{ color: '#6B4F4F' }}>
            A magical evening filled with laughter, joy, and unforgettable moments
          </p>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {schedule.map((item, i) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative flex items-center mb-8 md:mb-12 flex-row gap-4"
            >
              {/* Timeline dot — left on mobile, center on desktop */}
              <div
                className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 text-xl"
                style={{
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                  boxShadow: `0 4px 20px ${item.color}60`,
                  border: '3px solid white',
                }}
              >
                {item.icon}
              </div>

              {/* Content card */}
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(59,47,47,0.12)' }}
                className="flex-1 rounded-3xl p-5 md:p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(255,249,242,0.9)',
                  border: `1px solid ${item.color}30`,
                  boxShadow: '0 8px 32px rgba(59,47,47,0.06)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-50"
                  style={{ background: item.bg }}
                />
                <div className="relative z-10">
                  <span
                    className="font-body text-xs font-bold tracking-widest"
                    style={{ color: item.color }}
                  >
                    {item.time}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold mt-0.5 mb-1.5" style={{ color: '#3B2F2F' }}>
                    {item.event}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#6B4F4F' }}>
                    {item.description}
                  </p>
                </div>
                <span className="absolute top-3 right-3 text-sm opacity-40" style={{ color: item.color }}>✦</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <div
            className="px-8 py-4 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
            }}
          >
            <span className="font-display text-lg font-bold text-black">
              🎊 See you there! 🎊
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
