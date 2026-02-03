/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'anthracite': '#383e42',
        'horner-green': '#42cc5d',
        'dark-bg': '#1a1a1a',
        'light-grey': '#A8BAC6',
      },
      fontFamily: {
        'michroma': ['Michroma', 'monospace'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        '15': '60px',
        '18vh': '18vh',
        '20vh': '20vh',
        '22vh': '22vh',
        '60vh': '60vh',
      },
      maxHeight: {
        '60vh': '60vh',
      },
      height: {
        '15': '60px',
        '18vh': '18vh',
        '60vh': '60vh',
        'screen-minus-banner': 'calc(100vh - 60px)',
        'screen-minus-mobile-banner': 'calc(100vh - 18vh)',
      },
      bottom: {
        '20': '5rem',
        '22vh': '22vh',
      },
      zIndex: {
        '999': '999',
        '1000': '1000',
        '2000': '2000',
      },
      dropShadow: {
        'glow': '0 0 8px rgba(66, 204, 93, 0.5)',
        'glow-strong': '0 0 20px rgba(66, 204, 93, 0.3)',
        'progress': '0 0 10px rgba(66, 204, 93, 0.5)',
      },
    },
  },
  plugins: [],
}