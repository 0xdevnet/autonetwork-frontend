module.exports = {
    purge: ['./components/**/*.tsx', './pages/**/*.tsx', './public/**/*.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          sfpro: 'SF Pro Display',
          neuebit: 'NeueBit'
        },
        colors: {
          grayInputBg: 'var(--color-gray-input-bg)',
          red: 'var(--color-red)',
          green: 'var(--color-green)',
          yellow: 'var(--color-yellow)'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  