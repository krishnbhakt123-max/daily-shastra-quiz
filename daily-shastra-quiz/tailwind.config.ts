import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel:    ['var(--font-cinzel)', 'Cinzel', 'serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        crimson:   ['var(--font-crimson)', 'Crimson Pro', 'Georgia', 'serif'],
      },
      colors: {
        saffron:        '#E8832A',
        'saffron-deep': '#C45E0E',
        'saffron-light':'#F4A84B',
        gold:           '#C9943A',
        'gold-light':   '#F0C060',
        cream:          '#FDF6E3',
        parchment:      '#F9EDD0',
        lotus:          '#8B2252',
        teal:           '#1A6B6B',
        ink:            '#1A120A',
        'ink-muted':    '#6B4F38',
      },
      borderRadius: {
        '2xl': '14px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
export default config
