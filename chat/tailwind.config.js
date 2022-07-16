/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				dark: '#242526',
				'dark-lighten': '#3A3B3C',
				'dark-green': '#62A388',
				'dark-green-lighter': '#B9D2D2',
				light: '#DDDDDD',
				'light-lighten': '#F9F3F3',
				'gray-dark': '#eeeeee',
				'green-primary': '#00A7B4',
				'green-secondary': '#A4D96C',
				primary: 'var(--primary-color)',
			},
		},
		keyframes: {
			'fade-in': {
				from: { opacity: 0 },
				to: { opacity: 1 },
			},
		},
		animation: {
			'fade-in': 'fade-in 0.3s forwards',
		},
	},
	plugins: [],
};
