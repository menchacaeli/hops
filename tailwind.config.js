const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        atelier: {
          bg: '#F6F1E8',
          'bg-elevated': '#EFE7DA',
          'bg-dark': '#131110',
          'bg-elevated-dark': '#1A1715',
          text: '#1F1A16',
          'text-muted': '#5E554E',
          'text-inverse': '#F7F3EE',
          'text-muted-dark': '#C3B8AC',
          accent: '#C8872C',
          'accent-pressed': '#A56E20',
          success: '#3E7E62',
          danger: '#C84F4F',
          surface: 'rgba(255,255,255,0.58)',
          'surface-dark': 'rgba(22,20,18,0.50)',
          border: 'rgba(255,255,255,0.45)',
          'border-dark': 'rgba(255,255,255,0.14)',
          separator: 'rgba(255,255,255,0.35)',
          'separator-dark': 'rgba(255,255,255,0.10)',
        },
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
