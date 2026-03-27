/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0369A1',
        'primary-hover': '#0284C7',
        secondary: '#0EA5E9',
        accent: '#F97316',
        'accent-hover': '#EA580C',
        background: '#F0F9FF',
        foreground: '#0C4A6E',
        muted: '#64748B',
        ins_border: '#BAE6FD',
        destructive: '#DC2626',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
