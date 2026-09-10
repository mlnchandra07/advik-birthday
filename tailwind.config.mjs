/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F0D060',
          dark: '#A68B2A',
        },
        circus: {
          red: '#C62828',
          'red-light': '#EF5350',
          blue: '#1F4BA5',
          'blue-light': '#4272C4',
          cream: '#FFF9F2',
          'cream-dark': '#F5E6D3',
          brown: '#3B2F2F',
          'brown-light': '#6B4F4F',
        },
        sunset: {
          from: '#FF6B35',
          mid: '#F7931E',
          to: '#FFD700',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        allura: ['Allura', 'cursive'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        twinkle: 'twinkle 2s ease-in-out infinite',
        'twinkle-delayed': 'twinkle 2s ease-in-out infinite 1s',
        shimmer: 'shimmer 3s linear infinite',
        'curtain-left': 'curtainLeft 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'curtain-right': 'curtainRight 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        confetti: 'confetti 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'balloon-float': 'balloonFloat 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        curtainLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-110%)' },
        },
        curtainRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(110%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        balloonFloat: {
          '0%': { transform: 'translateY(100vh) rotate(-10deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-20vh) rotate(10deg)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #F0D060 25%, #D4AF37 50%, #A68B2A 75%, #D4AF37 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 30%, #FFD700 60%, #FF6B35 100%)',
        'circus-gradient': 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 30%, #8B2635 60%, #D4523A 80%, #FFB347 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,249,242,0.8) 0%, rgba(255,249,242,0.4) 100%)',
      },
      boxShadow: {
        gold: '0 4px 30px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 8px 40px rgba(212, 175, 55, 0.5)',
        glass: '0 8px 32px rgba(59, 47, 47, 0.1)',
        'glass-lg': '0 16px 64px rgba(59, 47, 47, 0.15)',
        circus: '0 4px 20px rgba(198, 40, 40, 0.3)',
      },
    },
  },
  plugins: [],
};
