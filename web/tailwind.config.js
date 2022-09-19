/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ADACDD",
        secondary: "#56f",
        boxGrey: "#d9d9d9",
        navGrey: "#c1c1c1;",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans - serif"],
        Inter: ["Inter", "sans - serif"],
      },
    },
  },
  plugins: [],
};
