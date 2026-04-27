/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        accent: '#d4a853',
        'accent-dim': 'rgba(212,168,83,0.15)',
        'accent-glow': 'rgba(212,168,83,0.3)',
        surface: '#141416',
        'surface-2': '#1c1c20',
        'surface-3': '#242428',
        danger: '#c75050',
        'danger-dim': 'rgba(199,80,80,0.12)',
        success: '#5aad6e',
        'success-dim': 'rgba(90,173,110,0.12)',
      },
    },
  },
  plugins: [],
}
