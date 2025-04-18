import tailwindcssAnimate from "tailwindcss-animate";
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", flowbite.content(),],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
				defaultBlue: '#576086',
				defaultLightBlue: '#dfeaf2',
				defaultOrange: '#f7b696',
				defaultGray: '#fafaf8',
				defaultLightGray: '#f9f9f7',
    		},
    		screens: {
    			sm: '350px',
    			md: '720px',
    			lg: '1025px'
    		}
    	}
    },
    plugins: [tailwindcssAnimate, flowbite.plugin(),],
}

