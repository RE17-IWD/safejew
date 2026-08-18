import type { Config } from 'tailwindcss';

// SafeJew brand palette (2026). Token NAMES are kept (navy / cream / gold) so the
// existing pages recolor automatically, but the VALUES now match the homepage's
// white + brand-blue system. "gold" is remapped to the blue accent so any old
// gold accents render on-brand.
const brandBlue = {
  50: '#f4f8fd',
  100: '#e6eefb',
  200: '#c9d9f7',
  300: '#90b0f0',
  400: '#4d7ae6',
  500: '#1a56db', // brand blue
  600: '#1a44a8',
  700: '#14357f',
  800: '#0f2a63',
  900: '#0a1f44', // navy / ink
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: brandBlue,
        gold: brandBlue,
        cream: {
          50: '#ffffff',
          100: '#f6f9fd',
          200: '#e4eaf3',
          300: '#d2ddef',
          400: '#b9c4d6',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        serif: ['var(--font-jakarta)', 'Georgia', 'serif'],
        mono: ['var(--font-plex)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      // Slightly softer than the defaults; keeps cards friendly but a touch less round.
      borderRadius: {
        none: '0px', sm: '2px', DEFAULT: '4px', md: '4px',
        lg: '5px', xl: '6px', '2xl': '8px', '3xl': '10px', full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
