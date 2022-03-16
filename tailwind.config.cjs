module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		transitionDuration: {
			DEFAULT: '200ms',
			250: '250ms',
			300: '300ms',
			400: '400ms',
			500: '500ms',
			750: '750ms',
			1000: '1000ms'
		},
		transitionTimingFunction: {
			DEFAULT: 'cubic-bezier(0,.5,.2,1.02)'
		},
		extend: {
			colors: {
				'c-bg': 'var(--c-bg)',
				'c-bg-90': 'var(--c-bg-90)',
				'c-bg-85': 'var(--c-bg-85)',
				'c-bg-75': 'var(--c-bg-75)',
				'c-bg-50': 'var(--c-bg-50)',
				'c-bg-00': 'var(--c-bg-00)',
				'c-on-bg': 'var(--c-on-bg)',
				'c-on-bg-75': 'var(--c-on-bg-75)',
				'c-on-bg-60': 'var(--c-on-bg-60)',
				'c-on-bg-50': 'var(--c-on-bg-50)',
				'c-on-bg-40': 'var(--c-on-bg-40)',
				'c-on-bg-35': 'var(--c-on-bg-35)',
				'c-on-bg-25': 'var(--c-on-bg-25)',
				'c-on-bg-15': 'var(--c-on-bg-15)',
				'c-on-bg-10': 'var(--c-on-bg-10)',
				'c-on-bg-08': 'var(--c-on-bg-08)',
				'c-on-bg-05': 'var(--c-on-bg-05)',
				'c-on-bg-03': 'var(--c-on-bg-03)',
				'c-on-bg-02': 'var(--c-on-bg-02)',
				'c-on-bg-01': 'var(--c-on-bg-01)',
				'c-on-bg-00': 'var(--c-on-bg-00)',
				'c-bg-secondary': 'var(--c-bg-secondary)',
				'c-primary': 'var(--c-primary)',
				'c-primary-75': 'var(--c-primary-75)',
				'c-primary-50': 'var(--c-primary-50)',
				'c-primary-35': 'var(--c-primary-35)',
				'c-primary-25': 'var(--c-primary-25)',
				'c-primary-20': 'var(--c-primary-20)',
				'c-primary-15': 'var(--c-primary-15)',
				'c-primary-10': 'var(--c-primary-10)',
				'c-primary-hover': 'var(--c-primary-hover)',
				'c-on-primary': 'var(--c-on-primary)',
				'c-danger': 'var(--c-danger)',
				'c-danger-20': 'var(--c-danger-20)'
			},
			spacing: {
				18: '4.5rem',
				'6%': '6%',
				'4%': '4%',
				'2%': '2%',
				'1%': '1%',
				'0.75%': '0.75%',
				'0.5%': '0.5%',
				'0.25%': '0.25%',
				'1cw': '1cw'
			},
			scale: {
				101.5: '101.5%',
				101: '101%',
				102: '102%',
				103: '103%'
			},
			height: {
				18: '4.5rem'
			},
			ringWidth: {
				3: '3px'
			},
			width: {
				18: '4.5rem',
				'1/7': '14.2857%',
				'2/7': '28.5714%',
				'3/7': '42.8571%',
				'4/7': '57.1428%',
				'5/7': '71.4285%',
				'6/7': '85.7142%'
			},
			boxShadow: {
				card: '0rem 0rem 0rem -0.25rem var(--c-shadow-harsh)',
				'card-hover': '0 1rem 2rem -0.25rem var(--c-shadow-harsh)',
				'card-bottom': '0 0.3rem 0.6rem 0rem var(--c-shadow-soft)',
				dropdown: '0rem 0rem 0rem -0.25rem var(--c-shadow-harsh)',
				'dropdown-hover': '0 1.5rem 2rem -0.25rem var(--c-shadow-harsh)',
				navbar: '0rem 0.2rem 0.4rem 0rem var(--c-shadow-normal)',
				bottombar: '0rem -0.2rem 0.4rem 0rem var(--c-shadow-normal)',
				modal: '0 1rem 3rem -0.5rem var(--c-shadow-harsh)'
			}
		}
	},
	plugins: []
};
