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
    },
  },
  plugins: [],
}
export default config
