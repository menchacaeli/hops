const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        brand: {
          green: { light: '#166534', dark: '#4ADE80' },
          amber: { pour: '#F59E0B', cta: '#D97706', dark: '#FBBF24' },
        },
        surface: {
          bg:       '#FFFBEB',
          card:     '#FFFFFF',
          elevated: '#FFFBEB',
          'bg-dark':       '#0C0A06',
          'card-dark':     '#1A140A',
          'elevated-dark': '#261C0E',
        },
        border: {
          subtle:      '#FDE68A',
          'subtle-dark': '#2E2010',
        },
      },
      fontWeight: {
        black: '900',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
