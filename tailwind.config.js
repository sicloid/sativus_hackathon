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
      }
    },
  },
  plugins: [],
};
