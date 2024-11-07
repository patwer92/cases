const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
})
