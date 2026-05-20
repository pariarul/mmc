/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        govBlue: {
          50: '#f4f6f9',
          100: '#e8edf3',
          200: '#cbd8e6',
          300: '#9eb8d2',
          400: '#6b92b9',
          500: '#48729c',
          600: '#385a80',
          700: '#2f4967',
          800: '#293e56',
          900: '#24354b',
          950: '#14253D', // Official Deep Blue
        },
        govGold: {
          50: '#faf8ee',
          100: '#f3eec3',
          200: '#e8db86',
          300: '#d7c14b',
          400: '#caab2a',
          500: '#D2AE2D', // Official Gold Accents
          600: '#aa821d',
          700: '#856019',
          800: '#6d4d1a',
          900: '#5c3f1a',
          950: '#35210b',
        }
      },
    },
  },
  plugins: [],
};
