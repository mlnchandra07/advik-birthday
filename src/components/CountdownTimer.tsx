import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-09-15T19:00:00+05:30');

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipCard({ value, label, color }: { value: number; label: string; color: string }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlip(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-30"
          style={{ background: color }}
        />
        {/* Card */}
        <motion.div
          animate={flip ? { rotateX: [0, -90, 0] } : {}}
          transition={{ duration: 0.3 }}
          className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(255,249,242,0.95) 0%, rgba(255,249,242,0.85) 100%)`,
            border: `2px solid ${color}40`,
            boxShadow: `0 8px 32px rgba(59,47,47,0.1), inset 0 1px 0 rgba(255,255,255,0.8)`,
          }}
        >
          {/* Top half */}
          <div className="absolute inset-0 top-0 bottom-1/2 overflow-hidden rounded-t-2xl"
            style={{ background: `linear-gradient(180deg, rgba(255,249,242,1) 0%, rgba(245,230,211,0.5) 100%)` }}
          />
          {/* Divider line */}
          <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: `${color}30`, zIndex: 1 }} />
          {/* Number */}
          <span
            className="relative z-10 font-display text-4xl md:text-5xl font-black tracking-tight"
            style={{ color: '#3B2F2F' }}
          >
            {display}
          </span>
          {/* Shine overlay */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl opacity-50"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
      <div className="text-center">
        <span
          className="font-body text-xs md:text-sm font-bold tracking-widest uppercase"
          style={{ color: color }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function Separator() {
  return (
    <motion.div
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="flex flex-col gap-2 self-center mb-8"
    >
      <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
      <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
    </motion.div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'Days', color: '#D4AF37' },
    { value: timeLeft.hours, label: 'Hours', color: '#C62828' },
    { value: timeLeft.minutes, label: 'Minutes', color: '#1F4BA5' },
    { value: timeLeft.seconds, label: 'Seconds', color: '#FF6B35' },
  ];

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF9F2 0%, #F5E6D3 50%, #FFF9F2 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: 'repeating-linear-gradient(90deg, #D4AF37 0px, #D4AF37 20px, transparent 20px, transparent 40px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background: 'repeating-linear-gradient(90deg, #D4AF37 0px, #D4AF37 20px, transparent 20px, transparent 40px)',
          }}
        />
      </div>

      {/* Floating decorations */}
      <motion.div
        className="absolute top-8 left-8 text-4xl opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        🎠
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-4xl opacity-20 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        🎡
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(212,175,55,0.12)', color: '#A68B2A' }}
          >
            ✦ Counting Down ✦
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: '#3B2F2F' }}>
            {isExpired ? '🎉 Party Time!' : 'The Big Day Is'}
          </h2>
          <h3
            className="font-display text-3xl md:text-4xl font-bold italic"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {isExpired ? "It's Advik's Birthday!" : 'Almost Here!'}
          </h3>
          <div className="gold-divider mt-6" />
        </motion.div>

        {isExpired ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-center text-6xl"
          >
            🎉🎂🎊🎈🎁
          </motion.div>
        ) : (
          <>
            {/* Countdown display */}
            <div className="flex items-start justify-center gap-3 md:gap-6">
              {units.map((unit, i) => (
                <>
                  <FlipCard key={unit.label} value={unit.value} label={unit.label} color={unit.color} />
                  {i < units.length - 1 && <Separator key={`sep-${i}`} />}
                </>
              ))}
            </div>

            {/* Party date reminder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <span className="text-xl">🎂</span>
                <span className="font-body font-medium" style={{ color: '#6B4F4F' }}>
                  September 15, 2026 at 7:00 PM • Park Hyatt
                </span>
                <span className="text-xl">🎂</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
