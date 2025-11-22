/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CDFB7C',
          light: '#d7fc96',
          dark: '#a4c963',
        },
        secondary: {
          DEFAULT: '#B87EED',
          light: '#c698f1',
          dark: '#9365be',
        },
        info: {
          DEFAULT: '#5E85ED',
          light: '#7e9df1',
          dark: '#4b6abe',
        },
        warning: {
          DEFAULT: '#F1642E',
          light: '#f48358',
          dark: '#c15025',
        },
        error: {
          DEFAULT: '#E85234',
          light: '#ed755d',
          dark: '#ba422a',
        },
        success: {
          DEFAULT: '#9dcc25',
          light: '#abe432',
          dark: '#8cbc1c',
        },
        gray: {
          50: 'hsl(220, 35%, 97%)',
          100: 'hsl(220, 30%, 94%)',
          200: 'hsl(220, 20%, 88%)',
          300: 'hsl(220, 20%, 80%)',
          400: 'hsl(220, 20%, 65%)',
          500: 'hsl(220, 20%, 42%)',
          600: 'hsl(220, 20%, 35%)',
          700: 'hsl(220, 20%, 25%)',
          800: 'hsl(220, 30%, 6%)',
          900: 'hsl(220, 35%, 3%)',
        },
        background: {
          DEFAULT: '#0b0d10',
          paper: '#161726',
          light: 'hsl(0, 0%, 99%)',
          'paper-light': '#e8e9f8',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'serif'],
        brand: ['Lora', 'serif'],
      },
      fontSize: {
        'h1': '3rem',      // 48px
        'h2': '2.25rem',   // 36px
        'h3': '1.875rem',  // 30px
        'h4': '1.5rem',    // 24px
        'h5': '1.25rem',   // 20px
        'h6': '1.125rem',  // 18px
        'subtitle1': '1.125rem', // 18px
        'subtitle2': '0.875rem', // 14px
        'body1': '0.875rem',     // 14px
        'body2': '0.875rem',     // 14px
        'caption': '0.75rem',    // 12px
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        'elevation-1-dark': 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
        'card': 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
        'card-dark': 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
      },
      backgroundImage: {
        'gradient-radial-light': 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        'gradient-radial-dark': 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
