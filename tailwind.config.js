/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#effcf9',
          100: '#c8f5ec',
          200: '#94ead9',
          300: '#56d6c2',
          400: '#2bbfab',
          500: '#14a594',
          600: '#0d8578',
          700: '#0c6b62',
          800: '#0e554f',
          900: '#0a3f3b',
          950: '#042f2e',
        },
        sky: {
          50: '#f0f9ff',
          100: '#dff1fe',
          200: '#b8e3fd',
          300: '#79cdfb',
          400: '#36b3f5',
          500: '#0c97e6',
          600: '#0078c5',
          700: '#0160a0',
          800: '#065184',
          900: '#0b446d',
        },
        ink: {
          50: '#f3f6f6',
          100: '#e0e7e6',
          200: '#c3d0cf',
          300: '#9db1b0',
          400: '#748e8d',
          500: '#5a7473',
          600: '#475d5c',
          700: '#3c4e4d',
          800: '#344241',
          900: '#2d3938',
          950: '#0f1f1f',
        }
      },
      fontFamily: {
          display: ['system-ui', 'sans-serif'],
          body: ['system-ui', 'sans-serif'],
          mono: ['ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(13, 133, 120, 0.12)',
        'glow-lg': '0 0 40px rgba(13, 133, 120, 0.18)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.05)',
        'inner-glow': 'inset 0 1px 2px rgba(255,255,255,0.6)',
      }
    },
  },
  plugins: [],
}
