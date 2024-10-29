/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.{js,vue,ts}',
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
  },
}
