/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        './styles/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                // "gradient-conic":
                //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "home-banner": "url('~/public/static/images/home_banner.png')",
                "home-grid-point": "url('~/public/static/images/gridPoint.png')",
                "strategy-banner": "url('~/public/static/images/strategy_banner.png')"
            },
            boxShadow: {
                tabs_sub_shadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                strategy_days_shadow: "0px 2px 4px 0px rgba(0,0,0,0.05)",
                strategy_chart_shadow: "0px 10px 30px 0px rgba(0,0,0,0.1)"
            },
        },
    },
    plugins: [],
};
