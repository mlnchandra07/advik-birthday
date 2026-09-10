import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Balloon {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const BALLOON_COLORS = ['#C62828', '#1F4BA5', '#D4AF37', '#FF6B35', '#E91E8C', '#4CAF50'];
const BALLOON_EMOJIS = ['🎈', '🎈', '🎈', '🎈', '🎉', '⭐'];

let nextId = 0;
function createBalloon(): Balloon {
  return {
    id: nextId++,
    x: Math.random() * 90 + 5,
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    size: Math.random() * 20 + 40,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 2,
    emoji: BALLOON_EMOJIS[Math.floor(Math.random() * BALLOON_EMOJIS.length)],
  };
}

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    // Launch a balloon every 3 seconds
    const addBalloon = () => {
      setBalloons((prev) => [...prev.slice(-8), createBalloon()]);
    };

    // Initial balloons
    for (let i = 0; i < 3; i++) {
      setTimeout(addBalloon, i * 1000);
    }

    const interval = setInterval(addBalloon, 3500);
    return () => clearInterval(interval);
  }, [active]);

  const removeBalloon = (id: number) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', x: `${b.x}vw`, opacity: 0, rotate: -10 }}
            animate={{
              y: '-20vh',
              opacity: [0, 1, 1, 0],
              rotate: [b.id % 2 === 0 ? -10 : 10, b.id % 2 === 0 ? 10 : -10],
              x: [`${b.x}vw`, `${b.x + (Math.random() - 0.5) * 10}vw`],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              ease: 'easeInOut',
            }}
            onAnimationComplete={() => removeBalloon(b.id)}
            style={{
              position: 'absolute',
              fontSize: b.size,
              lineHeight: 1,
            }}
          >
            {b.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
