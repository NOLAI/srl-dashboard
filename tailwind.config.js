/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        background_outer: '#EBEBEB',
        process: {
          disabled: '#EBEBEB',
          orientation: '#A6CEE3',
          planning: '#1F78B4',
          evaluation: '#33A02C',
          monitoring: '#B2DF8A',
          reading: '#E31A1C',
          rereading: '#FB9A99',
          writing: '#FF7F00',
          organising: '#FDBF6F',
          copying: '#FF7F00',
          editing: '#FFD5AD',
          structuring: '#CD6800',
          expanding: '#7A0000',
          not_detected: '#EBEBEB'
        },
        goals: {
          disabled: '#EBEBEB',
          structure: '#F87EFC',
          relevance: '#B97EFC',
          main_points: '#FCE17E'
        }
      }
    }
  },
  safelist: [
    {
      pattern: /^bg-process-.+/
    },
    {
      pattern: /^text-process-.+/
    },
    {
      pattern: /^bg-goals-.+/
    },
    {
      pattern: /^text-goals-.+/
    }
  ],
  plugins: []
}
