import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1FCC79',
        secondary: '#FF6464',
        mainText: '#2E3E5C',
        secondaryText: '#9FA5C0',
        outline: '#D0DBEA',
        form: '#F4F5F7',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', display: 'none' },
          to: { opacity: '1', display: 'flex' },
        },
        'fade-out': {
          from: { opacity: '1', display: 'flex' },
          to: { opacity: '0', display: 'none' },
        },
        'slide-in-top': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-out-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s',
        'fade-out': 'fade-out 0.4s',
        'slide-in-top': 'slide-in-top 0.4s',
        'slide-out-top': 'slide-out-top 0.4s',
      },
    },
  },
  plugins: [],
}
export default config
