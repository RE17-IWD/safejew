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
          50: '#f0f4f8',
          100: '#d9e5f0',
          200: '#b3cbe1',
          300: '#7fa8c9',
          400: '#4d83b0',
          500: '#2d6596',
          600: '#1e3a5f',
          700: '#142d4c',
          800: '#0f2240',
          900: '#091830',
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
