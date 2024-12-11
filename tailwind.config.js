/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {},
            screens: {
                'sm': '380px',
                'md': '720px',
                'lg': '1025px',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}

