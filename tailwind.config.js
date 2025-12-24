/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Cyber-Tactical Palette
        obsidian: {
          DEFAULT: '#050505',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
        },
        cyan: {
          neon: '#00e5ff',
          glow: '#00ffff',
          dim: '#00b8d4',
        },
        warning: {
          yellow: '#facc15',
          amber: '#fbbf24',
        },
        critical: {
          red: '#ff003c',
          crimson: '#dc2626',
        },
        plasma: {
          purple: '#a855f7',
          magenta: '#d946ef',
        }
      },
      fontFamily: {
        tactical: ['Rajdhani', 'Orbitron', 'system-ui', 'sans-serif'],
        display: ['Exo 2', 'Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero-title': ['3.5rem', { lineHeight: '1', fontWeight: '900' }],
        'section-title': ['2rem', { lineHeight: '1.2', fontWeight: '800' }],
        'stat-value': ['2.5rem', { lineHeight: '1', fontWeight: '700' }],
      },
      backdropBlur: {
        tactical: '30px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)',
        'neon-red': '0 0 20px rgba(255, 0, 60, 0.5), 0 0 40px rgba(255, 0, 60, 0.3)',
        'tactical': '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 0 0 0.5px rgba(0, 229, 255, 0.3)',
        'plasma': '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'flicker': 'flicker 0.15s infinite',
        'scan': 'scan 2s linear infinite',
        'chromatic': 'chromatic 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        chromatic: {
          '0%, 100%': {
            textShadow: '0 0 0 rgba(0, 229, 255, 0), 0 0 0 rgba(255, 0, 60, 0)'
          },
          '50%': {
            textShadow: '-3px 0 0 rgba(0, 229, 255, 0.7), 3px 0 0 rgba(255, 0, 60, 0.7)'
          },
        }
      },
      skew: {
        '6': '6deg',
        '12': '12deg',
      }
    },
  },
  plugins: [],
}
