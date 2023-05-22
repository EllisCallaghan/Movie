/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        'primary' : ['Roboto Slab','serif']
      },
      colors:{
        primary:'#03111B',
        secondary:'#007AD3'
      }
    },
    screens:{
      'xl':{'max':'1632px'},
      'lg':{'max':'1332px'},
      'md':{'max':'988px'},
      'sm':{'max':'400px'}
    }
  },
  plugins: [],
}
