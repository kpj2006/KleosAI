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
      // 3. Optional: Add custom animations for your glassmorphism effects
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      // You can also define custom colors for Team Heisenbucks here
      colors: {
        brand: {
          light: '#6366f1', // Indigo 500
          dark: '#4f46e5',  // Indigo 600
        }
      }
    },
  },
  plugins: [],
}