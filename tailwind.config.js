/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.{js,vue,ts}',
    './layouts/**/*.{js,vue,ts}',
    './pages/**/*.{js,vue,ts}',
    './widgets/**/*.{js,vue,ts}',
    './features/**/*.{js,vue,ts}',
    './entities/**/*.{js,vue,ts}',
    './shared/ui/*.{js,vue,ts}'
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      main: {
        100: '#F2D492',
        200: '#B8B08D',
      },
      helper: {
        100: '#283845',
        200: '#202C39',
        300: '#47525B',
        400: '#404B58',
      },
      primary: {
        100: '#F29559',
        200: '#F2AC7E',
      },
      accent: {
        100: '#355EFF',
        200: '#5A7BFF',
      },
      neutral: {
        100: '#D9D9D9',
        200: '#D5D5D5',
        300: '#F6F8FA',
      },
      danger: {
        100: '#FF2525',
      },
      background: {
        100: '#F5F5F5',
        200: '#E1E1E1',
      },
    },
    backgroundImage: {
      'skeleton-gradient': 'linear-gradient(90deg, #D9D9D9 25%, #F6F8FA 50%, #D9D9D9 75%)',
    },
    backgroundSize: {
      '200%': '200% 100%',
    },
    keyframes: {
      'skeleton-loading': {
        '0%': { backgroundPosition: '200% 0', },
        '100%': { backgroundPosition: '-200% 0', },
      },
    },
    animation: {
      'skeleton-loading': 'skeleton-loading 1.5s infinite',
    },
  },
}
