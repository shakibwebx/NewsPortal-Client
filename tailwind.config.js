/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D00614',
          dark: '#a00510',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#e5e7eb',
          dark: '#d1d5db',
          foreground: '#1f2937',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        foreground: '#1a1a1a',
        accent: {
          DEFAULT: '#f3f4f6',
          foreground: '#1f2937',
        },
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#D00614',
      },
      fontFamily: {
        bengali: ['Noto Sans Bengali', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
