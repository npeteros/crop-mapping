import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    'darkMode': 'selector',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "primary-light": '#606C38',
                "primary-dark": '#283618',
                "secondary-light": '#DDA15E',
                "secondary-dark": "#BC6C25",
                "base": "#FEFAE0"
            }
        },
    },

    plugins: [forms],
};
