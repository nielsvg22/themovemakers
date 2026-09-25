import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071b2a',
          2: '#0b2435',
          3: '#102f43',
        },
        lime: {
          DEFAULT: '#d6ff55',
          2: '#c6f73c',
        },
        ink: '#10212b',
        muted: '#6f7f89',
        line: '#e5eaed',
        soft: '#f5f7f8',
      },
      borderRadius: {
        'xl': '18px',
        'lg': '12px',
        'md': '10px',
      },
      boxShadow: {
        'card': '0 14px 36px rgba(6,27,42,.10)',
        'card-hover': '0 7px 18px rgba(4,26,42,.045)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        'container': '1240px',
      },
    },
  },
  plugins: [],
}
export default config