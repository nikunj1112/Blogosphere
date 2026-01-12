/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          blushLight: "#FFEDFA",
          blush: "#FFB8E0",
          pinkDark: "#EC7FA9",
          berry: "#BE5985",
        },
   
      },
    },
    plugins: [],
  };
  