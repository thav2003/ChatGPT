/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gizmo-gray-500': '#999',
        'gizmo-gray-600': '#666',
        'gizmo-gray-950': '#0f0f0f',
        'token-text-primary': '#0f0f0f',
        'token-text-secondary': '#666',
        'token-text-tertiary': '#999',
        'token-surface-primary': '#202123',
        'token-surface-secondary': '#c5c5d2',
        'token-surface-tertiary': '#ececf1',
        'token-border-light': 'rgba(217,217,227,.1)'
      }
    }
  },
  plugins: []
}
