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
          50: '#eff4ff',
          100: '#dbe8fe',
          200: '#bfd3fe',
          300: '#93b4fd',
          400: '#6090f9',
          500: '#3b6ef3',
          600: '#1a56db',
          700: '#1444b5',
          800: '#163591',
          900: '#162f73',
        },
        cream: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ede9e2',
          300: '#e0dbd2',
          400: '#cec8bc',
        },
        gold: {
          400: '#e8b44a',
          500: '#c9941a',
          600: '#a37815',
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
