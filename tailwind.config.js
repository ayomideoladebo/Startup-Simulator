/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#6d13ec",
                "primary-light": "#8b45f6",
                "gold-light": "#fde047",
                "gold": "#eab308",
                "gold-dark": "#a16207",
                "background-light": "#f7f6f8",
                "background-dark": "#181022",
                "surface-dark": "#201c27",
                "surface-light": "#ffffff",
                "card-dark": "#1e1826",
                "card-border": "#3f364e",
                "text-secondary": "#a89db9",
                "accent-green": "#10b981",
                "accent-red": "#f43f5e",
                "primary-glow": "#a855f7",
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #fde047 0%, #eab308 50%, #a16207 100%)',
                'trophy-sheen': 'linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 60%)',
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
        },
    },
    plugins: [],
}
