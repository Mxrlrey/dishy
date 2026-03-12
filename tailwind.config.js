import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '0.5' },
                    '100%': { transform: 'scale(10)', opacity: '0' },
                },
            },
            animation: {
                ripple: 'ripple 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },



    plugins: [forms],
};
