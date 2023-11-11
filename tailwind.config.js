/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      './src/*.{tsx,ts}',
      './src/components/*.{tsx,ts}',
      './src/pages/*.{tsx,ts}',
    ],
    enabled: false, // Disable tree shaking
  },
  safelist: [
    {
      pattern: /^.*$/, // Match any class pattern during development
    },
  ],
  content: [],
  theme: {
    extend: {
      colors: {
        confButton: "#A1D2FF",
        congButtonSecondary: "#9DE7FF",
        confPrimary: "#A1D2FF",
        confSecondary: "#ADD8FF",
        confTertiary: "#D9D9D9",
        confError: "#f59a9a",
        confMessage: "#c4ffc4",
        confWarning: "#fe5d5d",
      },
    },
  },
  plugins: [],
}
