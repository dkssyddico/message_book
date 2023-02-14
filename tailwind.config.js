/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kakao: '#FEE500',
        lime: '#E2EE83',
        mint: '#b8fccc',
        naver: '#03C75A',
        google: '#fff',
        twitter: '#0083DB',
      },
      keyframes: {
        down: {
          '0%': {
            transform: 'translateX(-50%) translateY(-40px)',
          },
          '100%': {
            transform: '',
          },
        },
      },
      animation: {
        down: 'down 500ms linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
