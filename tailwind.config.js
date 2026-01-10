/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. CRITICAL: Set darkMode to 'class' to enable manual toggling via the ThemeToggle component
  darkMode: 'class',

  // 2. Define where Tailwind should look for your class names
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if you use the /src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Modern animations for premium UI
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      // Modern green/teal color palette for Team Heisenbucks
      colors: {
        brand: {
          emerald: {
            light: '#10b981', // Emerald 500
            DEFAULT: '#059669', // Emerald 600
            dark: '#047857',  // Emerald 700
          },
          teal: {
            light: '#14b8a6', // Teal 500
            DEFAULT: '#0d9488', // Teal 600
            dark: '#0f766e',  // Teal 700
          },
        },
      },
      boxShadow: {
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.4), 0 0 40px rgba(20, 184, 166, 0.2)',
      },
    },
  },
  plugins: [],
}