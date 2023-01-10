/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kakao: '#FEE500',
        lime: '#E2EE83',
        mint: '#b8fccc',
      },
    },
  },

  // plugins: [require('@tailwindcss/forms')],
};
