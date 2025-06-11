import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: "#97DFFC",
        secondary: "#858AE3",
        accent: "#613DC1",
        background: "#000", // Used for bg-background
        foreground: "#fff",
      },
      backgroundImage: {
        'gradient-radial-top-right': "radial-gradient(circle at top right, rgba(121, 68, 154, 0.13), transparent)",
        'gradient-radial-bottom-left': "radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent)",
        'radial-gradient-layers': "radial-gradient(circle at top right, rgba(0, 0, 0, 1), transparent), radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent)",
      },
      animation: {
        'mouse-wheel': 'wheel-animation 1.8s ease-in-out infinite',
        'fade-in-delayed': 'fade-in-animation 1s ease-out 10s forwards', // 10s delay
        'expand': 'expand 0.3s ease-out',
        'collapse': 'collapse 0.3s ease-in',
      },
      keyframes: {
        'wheel-animation': {
          '0%': { opacity: '0', transform: 'translateY(-2px) translateX(-50%)' }, // Start transparent and slightly up
          '20%': { opacity: '1', transform: 'translateY(0px) translateX(-50%)' }, // Fade in
          '80%': { opacity: '0', transform: 'translateY(15px) translateX(-50%)' },
          '100%': { opacity: '0', transform: 'translateY(15px) translateX(-50%)' },
        },
        'fade-in-animation': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'expand': {
          '0%': { maxHeight: '8rem', opacity: '0.7' },
          '100%': { maxHeight: '24rem', opacity: '1' },
        },
        'collapse': {
          '0%': { maxHeight: '24rem', opacity: '1' },
          '100%': { maxHeight: '8rem', opacity: '0.7' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;