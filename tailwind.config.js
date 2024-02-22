/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            /* Palette by https://mycolor.space/?hex=%23313859&sub=1*/
            colors: {
                primary: '#313859',
            },
        },
    },
    plugins: [],
};
