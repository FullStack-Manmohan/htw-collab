import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'htw-primary': '#00D4FF',
        'htw-deep-sea': '#003366',
        'htw-tech-blue': '#1E40AF'
      },
      fontFamily: {
        'ibm-condensed': ['IBM Plex Sans Condensed', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.06)"
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite'
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    }
  },
  plugins: [],
};

export default config;