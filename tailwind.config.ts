import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f3ff',
          100: '#e1e8ff',
          200: '#c3d0fe',
          300: '#9db0fc',
          400: '#7b8ff8',
          500: '#4a5cf5',
          600: '#1d2f8f',
          700: '#162270',
          800: '#0e1855',
          900: '#080f38',
        },
        cream: {
          50:  '#fafaf8',
          100: '#f5f4f0',
          200: '#ebe8e0',
          300: '#dcd8ce',
          400: '#c8c3b6',
        },
        gold: {
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
