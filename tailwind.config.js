module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    outline: ['focus', 'hover'],
    border: ['focus', 'hover'],
  },
  plugins: [],
};
