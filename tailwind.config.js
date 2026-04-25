/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brutal-yellow': "var(--brutal-yellow)",
        'brutal-blue': "var(--brutal-blue)",
        'brutal-red': "var(--brutal-red)",
        'brutal-green': "var(--brutal-green)",
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'float-slower': 'float-slower 25s ease-in-out infinite',
        'float-medium': 'float-medium 18s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
};
